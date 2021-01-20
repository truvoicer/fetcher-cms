const DateFormat = require("dateformat");

export const formatDate = (dateString, formatString = "dd mmmm yyyy") => {
    if (!isSet(dateString)) {
        return null;
    }
    let date = new Date(dateString);
    if (isSet(date)) {
        return DateFormat(date, formatString);
    }
    return null
}

export const isSet = (item) => {
    if (typeof item === "undefined") {
        return false
    }
    return true;
}


export const getQuery = (queryObject, row, type = "dynamic") => {
    let esc = encodeURIComponent;
    let operator = "/";
    let joiner = "/";
    if (type === "params") {
        operator = "=";
        joiner = "&";
    }
    let query = "?" + Object.keys(queryObject)
        .map(k => {
            let value = queryObject[k];
            if (typeof value === 'object') {
                return Object.keys(value)
                    .map(l => esc(l) + operator + esc(row[k][value[l]]))
                    .join(joiner);
            } else {
                return esc(k) + operator + esc(row[queryObject[k]])
            }
        }).join(joiner);
    // console.log(query)
}

export const getLinkQueryObject = (item, row) => {
    let href = item.href;
    let linkAs = item.href;
    if (isSet(item.query.params)) {
        href += getQuery(item.query.params, row, "params");
        linkAs = href;
    } else if (isSet(item.query.dynamic)) {
        if (isSet(item.query.dynamic.params)) {
            href += getQuery(item.query.dynamic.params, row, "dynamic");
            // console.log(href)
        } else {
            if (isSet(item.query.dynamic.brackets) && item.query.dynamic.brackets) {
                href = sprintf(href, "[" + row.id + "]")
            } else {
                // console.log(row, item)
                href = sprintf(href, row.id);
            }
            linkAs = href;
        }
        return {
            href: href,
            linkAs: linkAs
        }
    }
}
export const getLinkData = (item, row) => {
    let href = item.href;
    let linkAs = item.href;
    if (isSet(item.query)) {
        return getLinkQueryObject(item, row);
    }

    if (isSet(item.hrefConfig) && isSet(item.hrefConfig.replace) && item.hrefConfig.replace) {
        let replaceObject = {};
        Object.keys(item.hrefConfig.data).map((dataKey) => {
            if (!item.hrefConfig.data[dataKey].dynamic) {
                replaceObject[dataKey] = item.hrefConfig.data[dataKey];
            } else if (item.hrefConfig.data[dataKey].dynamic) {
                replaceObject[dataKey] = {
                    [item.hrefConfig.data[dataKey].column]: row[item.hrefConfig.data[dataKey].key]
                }
            }
        })
        href = linkAs = sprintf(href, replaceObject);
    }
    return {
        href: href,
        linkAs: linkAs
    }
}

export const uCaseFirst = (string) => {
    if (!isSet(string) || string === null || string === "") {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isObjectEmpty = (object) => {
    return Object.keys(object).length === 0 && object.constructor === Object
}

export const isObject = (object) => {
    return typeof object === "object";
}

export const isNotEmpty = (item) => {
    return typeof item !== "undefined" && item !== null && item !== "" && item !== false;
}
