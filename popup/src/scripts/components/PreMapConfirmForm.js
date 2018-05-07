import React from 'react'
import { connect } from 'react-redux'
import { confirmPreMap } from '../actions/imports'

export const PreMapConfirmForm = (props) => {

    // const confirmPreMap = () => {
    //     props.confirmPreMap()
    // }
  
    return (
        <div className="container__centertext">
            <p className="narrative-text">In order to map this form, you need to ensure you have the form pulled up and ready to be edited in the browser. If you don't have the form pulled up in the browser, please do the following:</p>
            <ol className="container__lefttext">
                <li className="narrative-text">Press Escape</li>
                <li className="narrative-text">Navigate to the form in the browser</li>
                <li className="narrative-text">Ensure the form is ready to be edited (e.g. data can be typed into the fields)</li>
                <li className="narrative-text">Reopen Fetch and confirm using the button below</li>
            </ol>
            <p className="narrative-text bold-text add-space">*The form is now showing and editable in my browser.</p>
            <button onClick={props.confirmPreMap}>Confirm</button>
        </div>
    )

}

const mapStateToProps = (state) => ({
    preMapConfirmed: state.imports.preMapConfirmed
})

const mapDispatchToProps = (dispatch) => ({
    confirmPreMap: () => dispatch(confirmPreMap())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreMapConfirmForm)