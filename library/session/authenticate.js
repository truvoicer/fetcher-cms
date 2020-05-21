import axios from 'axios';

import apiConfig from '../../config/api-config';
import { sendData } from '../api/middleware';
import React from 'react'

export const getToken = async (data) => {
    return axios.post(apiConfig.apiUrl + apiConfig.endpoints.login, data);
}

// Sets user details in localStorage
export const setSession = (authObject) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authObject.session.expires_at * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authObject.session.access_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    console.log(localStorage);
}


// removes user details from localStorage
export const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
}

export const getSessionObject = () => {
    if(typeof localStorage === 'undefined') {
        return false;
    }
    try {
        let expiresAt = localStorage.getItem('expires_at');
        return {
            access_token: localStorage.getItem('access_token'),
            expires_at: JSON.parse(expiresAt)
        }
    } catch(error) {
        console.error(error);
        return false;
    }
}

export const getApiUser = async () => {
        return await axios.post(apiConfig.apiUrl + apiConfig.endpoints.getUser, getSessionObject("access_token") );
}

