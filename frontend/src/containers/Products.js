import React from 'react';
import { connect } from 'react-redux'
import { get } from '../actions/products'
import { allProducts, isLoadingAllProducts } from '../reducers'
import Paper from 'material-ui/Paper'
import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    PagingState,
    IntegratedPaging,
    RowDetailState,
    EditingState,
} from '@devexpress/dx-react-grid';

import {
    Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, TableRowDetail, TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

const comparePrices = (a,b) => {
    const _a = parseFloat(a)
    const _b = parseFloat(b)
    if(_a === _b){
        return 0
    }
    return (_a < _b) ? -1 : 1
}

const RowDetail = ({ row }) => (
    <div><strong>Description: </strong>{row.description}</div>
);

class ProductTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'product', title: 'Product' },
                { name: 'code', title: 'Product Code' },
                { name: 'price', title: 'Price' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'price', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
        this.commitChanges = this.commitChanges.bind(this);
    }

    componentDidMount() {
        this.props.fetchProducts()
    }

    loadRowsFromProps() {
        if (this.props.products) {
            const rows = this.props.products.map((product) => {
                return {
                    product: product.name,
                    code: product.product_id,
                    price: product.retail_price,
                    description: product.description,
                }
            })
            return rows
        }
        return []
    }

    commitChanges({ added, changed, deleted }) {
        var rows  = this.loadRowsFromProps();
        if (added) {
            const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
    }

    render() {
        const { columns, integratedSortingColumnExtensions, pageSizes } = this.state
        const rows = this.loadRowsFromProps()
        return (
            <div>
                <Paper style={{ position: 'relative' }}>
                    <Grid rows={rows} columns={columns}>
                        <SortingState
                            defaultSorting={[{ columnName: 'product', direction: 'asc' }]}
                        />
                        <IntegratedSorting columnExtensions={integratedSortingColumnExtensions}/>
                        <FilteringState defaultFilters={[]}/>
                        <IntegratedFiltering/>
                        <PagingState
                            defaultCurrentPage={0}
                            defaultPageSize={5}
                        />
                        <IntegratedPaging />
                        <RowDetailState
                            defaultExpandedRowIds={[]}
                        />
                        <EditingState
                            onCommitChanges={this.commitChanges}
                        />
                        <Table />
                        <TableHeaderRow showSortingControls />
                        <TableRowDetail
                            contentComponent={RowDetail}
                        />
                        <TableEditRow />
                        <TableEditColumn
                            showAddCommand
                            showEditCommand
                            showDeleteCommand
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

export default connect(
    state => ({ products: allProducts(state), loading: isLoadingAllProducts(state) }),
    { fetchProducts: get }
)(ProductTable);
