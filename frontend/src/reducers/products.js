import * as products from '../actions/products'

const initialState = {
    loadingAllProducts: false,
    products: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case products.GET_ALL_PRODUCTS_REQUEST:
            return {
                loadingAllProducts: true
            }
        case products.GET_ALL_PRODUCTS_SUCCESS:
            return {
                loadingAllProducts: false,
                products: action.payload
            }
        case products.GET_ALL_PRODUCTS_FAILURE:
            return {
                loadingAllProducts: false
            }
        default:
            return state
    }
}

export const allProducts = (state) => state.products
export const isLoadingAllProducts = (state) => state.loadingAllProducts