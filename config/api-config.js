export default
{
    "apiUrl": "http://localhost:8000",
    "endpoints": {
        "login": "/api/login",
        "getUserList": "/api/admin/users",
        "getUser": "/api/admin/user/%d",
        "getApiUser": "/api/get-user",
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
        "serviceParameterList": "/api/services/parameters",
        "providerServiceParameterList": "/api/provider/service/parameters"
    }
}