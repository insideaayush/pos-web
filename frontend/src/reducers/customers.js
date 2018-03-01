import * as customers from '../actions/customers'

const initialState = {
    customers: [],
    loadingAllCustomers: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case customers.GET_ALL_CUSTOMERS_REQUEST:
            return {
                ...state,
                loadingAllCustomers: true
            }
        case customers.GET_ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loadingAllCustomers: false,
                customers: action.payload
            }
        case customers.GET_ALL_CUSTOMERS_FAILURE:
            return {
                ...state,
                loadingAllCustomers: false
            }

        case customers.POST_CUSTOMER_REQUEST:
            return {
                ...state,
                loadingAllCustomers: true
            }
        case customers.POST_CUSTOMER_SUCCESS:
            return {
                customers: [...state.customers, action.payload],
                loadingAllCustomers: false,
            }
        case customers.POST_CUSTOMER_FAILURE:
            return {
                ...state,
                loadingAllCustomers: false,
            }

        case customers.PATCH_CUSTOMER_REQUEST:
            return {
                ...state,
                loadingAllCustomers: true,
            }
        case customers.PATCH_CUSTOMER_SUCCESS:
            const customer_list = state.customers.filter((customer) => customer.id !== action.payload.id)
            return {
                ...state,
                customers: [...customer_list, action.payload],
                loadingAllCustomers: false,
            }
        case customers.PATCH_CUSTOMER_FAILURE:
            return {
                ...state,
                loadingAllCustomers: false,
            }

        case customers.DELETE_CUSTOMER_REQUEST:
            return {
                ...state,
                loadingAllCustomers: true,
            }
        case customers.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: state.customers.filter((customer) => customer.id !== action.payload.id),
                loadingAllCustomers: false,
            }
        case customers.DELETE_CUSTOMER_FAILURE:
            return {
                ...state,
                loadingAllCustomers: false,
            }

        default:
            return state
    }
}

export const allCustomers = (state) => state.customers
export const isLoadingAllCustomers = (state) => state.loadingAllCustomers