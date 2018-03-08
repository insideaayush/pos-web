import { RSAA } from 'redux-api-middleware';
import {withAuth} from '../reducers'
export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';
export const LOGGED_IN_USER_REQUEST = '@@auth/LOGGED_IN_USER_REQUEST';
export const LOGGED_IN_USER_RECEIVED = '@@auth/LOGGED_IN_USER_RECEIVED';
export const LOGGED_IN_USER_FAILURE = '@@auth/LOGGED_IN_USER_FAILURE';


export const login = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/refresh/',
        method: 'POST',
        body: JSON.stringify({ refresh: token }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
})

export const getLoggedInUser = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/users/' + id + '/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [ 
            LOGGED_IN_USER_REQUEST, LOGGED_IN_USER_RECEIVED, LOGGED_IN_USER_FAILURE
        ]
    }
})



