import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// ...rest gives the rest of the props that were not destructured
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            !isAuthenticated ? (
                <Component {...props} />
            ) :
                (
                    <Redirect to='/main' />
                )
        )} />
    )

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.googleId
})

export default connect(mapStateToProps)(PublicRoute)