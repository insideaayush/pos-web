import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_VENDORS_REQUEST = '@@vendors/GET_ALL_VENDORS_REQUEST';
export const GET_ALL_VENDORS_SUCCESS = '@@vendors/GET_ALL_VENDORS_SUCCESS';
export const GET_ALL_VENDORS_FAILURE = '@@vendors/GET_ALL_VENDORS_FAILURE';
export const POST_VENDOR_REQUEST = '@@vendors/POST_VENDOR_REQUEST';
export const POST_VENDOR_SUCCESS = '@@vendors/POST_VENDOR_SUCCESS';
export const POST_VENDOR_FAILURE = '@@vendors/POST_VENDOR_FAILURE';
export const PATCH_VENDOR_REQUEST = '@@vendors/PATCH_VENDOR_REQUEST';
export const PATCH_VENDOR_SUCCESS = '@@vendors/PATCH_VENDOR_SUCCESS';
export const PATCH_VENDOR_FAILURE = '@@vendors/PATCH_VENDOR_FAILURE';
export const DELETE_VENDOR_REQUEST = '@@vendors/DELETE_VENDOR_REQUEST';
export const DELETE_VENDOR_SUCCESS = '@@vendors/DELETE_VENDOR_SUCCESS';
export const DELETE_VENDOR_FAILURE = '@@vendors/DELETE_VENDOR_FAILURE';
export const RETRIEVE_VENDOR_REQUEST = '@@vendors/RETRIEVE_VENDOR_REQUEST';
export const RETRIEVE_VENDOR_SUCCESS = '@@vendors/RETRIEVE_VENDOR_SUCCESS';
export const RETRIEVE_VENDOR_FAILURE = '@@vendors/RETRIEVE_VENDOR_FAILURE';
export const RESET_CURRENT_VENDOR = '@@vendors/RESET_CURRENT_VENDOR';

export const getVendorsList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/vendors/',
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_VENDORS_REQUEST, GET_ALL_VENDORS_SUCCESS, GET_ALL_VENDORS_FAILURE
        ]
    }
})

export const retrieveVendor = (mobile) => ({
    [RSAA]: {
        endpoint: '/api/v1/vendors/?mobile=' + mobile,
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            RETRIEVE_VENDOR_REQUEST, RETRIEVE_VENDOR_SUCCESS, RETRIEVE_VENDOR_FAILURE
        ]
    }
})

export const createNewVendor = (data) => ({
    [RSAA]: {
        endpoint: '/api/v1/vendors/',
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            POST_VENDOR_REQUEST, POST_VENDOR_SUCCESS, POST_VENDOR_FAILURE
        ]
    }
})

export const editVendorDetail = (id, data) => ({
    [RSAA]: {
        endpoint: '/api/v1/vendors/' + id + '/',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            PATCH_VENDOR_REQUEST, PATCH_VENDOR_SUCCESS, PATCH_VENDOR_FAILURE
        ]
    }
})

export const deleteVendor = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/vendors/' + id + '/',
        method: 'DELETE',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            DELETE_VENDOR_REQUEST,
            {
                type: DELETE_VENDOR_SUCCESS,
                payload: (action, state) => ({ id: id })
            },
            DELETE_VENDOR_FAILURE,
        ]
    }
})

export const clearVendorDetails = () => ({
    type: RESET_CURRENT_VENDOR,
})