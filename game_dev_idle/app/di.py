from logging import getLogger
from typing import Any

from dotenv import load_dotenv
from litestar import Request
from motor.motor_asyncio import (
    AsyncIOMotorClient,
    AsyncIOMotorDatabase,
    AsyncIOMotorClientSession,
)
from pydantic_core import ValidationError

from game_dev_idle.app.auth.google_sso import GoogleSSO
from game_dev_idle.app.models import User
from game_dev_idle.app.repositories import (
    GameStateRepository,
    UnauthenticatedUserRepository,
    MongoClientFactory,
)
from game_dev_idle.app.settings import ApiSettings

try:
    __API_SETTINGS = ApiSettings()
except ValidationError:
    load_dotenv()
    __API_SETTINGS = ApiSettings()


async def get_api_settings() -> ApiSettings:
    return __API_SETTINGS


async def get_google_sso(api_settings: ApiSettings) -> GoogleSSO:
    return GoogleSSO(
        client_id=api_settings.google_oauth_settings.client_id,
        client_secret=api_settings.google_oauth_settings.client_secret,
        redirect_uri=f"{api_settings.redirect_base_url}/auth/google/callback",
        allow_insecure_http=True,
    )


async def get_mongo_client_factory(api_settings: ApiSettings) -> MongoClientFactory:
    return MongoClientFactory(mongo_settings=api_settings.mongo_settings)


async def get_mongo_client(
    mongo_client_factory: MongoClientFactory,
) -> AsyncIOMotorClient:
    return mongo_client_factory.build()


async def get_database(
    mongo_client: AsyncIOMotorClient, api_settings: ApiSettings
) -> AsyncIOMotorDatabase:
    return mongo_client.get_database(api_settings.mongo_settings.database_name)


async def get_unauthenticated_user_repository(
    database: AsyncIOMotorDatabase,
    session: AsyncIOMotorClientSession,
) -> UnauthenticatedUserRepository:
    getLogger().info("UNAUTH USER REPO DI")
    return UnauthenticatedUserRepository(database=database, session=session)


async def get_game_state_repository(
    database: AsyncIOMotorDatabase,
    session: AsyncIOMotorClientSession,
    request: Request[User, Any, Any],
) -> GameStateRepository:
    return GameStateRepository(
        database=database, session=session, email=request.user.email
    )


async def get_session(mongo_client: AsyncIOMotorClient) -> AsyncIOMotorClientSession:
    async with await mongo_client.start_session() as client_session:
        yield client_session
