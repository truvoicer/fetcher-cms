export const ScraperApiConfig = {
    "apiUrl": process.env.NEXT_PUBLIC_SCRAPER_API_URL,
    "endpoints": {
        "login": "/web/auth/login",
        "webTokenCheck": "/web/auth/token/check",
        "tokenCheck": "/auth/token/check",
        "getUser": "/admin/user/%d",
        "getApiTokenList": "/admin/user/%d/api-tokens",
        "getApiToken": "/admin/user/api-token/%d",
        "generateApiToken": "/admin/user/%d/api-token/generate",
        "getApiUser": "/admin/token/user",
        "scraper": "/scraper",
        "cron": "/cron",
    }
}