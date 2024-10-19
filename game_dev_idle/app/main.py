import uvicorn
from litestar import Litestar

from game_dev_idle.app.app import create_app


def main() -> Litestar:
    return create_app()


if __name__ == "__main__":
    uvicorn.run(
        main,
        port=8080,
        factory=True,
        log_config={"version": 1, "disable_existing_loggers": False},
    )
