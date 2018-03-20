import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_WAREHOUSES_REQUEST = '@@warehouses/GET_ALL_WAREHOUSES_REQUEST';
export const GET_ALL_WAREHOUSES_SUCCESS = '@@warehouses/GET_ALL_WAREHOUSES_SUCCESS';
export const GET_ALL_WAREHOUSES_FAILURE = '@@warehouses/GET_ALL_WAREHOUSES_FAILURE';
export const SET_DEFAULT_WAREHOUSE = '@@warehouses/SET_DEFAULT_WAREHOUSE';

export const getWarehouseList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/warehouses/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_WAREHOUSES_REQUEST, GET_ALL_WAREHOUSES_SUCCESS, GET_ALL_WAREHOUSES_FAILURE
        ]
    }
})

export const setDefaultWarehouse = (id) => ({
    type: SET_DEFAULT_WAREHOUSE,
    payload: {
        id: id
    },
})