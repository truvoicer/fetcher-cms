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
        "providerList": "/api/providers",
        "providerProperties": "/api/provider/%d/properties",
        "property": "/api/property/%d",
        "propertyList": "/api/properties",
        "service": "/api/service/%d",
        "serviceList": "/api/services",
        "serviceParameter": "/api/parameter/%d",
        "providerServiceParameterList": "/api/provider/service/parameters"
    }
}