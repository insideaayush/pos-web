import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_PRODUCTS_REQUEST = '@@products/GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = '@@products/GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE = '@@products/GET_ALL_PRODUCTS_FAILURE';

export const get = (message) => ({
    [RSAA]: {
        endpoint: '/api/v1/products/',
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE
        ]
    }
})