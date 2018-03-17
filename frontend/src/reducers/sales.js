import * as sales from '../actions/sales'

const initialState = {
    sales: [],
    loadingAllSales: false,
    saleInProcess: false,
    lastSaleSuccess: false,
    lastSaleFailed: false,
    saleFailError: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case sales.GET_ALL_SALES_REQUEST:
            return {
                ...state,
                loadingAllSales: true
            }
        case sales.GET_ALL_SALES_SUCCESS:
            return {
                ...state,
                loadingAllSales: false,
                sales: action.payload
            }
        case sales.GET_ALL_SALES_FAILURE:
            return {
                ...state,
                loadingAllSales: false
            }
        case sales.POST_SALE_REQUEST:
            return {
                ...state,
                saleInProcess: true,
            }
        case sales.POST_SALE_SUCCESS:
            return {
                ...state,
                sales: [action.payload, ...state.sales],
                saleInProcess: false,
                lastSaleSuccess: true,
            }
        case sales.POST_SALE_FAILURE:
            return {
                ...state,
                saleInProcess: false,
                lastSaleFailed: true,
                saleFailError: action.error, // TODO: remember to test this
            }
        case sales.POST_SALE_RESET_VALUES:
            return {
                ...state,
                lastSaleFailed: false,
                lastSaleSuccess: false,
                saleInProcess: false,
                saleFailError: null,
            }
        default:
            return state
    }
}

export const allSales = (state) => state.sales
export const isLoadingAllSales = (state) => state.loadingAllSales
export const isSaleInProgress = (state) => state.saleInProcess
export const isSaleSuccess = (state) => state.lastSaleSuccess
export const isSaleRejected = (state) => state.lastSaleFailed
export const saleFailError = (state) => state.saleFailError
