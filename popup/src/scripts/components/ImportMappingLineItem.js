import React from 'react'
import SelectWithImportOptions from './selectwithimportoptions'

const ImportMappingLineItem = (props) => (
    <tr>
        <td>
            <SelectWithImportOptions
                standardFieldId={props.standardFieldId}
                importedFieldName={props.importedFieldName}
                handleOnChange={props.handleOnChange}
            />
        </td>
        <td>{props.standardFieldName}</td>
        <td>{props.standardFieldDescription}</td>
    </tr>
)

export default ImportMappingLineItem 