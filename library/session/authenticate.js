import axios from 'axios';

import apiConfig from '../../config/api';
import { sendData } from '../api/middleware';
import React from 'react'

export const login = async (data) => {
    let response = sendData(apiConfig.endpoints.login, data);
        if (response.status === 200) {
            setSession(response.data);
        }
        return response;

}

// Sets user details in localStorage
const setSession = (authResult) => {
    console.log(authResult)
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.session.expires_at * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.session.access_token);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('username', authResult.data.username);
    localStorage.setItem('email', authResult.data.email);

    setCookie('access_token', authResult.session.access_token, authResult.session.expires_at)
    setCookie('username', authResult.data.username, authResult.session.expires_at)
    setCookie('email', authResult.data.email, authResult.session.expires_at)
    // navigate to the home route
    console.log(localStorage);
}

const setCookie = (cname, cvalue, expiresAt) => {
    var d = new Date();
    d.setTime(d.getTime() + expiresAt);
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    // navigate to the home route
}

export const getSessionObject = () => {
    if(typeof localStorage === 'undefined') {
        return false;
    }
    try {
        let expiresAt = localStorage.getItem('expires_at');
        return {
            email: localStorage.getItem('email'),
            username: localStorage.getItem('username'),
            access_token: localStorage.getItem('access_token'),
            expires_at: JSON.parse(expiresAt)
        }
    } catch(error) {
        console.error(error);
        return false;
    }
}
// checks if the user is authenticated
export const isAuthenticated = () => {
    // let getAccessToken = getCookie("access_token");
    const sessionObject = getSessionObject();
    if (!sessionObject) {
        return false;
    }
    return new Date().getTime() < sessionObject.expires_at;
}

export const getApiUser = async () => {
    try {
        let data = {
            access_token: getCookie("access_token")
        }
        let response = await axios.post(apiConfig.apiUrl + apiConfig.endpoints.getUser, data );
        console.log(response.data.data.email)
        if (response.status === 200) {
            return response.data.data;
        }
        return false;
    } catch (e) {
        console.log(e)
        return false;
    }
}

