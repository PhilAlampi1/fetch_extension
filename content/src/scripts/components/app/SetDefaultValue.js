import React from 'react'
import { connect } from 'react-redux'
import { setDefaultValue, toggleConfirmDefaultValue, setDefaultOverride } from './actions'

const SetDefaultValue = (props) => {
    const setDefaultValue = (e) => {
        e.target.value && props.setDefaultValue(e.target.value)
    }
    const toggleConfirmDefaultValue = () => {
        props.toggleConfirmDefaultValue(!props.defaultValueConfirmed)
    }
    const onClickHandler = () => {
        props.toggleModal()
        props.clearDefaultValues()
    }
    return (
        <div>
            <span><h1>Fetch</h1></span>
            <p>Enter the default value you would like to use for this field below.</p>
            {props.rightClickedFormElementOptions !== null &&
                <select onChange={setDefaultValue} defaultValue={props.enteredDefaultValue}>
                    {props.rightClickedFormElementOptions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
            }
            {(props.rightClickedFormElementType === 'radio' || props.rightClickedFormElementType === 'checkbox') &&
                <select onChange={setDefaultValue} defaultValue={props.enteredDefaultValue}>
                    <option value=''>Select one</option>
                    <option value='selected'>Selected</option>
                    <option value='notselected'>Not selected</option>
                </select>
            }
            {(props.rightClickedFormElementOptions === null && props.rightClickedFormElementType !== 'radio' && props.rightClickedFormElementType !== 'checkbox') &&
                <input
                    type="text"
                    placeholder="Enter default value"
                    onChange={setDefaultValue}
                    defaultValue={props.enteredDefaultValue}
                ></input>
            }
            <br></br>
            {props.enteredDefaultValue
                ? <button onClick={toggleConfirmDefaultValue}>Next</button>
                : <p>Please enter a value</p>
            }
            <button onClick={onClickHandler}>Cancel</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    defaultValueConfirmed: state.imports.defaultValueConfirmed,
    rightClickedFormElementType: state.imports.rightClickedFormElementType,
    rightClickedFormElementValue: state.imports.rightClickedFormElementValue,
    rightClickedFormElementOptions: state.imports.rightClickedFormElementOptions,
    enteredDefaultValue: state.imports.enteredDefaultValue
    // defaultModalValue: state.imports.defaultModalValue
})

const mapDispatchToProps = (dispatch) => ({
    setDefaultValue: (newDefaultValue) => dispatch(setDefaultValue(newDefaultValue)),
    toggleConfirmDefaultValue: (toggleValue) => dispatch(toggleConfirmDefaultValue(toggleValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDefaultValue)