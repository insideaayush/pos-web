import React from 'react'
import { connect } from 'react-redux'
import { getProductList } from '../actions/products'
import { retrieveCustomer } from '../actions/customers'
import { allProducts, isLoadingAllProducts, currentCustomer, isRetrievingCustomer } from '../reducers'
import { withStyles } from 'material-ui/styles';

import CheckoutBox from '../components/CheckoutBox'
import ProductPicker from '../components/ProductPicker'
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    addSaleButton : {
        marginTop: theme.spacing.unit * 2,
        float: 'right',
    }
})
class CashRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            mobile: '',
            gender: '',
            rows: [
            ],
            amount: 0,
            tax: 0,
            total: 0,
            payment: {
                cash: 0,
                card: 0,
                wallet: 0,
                upi: 0,
            },
            tax_slab: [5, 12, 18, 28]
        }
        this.addToCheckout = this.addToCheckout.bind(this) 
        this.handleQuantity = this.handleQuantity.bind(this) 
        this.retrieveCustomer = this.retrieveCustomer.bind(this) 
        this.handleChange = this.handleChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    retrieveCustomer = event => {
        this.props.retrieveCustomer(event.target.value)
    }

    componentDidMount(){
        this.props.clearCustomerDetails()
    }

    componentDidUpdate(){
        if(this.props.currentCustomer){
            this.mobileField.value = this.props.currentCustomer.mobile
            this.nameField.click()
            this.nameField.value = this.props.currentCustomer.name
            this.genderField.value = this.props.currentCustomer.gender
            this.genderField.click()
        }
        this.cashField.value = this.state.total
        this.cardField.value = 0
        this.walletField.value = 0
        this.upiField.value = 0
    }

    handleChange =  (type,event) => {
        const card = parseFloat(this.cardField.value)
        const wallet = parseFloat(this.walletField.value)
        const upi = parseFloat(this.upiField.value) 

        this.cashField.value =
            this.state.total - ((card) ? card : 0 
                            + (wallet) ? wallet : 0 
                            + (upi) ? upi : 0
        )
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
            if(row.id === add.id){
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
            total: total,
        })
    }

    handleQuantity(id, val){
        val = parseInt(val, 10)
        id = parseInt(id, 10)
        var amount = 0
        if(val === 0){
            var alteredRows = this.state.rows.filter((row) => row.id !== id)
            alteredRows.map((row) => {
                amount = amount + row.quantity * row.amount
                return row
            })
        }
        else {
            alteredRows = [...this.state.rows]
            alteredRows.map((row) => {
                if(row.id === id){
                    row.quantity = val
                }
                amount = amount + row.quantity * row.amount
                return row
            })
        }
        amount = amount.toFixed(3)
        const tax = (amount * (this.state.tax_slab[0]/100)).toFixed(3)
        const total = (amount * (1 + this.state.tax_slab[0]/100)).toFixed(3)

        this.setState({
            rows: alteredRows,
            amount: amount,
            tax: tax,
            total: total,
        })

    }

    addSale(){
    }

    render(){
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{marginBottom: theme.spacing.unit*2}}>
                            Select Products 
                        </Typography>
                        <ProductPicker
                            products={this.props.products}
                            loading={this.props.loadingProducts}
                            getProductList={this.props.getProductList} 
                            addToCheckout={this.addToCheckout}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Customer Detail
                        </Typography>
                        <Grid container spacing={24} style={{marginBottom: theme.spacing.unit*2}}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='mobile'
                                    label='Mobile'
                                    // placeholder='Enter Mobile'
                                    onBlur={this.retrieveCustomer}
                                    inputRef={(input) => this.mobileField = input}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='name'
                                    label='Full Name'
                                    // placeholder='Enter Name'
                                    inputRef={(input) => this.nameField = input}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name='gender'
                                    label='Gender'
                                    // placeholder='Enter Gender'
                                    inputRef={(input) => this.genderField = input}
                                />
                            </Grid>
                        </Grid>
                        <CheckoutBox 
                            amount={this.state.amount}
                            tax={this.state.tax}
                            total={this.state.total}
                            handleQuantity={this.handleQuantity} 
                            rows={this.state.rows} />
                        <Typography>
                            Payment
                        </Typography>
                        <Grid container spacing={24} style={{ marginBottom: theme.spacing.unit * 2 }}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name='cash'
                                    label='Cash'
                                    onChange={(event) => this.handleChange('PAYMENT_CASH', event)}
                                    inputRef={(input) => this.cashField = input}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name='card'
                                    label='Card'
                                    onChange={(event) => this.handleChange('PAYMEN_CARDT', event)}
                                    inputRef={(input) => this.cardField = input}
                                  />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name='wallet'
                                    label='Wallet'
                                    onChange={(event) => this.handleChange('PAYMENT_WALLET', event)}
                                    inputRef={(input) => this.walletField = input}
                                  />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name='upi'
                                    label='UPI'
                                    onChange={(event) => this.handleChange('PAYMENT_UPI', event)}
                                    inputRef={(input) => this.upiField = input}
                                />
                            </Grid>
                        </Grid>
                        <Button variant="raised" color="secondary" className={classes.addSaleButton}>
                            Add Sale
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: allProducts(state),
    loadingProducts: isLoadingAllProducts(state),
    currentCustomer : currentCustomer(state),
    isRetrievingCustomer : isRetrievingCustomer(state),
})

const mapDispatchToProps = (dispatch) => ({
    getProductList: () => {
        dispatch(getProductList())
    },
    retrieveCustomer: (mobile) => {
        dispatch(retrieveCustomer(mobile))
    },
    clearCustomerDetails: () => {
        dispatch({
            type: 'CLEAR__CURRENT_CUSTOMER_DETAILS'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme : true})(CashRegister))