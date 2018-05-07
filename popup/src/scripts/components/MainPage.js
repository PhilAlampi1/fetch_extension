import React from 'react'
import { connect } from 'react-redux'
import Papa from 'papaparse'
import SelectImportFile from './selectimportfile'
import RowIdentifierMappings from './rowidentifiermappings'
import MapImportToStandardFields from './mapimporttostandardfields'
import ImportFileName from './importfilename'
import SelectImportFileSetup from './SelectImportFileSetup'
import FormMappings from './FormMappings'
import CreateEditFormMapping from './CreateEditFormMapping'
import PreMapConfirmForm from './PreMapConfirmForm'
import PreMapInstructions from './PreMapInstructions'
import PromptIfUserIsMappingForm from './PromptIfUserIsMappingForm'
import FillForm from './FillForm'
import Results from './Results'
import { storeRawImportData } from '../actions/imports'

export const MainPage = (props) => {

    const storeRawImportData = (importedData) => {
        props.storeRawImportData(importedData, props.standardFields, props.selectedImportFileSetupId)
    }

    const loadFileToStore = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            complete: (results) => {
                storeRawImportData(results.data)
            }
        })
    }

    return (

        <div className='container container--center'>
        
            {props.userIsMappingForm && <PromptIfUserIsMappingForm />}
             
            {(props.usersCurrentPage === 'main' && !props.userIsMappingForm) &&
                <div>
                    {!props.selectedImportFileSetupId && <SelectImportFileSetup />}

                    {(props.selectedImportFileSetupId && !props.isImportedData) && <SelectImportFile
                        message={`Ok, lets get started by uploading your import file.`}
                        handleOnChange={loadFileToStore}
                    />}

                    {(props.isImportedData && !props.importConfirmed) && <MapImportToStandardFields />}

                    {(props.importConfirmed && !props.importFileNameConfirmed) && <ImportFileName />}

                    {(props.importFileNameConfirmed && !props.confirmRowIdentifiers) && <RowIdentifierMappings />}

                    {(props.confirmRowIdentifiers && !props.selectedFormConfirmedForImport) && <FormMappings 
                        message={'Which form are we importing to?'}
                    />}

                    {(props.selectedFormConfirmedForImport && !props.totalFieldsPopulated) && <FillForm />}

                    {props.totalFieldsPopulated && <Results />}

                </div>
            }
            
            {(props.usersCurrentPage === 'form' && !props.userIsMappingForm) &&
                <div>
                    
                    {!props.selectedFormId && <FormMappings 
                        message={'Heads up, Form Mappings enable us to map Standard Fields to any web form, so they are kind of important. Select from the dropdown below to map a new form or edit an existing one.'}
                    />}

                    {(props.selectedFormId && !props.formConfirmed) && <CreateEditFormMapping />}

                    {(props.formConfirmed && !props.preMapConfirmed) && <PreMapConfirmForm />}

                    {(props.preMapConfirmed) && <PreMapInstructions />}

                </div>
            }
            
        </div>
    )

}

const mapStateToProps = (state) => ({
    isImportedData: !!state.imports.importedData,
    importConfirmed: !!state.imports.importConfirmed,
    importFileNameConfirmed: !!state.imports.importFileNameConfirmed,
    standardFields: state.imports.standardFields,
    usersCurrentPage: state.imports.usersCurrentPage,
    selectedImportFileSetupId: state.imports.selectedImportFileSetupId,
    selectedFormId: state.imports.selectedFormId,
    formConfirmed: state.imports.formConfirmed,
    preMapConfirmed: state.imports.preMapConfirmed,
    userIsMappingForm: state.imports.userIsMappingForm,
    confirmRowIdentifiers: state.imports.confirmRowIdentifiers,
    selectedFormConfirmedForImport: state.imports.selectedFormConfirmedForImport,
    totalFieldsPopulated: state.imports.totalFieldsPopulated
})

const mapDispatchToProps = (dispatch, props) => ({
    storeRawImportData: (importedData, standardFields, selectedImportFileSetupId) => {
        dispatch(storeRawImportData(importedData, standardFields, selectedImportFileSetupId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)