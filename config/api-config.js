import {SiteConfig} from "./site-config";

export default
{
    "apiUrl": process.env.NEXT_PUBLIC_API_URL,
    "endpoints": {
        "login": "/api/login",
        "getUserList": "/api/admin/users",
        "getUser": "/api/admin/user/%d",
        "getApiUser": "/api/get-user",
        "create": "/api/%s/create",
        "update": "/api/%s/update",
        "delete": "/api/%s/delete",
        "duplicate": "/api/%s/duplicate",
        "provider": "/api/provider/%d",
        "providerList": "/api/providers",
        "providerProperty": "/api/provider/%d/property/%d",
        "providerPropertyList": "/api/provider/%d/properties",
        "providerPropertyRelation": "/api/provider/property/relation/%d",
        "property": "/api/property/%d",
        "propertyList": "/api/properties",
        "category": "/api/category/%d",
        "categoryList": "/api/categories",
        "service": "/api/service/%d",
        "serviceList": "/api/services",
        "serviceResponseKeyList": "/api/service/response/key/list",
        "serviceResponseKey": "/api/service/response/key/%d",
        "serviceRequest": "/api/service/request/%d",
        "serviceRequestList": "/api/service/request/list",
        "serviceRequestParameterList": "/api/service/request/parameter/list",
        "serviceRequestParameter": "/api/service/request/parameter/%d",
        "serviceRequestConfigList": "/api/service/request/config/list",
        "serviceRequestConfig": "/api/service/request/config/%d",
        "requestResponseKey": "/api/service/request/%d/response/key/%d",
        "requestResponseKeyList": "/api/service/request/%d/response/key/list",
        "requestResponseKeyRelation": "/api/service/request/response/key/relation/%d",
    }
}