import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
import stores, * as fromStores from './stores'
import products, * as fromProducts from './products'
import sales, * as fromSales from './sales'
import customers, * as fromCustomers from './customers'

export default combineReducers({
    auth: auth,
    router: routerReducer,
    products: products,
    sales: sales,
    customers: customers,
    stores: stores,
})

// Auth Helper Functions
export const isAuthenticated =
    state => fromAuth.isAuthenticated(state.auth)
export const accessToken =
    state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired =
    state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken =
    state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired =
    state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors =
    state => fromAuth.errors(state.auth)
export const getUser = 
    state => fromAuth.getUser(state.auth)
export const getUserId =
    state => fromAuth.getUserId(state.auth)


export function withAuth(headers = {}) {
    return (state) => ({
        ...headers,
        'Authorization': `Bearer ${accessToken(state)}`
    })
}

//Products Helper Function
export const allProducts =
    state => fromProducts.allProducts(state.products)

export const isLoadingAllProducts = 
    state => fromProducts.isLoadingAllProducts(state.products)

//Sales Helper Function
export const allSales =
    state => fromSales.allSales(state.sales)

export const isLoadingAllSales =
    state => fromSales.isLoadingAllSales(state.sales)

export const isSaleInProgress =
    state => fromSales.isSaleInProgress(state.sales)

export const isSaleSuccess =
    state => fromSales.isSaleSuccess(state.sales)

export const isSaleRejected =
    state => fromSales.isSaleRejected(state.sales)

export const saleFailError =
    state => fromSales.saleFailError(state.sales)
    

//Stores Helper Function
export const allStores =
    state => fromStores.allStores(state.stores)

export const isLoadingAllStores =
    state => fromStores.isLoadingAllStores(state.stores)

export const defaultStore = 
    state => fromStores.defaultStore(state.stores)

//Customers Helper Function
export const allCustomers =
    state => fromCustomers.allCustomers(state.customers)

export const isLoadingAllCustomers =
    state => fromCustomers.isLoadingAllCustomers(state.customers)

export const currentCustomer =
    state => fromCustomers.currentCustomer(state.customers)

export const isRetrievingCustomer =
    state => fromCustomers.isRetrievingCustomer(state.customers)
