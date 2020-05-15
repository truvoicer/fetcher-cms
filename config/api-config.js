export default
{
    "apiUrl": "http://localhost:8000",
    "endpoints": {
        "login": "/api/login",
        "getUser": "/api/get-user",
        "createUser": "/api/admin/create-user",
        "provider": "/api/provider/%d",
        "providers": "/api/providers",
        "providerProperties": "/api/provider/%d/properties",
        "createProviderProperties": "/api/provider/properties/create",
        "property": "/api/property/%d",
        "properties": "/api/properties",
        "createProvider": "/api/provider/create",
        "updateProvider": "/api/provider/update",
        "deleteProvider": "/api/provider/delete",
        "createProperty": "/api/property/create",
        "updateProperty": "/api/property/update",
        "deleteProperty": "/api/property/delete",
    }
}