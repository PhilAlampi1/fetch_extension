import React from 'react'
import { connect } from 'react-redux'
import { setFillFormFailed } from '../actions/imports'

export class FillForm extends React.Component {
    componentWillUnmount() {
        this.props.setFillFormFailed(false)
    }

    render() {
        return (
            <div className="container__centertext">
                {!this.props.fillFormFailed
                    ? <div>
                        <p className="narrative-text">Just a moment while we populate your form.</p>
                        <p className="narrative-text">Loading...</p>
                    </div>
                    : <p className="narrative-text">Sorry, no form mappings found for this form. Please use the links above to either start over or create your own form mappings.</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fillFormFailed: state.imports.fillFormFailed
})

const mapDispatchToProps = (dispatch) => ({
    setFillFormFailed: (value) => dispatch(setFillFormFailed(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(FillForm)