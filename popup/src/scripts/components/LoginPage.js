import React from 'react'
import { connect } from 'react-redux'
// import { Route, Redirect } from 'react-router-dom'
import { startLogin } from '../actions/auth'
import TermsPage from './TermsPage'

export class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTermsPage: false
        }
    }

    toggleShowTermsPage = () => {
        console.log('here')
        this.setState((prevState) => ({
            showTermsPage: !prevState.showTermsPage
        }))
    }

    render() {
        return (
            <div>
                {(!this.state.showTermsPage)
                    ?
                    <div className="box-layout" >
                        <div className="box-layout__box">
                            <h1 className="box-layout__title">Fetch</h1>
                            <div className="box-layout__subtext">Freedom from data entry</div>
                            <button onClick={this.props.startLogin}>Login with Google</button>
                            <p className="box-layout__footertext box-layout__disclaimer">By logging in, you agree to the terms and privacy statement linked below.</p>
                            <div className="box-layout__footer">
                                <div className="box-layout__footertext">&copy; Idea Fusion, Inc.</div>
                                <div className="box-layout__footertext">{chrome.runtime.getManifest().version}</div>
                                <button className="link-button-light box-layout__footertext" onClick={this.toggleShowTermsPage}>terms &#38; privacy</button>
                            </div>
                        </div>
                        <div className="spacer">&nbsp;</div>
                    </div>
                    :
                    <TermsPage toggle={this.toggleShowTermsPage} />
                }
                <div>&nbsp;</div>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)