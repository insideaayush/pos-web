import * as warehouses from '../actions/warehouses'

const initialState = {
    warehouses: [],
    loadingAllWarehouses: false,
    defaultWarehouse: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case warehouses.GET_ALL_WAREHOUSES_REQUEST:
            return {
                ...state,
                loadingAllWarehouses: true
            }
        case warehouses.GET_ALL_WAREHOUSES_SUCCESS:
            return {
                ...state,
                loadingAllWarehouses: false,
                warehouses: action.payload
            }
        case warehouses.GET_ALL_WAREHOUSES_FAILURE:
            return {
                ...state,
                loadingAllWarehouses: false
            }
        case warehouses.SET_DEFAULT_WAREHOUSE:
            let defWarehouse = state.warehouses.filter((warehouse) => warehouse.id === Number(action.payload.id))
            return {
                ...state,
                defaultWarehouse: defWarehouse[0],
            }
        default:
            return state
    }
}

export const allWarehouses = (state) => state.warehouses
export const defaultWarehouse = (state) => state.defaultWarehouse
export const isLoadingAllWarehouses = (state) => state.loadingAllWarehouses