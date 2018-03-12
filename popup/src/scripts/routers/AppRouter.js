import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import LoginPage from '../components/LoginPage'
import MainPage from '../components/MainPage'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PrivateRoute path='/main' exact={true} component={MainPage} />
                <PublicRoute component={LoginPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter


