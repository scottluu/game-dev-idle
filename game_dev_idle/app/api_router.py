from typing import Any

from litestar import Router, get, Request, post
from litestar.di import Provide
from pydantic import BaseModel

from game_dev_idle.app.di import (
    get_google_sso,
    get_api_settings,
    get_game_state_repository,
    get_unauthenticated_user_repository,
    get_database,
    get_session,
    get_mongo_client,
    get_mongo_client_factory,
)
from game_dev_idle.app.models import User, GameState
from game_dev_idle.app.repositories import (
    GameStateRepository,
)
from game_dev_idle.app.schemas import GameStateSchema


@get()
async def health_check() -> dict[str, str]:
    return {"health_check": "okay"}


class MyRedirect(BaseModel):
    redirect_to: str


@get("/users/me")
async def get_user(request: Request[User, Any, Any]) -> User:
    return request.user


@post("/game/save")
async def save_game(
    request: Request[User, Any, Any],
    data: GameStateSchema,
    game_state_repository: GameStateRepository,
) -> None:
    """"""
    if request.user.email != request.user.email:
        raise ValueError("Invalid user")
    await game_state_repository.upsert(
        GameState.model_validate({**data.model_dump(), "email": request.user.email})
    )


@get("/game")
async def load_game(game_state_repository: GameStateRepository) -> GameStateSchema:
    """"""
    game_state_model = await game_state_repository.get_by_email()
    return GameStateSchema.model_validate(
        **game_state_model.model_dump(exclude={"email"})
    )


API_ROUTER = Router(
    path="/api",
    route_handlers=[
        health_check,
        get_user,
    ],
    dependencies={
        "google_sso": Provide(get_google_sso),
        "api_settings": Provide(get_api_settings),
        "game_state_repository": Provide(get_game_state_repository),
        "unauthenticated_user_repository": Provide(get_unauthenticated_user_repository),
        "database": Provide(get_database),
        "session": Provide(get_session),
        "mongo_client": Provide(get_mongo_client),
        "mongo_client_factory": Provide(get_mongo_client_factory),
    },
)
