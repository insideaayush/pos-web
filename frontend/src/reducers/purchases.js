import * as purchases from '../actions/purchases'

const initialState = {
    purchases: [],
    loadingAllPurchases: false,
    purchaseInProcess: false,
    lastPurchaseSuccess: false,
    lastPurchaseFailed: false,
    purchaseFailError: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case purchases.GET_ALL_PURCHASES_REQUEST:
            return {
                ...state,
                loadingAllPurchases: true
            }
        case purchases.GET_ALL_PURCHASES_SUCCESS:
            return {
                ...state,
                loadingAllPurchases: false,
                purchases: action.payload
            }
        case purchases.GET_ALL_PURCHASES_FAILURE:
            return {
                ...state,
                loadingAllPurchases: false
            }
        case purchases.POST_PURCHASE_REQUEST:
            return {
                ...state,
                purchaseInProcess: true,
            }
        case purchases.POST_PURCHASE_SUCCESS:
            return {
                ...state,
                purchases: [action.payload, ...state.purchases],
                purchaseInProcess: false,
                lastPurchaseSuccess: true,
            }
        case purchases.POST_PURCHASE_FAILURE:
            return {
                ...state,
                purchaseInProcess: false,
                lastPurchaseFailed: true,
                purchaseFailError: action.error, // TODO: remember to test this
            }
        case purchases.POST_PURCHASE_RESET_VALUES:
            return {
                ...state,
                lastPurchaseFailed: false,
                lastPurchaseSuccess: false,
                purchaseInProcess: false,
                purchaseFailError: null,
            }
        default:
            return state
    }
}

export const allPurchases = (state) => state.purchases
export const isLoadingAllPurchases = (state) => state.loadingAllPurchases
export const isPurchaseInProgress = (state) => state.purchaseInProcess
export const isPurchaseSuccess = (state) => state.lastPurchaseSuccess
export const isPurchaseRejected = (state) => state.lastPurchaseFailed
export const purchaseFailError = (state) => state.purchaseFailError
