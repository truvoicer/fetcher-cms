export default
{
    "apiUrl": process.env.NEXT_PUBLIC_API_URL,
    "endpoints": {
        "login": "/account/login",
        "getUserList": "/admin/users",
        "getUser": "/admin/user/%d",
        "search": "/admin/search/%s",
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
        "serviceResponseKey": "/service/response/key",
        "serviceRequest": "/provider/%d/service/request",
        "serviceRequestParameter": "/provider/%d/service/request/%s/parameter",
        "serviceRequestConfig": "/provider/%d/service/request/config",
        "requestResponseKey": "/provider/%d/service/request/%d/response/key",
        "tools": "/tools/%s",
        "fileList": "/tools/filesystem/files",
        "file": "/tools/filesystem/file/%d",
        "fileDownload": "/tools/filesystem/file/%d/download"
    }
}