FROM node:current-bullseye-slim as node-builder

WORKDIR /app/frontend

COPY frontend .

WORKDIR /app/frontend

RUN npm i && npm run build


FROM python:3.12.5-slim-bullseye

WORKDIR /app

RUN python -m venv .venv && ./.venv/bin/pip install poetry
COPY poetry.lock .
COPY pyproject.toml .
RUN ./.venv/bin/poetry install
COPY app.py .

WORKDIR /app/frontend/dist

COPY --from=node-builder /app/frontend/dist .

WORKDIR /app

CMD ./.venv/bin/uvicorn app:app --port 8080 --host 0.0.0.0
