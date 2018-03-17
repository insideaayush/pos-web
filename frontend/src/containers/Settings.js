import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles';
import {allStores, defaultStore} from '../reducers';
import { getStoreList, setDefaultStore} from '../actions/stores';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

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
            open: false,
            id: '',
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }

    componentDidMount(){
        this.props.getStoreList()
    }

    handleClickOpen(){
        this.setState({
            open: true
        })
    }

    handleChange = event => {
        console.log(event.target.value)
        this.setState({
            id: event.target.value
        })
    };

    handleClose(){
        this.setState({
            open: false
        })
    }

    handleOk(){
        console.log(this.state.id)
        this.props.setDefaultStore(this.state.id)
        this.handleClose()
    }

    render(){
        const {classes} = this.props

        const storeOptions = this.props.stores.map((store) => {
            return (
                <option key={store.id} value={store.id}>{store.name} : {store.location}</option>
            )
        })
        return (
            <div className={classes.root} >
                <Typography variant='title'>
                    Store Details
                </Typography>
                <section className={classes.storeDetail}>
                    Store Name: 
                    <span>
                    {(this.props.defaultStore) ? this.props.defaultStore.name : 'No store set for this client'} <br/>
                    </span>
                    <span>
                    Store Location : 
                    {(this.props.defaultStore) ? this.props.defaultStore.location : 'No store set for this client'}
                    </span>
                </section>
                <div>
                    <Button variant="raised" color="secondary" onClick={this.handleClickOpen}>Set Store Now</Button>
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <DialogTitle>Select the Store</DialogTitle>
                        <DialogContent>
                            <form className={classes.container}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="store-native-simple">Store</InputLabel>
                                    <Select
                                        value={this.state.id}
                                        onChange={this.handleChange}
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
                            <Button onClick={this.handleOk} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stores: allStores(state),
    defaultStore: defaultStore(state),
})

const mapDispatchToProps = (dispatch) => ({
    getStoreList: () => {
        dispatch(getStoreList())
    },
    setDefaultStore: (id) => {
        dispatch(setDefaultStore(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Settings))