import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'

// Icons
import ListIcon from 'material-ui-icons/List';
import MoneyIcon from 'material-ui-icons/AttachMoney';
import ShopIcon from 'material-ui-icons/Shop';
import PurchaseIcon from 'material-ui-icons/ShoppingCart';
import ShoppingBasketIcon from 'material-ui-icons/ShoppingBasket';
import SettingsIcon from 'material-ui-icons/Settings';
import LogoutIcon from 'material-ui-icons/ExitToApp';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    list :{
        textDecoration: "none"
    }
});

const sidebarItems = {
    primary: [
        {
            text: 'Add Sale',
            icon: <ShopIcon />,    
            url: '/sale/add',
        },
        {
            text: 'Add Purchase',
            icon: <ShoppingBasketIcon />,
            url: '/purchase/add',
        },
        {
            text: 'All Products',
            icon: <ListIcon />,
            url: '/products',
        },
        {
            text: 'All Sales',
            icon: <MoneyIcon />,
            url: '/sales',
        },
        {
            text: 'All Purchases',
            icon: <PurchaseIcon />,
            url: '/purchases',
        },
    ],
    secondary: [
        {
            text: 'Settings',
            icon: <SettingsIcon />, 
            url: '/settings',
        },
        {
            text: 'Logout',
            icon: <LogoutIcon />,
            url: '/logout',
        }
    ]

}

function SimpleList(props) {
    const { classes } = props;
    const primaryList  = sidebarItems.primary.map((item, index) => {
        return (
            <Link to={item.url} key={index}>
                <ListItem button>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            </Link>
        )
    })
    
    const secondaryList  = sidebarItems.secondary.map((item, index) => {
        return (
            <Link to={item.url} key={index} className={classes.list}>
                <ListItem button>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            </Link>
        )
    })

    return (
        <div className={classes.root}>
            <List component="nav">
                {primaryList}
            </List>
            <Divider />
            <List component="nav">
                {secondaryList}
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
