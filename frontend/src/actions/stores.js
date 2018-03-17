import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_STORES_REQUEST = '@@stores/GET_ALL_STORES_REQUEST';
export const GET_ALL_STORES_SUCCESS = '@@stores/GET_ALL_STORES_SUCCESS';
export const GET_ALL_STORES_FAILURE = '@@stores/GET_ALL_STORES_FAILURE';
export const SET_DEFAULT_STORE = '@@stores/SET_DEFAULT_STORE';

export const getStoreList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/stores/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_STORES_REQUEST, GET_ALL_STORES_SUCCESS, GET_ALL_STORES_FAILURE
        ]
    }
})

export const setDefaultStore = (id) => ({
    type: SET_DEFAULT_STORE,
    payload: {
        id: id
    },
})