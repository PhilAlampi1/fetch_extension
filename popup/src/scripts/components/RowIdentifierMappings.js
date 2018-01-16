import React from 'react'
import { connect } from 'react-redux'
import RowIdentifierLineItem from './RowIdentifierLineItem'
import { setImportedRowIdentifierValue, confirmRowIdentifiers } from '../actions/imports'

export const RowIdentifierMappings = (props) => {
    const confirmRowIdentifiers = () => {
        props.confirmRowIdentifiers(
            props.rowIdentifiers,
            props.importedData,
            props.importRowIdentifierField,
            props.standardFields
        )
    }
    return (
        <div>
            <p>Which rows would you like to import?</p>
            <div>
                <div>{props.importRowIdentifierField}</div>
                <div>Type</div>
                <div>Prefix</div>
            </div>
            {props.rowIdentifiers.map((rowIdentifier) => (
                <RowIdentifierLineItem
                    key={rowIdentifier.rowIdentifierId}
                    rowIdentifierId={rowIdentifier.rowIdentifierId}
                    rowIdentifier={rowIdentifier}
                    importedRowIdentifierValue={rowIdentifier.importedRowIdentifierValue}
                    importRowIdentifierValues={props.importRowIdentifierValues}
                    setImportedRowIdentifierValue={props.setImportedRowIdentifierValue}
                    rowIdentifiers={props.rowIdentifiers}
                />
            ))}
            <button onClick={confirmRowIdentifiers}>Next</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        rowIdentifiers: state.imports.rowIdentifiers,
        importRowIdentifierField: state.imports.importRowIdentifierField,
        importedData: state.imports.importedData,
        importRowIdentifierValues: state.imports.importRowIdentifierValues,
        standardFields: state.imports.standardFields
    }
}

const mapDispatchToProps = (dispatch) => ({
    setImportedRowIdentifierValue: (importedRowIdentifierValue, rowIdentifierId, rowIdentifiers) => {
        dispatch(setImportedRowIdentifierValue(importedRowIdentifierValue, rowIdentifierId, rowIdentifiers))
    },
    confirmRowIdentifiers: (rowIdentifiers, importedData, importRowIdentifierField, standardFields) => {
        dispatch(confirmRowIdentifiers(rowIdentifiers, importedData, importRowIdentifierField, standardFields))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RowIdentifierMappings)