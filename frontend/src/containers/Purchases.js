import React from 'react';
import { connect } from 'react-redux'
import { getPurchasesList } from '../actions/purchases'
import { getWarehouseList } from '../actions/warehouses'
import { getProductList } from '../actions/products'
import {
    allPurchases, isLoadingAllPurchases, allWarehouses, isLoadingAllWarehouses, allProducts, isLoadingAllProducts
} from '../reducers'
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

const RowDetail = (row, props) => {
    const columns = [
        { name: 'id', title: 'Code' },
        { name: 'product', title: 'Product' },
        { name: 'qty', title: 'Quantity' },
    ]
    let rows = row.products_in_purchase.map((pip) => {
        return {
            id: pip.product,
            product: props.products.filter((product) => product.id !== pip.product)[0].name,
            qty: pip.total_qty,
        }
    })

    const columnWidth = [
        { columnName: 'id', width: 120 },
        { columnName: 'product', width: 240 },
        { columnName: 'qty', width: 120 },
    ]

    return (
        <div><strong>Purchase: Description: </strong>
            <Grid rows={rows} columns={columns}>
                <Table />
                <TableColumnResizing columnWidths={columnWidth} />
                <TableHeaderRow />
            </Grid>
        </div>
    )
};

class PurchaseTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'purchase_id', title: 'PURCHASE ID' },
                { name: 'created', title: 'CREATED ON' },
                { name: 'warehouse', title: 'WAREHOUSE' },
                { name: 'staff', title: 'STAFF' },
                { name: 'vendor', title: 'VENDOR' },
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
        this.props.getPurchasesList()
        this.props.getWarehouseList()
    }

    loadRowsFromProps() {
        if (this.props.purchases) {
            const rows = this.props.purchases.map((purchase) => {
                return {
                    purchase_id: purchase.purchase_id,
                    created: purchase.created_on,
                    warehouse: (this.props.warehouses) ? this.props.warehouses.filter((warehouse) => warehouse.id === purchase.warehouse)[0].name : purchase.warehouse,
                    staff: purchase.staff,
                    vendor: purchase.vendor.name,
                    cgst: purchase.total_tax / 2,
                    sgst: purchase.total_tax / 2,
                    gst: purchase.total_tax,
                    net: purchase.total_amount,
                    cash: (purchase.transaction.all_payments.filter((payment) => payment.method === 'CSH')[0]) ? (purchase.transaction.all_payments.filter((payment) => payment.method === 'CSH')[0]).amount : 0,
                    card: (purchase.transaction.all_payments.filter((payment) => payment.method === 'CRD')[0]) ? (purchase.transaction.all_payments.filter((payment) => payment.method === 'CRD')[0]).amount : 0,
                    wallet: (purchase.transaction.all_payments.filter((payment) => payment.method === 'WAL')[0]) ? (purchase.transaction.all_payments.filter((payment) => payment.method === 'WAL')[0]).amount : 0,
                    upi: (purchase.transaction.all_payments.filter((payment) => payment.method === 'UPI')[0]) ? (purchase.transaction.all_payments.filter((payment) => payment.method === 'UPI')[0]).amount : 0,
                    products_in_purchase: purchase.products_in_purchase,
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
                            contentComponent={({ row }) => RowDetail(row, this.props)}
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
    purchases: allPurchases(state),
    loading: isLoadingAllPurchases(state),
    warehouses: allWarehouses(state),
    loadingWarehouses: isLoadingAllWarehouses(state),
    products: allProducts(state),
    loadingProducts: isLoadingAllProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
    getProductList: () => {
        dispatch(getProductList())
    },
    getPurchasesList: () => {
        dispatch(getPurchasesList())
    },
    getWarehouseList: () => {
        dispatch(getWarehouseList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTable);
