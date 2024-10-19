from collections.abc import Sequence

from pydantic import BaseModel

from game_dev_idle.app.core import GameStatModel


class GameStateSchema(BaseModel):
    """"""

    features: int
    bugs: int
    money: float
    feature_developers: int
    bug_fixers: int
    game_stats: Sequence[GameStatModel]
