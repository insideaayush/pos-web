
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import App from './App'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import { Route, Switch } from 'react-router'
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';

import 'typeface-roboto'

const history = createHistory()
const store = configureStore(history)

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/login/" component={Login} />
                <PrivateRoute path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

