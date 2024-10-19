from pydantic import BaseModel

from game_dev_idle.app.schemas import GameStateSchema


class GameState(GameStateSchema):
    """"""

    email: str


class User(BaseModel):
    email: str
