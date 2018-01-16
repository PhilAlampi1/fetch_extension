import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
    <div>
        <h1>Fetch</h1>
        <p>Freedom from data entry.</p>
        <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)