import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
// import {CircularProgress} from 'material-ui/Progress'
import Ionicon from 'react-ionicons'
import { Typography } from 'material-ui';

class PurchaseProgress extends React.Component {
    render() {
        const { fullScreen } = this.props;
        const purchaseInProgress = (
            <div>
                <Ionicon icon="ios-refresh" fontSize="60px" color="#347eff" rotate={true} />
                <span>Your purchase is in Progress</span>
            </div>
        )
        const purchaseCompleted = (
            <div>
                {
                    (this.props.isPurchaseSuccess) ?
                        <div style={{ alignText: 'center' }}>
                            <Ionicon icon="md-checkmark" fontSize="60px" color="#4CAF50" beat={true} />
                            <Typography>Purchase was Successful</Typography>
                        </div>
                        : null
                }
                {
                    (this.props.isPurchaseRejected) ?
                        <span>Purchase was Rejected.<br /> {this.props.PurchaseFailError}</span>
                        : null
                }
            </div>
        )

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Purchase"}</DialogTitle>
                    <DialogContent>
                        {(this.props.isPurchaseInProgress) ? purchaseInProgress : purchaseCompleted}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary" autoFocus>
                            Print Invoice
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PurchaseProgress.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(PurchaseProgress);