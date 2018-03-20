import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
import stores, * as fromStores from './stores'
import warehouses, * as fromWarehouses from './warehouses'
import products, * as fromProducts from './products'
import sales, * as fromSales from './sales'
import purchases, * as fromPurchases from './purchases'
import customers, * as fromCustomers from './customers'
import vendors, * as fromVendors from './vendors'

export default combineReducers({
    auth: auth,
    router: routerReducer,
    products: products,
    sales: sales,
    purchases: purchases,
    customers: customers,
    vendors: vendors,
    stores: stores,
    warehouses: warehouses,
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

//Purchases Helper Function
export const allPurchases =
    state => fromPurchases.allPurchases(state.purchases)

export const isLoadingAllPurchases =
    state => fromPurchases.isLoadingAllPurchases(state.purchases)

export const isPurchaseInProgress =
    state => fromPurchases.isPurchaseInProgress(state.purchases)

export const isPurchaseSuccess =
    state => fromPurchases.isPurchaseSuccess(state.purchases)

export const isPurchaseRejected =
    state => fromPurchases.isPurchaseRejected(state.purchases)

export const purchaseFailError =
    state => fromPurchases.purchaseFailError(state.purchases)
    

//Stores Helper Function
export const allStores =
    state => fromStores.allStores(state.stores)

export const isLoadingAllStores =
    state => fromStores.isLoadingAllStores(state.stores)

export const defaultStore = 
    state => fromStores.defaultStore(state.stores)

//Warehouses Helper Function
export const allWarehouses =
    state => fromWarehouses.allWarehouses(state.warehouses)

export const isLoadingAllWarehouses =
    state => fromWarehouses.isLoadingAllWarehouses(state.warehouses)

export const defaultWarehouse = 
    state => fromWarehouses.defaultWarehouse(state.warehouses)

//Customers Helper Function
export const allCustomers =
    state => fromCustomers.allCustomers(state.customers)

export const isLoadingAllCustomers =
    state => fromCustomers.isLoadingAllCustomers(state.customers)

export const currentCustomer =
    state => fromCustomers.currentCustomer(state.customers)

export const isRetrievingCustomer =
    state => fromCustomers.isRetrievingCustomer(state.customers)

    //Vendors Helper Function
export const allVendors =
    state => fromVendors.allVendors(state.vendors)

export const isLoadingAllVendors =
    state => fromVendors.isLoadingAllVendors(state.vendors)

export const currentVendor =
    state => fromVendors.currentVendor(state.vendors)

export const isRetrievingVendor =
    state => fromVendors.isRetrievingVendor(state.vendors)
