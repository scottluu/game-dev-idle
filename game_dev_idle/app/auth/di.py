from typing import Any, Optional

from litestar.connection import ASGIConnection
from litestar.security.jwt import OAuth2PasswordBearerAuth, Token

from game_dev_idle.app.api_router import API_ROUTER
from game_dev_idle.app.models import User
from game_dev_idle.app.repositories import UserRepositoryFactory, UserRepository
from game_dev_idle.app.settings import ApiSettings


async def retrieve_user_handler(
    token: Token, connection: ASGIConnection[Any, Any, Any, Any]
) -> Optional[User]:
    # logic here to retrieve the user instance
    user_repository_factory: UserRepositoryFactory = (
        connection.app.state.user_repository_factory
    )
    user_repository: UserRepository
    async with user_repository_factory.build(token.sub) as user_repository:
        return await user_repository.get_by_email()


oauth2_auth = OAuth2PasswordBearerAuth[User, Token](
    retrieve_user_handler=retrieve_user_handler,
    token_secret=ApiSettings().jwt_secret,
    # we are specifying the URL for retrieving a JWT access token
    token_url="/public-api/auth/google/callback",
    # we are specifying which endpoints should be excluded from authentication. In this case the login endpoint
    # and our openAPI docs.
    route_handlers=[API_ROUTER],
)
