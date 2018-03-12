import React from 'react'
import { connect } from 'react-redux'
import ImportMappingLineItem from './importmappinglineitem'
import {
    updateImportFileMapping,
    confirmImport,
    setMapImportToStandardFieldsERROR,
    updateImportFieldMappingsInDb
} from '../actions/imports'

export const MapImportToStandardFields = (props) => {

    const updateImportFileMapping = (standardFieldId, importedFieldName) => {
        props.updateImportFileMapping(
            standardFieldId,
            importedFieldName,
            props.importRowIdentifierField,
            props.standardFields,
            props.importFieldMappingDbUpdates
        )
    }

    const confirmImport = () => {
        let importRowIdentifierExists = false
        for (let i = 0; i < props.standardFields.length; i++) {
            if (props.standardFields[i]['importRowIdentifier']) {
                importRowIdentifierExists = true
                props.standardFields[i]['importedFieldName']
                    ? props.confirmImport(props.standardFields)
                    : props.setMapImportToStandardFieldsERROR()
            }
        }
        props.importFieldMappingDbUpdates[0] && props.updateImportFieldMappingsInDb()
        !importRowIdentifierExists && props.setMapImportToStandardFieldsERROR() // for when standardFieldSet doesn't have any importRowIdentifier in it
    }
    
    return (
        <div>
            <p>Your file was uploaded successfully, nice work!</p>
            {props.selectedImportFileSetupId !== 'create'
                ? <p>Below are the current mappings you have saved for this import file. Look it over and make any changes as necessary before clicking Next below.</p>
                : <p>We've taken a stab at mapping your import file to the Standard Fields we use in the system. However, it's unlikely we got this completely right. This is a very important step, so please check this over and make corrections where needed.</p>
            }
            <div className="list-header">
                <div>Import Field</div>
                <div>Standard Field</div>
                <div>Description</div>
            </div>
            <div className="list-body">
                {props.standardFields.map((standardField) => {
                    return (
                        < ImportMappingLineItem
                            key={standardField.standardFieldId}
                            standardFieldId={standardField.standardFieldId}
                            standardFieldName={standardField.standardFieldName}
                            standardFieldDescription={standardField.standardFieldDescription}
                            importedFieldName={standardField.importedFieldName}
                            handleOnChange={updateImportFileMapping}
                        />)
                })}
            </div>
            {props.mapImportToStandardFieldsERROR &&
                <p>ERROR: The "{props.importRowIdentifierStandardFieldName}" Standard Field is how you will identify which rows to import, so it must be mapped to one of your Import Fields above.</p>
            }
            <button onClick={confirmImport}>Next</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    standardFields: state.imports.standardFields,
    importRowIdentifierField: state.imports.importRowIdentifierField,
    importRowIdentifierStandardFieldName: state.imports.importRowIdentifierStandardFieldName,
    mapImportToStandardFieldsERROR: state.imports.mapImportToStandardFieldsERROR,
    importFieldMappingDbUpdates: state.imports.importFieldMappingDbUpdates,
    selectedImportFileSetupId: state.imports.selectedImportFileSetupId
})

const mapDispatchToProps = (dispatch) => ({
    updateImportFileMapping: (standardFieldId, importedFieldName, importRowIdentifierField,
        standardFields, importFieldMappingDbUpdates) => {
        dispatch(updateImportFileMapping(standardFieldId, importedFieldName, importRowIdentifierField,
            standardFields, importFieldMappingDbUpdates))
    },
    confirmImport: (standardFields) => dispatch(confirmImport(standardFields)),
    setMapImportToStandardFieldsERROR: () => dispatch(setMapImportToStandardFieldsERROR()),
    updateImportFieldMappingsInDb: () => dispatch(updateImportFieldMappingsInDb())
})

export default connect(mapStateToProps, mapDispatchToProps)(MapImportToStandardFields)