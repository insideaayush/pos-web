import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles';
import {allStores, defaultStore, allWarehouses, defaultWarehouse} from '../reducers';
import { getStoreList, setDefaultStore} from '../actions/stores';
import { getWarehouseList, setDefaultWarehouse} from '../actions/warehouses';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        flexGrow:1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    storeDetail: {
        margin: theme.spacing.unit
    }
})
class Settings extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openStore: false,
            openWarehouse: false,
            id_store: -1,
            id_warehouse: -1,
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }

    componentDidMount(){
        this.props.getStoreList()
        this.props.getWarehouseList()
    }

    handleClickOpen(type){
        if(type === 'STORE'){
            this.setState({
                openStore: true
            })
        }
        else{
            this.setState({
                openWarehouse: true
            })
        }
    }
    
    handleChange = (event, type) => {
        if(type === 'STORE'){
            this.setState({
                id_store: event.target.value
            })
        }
        else {
            this.setState({
                id_warehouse: event.target.value
            })
        }
    };

    handleClose(t){
        this.setState({
            openStore: false,
            openWarehouse: false
        })
    }

    handleOk(type){
        if(type === 'STORE'){
            this.props.setDefaultStore(this.state.id_store)
        }
        else {
            this.props.setDefaultWarehouse(this.state.id_warehouse)
        }
        this.handleClose()
    }

    render(){
        const {classes} = this.props

        const storeOptions = this.props.stores.map((store) => {
            return (
                <option key={store.id} value={store.id}>{store.name} : {store.location}</option>
            )
        })

        const warehouseOptions = this.props.warehouses.map((warehouse) => {
            return (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name} : {warehouse.location}</option>
            )
        })
        return (
            <div className={classes.root} >
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='title'>
                            Store Details
                        </Typography>
                        <section className={classes.storeDetail}>
                            Store Name:
                            <span>
                                {(this.props.defaultStore) ? this.props.defaultStore.name : 'No store set for this client'} <br />
                            </span>
                            <span>
                                Store Location :
                                {(this.props.defaultStore) ? this.props.defaultStore.location : 'No store set for this client'}
                            </span>
                        </section>
                        <div>
                            <Button variant="raised" color="secondary" onClick={() => this.handleClickOpen('STORE')}>Set Store Now</Button>
                            <Dialog
                                disableBackdropClick
                                disableEscapeKeyDown
                                open={this.state.openStore}
                                onClose={this.handleClose}
                            >
                                <DialogTitle>Select the Store</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="store-native-simple">Store</InputLabel>
                                            <Select
                                                value={this.state.id_store}
                                                onChange={(event) => this.handleChange(event, 'STORE')}
                                                input={<Input id="store-native-simple" />}
                                            >
                                                {storeOptions}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                            </Button>
                                    <Button onClick={() => this.handleOk('STORE')} color="primary">
                                        Ok
                            </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='title'>
                            Warehouse Details
                        </Typography>
                        <section className={classes.storeDetail}>
                            Warehouse Name:
                            <span>
                                {(this.props.defaultWarehouse) ? this.props.defaultWarehouse.name: ' No warehouse set for this client'} <br />
                            </span>
                            <span>
                                Warehouse Location :
                                {(this.props.defaultWarehouse) ? this.props.defaultWarehouse.location: ' No warehouse set for this client'}
                            </span>
                        </section>
                        <div>
                            <Button variant="raised" color="secondary" onClick={() => this.handleClickOpen('WAREHOUSE')}>Set Warehouse Now</Button>
                            <Dialog
                                disableBackdropClick
                                disableEscapeKeyDown
                                open={this.state.openWarehouse}
                                onClose={this.handleClose}
                            >
                                <DialogTitle>Select the Warehouse</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="store-native-simple">Store</InputLabel>
                                            <Select
                                                value={this.state.id_warehouse}
                                                onChange={(event) => this.handleChange(event, "WAREHOUSE")}
                                                input={<Input id="store-native-simple" />}
                                            >
                                                {warehouseOptions}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                            </Button>
                                    <Button onClick={() => this.handleOk('WAREHOUSE')} color="primary">
                                        Ok
                            </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stores: allStores(state),
    warehouses: allWarehouses(state),
    defaultStore: defaultStore(state),
    defaultWarehouse: defaultWarehouse(state),
})

const mapDispatchToProps = (dispatch) => ({
    getStoreList: () => {
        dispatch(getStoreList())
    },
    setDefaultStore: (id) => {
        dispatch(setDefaultStore(id))
    },
    getWarehouseList: () => {
        dispatch(getWarehouseList())
    },
    setDefaultWarehouse: (id) => {
        dispatch(setDefaultWarehouse(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Settings))