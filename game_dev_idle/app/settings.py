from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class GoogleOAuthSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="google_oauth_")

    client_id: str
    client_secret: str


class MongoSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="mongo_")

    uri: str
    database_name: str


class ApiSettings(BaseSettings):
    model_config = SettingsConfigDict(frozen=True, env_prefix="game_dev_idle_")
    google_oauth_settings: GoogleOAuthSettings = Field(
        default_factory=GoogleOAuthSettings
    )
    jwt_secret: str
    mongo_settings: MongoSettings = Field(default_factory=MongoSettings)
    redirect_base_url: str
    env: Literal["dev", "prod"] = "prod"
