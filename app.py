from litestar import Litestar
from litestar.static_files import create_static_files_router

from api_router import API_ROUTER

app = Litestar(
    route_handlers=[
        API_ROUTER,
        create_static_files_router(
            path="/", directories=["frontend/dist"], html_mode=True
        ),
    ]
)
