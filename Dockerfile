FROM node:current-bullseye-slim as node-builder

WORKDIR /app/frontend

COPY frontend .

WORKDIR /app/frontend

RUN npm i && npm run build


FROM python:3.12.5-slim-bullseye as builder

ENV POETRY_HOME=/app/.venv

WORKDIR /app

RUN python -m venv $POETRY_HOME && \
    $POETRY_HOME/bin/pip install poetry==1.8.4
COPY poetry.lock pyproject.toml /app/

RUN $POETRY_HOME/bin/poetry install --no-root --without dev

COPY game_dev_idle /app/game_dev_idle

RUN $POETRY_HOME/bin/poetry build \
    && $POETRY_HOME/bin/poetry run pip install dist/*.whl --no-deps \
    && rm -rf .venv/src

FROM python:3.12.5-slim-bullseye

COPY --from=builder /app/.venv /app/.venv
COPY bin/* /usr/local/bin

WORKDIR /app/game_dev_idle/app/frontend/dist

COPY --from=node-builder /app/frontend/dist .

WORKDIR /app

ENV PATH=/app/.venv/bin:$PATH
EXPOSE 8000
CMD chmod +x /usr/local/bin/game-dev-idle-api && game-dev-idle-api
