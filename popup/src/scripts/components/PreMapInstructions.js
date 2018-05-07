import React from 'react'
import { connect } from 'react-redux'
import { setUserIsMappingForm, setUpContextMenus } from '../actions/imports'

export const PreMapInstructions = (props) => {
    const closeWindow = () => {
        props.setUserIsMappingForm(true)
        props.setUpContextMenus()
        window.close()
    }
    return (
        <div className="container__centertext">
            <p className="narrative-text">Alright, you are just about ready to start mapping. Some things to note before you start:</p>
            <ol className="container__lefttext">
                <li className="narrative-text">Clicking the button below will take you back to your form</li>
                <li className="narrative-text">Once on your form, right click on one of the fields you wish to map</li>
                <li className="narrative-text">Select "Fetch" in the menu, then select the appropriate options from there to complete your mapping (note you can map imported fields and default values)</li>
                <li className="narrative-text">Do this (steps 2 and 3) for each field you want to map</li>
                <li className="narrative-text">Once finished, simply reopen Fetch and your mappings will be ready to use in an import</li>
            </ol>
            <button className="add-space" onClick={closeWindow}>Return to Form and Start Mapping</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUserIsMappingForm: (setting) => dispatch(setUserIsMappingForm(setting)),
    setUpContextMenus: () => dispatch(setUpContextMenus())
})

export default connect(undefined, mapDispatchToProps)(PreMapInstructions)