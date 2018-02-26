import * as products from '../actions/products'

const initialState = {
    products: [],
    loadingAllProducts: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case products.GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loadingAllProducts: true
            }
        case products.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loadingAllProducts: false,
                products: action.payload
            }
        case products.GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                loadingAllProducts: false
            }

        case products.POST_PRODUCT_REQUEST:
            return {
                ...state,
                loadingAllProducts: true
            }
        case products.POST_PRODUCT_SUCCESS:
            return {
                products: [...state.products, action.payload],
                loadingAllProducts: false,
            }
        case products.POST_PRODUCT_FAILURE:
            return {
                ...state,
                loadingAllProducts: false,
            }

        case products.PATCH_PRODUCT_REQUEST:
            return {
                ...state,
                loadingAllProducts: true,
            }
        case products.PATCH_PRODUCT_SUCCESS:
            const product_list = state.products.filter((product) => product.id !== action.payload.id)
            return {
                ...state,
                products: [...product_list, action.payload],
                loadingAllProducts: false,
            }
        case products.PATCH_PRODUCT_FAILURE:
            return {
                ...state,
                loadingAllProducts: false,
            }
            
        case products.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loadingAllProducts: true,
            }
        case products.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload.id),
                loadingAllProducts: false,
            }
        case products.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loadingAllProducts: false,
            }
            
        default:
            return state
    }
}

export const allProducts = (state) => state.products
export const isLoadingAllProducts = (state) => state.loadingAllProducts