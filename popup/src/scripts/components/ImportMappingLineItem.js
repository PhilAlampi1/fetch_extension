import React from 'react'
import SelectWithImportOptions from './selectwithimportoptions'

const ImportMappingLineItem = (props) => (
    <div>
        <SelectWithImportOptions
            standardFieldId={props.standardFieldId}
            importedFieldName={props.importedFieldName}
            handleOnChange={props.handleOnChange}
        />
        <span>{props.standardFieldName}</span>
        <span>{props.standardFieldDescription}</span>
    </div>
)

export default ImportMappingLineItem 