import React from 'react'
import { connect } from 'react-redux'
import { getProductList } from '../actions/products'
import { retrieveVendor, clearVendorDetails } from '../actions/vendors'
import { addPurchase, resetPostPurchaseValues } from '../actions/purchases'
import {
    getUser,
    defaultWarehouse,
    allProducts,
    isLoadingAllProducts,
    currentVendor,
    isRetrievingVendor,
    isPurchaseInProgress,
    isPurchaseSuccess,
    isPurchaseRejected,
    purchaseFailError,
} from '../reducers'
import { withStyles } from 'material-ui/styles';
import CheckoutBox from '../components/CheckoutBox'
import ProductPicker from '../components/ProductPicker'
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import PurchaseProgress from '../components/PurchaseProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    addPurchaseButton: {
        marginTop: theme.spacing.unit * 2,
        float: 'right',
    }
})
class PurchaseRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: [
            ],
            amount: 0,
            tax: 0,
            total: 0,
            openPurchaseProgress: false,
            tax_slab: [5, 12, 18, 28]
        }
        this.addToCheckout = this.addToCheckout.bind(this)
        this.handleQuantity = this.handleQuantity.bind(this)
        this.retrieveVendor = this.retrieveVendor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addPurchase = this.addPurchase.bind(this)
        this.openPurchaseDialog = this.openPurchaseDialog.bind(this)
        this.closePurchaseDialog = this.closePurchaseDialog.bind(this)
    }

    retrieveVendor = event => {
        this.props.retrieveVendor(event.target.value)
    }

    componentDidMount() {
        this.props.clearVendorDetails()
        this.props.resetPostPurchaseValues()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentVendor && prevProps.currentVendor !== this.props.currentVendor) {
            this.mobileField.value = this.props.currentVendor.mobile
            this.nameField.click()
            this.nameField.value = this.props.currentVendor.name
        }

        this.cashField.value = this.state.total
        this.cardField.value = 0
        this.walletField.value = 0
        this.upiField.value = 0
    }

    handleChange = (type, event) => {
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
            if (row.id === add.id) {
                row.quantity = row.quantity + add.quantity;
                need2add = false
            }
            amount = amount + row.quantity * row.amount
            return row
        })

        if (need2add) {
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

    handleQuantity(id, val) {
        val = parseInt(val, 10)
        id = parseInt(id, 10)
        var amount = 0
        if (val === 0) {
            var alteredRows = this.state.rows.filter((row) => row.id !== id)
            alteredRows.map((row) => {
                amount = amount + row.quantity * row.amount
                return row
            })
        }
        else {
            alteredRows = [...this.state.rows]
            alteredRows.map((row) => {
                if (row.id === id) {
                    row.quantity = val
                }
                amount = amount + row.quantity * row.amount
                return row
            })
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

    addPurchase() {
        //  Validate that store is given 
        if (this.props.defaultWarehouse === null) {
            alert('Set default warehouse in settings first, then Try again!')
            return;
        }
        this.props.resetPostPurchaseValues()

        const cash = parseFloat(this.cashField.value)
        const card = parseFloat(this.cardField.value)
        const wallet = parseFloat(this.walletField.value)
        const upi = parseFloat(this.upiField.value)
        let all_payments = [
            (cash > 0) ? {
                method: 'CSH',
                amount: cash,
            } : undefined,
            (card > 0) ? {
                method: 'CRD',
                amount: card,
            } : undefined,
            (wallet > 0) ? {
                method: 'WAL',
                amount: wallet,
            } : undefined,
            (upi > 0) ? {
                method: 'UPI',
                amount: upi,
            } : undefined,
        ]

        let data = {
            vendor: (this.props.currentVendor) ? { id: this.props.currentVendor.id } : {
                mobile: this.mobileField.value,
                name: this.nameField.value,
            },
            staff: this.props.staff.id,
            warehouse: this.props.defaultWarehouse.id,
            total_tax: this.state.tax,
            total_amount: this.state.total,
            transaction: {
                all_payments: all_payments.filter((payment) => payment !== undefined)
            },
            products_in_purchase: this.state.rows.map((row) => {
                return {
                    purchase: null,
                    product: row.id,
                    total_qty: row.quantity
                }
            })
        }
        this.openPurchaseDialog()
        console.log(data)
        this.props.addPurchase(data)
    }

    openPurchaseDialog() {
        this.setState({
            openPurchaseProgress: true,
        })
    }

    closePurchaseDialog() {
        this.props.resetPostPurchaseValues()
        this.mobileField.value = ''
        this.nameField.value = ''
        this.setState({
            openPurchaseProgress: false,
            rows: [
            ],
            amount: 0,
            tax: 0,
            total: 0,
        })
    }

    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <PurchaseProgress
                    open={this.state.openPurchaseProgress}
                    handleClose={this.closePurchaseDialog}
                    isPurchaseInProgress={this.props.isPurchaseInProgress}
                    isPurchaseRejected={this.props.isPurchaseRejected}
                    isPurchaseSuccess={this.props.isPurchaseSuccess}
                    purchaseFailError={this.props.purchaseFailError}
                />
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{ marginBottom: theme.spacing.unit * 2 }}>
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
                        <Typography variant='button'>
                            Vendor Detail
                        </Typography>
                        <Grid container spacing={24} style={{ marginBottom: theme.spacing.unit * 2 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography>Mobile</Typography>
                                <TextField
                                    name='mobile'
                                    // label='Mobile'
                                    placeholder='Enter Mobile'
                                    onBlur={this.retrieveVendor}
                                    inputRef={(input) => this.mobileField = input}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Name</Typography>
                                <TextField
                                    name='name'
                                    // label='Full Name'
                                    placeholder='Enter Name'
                                    inputRef={(input) => this.nameField = input}
                                />
                            </Grid>
                        </Grid>
                        <CheckoutBox
                            amount={this.state.amount}
                            tax={this.state.tax}
                            total={this.state.total}
                            handleQuantity={this.handleQuantity}
                            rows={this.state.rows} />
                        <Typography variant='button'>
                            Payment Methods
                        </Typography>
                        <Grid container spacing={24} style={{ marginBottom: theme.spacing.unit * 2 }}>
                            <Grid item xs={12} sm={3}>
                                <Typography>Cash</Typography>
                                <TextField
                                    name='cash'
                                    // label='Cash'
                                    placeholder='Cash'
                                    onChange={(event) => this.handleChange('PAYMENT_CASH', event)}
                                    inputRef={(input) => this.cashField = input}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <   Typography>Card</Typography>
                                <TextField
                                    name='card'
                                    // label='Card'
                                    placeholder='Card'
                                    onChange={(event) => this.handleChange('PAYMENT_CARD', event)}
                                    inputRef={(input) => this.cardField = input}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography>Wallet</Typography>
                                <TextField
                                    name='wallet'
                                    // label='Wallet'
                                    placeholder='Wallet'
                                    onChange={(event) => this.handleChange('PAYMENT_WALLET', event)}
                                    inputRef={(input) => this.walletField = input}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography>UPI</Typography>
                                <TextField
                                    name='upi'
                                    // label='UPI'
                                    placeholder='UPI'
                                    onChange={(event) => this.handleChange('PAYMENT_UPI', event)}
                                    inputRef={(input) => this.upiField = input}
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={this.addPurchase} variant="raised" color="secondary" className={classes.addPurchaseButton}>
                            Add Purchase
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
    currentVendor: currentVendor(state),
    isRetrievingVendor: isRetrievingVendor(state),
    staff: getUser(state),
    defaultWarehouse: defaultWarehouse(state),
    isPurchaseInProgress: isPurchaseInProgress(state),
    isPurchaseSuccess: isPurchaseSuccess(state),
    isPurchaseRejected: isPurchaseRejected(state),
    purchaseFailError: purchaseFailError(state),
})

const mapDispatchToProps = (dispatch) => ({
    getProductList: () => {
        dispatch(getProductList())
    },
    retrieveVendor: (mobile) => {
        dispatch(retrieveVendor(mobile))
    },
    clearVendorDetails: () => {
        dispatch(clearVendorDetails())
    },
    addPurchase: (data) => {
        dispatch(addPurchase(data))
    },
    resetPostPurchaseValues: () => {
        dispatch(resetPostPurchaseValues())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PurchaseRegister))