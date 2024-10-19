from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from dataclasses import dataclass

from motor.motor_asyncio import (
    AsyncIOMotorDatabase,
    AsyncIOMotorCollection,
    AsyncIOMotorClient,
    AsyncIOMotorClientSession,
)

from game_dev_idle.app.models import User, GameState
from game_dev_idle.app.settings import MongoSettings


@dataclass(kw_only=True, frozen=True)
class UnauthenticatedUserRepository:
    database: AsyncIOMotorDatabase
    session: AsyncIOMotorClientSession

    @property
    def collection(self) -> AsyncIOMotorCollection:
        return self.database.get_collection("users")

    async def upsert(self, user: User) -> None:
        (
            await self.collection.update_one(
                {"email": user.email},
                {"$set": user.model_dump()},
                upsert=True,
                session=self.session,
            )
        )


@dataclass(kw_only=True, frozen=True)
class UserRepository(UnauthenticatedUserRepository):
    email: str

    async def get_by_email(self) -> User:
        return User.model_validate(
            await self.collection.find_one({"email": self.email}, session=self.session)
        )


@dataclass(kw_only=True, frozen=True)
class MongoClientFactory:
    mongo_settings: MongoSettings

    def build(self) -> AsyncIOMotorClient:
        return AsyncIOMotorClient(self.mongo_settings.uri, connectTimeoutMS=5000)


@dataclass(kw_only=True, frozen=True)
class SessionFactory:
    mongo_client_factory: MongoClientFactory

    @asynccontextmanager
    async def __call__(
        self, mongo_client: AsyncIOMotorClient
    ) -> AsyncGenerator[AsyncIOMotorClientSession, None]:
        async with await mongo_client.start_session() as session:
            yield session


@dataclass(kw_only=True, frozen=True)
class DatabaseFactory:
    mongo_settings: MongoSettings
    mongo_client_factory: MongoClientFactory

    async def build(self, mongo_client: AsyncIOMotorClient) -> AsyncIOMotorDatabase:
        return mongo_client.get_database(self.mongo_settings.database_name)


@dataclass(kw_only=True, frozen=True)
class UserRepositoryFactory:
    database_factory: DatabaseFactory
    session_factory: SessionFactory
    mongo_client_factory: MongoClientFactory

    @asynccontextmanager
    async def build(self, email: str) -> AsyncGenerator[UserRepository, None]:
        mongo_client = self.mongo_client_factory.build()
        async with self.session_factory(mongo_client) as session:
            yield UserRepository(
                database=await self.database_factory.build(mongo_client),
                session=session,
                email=email,
            )


@dataclass(kw_only=True, frozen=True)
class GameStateRepository:
    database: AsyncIOMotorDatabase
    session: AsyncIOMotorClientSession
    email: str

    @property
    def collection(self) -> AsyncIOMotorCollection:
        return self.database.get_collection("game_states")

    async def upsert(self, game_state: GameState) -> None:
        (
            await self.collection.update_one(
                {"email": self.email},
                {"$set": game_state.model_dump()},
                upsert=True,
            )
        )

    async def get_by_email(self) -> GameState:
        return GameState.model_validate(
            await self.collection.find_one({"email": self.email})
        )
