import * as productstocklevel from '../actions/productstocklevel'

const initialState = {
    productstocklevel: [],
    loadingStockLevel: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case productstocklevel.GET_ALL_PRODUCT_STOCK_LEVEL_REQUEST:
            return {
                ...state,
                loadingStockLevel: true
            }
        case productstocklevel.GET_ALL_PRODUCT_STOCK_LEVEL_SUCCESS:
            return {
                ...state,
                productstocklevel: action.payload,
                loadingStockLevel: false,
            }
        case productstocklevel.GET_ALL_PRODUCT_STOCK_LEVEL_FAILURE:
            return{
                ...state,
                loadingStockLevel: false
            }
        default:
            return state;
    }
}

export const stockLevels = (state) => state.productstocklevel
export const loadingStockLevels = (state) => state.loadingStockLevel
