export default
{
    "apiUrl": "http://localhost:8000",
    "endpoints": {
        "login": "/api/login",
        "getUser": "/api/get-user",
        "createUser": "/api/admin/create-user",
        "create": "/api/%s/create",
        "update": "/api/%s/update",
        "delete": "/api/%s/delete",
        "provider": "/api/provider/%d",
        "providers": "/api/providers",
        "providerProperties": "/api/provider/%d/properties",
        "property": "/api/property/%d",
        "properties": "/api/properties",
        "apiRequests": "/api/requests",
        "apiRequestParams": "/api/request/params",
        "apiProviderRequestParams": "/api/provider/request/parameters"
    }
}