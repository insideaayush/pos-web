import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_PURCHASES_REQUEST = '@@purchases/GET_ALL_PURCHASES_REQUEST';
export const GET_ALL_PURCHASES_SUCCESS = '@@purchases/GET_ALL_PURCHASES_SUCCESS';
export const GET_ALL_PURCHASES_FAILURE = '@@purchases/GET_ALL_PURCHASES_FAILURE';
export const POST_PURCHASE_REQUEST = '@@purchases/POST_PURCHASE_REQUEST';
export const POST_PURCHASE_SUCCESS = '@@purchases/POST_PURCHASE_SUCCESS';
export const POST_PURCHASE_FAILURE = '@@purchases/POST_PURCHASE_FAILURE';
export const POST_PURCHASE_RESET_VALUES = '@@purchases/POST_PURCHASE_RESET_VALUES';

export const getPurchasesList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/purchases/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_PURCHASES_REQUEST, GET_ALL_PURCHASES_SUCCESS, GET_ALL_PURCHASES_FAILURE
        ]
    }
})

export const addPurchase = (data) => ({
    [RSAA]: {
        endpoint: '/api/v1/purchases/',
        method: 'post',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
        types: [
            POST_PURCHASE_REQUEST, POST_PURCHASE_SUCCESS, POST_PURCHASE_FAILURE
        ]
    }
})

export const resetPostPurchaseValues = () => ({
    type: POST_PURCHASE_RESET_VALUES,
})

