import * as stores from '../actions/stores'

const initialState = {
    stores: [],
    loadingAllStores: false,
    defaultStore: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case stores.GET_ALL_STORES_REQUEST:
            return {
                ...state,
                loadingAllStores: true
            }
        case stores.GET_ALL_STORES_SUCCESS:
            return {
                ...state,
                loadingAllStores: false,
                stores: action.payload
            }
        case stores.GET_ALL_STORES_FAILURE:
            return {
                ...state,
                loadingAllStores: false
            }
        case stores.SET_DEFAULT_STORE:
            let defStore = state.stores.filter((store) => store.id === Number(action.payload.id))
            return {
                ...state,
                defaultStore: defStore[0],
            }
        default:
            return state
    }
}

export const allStores = (state) => state.stores
export const defaultStore = (state) => state.defaultStore
export const isLoadingAllStores = (state) => state.loadingAllStores