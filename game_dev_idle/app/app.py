from typing import Optional

from litestar import Litestar, Response
from litestar.exceptions import NotAuthorizedException
from litestar.logging import LoggingConfig
from litestar.static_files import create_static_files_router
from pymongo import MongoClient

from game_dev_idle.app.auth.di import oauth2_auth
from game_dev_idle.app.repositories import (
    UserRepositoryFactory,
    SessionFactory,
    DatabaseFactory,
    MongoClientFactory,
)
from game_dev_idle.app.settings import ApiSettings
from game_dev_idle.app.unauthenticated_api_router import UNAUTHENTICATED_API_ROUTER


def base_exception_handler(*args, **kwargs) -> Response[None]:
    import traceback

    traceback.print_exc()
    return Response(status_code=500, content=None)


logging_config = LoggingConfig(
    root={"level": "INFO", "handlers": ["queue_listener"]},
    formatters={
        "standard": {"format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"}
    },
    log_exceptions="always",
)


app = Litestar(
    on_app_init=[oauth2_auth.on_app_init],
    route_handlers=[
        UNAUTHENTICATED_API_ROUTER,
        create_static_files_router(
            path="app/auth/google/callback",
            directories=["frontend/dist"],
            html_mode=True,
        ),
        create_static_files_router(
            path="/", directories=["frontend/dist"], html_mode=True
        ),
    ],
    exception_handlers={
        NotAuthorizedException: None,
        Exception: base_exception_handler,
    },
    logging_config=logging_config,
)


def create_app(api_settings: Optional[ApiSettings] = None) -> Litestar:
    api_settings = api_settings or ApiSettings()
    app.pdb_on_exception = api_settings.env == "dev"
    mongo_client_factory = MongoClientFactory(
        mongo_settings=api_settings.mongo_settings
    )
    print(api_settings.model_dump())
    MongoClient(api_settings.mongo_settings.uri, connectTimeoutMS=5000).get_database(
        api_settings.mongo_settings.database_name
    ).list_collection_names()
    database_factory = DatabaseFactory(
        mongo_settings=api_settings.mongo_settings,
        mongo_client_factory=mongo_client_factory,
    )
    session_factory = SessionFactory(mongo_client_factory=mongo_client_factory)
    app.state.user_repository_factory = UserRepositoryFactory(
        database_factory=database_factory,
        session_factory=session_factory,
        mongo_client_factory=mongo_client_factory,
    )
    return app
