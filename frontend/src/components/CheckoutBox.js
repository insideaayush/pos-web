import React from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import {
    Grid, Table, TableHeaderRow
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

const styles = theme => ({
    amountDesc: {
        marginTop: theme.spacing.unit * 2,
        textAlign: 'right',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
})

class CheckoutBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'code', title: 'Product Code' },
                { name: 'product', title: 'Product' },
                { name: 'quantity', title: 'Quantity' },
                { name: 'amount', title: 'Amount' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'quantity', compare: comparePrices },
                { columnName: 'amount', compare: comparePrices },
            ],
            pageSizes: [5, 10, 15, 0],
        }
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
    }

    componentDidMount() {
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

    render() {
        const { columns, pageSizes } = this.state
        const {classes} = this.props
        // const rows = this.loadRowsFromProps()
        const rows = [
            {
                id: 1,
                code: '123141',
                product: 'Iphone',
                amount: 999,
                quantity: 1,
            }
        ]
        return (
            <div>
                <Paper className={classes.paper} style={{ position: 'relative' }}>
                    <Grid rows={rows} columns={columns}>
                        <Table />
                        <TableHeaderRow />
                    </Grid>
                    <div className={classes.amountDesc}>
                        <Typography>
                            Amount: 11000
                            </Typography>
                        <Typography>
                            Tax (GST): 500
                            </Typography>
                        <Typography>
                            CGST: 250
                            </Typography>
                        <Typography>
                            SGST: 250
                            </Typography>
                        <Typography>
                            Total Amount: 13000
                            </Typography>
                    </div>
                    {this.props.loading && <CircularProgress className="loader" />}
                </Paper>
            </div>
        )
    }
}

export default connect( state => ({ loading: false }),null)(withStyles(styles,{withTheme: true})(CheckoutBox));
