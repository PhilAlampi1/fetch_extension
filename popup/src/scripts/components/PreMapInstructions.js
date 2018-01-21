import React from 'react'
import { connect } from 'react-redux'
import { setUserIsMappingForm } from '../actions/imports'

export const PreMapInstructions = (props) => {
    const closeWindow = () => {
        props.setUserIsMappingForm(true)
        window.close()
    }
    return (
        <div>
            <p>Alright, you are just about ready to start mapping. Some things to note before you start:</p>
            <ol>
                <li>Clicking the button below will take you back to your form</li>
                <li>Once on your form, right click on one of the fields you wish to map</li>
                <li>Select "Fetch Options" in the menu, then select the appropriate options from there to complete your mapping</li>
                <li>Do this (Steps 2 and 3) for each field you want to map</li>
                <li>Once finished, simply reopen Fetch and your mappings will be ready to use in an import</li>
            </ol>
            <button onClick={closeWindow}>Return to Form and Start Mapping</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUserIsMappingForm: (setting) => dispatch(setUserIsMappingForm(setting))
})

export default connect(undefined, mapDispatchToProps)(PreMapInstructions)