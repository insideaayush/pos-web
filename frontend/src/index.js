
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import { Route, Switch } from 'react-router'
import PrivateRoute from './containers/PrivateRoute';
import './index.css';
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.css';

// Apps
import App from './App'
import Login from './containers/Login';

const history = createHistory()
const store = configureStore(history)

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/login/" component={Login} />
                <PrivateRoute path="/" component={App}/>
                <PrivateRoute component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

