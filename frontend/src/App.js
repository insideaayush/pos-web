import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';

import {getUserId, getUser, isAuthenticated} from './reducers'
import {getLoggedInUser} from './actions/auth'

// In-App Routing
import { Route } from 'react-router'
import SideBarItems from './components/SideBarItems'
import Products from './containers/Products'
import Sales from './containers/Sales'
import CashRegister from './containers/CashRegister'
import Settings from './containers/Settings'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '100%',
        marginTop: theme.spacing.unit * 0,
        zIndex: 1,
        overflow: 'hidden',
        flexGrow: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        overflowY: 'scroll',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    title: {
        // flex: 8,
    },
    flex: {
        flex: 2,
    }
});

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <CashRegister />,
        title: () => <span> Add Sale</span>,
    },
    {
        path: "/sale/add",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <CashRegister />,
        title: () => <span> Add Sale</span>,
    },
    {
        path: "/purchase/add",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>purchase/add</h2>,
        title: () => <span> Add a Purchase</span>,
    },
    {
        path: "/products",
        sidebar: () => <div>bubblegum!</div>,
        main: () => <Products edit={true} />,
        title: () => <span> Products</span>,
    },
    {
        path: "/sales",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <Sales />,
        title: () => <span> Sales</span>,
    },
    {
        path: "/purchases",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>purchases</h2>,
        title: () => <span> Purchases</span>,
    },
    {
        path: "/settings",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <Settings />,
        title: () => <span> Settings</span>,
    }
];

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    componentDidMount(){
        if(this.props.user_id){
            this.props.getLoggedInUser(this.props.user_id)
        }
        // console.log(this.props)
    }
    
    componentDidUpdate(){
        // console.log(this.props)
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes.drawerHeader}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            The Country Store
                        </Typography>
                    </Toolbar>
                </div>
                <Divider />
                <SideBarItems handleLogout={this.props.handleLogout.bind(this)} />             
            </div>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.title}
                                    />
                                ))}
                            </Typography>
                            <div>
                                <Typography variant="title" color="inherit">
                                    Hi, {
                                        (this.props.user) ?
                                        this.props.user.first_name : null
                                    }
                                </Typography>
                                <Typography variant="subheading" color="inherit" align='right'>
                                    Sales Person
                                </Typography>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    <main className={classes.content}>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </main>
                </div>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user_id: getUserId(state),
    user: getUser(state),
    isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
    getLoggedInUser: (id) => {
        dispatch(getLoggedInUser(id))
    },
    handleLogout: () => {
        dispatch({
            type: '@@auth/HANDLE_LOGOUT'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));