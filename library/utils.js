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