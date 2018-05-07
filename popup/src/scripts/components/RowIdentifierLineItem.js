import React from 'react'
import SelectWithImportRowIdentifierOptions from './SelectWithImportRowIdentifierOptions'

export const RowIdentifierLineItem = (props) => (
    <tr>
        <td><SelectWithImportRowIdentifierOptions
            importRowIdentifierValues={props.importRowIdentifierValues}
            rowIdentifierId={props.rowIdentifierId}
            setImportedRowIdentifierValue={props.setImportedRowIdentifierValue}
            importedRowIdentifierValue={props.importedRowIdentifierValue}
            rowIdentifiers={props.rowIdentifiers}
        /></td>
        <td>{props.rowIdentifier.rowIdentifierName}</td>
        <td>{props.rowIdentifier.rowIdentifierPrefix}</td>
    </tr>
)

export default RowIdentifierLineItem