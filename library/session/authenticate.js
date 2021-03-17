import React from 'react'
import {setSessionLoginRedirectAction} from "../redux/actions/session-actions";

// Sets user details in localStorage
export const setSession = (authObject) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authObject.session.expires_at * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authObject.session.access_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
}
export const setScraperApiSession = (authObject) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authObject.session.expires_at * 1000) + new Date().getTime());
    localStorage.setItem('scraper_token', authObject.session.access_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
}


// removes user details from localStorage
export const logout = (redirectUrl) => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('scraper_token');
    localStorage.removeItem('expires_at');
    setSessionLoginRedirectAction(redirectUrl);
    localStorage.setItem("redirect_url", redirectUrl);
    console.log(redirectUrl)
}

export const getSessionObject = () => {
    if(typeof localStorage === 'undefined') {
        return false;
    }
    try {
        let expiresAt = localStorage.getItem('expires_at');
        return {
            access_token: localStorage.getItem('access_token'),
            scraper_token: localStorage.getItem('scraper_token'),
            expires_at: JSON.parse(expiresAt)
        }
    } catch(error) {
        console.error(error);
        return false;
    }
}

export const getRouteItem = (items, pageName) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === pageName) {
            return items[i];
        }
        if (typeof items[i].subs !== "undefined") {
            let sub = getRouteItem(items[i].subs, pageName);
            if (typeof sub === "object") {
                return sub;
            }
        }
    }
}

export const checkAccessControl = (routeItem, userData) => {
  let check =  userData.roles.filter((userRole) => {
      let access = routeItem.access_control.filter((routeRole) => userRole === routeRole);
      return access.length > 0;
  })
    return check.length > 0;
};