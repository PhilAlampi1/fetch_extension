import React from 'react'
import { connect } from 'react-redux'
import RowIdentifierLineItem from './RowIdentifierLineItem'
import { setImportedRowIdentifierValue, confirmRowIdentifiers } from '../actions/imports'

export const RowIdentifierMappings = (props) => {

    const confirmRowIdentifiers = () => {
        let hasSelection = false
        props.rowIdentifiers.map((item) => {
            item.importedRowIdentifierValue && (hasSelection = true)
        })

        if (hasSelection) {
            props.confirmRowIdentifiers(
                props.rowIdentifiers,
                props.importedData,
                props.importRowIdentifierField,
                props.standardFields
            )
        }
    }

    return (
        <div className="container__centertext">
            <p className="narrative-text">Which rows would you like to import?</p>
            <table>
                <thead>
                    <tr>
                        <th>{props.importRowIdentifierField}</th>
                        <th>Type</th>
                        <th>Prefix</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
            <p className="narrative-text">Please select at least one row to import</p>
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