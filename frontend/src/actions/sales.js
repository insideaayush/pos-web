import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_SALES_REQUEST = '@@sales/GET_ALL_SALES_REQUEST';
export const GET_ALL_SALES_SUCCESS = '@@sales/GET_ALL_SALES_SUCCESS';
export const GET_ALL_SALES_FAILURE = '@@sales/GET_ALL_SALES_FAILURE';
export const POST_SALE_REQUEST = '@@sales/POST_SALE_REQUEST';
export const POST_SALE_SUCCESS = '@@sales/POST_SALE_SUCCESS';
export const POST_SALE_FAILURE = '@@sales/POST_SALE_FAILURE';
export const POST_SALE_RESET_VALUES = '@@sales/POST_SALE_RESET_VALUES';

// export const PATCH_PRODUCT_REQUEST = '@@products/PATCH_PRODUCT_REQUEST';
// export const PATCH_PRODUCT_SUCCESS = '@@products/PATCH_PRODUCT_SUCCESS';
// export const PATCH_PRODUCT_FAILURE = '@@products/PATCH_PRODUCT_FAILURE';
// export const DELETE_PRODUCT_REQUEST = '@@products/DELETE_PRODUCT_REQUEST';
// export const DELETE_PRODUCT_SUCCESS = '@@products/DELETE_PRODUCT_SUCCESS';
// export const DELETE_PRODUCT_FAILURE = '@@products/DELETE_PRODUCT_FAILURE';

export const getSalesList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/sales/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_SALES_REQUEST, GET_ALL_SALES_SUCCESS, GET_ALL_SALES_FAILURE
        ]
    }
})

export const addSale = (data) => ({
    [RSAA]: {
        endpoint: '/api/v1/sales/',
        method: 'post',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
        types: [
            POST_SALE_REQUEST, POST_SALE_SUCCESS, POST_SALE_FAILURE
        ]
    }
})

export const resetPostSaleValues = () => ({
    type: POST_SALE_RESET_VALUES,
})

