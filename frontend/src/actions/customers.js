import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_CUSTOMERS_REQUEST = '@@customers/GET_ALL_CUSTOMERS_REQUEST';
export const GET_ALL_CUSTOMERS_SUCCESS = '@@customers/GET_ALL_CUSTOMERS_SUCCESS';
export const GET_ALL_CUSTOMERS_FAILURE = '@@customers/GET_ALL_CUSTOMERS_FAILURE';
export const POST_CUSTOMER_REQUEST = '@@customers/POST_CUSTOMER_REQUEST';
export const POST_CUSTOMER_SUCCESS = '@@customers/POST_CUSTOMER_SUCCESS';
export const POST_CUSTOMER_FAILURE = '@@customers/POST_CUSTOMER_FAILURE';
export const PATCH_CUSTOMER_REQUEST = '@@customers/PATCH_CUSTOMER_REQUEST';
export const PATCH_CUSTOMER_SUCCESS = '@@customers/PATCH_CUSTOMER_SUCCESS';
export const PATCH_CUSTOMER_FAILURE = '@@customers/PATCH_CUSTOMER_FAILURE';
export const DELETE_CUSTOMER_REQUEST = '@@customers/DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = '@@customers/DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = '@@customers/DELETE_CUSTOMER_FAILURE';
export const RETRIEVE_CUSTOMER_REQUEST = '@@customers/RETRIEVE_CUSTOMER_REQUEST';
export const RETRIEVE_CUSTOMER_SUCCESS = '@@customers/RETRIEVE_CUSTOMER_SUCCESS';
export const RETRIEVE_CUSTOMER_FAILURE = '@@customers/RETRIEVE_CUSTOMER_FAILURE';
export const RESET_CURRENT_CUSTOMER = '@@customers/RESET_CURRENT_CUSTOMER';

export const getCustomersList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/customers/',
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_CUSTOMERS_REQUEST, GET_ALL_CUSTOMERS_SUCCESS, GET_ALL_CUSTOMERS_FAILURE
        ]
    }
})

export const retrieveCustomer = (mobile) => ({
    [RSAA]: {
        endpoint: '/api/v1/customers/?mobile=' + mobile,
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            RETRIEVE_CUSTOMER_REQUEST, RETRIEVE_CUSTOMER_SUCCESS, RETRIEVE_CUSTOMER_FAILURE
        ]
    }
})

export const createNewCustomer = (data) => ({
    [RSAA]: {
        endpoint: '/api/v1/customers/',
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            POST_CUSTOMER_REQUEST, POST_CUSTOMER_SUCCESS, POST_CUSTOMER_FAILURE
        ]
    }
})

export const editCustomerDetail = (id, data) => ({
    [RSAA]: {
        endpoint: '/api/v1/customers/' + id + '/',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            PATCH_CUSTOMER_REQUEST, PATCH_CUSTOMER_SUCCESS, PATCH_CUSTOMER_FAILURE
        ]
    }
})

export const deleteCustomer = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/customers/' + id + '/',
        method: 'DELETE',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            DELETE_CUSTOMER_REQUEST,
            {
                type: DELETE_CUSTOMER_SUCCESS,
                payload: (action, state) => ({ id: id })
            },
            DELETE_CUSTOMER_FAILURE,
        ]
    }
})

export const clearCustomerDetails = () => ({
    type: RESET_CURRENT_CUSTOMER,
})