import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_PRODUCT_STOCK_LEVEL_REQUEST = '@@productstocklevel/GET_ALL_PRODUCT_STOCK_LEVEL_REQUEST'
export const GET_ALL_PRODUCT_STOCK_LEVEL_SUCCESS = '@@productstocklevel/GET_ALL_PRODUCT_STOCK_LEVEL_SUCCESS'
export const GET_ALL_PRODUCT_STOCK_LEVEL_FAILURE = '@@productstocklevel/GET_ALL_PRODUCT_STOCK_LEVEL_FAILURE'

export const getProductStockLevel = () => ({
    [RSAA]: {
        endpoint: '/api/v1/productstocklevel/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_PRODUCT_STOCK_LEVEL_REQUEST, GET_ALL_PRODUCT_STOCK_LEVEL_SUCCESS, GET_ALL_PRODUCT_STOCK_LEVEL_FAILURE
        ]
    }
})