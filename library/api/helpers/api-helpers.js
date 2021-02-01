const vsprintf = require("sprintf-js").vsprintf;

export const buildRequestUrl = ({endpoint = "", operation = "", args = []}) => {
    if (args.length > 0) {
        endpoint = vsprintf(endpoint, args)
    }
    return `${endpoint}/${operation}`;
}