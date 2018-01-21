import React from 'react'

const SelectWithImportRowIdentifierOptions = (props) => {
    const handleOnChange = (e) => {
        props.setImportedRowIdentifierValue(e.target.value, props.rowIdentifierId, props.rowIdentifiers)
    }
    return (
        <form>
            <select onChange={handleOnChange} value={props.importedRowIdentifierValue}>
                <option value="">Not importing</option>
                {props.importRowIdentifierValues.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </form>
    )
}

export default SelectWithImportRowIdentifierOptions