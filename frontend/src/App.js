import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';

// In-App Routing
import { Route } from 'react-router'
import SideBarItems from './components/SideBarItems'
import Products from './containers/Products'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '100%',
        marginTop: theme.spacing.unit * 0,
        zIndex: 1,
        overflow: 'hidden',
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
});

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>,
        title: () => <span> Home</span>,
    },
    {
        path: "/sale/add",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>/sale/add</h2>,
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
        main: () => <Products />,
        title: () => <span> Products</span>,
    },
    {
        path: "/sales",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>sales</h2>,
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
        main: () => <h2>settings</h2>,
        title: () => <span> Settings</span>,
    },
    {
        path: "/logout",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>logout</h2>,
        title: () => <span> ''</span>,
    }
];

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

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
                <SideBarItems />             
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
                            <Typography variant="title" color="inherit" noWrap>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.title}
                                    />
                                ))}
                            </Typography>
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

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);