import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_PRODUCTS_REQUEST = '@@products/GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = '@@products/GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE = '@@products/GET_ALL_PRODUCTS_FAILURE';
export const POST_PRODUCT_REQUEST = '@@products/POST_PRODUCT_REQUEST';
export const POST_PRODUCT_SUCCESS = '@@products/POST_PRODUCT_SUCCESS';
export const POST_PRODUCT_FAILURE = '@@products/POST_PRODUCT_FAILURE';
export const PATCH_PRODUCT_REQUEST = '@@products/PATCH_PRODUCT_REQUEST';
export const PATCH_PRODUCT_SUCCESS = '@@products/PATCH_PRODUCT_SUCCESS';
export const PATCH_PRODUCT_FAILURE = '@@products/PATCH_PRODUCT_FAILURE';
export const DELETE_PRODUCT_REQUEST = '@@products/DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = '@@products/DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = '@@products/DELETE_PRODUCT_FAILURE';

export const getProductList = () => ({
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

export const createNewProduct = (data) => ({
    [RSAA]: {
        endpoint: '/api/v1/products/',
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS, POST_PRODUCT_FAILURE
        ]
    }
})

export const editProductDetail = (id, data) => ({
    [RSAA]: {
        endpoint: '/api/v1/products/' + id + '/',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            PATCH_PRODUCT_REQUEST, PATCH_PRODUCT_SUCCESS, PATCH_PRODUCT_FAILURE
        ]
    }
})

export const deleteProduct = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/products/' + id + '/',
        method: 'DELETE',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            DELETE_PRODUCT_REQUEST, 
            {
                type: DELETE_PRODUCT_SUCCESS,
                payload: (action, state) => ({id: id})
            },
            DELETE_PRODUCT_FAILURE,
        ]
    }
})
