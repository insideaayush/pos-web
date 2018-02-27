import React from 'react';
import { connect } from 'react-redux'
import { createNewProduct, editProductDetail, getProductList, deleteProduct } from '../actions/products'
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
            columnsSale: [
                { name: 'code', title: 'Product Code' },
                { name: 'product', title: 'Product' },
                { name: 'mrp', title: 'MRP' },
            ],
            columns: [
                { name: 'code', title: 'Product Code' },
                { name: 'product', title: 'Product' },
                { name: 'category', title: 'Category' },
                { name: 'brand', title: 'Brand' },
                { name: 'size', title: 'Size' },
                { name: 'color', title: 'Color' },
                { name: 'design', title: 'Design' },
                { name: 'quality', title: 'Quality' },
                { name: 'cp', title: 'Cost Price' },
                { name: 'sp', title: 'Selling Price' },
                { name: 'mrp', title: 'MRP' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'cp', compare: comparePrices },
                { columnName: 'sp', compare: comparePrices },
                { columnName: 'mrp', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
        this.commitChanges = this.commitChanges.bind(this);
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
                    description: product.description,
                    category: product.category,
                    brand: product.brand,
                    size: product.size,
                    color: product.color,
                    design: product.design,
                    quality: product.quality,
                    cp: product.cost_price,
                    sp: product.selling_price,
                    mrp: product.max_retail_price,
                }
            })
            return rows
        }
        return []
    }

    commitChanges({ added, changed, deleted }) {
        var rows  = this.loadRowsFromProps();
        if (added) {
            added = added[0]
            const data = {
                name : (added.product) ? (added.product) : null,
                product_id : (added.code) ? (added.code) : null,
                description : (added.description) ? (added.description) : null,
                category : (added.category) ? (added.category) : null,
                brand : (added.brand) ? (added.brand) : null,
                size : (added.size) ? (added.size) : null,
                color : (added.color) ? (added.color) : null,
                design : (added.design) ? (added.design) : null,
                quality : (added.quality) ? (added.quality) : null,
                cost_price : (added.cp) ? (added.cp) : null,
                selling_price : (added.sp) ? (added.sp) : null,
                max_retail_price : (added.mrp) ? (added.mrp) : null,
            }
            this.props.createNewProduct(data)
        }
        if (changed) {
            rows = rows.map((row, index) =>{
                if(changed[index]){
                    let data = Object.assign({}, 
                        (changed[index].product) ? { name: changed[index].product} : undefined,
                        (changed[index].code) ? { product_id: changed[index].code} : undefined,
                        (changed[index].description) ? { description: changed[index].description} : undefined,
                        (changed[index].category) ? { category: changed[index].category } : undefined,
                        (changed[index].brand) ? { brand: changed[index].brand} : undefined,
                        (changed[index].size) ? { size: changed[index].size} : undefined,
                        (changed[index].color) ? { color: changed[index].color} : undefined,
                        (changed[index].design) ? { design: changed[index].design} : undefined,
                        (changed[index].quality) ? { quality: changed[index].quality} : undefined,
                        (changed[index].cp) ? { cost_price: changed[index].cp} : undefined,
                        (changed[index].sp) ? { selling_price: changed[index].sp} : undefined,
                        (changed[index].mrp) ? { max_retail_price: changed[index].mrp} : undefined,
                    )
                    this.props.editProductDetail(row.id,data)
                }
                return row
            })
        }
        if (deleted) {
            deleted = deleted.map((id) => rows[id].id)
            deleted.forEach(element => {
                this.props.deleteProduct(element)
            });
        }
    }

    render() {
        const { columnsSale, columns, integratedSortingColumnExtensions, pageSizes } = this.state
        const rows = this.loadRowsFromProps()
        return (
            <div>
                <Paper style={{ position: 'relative' }}>
                    <Grid rows={rows} columns={this.props.edit ? columns : columnsSale}>
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
                        {(this.props.edit) ?
                            <EditingState
                                onCommitChanges={this.commitChanges}
                            />
                            : null
                        }
                        <Table/>
                        <TableHeaderRow showSortingControls />
                        <TableRowDetail
                            contentComponent={RowDetail}
                        />
                        {(this.props.edit) ? 
                            <TableEditRow />
                            : null
                        }
                        {(this.props.edit) ? 
                            <TableEditColumn
                                showAddCommand
                                showEditCommand
                                showDeleteCommand
                            />
                            : null
                        }
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
    { 
        getProductList: getProductList, 
        editProductDetail: editProductDetail, 
        createNewProduct: createNewProduct,
        deleteProduct: deleteProduct,
    
    }
)(ProductTable);
