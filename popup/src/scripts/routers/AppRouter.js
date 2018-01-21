import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import LoginPage from '../components/LoginPage'
import MainPage from '../components/MainPage'
// import FormPage from '../components/FormPage'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                {/* <PublicRoute path='/main' exact={true} component={MainPage} /> */}
                <PrivateRoute path='/main' exact={true} component={MainPage} />
                {/* <PrivateRoute path='/formpage' exact={true} component={FormPage} /> */}
                <PublicRoute component={LoginPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter


