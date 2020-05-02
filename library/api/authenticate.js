import axios from 'axios';

import apiConfig from '../../config/api';

export const login = async (data) => {
    try {
        let response = await axios.post(apiConfig.apiUrl + apiConfig.endpoints.login, data );
        if (response.status === 200) {
            setSession(response.data.session);
            setCookie('access_token', response.data.session.access_token, response.data.session.expires_at)
        }
        return response;
    } catch (e) {
        console.log(e)
        return false;
    }
}

// Sets user details in localStorage
const setSession = (authResult) => {
    console.log(authResult);
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expires_at * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    console.log(window.location.href);
    console.log(localStorage);
}
const setCookie = (cname, cvalue, expiresAt) => {
    var d = new Date();
    d.setTime(d.getTime() + expiresAt);
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// removes user details from localStorage
export const logout = () => {
    // Clear access token and ID token from local storage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('expires_at');
    // navigate to the home route
}

// checks if the user is authenticated
export const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    // if(typeof sessionStorage === 'undefined') {
    //     return false;
    // }
    // let expiresAtStorage = sessionStorage.getItem('expires_at');
    // let expiresAt = JSON.parse(expiresAtStorage);
    //
    // return new Date().getTime() < expiresAt;
    let getAccessToken = getCookie("access_token");
    if (getAccessToken === "" || getAccessToken === null) {
        return false;
    }
    return true;
}

export const getApiUser = async () => {
    try {
        let data = {
            access_token: getCookie("access_token")
        }
        let response = await axios.post(apiConfig.apiUrl + apiConfig.endpoints.getUser, data );
        if (response.status === 200) {
            return response.data.data;
        }
        return response;
    } catch (e) {
        console.log(e)
        return false;
    }
}