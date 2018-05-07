import React from 'react'
import { connect } from 'react-redux'

export const SelectWithImportOptions = (props) => {
    const handleOnChange = (e) => props.handleOnChange(props.standardFieldId, e.target.value)
    return (
        <form>
            <select onChange={handleOnChange} defaultValue={props.importedFieldName}>
                <option value="">No mapping</option>
                {props.importFieldOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </form>
    )
}

const mapStateToProps = (state) => ({
    importFieldOptions: state.imports.importedFieldNames
})

export default connect(mapStateToProps)(SelectWithImportOptions) 