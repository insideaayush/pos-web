import React from 'react';
import { connect } from 'react-redux'
import { getSalesList } from '../actions/sales'
import { allSales, isLoadingAllSales } from '../reducers'
import Paper from 'material-ui/Paper'
import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    PagingState,
    IntegratedPaging,
    RowDetailState,
} from '@devexpress/dx-react-grid';

import {
    Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, TableRowDetail,
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

const RowDetail = row => {
    console.log(row)
    return (
        <div>
            {row.products_in_sale}
        </div>
    )
}

class SalesTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'invoice_no', title: 'Invoice' },
                { name: 'date', title: 'Date' },
                { name: 'customer', title: 'Customer' },
                { name: 'staff', title: 'Staff' },
                { name: 'store', title: 'Store' },
                { name: 'cgst', title: 'CGST' },
                { name: 'sgst', title: 'SGST' },
                { name: 'gst', title: 'GST' },
                { name: 'amount', title: 'Total Amount' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'cgst', compare: comparePrices },
                { columnName: 'sgst', compare: comparePrices },
                { columnName: 'gst', compare: comparePrices },
                { columnName: 'amount', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
    }

    componentDidMount() {
        this.props.getSalesList()
    }

    loadRowsFromProps() {
        if (this.props.sales) {
            const rows = this.props.sales.map((sale) => {
                return {
                    invoice_no : sale.invoice_id,
                    date : sale.created_on,
                    customer : sale.customer,
                    staff : sale.staff,
                    store : sale.store,
                    cgst : sale.total_tax/2,
                    sgst: sale.total_tax / 2,
                    gst: sale.total_tax,
                    amount : sale.total_amount,
                    products_in_sale: sale.products_in_sale,
                    transaction: sale.transaction
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
                            defaultSorting={[{ columnName: 'invoice_no', direction: 'desc' }]}
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
                            contentComponent={RowDetail}
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
    loading: isLoadingAllSales(state)
})

const mapDispatchToProps = (dispatch) => ({
    getSalesList: () => {
        dispatch(getSalesList())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable);
