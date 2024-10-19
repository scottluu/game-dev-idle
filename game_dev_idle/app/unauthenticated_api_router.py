from logging import getLogger
from typing import Optional, Annotated

from litestar import get, Request, Response, Router
from litestar.di import Provide
from litestar.params import Parameter
from litestar.security.jwt import OAuth2Login

from game_dev_idle.app.api_router import MyRedirect
from game_dev_idle.app.auth.base import OpenID, URL
from game_dev_idle.app.auth.di import oauth2_auth
from game_dev_idle.app.auth.google_sso import GoogleSSO
from game_dev_idle.app.di import (
    get_google_sso,
    get_api_settings,
    get_unauthenticated_user_repository,
    get_database,
    get_session,
    get_mongo_client,
    get_mongo_client_factory,
)
from game_dev_idle.app.models import User
from game_dev_idle.app.repositories import UnauthenticatedUserRepository


@get("/auth/google/login")
async def auth_google_init(google_sso: GoogleSSO) -> MyRedirect:
    """Initialize auth and redirect"""
    with google_sso:
        return MyRedirect(
            redirect_to=(
                await google_sso.get_login_redirect(
                    params={"prompt": "consent", "access_type": "offline"}
                )
            ).url
        )


@get("/auth/google/callback")
async def auth_google_callback(
    google_sso: GoogleSSO,
    request: Request,
    unauthenticated_user_repository: UnauthenticatedUserRepository,
    code_param: Annotated[Optional[str], Parameter(query="code", default=None)],
    state_param: Annotated[Optional[str], Parameter(query="state", default=None)],
) -> Optional[Response[OAuth2Login]]:
    """Verify login"""
    getLogger().info("hit google callback")
    with google_sso:
        user = await google_sso.verify_and_process(
            url=URL(str(request.url)),
            code=code_param,
            state=state_param,
            pkce_code_verifier=request.cookies.get("pkce_code_verifier"),
        )
    match user:
        case None:
            return None
        case OpenID():
            email = user.email
        case dict():
            email = OpenID.model_validate(user).email

        case _:
            raise NotImplementedError()
    if not email:
        raise ValueError("Email is empty")

    user_model = User(email=email)
    await unauthenticated_user_repository.upsert(user_model)
    return oauth2_auth.login(identifier=user_model.email)


UNAUTHENTICATED_API_ROUTER = Router(
    path="/public-api",
    route_handlers=[
        auth_google_callback,
        auth_google_init,
    ],
    dependencies={
        "google_sso": Provide(get_google_sso),
        "api_settings": Provide(get_api_settings),
        "unauthenticated_user_repository": Provide(get_unauthenticated_user_repository),
        "database": Provide(get_database),
        "session": Provide(get_session),
        "mongo_client": Provide(get_mongo_client),
        "mongo_client_factory": Provide(get_mongo_client_factory),
    },
    opt={"exclude_from_auth": True},
)
