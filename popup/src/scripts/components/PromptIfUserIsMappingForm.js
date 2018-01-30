import React from 'react'
import { connect } from 'react-redux'
import {
    setUserIsMappingForm,
    setUsersCurrentPageToMainPage,
    removeContextMenus
} from '../actions/imports'

export const PromptIfUserIsMappingForm = (props) => {
    const setUserIsMappingForm = () => {
        props.setUsersCurrentPageToMainPage()
        props.setUserIsMappingForm(false)
        props.removeContextMenus()
    }
    const closeWindow = () => window.close()
    return (
        <div>
            <p>Hey there, are you finished mapping your form?</p>
            <button onClick={closeWindow}>No, take me back</button>
            <button onClick={setUserIsMappingForm}>Yes</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUserIsMappingForm: (setting) => dispatch(setUserIsMappingForm(setting)),
    setUsersCurrentPageToMainPage: () => dispatch(setUsersCurrentPageToMainPage()),
    removeContextMenus: () => dispatch(removeContextMenus())
})

export default connect(undefined, mapDispatchToProps)(PromptIfUserIsMappingForm)