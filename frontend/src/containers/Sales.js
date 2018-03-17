import React from 'react';
import { connect } from 'react-redux'
import { getSalesList } from '../actions/sales'
import { getStoreList } from '../actions/stores'
import { getProductList } from '../actions/products'
import {
    allSales, isLoadingAllSales, allStores, isLoadingAllStores, allProducts, isLoadingAllProducts } from '../reducers'
import Paper from 'material-ui/Paper'
import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    PagingState, RowDetailState,
    IntegratedPaging,
    TableColumnResizing
} from '@devexpress/dx-react-grid';

import {
    Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, TableRowDetail
} from '@devexpress/dx-react-grid-material-ui'
import { CircularProgress } from 'material-ui/Progress';

const comparePrices = (a, b) => {
    const _a = parseFloat(a)
    const _b = parseFloat(b)
    if (_a === _b) {
        return 0
    }
    return (_a < _b) ? -1 : 1
}

const RowDetail =  (row, props) => {
    const columns = [
        { name: 'id', title: 'Code'},
        { name: 'product', title: 'Product'},
        { name: 'qty', title: 'Quantity'},
    ]
    let rows = row.products_in_sale.map((pis) => {
        return {
            id: pis.product,
            product: props.products.filter((product) => product.id !== pis.product)[0].name,
            qty: pis.total_qty,
        }
    })

    const columnWidth = [
        { columnName: 'id', width: 120},
        { columnName: 'product', width: 240},
        { columnName: 'qty', width: 120},
    ]

    return (
        <div><strong>Sale: Description: </strong>
            <Grid rows={rows} columns={columns}>
                <Table/>
                <TableColumnResizing columnWidths={columnWidth}/>
                <TableHeaderRow />
            </Grid>
        </div>
    )
};

class SaleTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'invoice', title: 'INVOICE ID' },
                { name: 'created', title: 'CREATED ON' },
                { name: 'store', title: 'STORE' },
                { name: 'staff', title: 'STAFF' },
                { name: 'customer', title: 'customer' },
                { name: 'cgst', title: 'CGST' },
                { name: 'sgst', title: 'SGST' },
                { name: 'gst', title: 'GST' },
                { name: 'net', title: 'NET AMOUNT' },
                { name: 'cash', title: 'CASH' },
                { name: 'card', title: 'CARD' },
                { name: 'wallet', title: 'WALLET' },
                { name: 'upi', title: 'UPI' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'cgst', compare: comparePrices },
                { columnName: 'sgst', compare: comparePrices },
                { columnName: 'gst', compare: comparePrices },
                { columnName: 'net', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
    }

    componentDidMount() {
        this.props.getSalesList()
        this.props.getStoreList()
    }

    loadRowsFromProps() {
        console.log(this.props.sales)
        if (this.props.sales) {
            const rows = this.props.sales.map((sale) => {
                return {
                    invoice : sale.invoice_id,
                    created : sale.created_on,
                    store : (this.props.stores) ? this.props.stores.filter((store) => store.id === sale.store)[0].name : sale.store,
                    staff : sale.staff,
                    customer : sale.customer.name,
                    cgst : sale.total_tax/2,
                    sgst : sale.total_tax/2,
                    gst : sale.total_tax,
                    net : sale.total_amount,
                    cash: (sale.transaction.all_payments.filter((payment) => payment.method === 'CSH')[0]) ? (sale.transaction.all_payments.filter((payment) => payment.method === 'CSH')[0]).amount : 0, 
                    card: (sale.transaction.all_payments.filter((payment) => payment.method === 'CRD')[0]) ? (sale.transaction.all_payments.filter((payment) => payment.method === 'CRD')[0]).amount : 0, 
                    wallet: (sale.transaction.all_payments.filter((payment) => payment.method === 'WAL')[0]) ? (sale.transaction.all_payments.filter((payment) => payment.method === 'WAL')[0]).amount : 0, 
                    upi: (sale.transaction.all_payments.filter((payment) => payment.method === 'UPI')[0]) ? (sale.transaction.all_payments.filter((payment) => payment.method === 'UPI')[0]).amount : 0, 
                    products_in_sale: sale.products_in_sale,
                }
            })
            return rows
        }
        return []
    }

    render() {
        const { columns, integratedSortingColumnExtensions, pageSizes } = this.state
        const rows = this.loadRowsFromProps()
        return (
            <div>
                <Paper style={{ position: 'relative' }}>
                    <Grid rows={rows} columns={columns}>
                        <SortingState
                            defaultSorting={[{ columnName: 'created', direction: 'desc' }]}
                        />
                        <IntegratedSorting columnExtensions={integratedSortingColumnExtensions} />
                        <FilteringState defaultFilters={[]} />
                        <IntegratedFiltering />
                        <PagingState
                            defaultCurrentPage={0}
                            defaultPageSize={5}
                        />
                        <IntegratedPaging />
                        <RowDetailState
                            defaultExpandedRowIds={[]}
                        />
                        <Table />
                        <TableHeaderRow showSortingControls />
                        <TableRowDetail
                            contentComponent={({row}) => RowDetail(row, this.props)}
                        />
                        <TableFilterRow />
                        <PagingPanel
                            pageSizes={pageSizes}
                        />
                    </Grid>
                    {this.props.loading && <CircularProgress className="loader" />}
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    sales: allSales(state),
    loading: isLoadingAllSales(state),
    stores: allStores(state),
    loadingStores: isLoadingAllStores(state),
    products: allProducts(state),
    loadingProducts: isLoadingAllProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
    getProductList: () => {
        dispatch(getProductList())
    },
    getSalesList: () => {
        dispatch(getSalesList())
    },
    getStoreList: () => {
        dispatch(getStoreList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleTable);
