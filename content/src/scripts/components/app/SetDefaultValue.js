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
        <div className="fetch-container">
            <h1 className="fetch-h1-style">Fetch</h1>
            <p className="fetch-narrative-text">Enter the default value you would like to use for this field below.</p>
            {props.rightClickedFormElementOptions !== null &&
                <select className="fetch-font" onChange={setDefaultValue} defaultValue={props.enteredDefaultValue}>
                    {props.rightClickedFormElementOptions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
            }
            {(props.rightClickedFormElementType === 'radio' || props.rightClickedFormElementType === 'checkbox') &&
                <select className="fetch-font" onChange={setDefaultValue} defaultValue={props.enteredDefaultValue}>
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
                    className="fetch-font"
                ></input>
            }
            <br></br>
            {props.enteredDefaultValue === null
                ? <div>
                    <p className="fetch-narrative-text">Please enter a value</p>
                    <button className="fetch-regular-button fetch-toneddown-button" onClick={onClickHandler}>Cancel</button>
                </div>
                : <div>
                    <button className="fetch-regular-button fetch-toneddown-button" onClick={onClickHandler}>Cancel</button>
                    <button className="fetch-regular-button" onClick={toggleConfirmDefaultValue}>Next</button>
                </div>
            }
        </div>
    )

}

const mapStateToProps = (state) => ({
    defaultValueConfirmed: state.imports.defaultValueConfirmed,
    rightClickedFormElementType: state.imports.rightClickedFormElementType,
    rightClickedFormElementValue: state.imports.rightClickedFormElementValue,
    rightClickedFormElementOptions: state.imports.rightClickedFormElementOptions,
    enteredDefaultValue: state.imports.enteredDefaultValue
})

const mapDispatchToProps = (dispatch) => ({
    setDefaultValue: (newDefaultValue) => dispatch(setDefaultValue(newDefaultValue)),
    toggleConfirmDefaultValue: (toggleValue) => dispatch(toggleConfirmDefaultValue(toggleValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDefaultValue)