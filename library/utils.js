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
    if (type === "params") {
        operator = "=";
    }
    return "?" + Object.keys(queryObject)
        .map(k => {
            let value = queryObject[k];
            if (typeof value === 'object') {
                return Object.keys(value)
                    .map(l => esc(l) + operator + esc(row[k][value[l]]))
                    .join('&');
            } else {
                return esc(k) + operator + esc(row[queryObject[k]])
            }
        }).join('&');
}

export const getLinkData = (item, row) => {
    let href = item.href;
    let linkAs = item.href;
    if (isSet(item.query.params)) {
        href += getQuery(item.query.params, row, "params");
        linkAs = href;
    } else if (isSet(item.query.dynamic)) {
        if (isSet(item.query.dynamic.data)) {
            href += getQuery(item.query.dynamic.data, row, "dynamic");
        } else {
            if (isSet(item.query.dynamic.brackets) && item.query.dynamic.brackets) {
                href = sprintf(href, "[" + row.id + "]")
            } else {
                href = sprintf(href, row.id);
            }
            linkAs = href;
        }
    }
    return {
        href: href,
        linkAs: linkAs
    }
}