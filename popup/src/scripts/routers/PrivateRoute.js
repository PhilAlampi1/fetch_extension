import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

// ...rest gives the rest of the props that were not destructured
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div className="spacer">
                    <Header />
                    <Component {...props} />
                    <div className="spacer-bottom">
                        <Footer />
                    </div>
                </div>
            ) : (
                    <Redirect to='/' />
                )
        )} />
    )

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.googleId
})

export default connect(mapStateToProps)(PrivateRoute)