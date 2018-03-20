import * as vendors from '../actions/vendors'
import * as purchases from '../actions/purchases'

const initialState = {
    vendors: [],
    loadingAllVendors: false,
    currentVendor: null,
    isRetrievingVendor: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case vendors.GET_ALL_VENDORS_REQUEST:
            return {
                ...state,
                loadingAllVendors: true
            }
        case vendors.GET_ALL_VENDORS_SUCCESS:
            return {
                ...state,
                loadingAllVendors: false,
                vendors: action.payload
            }
        case vendors.GET_ALL_VENDORS_FAILURE:
            return {
                ...state,
                loadingAllVendors: false
            }

        case vendors.POST_VENDOR_REQUEST:
            return {
                ...state,
                loadingAllVendors: true
            }
        case vendors.POST_VENDOR_SUCCESS:
            return {
                customers: [...state.vendors, action.payload],
                loadingAllVendors: false,
            }
        case vendors.POST_VENDOR_FAILURE:
            return {
                ...state,
                loadingAllVendors: false,
            }

        case vendors.PATCH_VENDOR_REQUEST:
            return {
                ...state,
                loadingAllVendors: true,
            }
        case vendors.PATCH_VENDOR_SUCCESS:
            const vendor_list = state.vendors.filter((vendor) => vendor.id !== action.payload.id)
            return {
                ...state,
                customers: [...vendor_list, action.payload],
                loadingAllVendors: false,
            }
        case vendors.PATCH_VENDOR_FAILURE:
            return {
                ...state,
                loadingAllVendors: false,
            }

        case vendors.DELETE_VENDOR_REQUEST:
            return {
                ...state,
                loadingAllVendors: true,
            }
        case vendors.DELETE_VENDOR_SUCCESS:
            return {
                ...state,
                vendors: state.vendors.filter((vendor) => vendor.id !== action.payload.id),
                loadingAllVendors: false,
            }
        case vendors.DELETE_VENDOR_FAILURE:
            return {
                ...state,
                loadingAllVendors: false,
            }
        case vendors.RETRIEVE_VENDOR_REQUEST:
            return {
                ...state,
                retrievingVendor: true,
            }
        case vendors.RETRIEVE_VENDOR_SUCCESS:
            return {
                ...state,
                currentVendor: action.payload[0],
                retrievingVendor: false,
            }
        case vendors.RETRIEVE_VENDOR_FAILURE:
            return {
                ...state,
                retrievingVendor: false,
            }
        case purchases.POST_PURCHASE_RESET_VALUES:
            return {
                ...state,
                currentVendor: null,
            }

        default:
            return state
    }
}

export const allVendors = (state) => state.vendors
export const isLoadingAllVendors = (state) => state.loadingAllVendors
export const currentVendor = (state) => state.currentVendor
export const isRetrievingVendor = (state) => state.retrievingVendor
