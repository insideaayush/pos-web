import React from 'react'
import { connect } from 'react-redux'
import { getProductList } from '../actions/products'
import { allProducts, isLoadingAllProducts } from '../reducers'
import { withStyles } from 'material-ui/styles';

import CheckoutBox from '../components/CheckoutBox'
import ProductPicker from '../components/ProductPicker'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
})
class CashRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rows: [
            ],
            amount: 0,
            tax: 0,
            total: 0,
            tax_slab: [5, 12, 18, 28]
        }
        this.addToCheckout = this.addToCheckout.bind(this) 
        this.handleQuantity = this.handleQuantity.bind(this) 
    }

    addToCheckout = row2add => {
        var add = {
            id: row2add.id,
            code: row2add.code,
            product: row2add.product,
            amount: row2add.mrp,
            quantity: 1,
        }
        
        var need2add = true
        var amount = 0
        var alteredRows = this.state.rows.map((row) => {
            if(row.id == add.id){
                row.quantity = row.quantity + add.quantity;
                need2add = false
            }
            amount = amount + row.quantity * row.amount
            return row
        })
        
        if(need2add){
            alteredRows = [add, ...alteredRows]
            amount = amount + add.quantity * add.amount
        }
        
        
        amount = amount.toFixed(3)
        const tax = (amount * (this.state.tax_slab[0] / 100)).toFixed(3)
        const total = (amount * (1 + this.state.tax_slab[0] / 100)).toFixed(3)
        this.setState({
            rows: alteredRows,
            amount: amount,
            tax: tax,
            total: total
        })
    }

    handleQuantity(id, val){
        var amount = 0
        if(val == 0){
            var alteredRows = this.state.rows.filter((row) => row.id != id)
            alteredRows.map((row) => {
                amount = amount + row.quantity * row.amount
            })
        }
        else {
            var alteredRows = [...this.state.rows]
            alteredRows.map((row) => {
                if(row.id == id){
                    row.quantity = val
                }
                amount = amount + row.quantity * row.amount
            })
        }
        amount = amount.toFixed(3)
        const tax = (amount * (this.state.tax_slab[0]/100)).toFixed(3)
        const total = (amount * (1 + this.state.tax_slab[0]/100)).toFixed(3)
        this.setState({
            rows: alteredRows,
            amount: amount,
            tax: tax,
            total: total
        })

    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Select Products 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography> 
                            Checkout Box
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <ProductPicker
                            products={this.props.products}
                            loading={this.props.loadingProducts}
                            getProductList={this.props.getProductList} 
                            addToCheckout={this.addToCheckout}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CheckoutBox 
                            amount={this.state.amount}
                            tax={this.state.tax}
                            total={this.state.total}
                            handleQuantity={this.handleQuantity} 
                            rows={this.state.rows} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(
    state => ({ products: allProducts(state), loadingProducts: isLoadingAllProducts(state) }),
    { getProductList: getProductList,}
)(withStyles(styles, {withTheme : true})(CashRegister))