import React from 'react'
import CheckoutBox from '../components/CheckoutBox'
import Products from './Products'
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
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
                        <Products edit={false} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CheckoutBox />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(null, null)(withStyles(styles, {withTheme : true})(CashRegister))