import React from 'react';
import { connect } from 'react-redux'
import { getProductStockLevel } from '../actions/productstocklevel'
import {
    stockLevels, loadingStockLevels
} from '../reducers'
import Paper from 'material-ui/Paper'
import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    PagingState,
    IntegratedPaging,
    GroupingState,
    IntegratedGrouping,
} from '@devexpress/dx-react-grid';

import {
    Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, GroupingPanel, TableGroupRow,
    DragDropProvider, Toolbar, TableColumnReordering, TableColumnVisibility, ColumnChooser
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

class SaleTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                // { name: 'stock_id', title: 'stock_id' },
                { name: 'product_id', title: 'product_id' },
                { name: 'product', title: 'product' },
                { name: 'store', title: 'store' },
                { name: 'warehouse', title: 'warehouse' },
                { name: 'quantity', title: 'quantity' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'quantity', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
    }

    componentDidMount() {
        this.props.getProductStockLevel()
    }

    loadRowsFromProps() {
        if (this.props.stockLevels) {
            const rows = this.props.stockLevels.map((stock) => {
                return {
                    stock_id: stock.id,
                    product_id: stock.product.product_id,
                    product: stock.product.name,
                    store: (stock.store) ? stock.store.name : 'N/A',
                    warehouse: (stock.warehouse) ? stock.warehouse.name : 'N/A',
                    quantity: stock.quantity,
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
                        <FilteringState defaultFilters={[]} />
                        <SortingState
                            defaultSorting={[{ columnName: 'quantity', direction: 'desc' }]}
                        />
                        <GroupingState defaultGrouping={[ ]} />
                        <PagingState
                            defaultCurrentPage={0}
                            defaultPageSize={5}
                        />
                        <IntegratedGrouping />
                        <IntegratedFiltering />
                        <IntegratedSorting columnExtensions={integratedSortingColumnExtensions} />
                        <IntegratedPaging />
                        <DragDropProvider />
                        <Table />
                        <TableColumnReordering />
                        <TableHeaderRow showSortingControls />
                        <TableFilterRow />
                        <PagingPanel
                            pageSizes={pageSizes}
                        />
                        <TableGroupRow />
                        <TableColumnVisibility />
                        <Toolbar />
                        <GroupingPanel showSortingControls/>
                        <ColumnChooser />
                    </Grid>
                    {this.props.loading && <CircularProgress className="loader" />}
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stockLevels: stockLevels(state),
    loading: loadingStockLevels(state),
})

const mapDispatchToProps = (dispatch) => ({
    getProductStockLevel: () => {
        dispatch(getProductStockLevel())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleTable);
