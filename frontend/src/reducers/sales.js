import * as sales from '../actions/sales'

const initialState = {
    sales: [],
    loadingAllSales: false,
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
        default:
            return state
    }
}

export const allSales = (state) => state.sales
export const isLoadingAllSales = (state) => state.loadingAllSales