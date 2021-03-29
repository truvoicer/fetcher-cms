export default
{
    "apiUrl": process.env.NEXT_PUBLIC_API_URL,
    "endpoints": {
        "login": "/account/login",
        "getUser": "/admin/user/%d",
        "search": "/admin/search",
        "duplicate": "/%s/duplicate",
        "auth": "/auth",
        "user": "/user",
        "admin": "/admin",
        "scraper": "/scraper",
        "permission": "/permission",
        "provider": "/provider",
        "providerProperty": "/provider/%d/property",
        "property": "/property",
        "category": "/category",
        "service": "/service",
        "serviceResponseKey": "/service/%d/response/key",
        "serviceRequest": "/provider/%d/service/request",
        "serviceRequestParameter": "/provider/%d/service/request/%d/parameter",
        "serviceRequestConfig": "/provider/%d/service/request/%d/config",
        "requestResponseKey": "/provider/%d/service/request/%d/response/key",
        "tools": "/tools",
        "fileSystem": "/tools/filesystem"
    }
}