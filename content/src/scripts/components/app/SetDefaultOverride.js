import React from 'react'
import { connect } from 'react-redux'
import {
    setDefaultOverride,
    toggleConfirmDefaultOverride,
    createUpdateUserFormFieldMappingInDbFromDefaultModal
} from './actions'

const SetDefaultOverride = (props) => {
    const setDefaultOverride = (e) => {
        const newVal = e.target.value === 'true' ? true : false
        console.log('NEWVAL: ', newVal)
        props.setDefaultOverride(newVal)
    }
    const onClickHandler = () => {
        props.toggleModal()
        props.clearDefaultValues()
    }
    const storeInDbAndConfirmDefaultOverride = () => {
        props.toggleConfirmDefaultOverride(!props.defaultOverrideConfirmed)
        props.createUpdateUserFormFieldMappingInDbFromDefaultModal()
        props.toggleModal()
    }
    return (
        <div>
            <span><h1>Fetch</h1></span>
            <p>If this field is mapped to your Import File and you are importing a value for it, do you want to use your default value or the value from your Import File?</p>
            <select className="defaultOverride" onChange={setDefaultOverride} defaultValue={props.enteredDefaultOverride}>
                <option value=''>Select one</option>
                <option value="true">Always use default value</option>
                <option value="false">Use imported value if present</option>
            </select>
            {props.enteredDefaultOverride === null
                ? <p>Please select a value</p>
                : <button onClick={storeInDbAndConfirmDefaultOverride}>Save</button>
            }
            <button onClick={onClickHandler}>Cancel</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    enteredDefaultOverride: state.imports.enteredDefaultOverride,
    defaultOverrideConfirmed: state.imports.defaultOverrideConfirmed
    // defaultModalOverride: state.imports.defaultModalOverride
})

const mapDispatchToProps = (dispatch) => ({
    setDefaultOverride: (newDefaultOverride) => dispatch(setDefaultOverride(newDefaultOverride)),
    toggleConfirmDefaultOverride: (toggleValue) => dispatch(toggleConfirmDefaultOverride(toggleValue)),
    createUpdateUserFormFieldMappingInDbFromDefaultModal: () => dispatch(createUpdateUserFormFieldMappingInDbFromDefaultModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDefaultOverride)