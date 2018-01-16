import React from 'react'
import SelectWithImportRowIdentifierOptions from './SelectWithImportRowIdentifierOptions'

export const RowIdentifierLineItem = (props) => (
    <div>
        <div><SelectWithImportRowIdentifierOptions
            importRowIdentifierValues={props.importRowIdentifierValues}
            rowIdentifierId={props.rowIdentifierId}
            setImportedRowIdentifierValue={props.setImportedRowIdentifierValue}
            importedRowIdentifierValue={props.importedRowIdentifierValue}
            rowIdentifiers={props.rowIdentifiers}
        />
        </div>
        <div>{props.rowIdentifier.rowIdentifierName}</div>
        <div>{props.rowIdentifier.rowIdentifierPrefix}</div>
    </div>
)

export default RowIdentifierLineItem