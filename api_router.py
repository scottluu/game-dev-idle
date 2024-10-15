from litestar import Router, get


@get()
async def health_check() -> dict[str, str]:
    return {"health_check": "okay"}


API_ROUTER = Router(path="/api", route_handlers=[health_check])
