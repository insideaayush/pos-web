import React from 'react';
import { connect } from 'react-redux'
import {
    Grid, Table, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui'
import {TableCell} from 'material-ui/Table'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

// Utils
// const comparePrices = (a, b) => {
//     const _a = parseFloat(a)
//     const _b = parseFloat(b)
//     if (_a === _b) {
//         return 0
//     }
//     return (_a < _b) ? -1 : 1
// }

const styles = theme => ({
    amountDesc: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        flex: 1,
        textAlign: 'right'
    },
    leftCol:{
        display: 'inline-block',
        flexDirection: 'row',
        flexGrow: 1,
        textAlign: 'left',
    },
    rightCol:{
        marginLeft: 30,
        display: 'inline-block',
        flexDirection: 'row',
        flexGrow: 1,
        textAlign: 'right',
    },
    paper: {
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
})

const QuantityCell = (props) => {
    return (
        <TableCell>
            <TextField
                name={'quantity-' + props.row.id}
                defaultValue={props.row.quantity.toString()}
                onBlur={props.change_text_field}
            />
        </TableCell>
    )
}

const Cell = (props) => {
    if (props.column.name === 'quantity') {
        return <QuantityCell {...props} />;
    }
    var child_props = {...props}
    delete child_props.change_text_field
    return <Table.Cell {...child_props} />;
};


class CheckoutBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { name: 'code', title: 'Product Code' },
                { name: 'product', title: 'Product' },
                { name: 'quantity', title: 'Quantity' },
                { name: 'amount', title: 'Amount' },
            ]
        }
        this.handleQuantity = this.handleQuantity.bind(this)
    }

    handleQuantity = event => {
        const row_id =  event.target.name.slice(9)
        var value = event.target.value
        value  = (value === '') ? 0 : value
        value = Number(value).toString();
        this.props.handleQuantity(row_id, value)
    };


    render() {
        const { columns } = this.state;
        const { rows, tax, amount, total } = this.props;
        const { classes } = this.props;

        return (
            <div>
                {/* <Paper className={classes.paper} style={{ position: 'relative' }}> */}
                    <Grid rows={rows} columns={columns}>
                        <Table
                            cellComponent={(props) => <Cell change_text_field={this.handleQuantity} {...props}/>}
                        />
                        <TableHeaderRow />
                    </Grid>
                    <div className={classes.amountDesc}>
                        <div className={classes.leftCol}>
                            <Typography variant="button" align='left' >Amount: </Typography>
                            <Typography variant="button" align='left' > Tax (GST): </Typography>
                            <Typography variant="button" align='left' > CGST: </Typography>
                            <Typography variant="button" align='left' > SGST: </Typography>
                            <Typography variant="button" align='left' > Total Amount: </Typography>
                        </div>
                        <div className={classes.rightCol}>
                            <Typography variant="button" align='right'>{amount}</Typography>
                            <Typography variant="button" align='right'>{tax}</Typography>
                            <Typography variant="button" align='right'>{tax/2}</Typography>
                            <Typography variant="button" align='right'>{tax/2}</Typography>
                            <Typography variant="button" align='right'>{total}</Typography>
                        </div>
                    </div>
                    {this.props.loading && <CircularProgress className="loader" />}
                {/* </Paper> */}
            </div>
        )
    }
}

export default connect( state => ({ loading: false }),null)(withStyles(styles,{withTheme: true})(CheckoutBox));
