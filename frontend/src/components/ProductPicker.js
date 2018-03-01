import React from 'react';
import Paper from 'material-ui/Paper'
import { TableRow, TableCell } from 'material-ui/Table'
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
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const comparePrices = (a, b) => {
    const _a = parseFloat(a)
    const _b = parseFloat(b)
    if (_a === _b) {
        return 0
    }
    return (_a < _b) ? -1 : 1
}

const AddCell = (props) => {
    return (
        <TableCell>
            <Button mini aria-label="add">
                <AddIcon /> Add
            </Button>
        </TableCell>
    )
}

const Cell = (props) => {
    if (props.column.name === 'add') {
        return <AddCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const Row = (props) => {
    return (
        <TableRow  onClick={() => props.add(props.row) } key={props.tableRow.key} row={props.row} children={props.children} />
    ) 
}

class ProductPicker extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'code', title: 'Product Code' },
                { name: 'product', title: 'Product' },
                { name: 'mrp', title: 'MRP' },
                { name: 'add', title: 'Action' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'cp', compare: comparePrices },
                { columnName: 'sp', compare: comparePrices },
                { columnName: 'mrp', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
    }

    componentDidMount() {
        this.props.getProductList()
    }

    loadRowsFromProps() {
        if (this.props.products) {
            const rows = this.props.products.map((product) => {
                return {
                    id: product.id,
                    product: product.name,
                    code: product.product_id,
                    mrp: product.max_retail_price,
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
                            defaultSorting={[{ columnName: 'product', direction: 'asc' }]}
                        />
                        <IntegratedSorting columnExtensions={integratedSortingColumnExtensions} />
                        <FilteringState defaultFilters={[]} />
                        <IntegratedFiltering />
                        <PagingState
                            defaultCurrentPage={0}
                            defaultPageSize={5}
                        />
                        <IntegratedPaging />
                        <Table cellComponent={(props) => <Cell {...props}/>} rowComponent={(props) => <Row add={this.props.addToCheckout} {...props} />}/>
                        <TableHeaderRow showSortingControls />
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

export default ProductPicker
