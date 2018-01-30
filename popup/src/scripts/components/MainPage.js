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
        <div>
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

                    {props.importFileNameConfirmed && <RowIdentifierMappings />}
                </div>
            }
            
            {(props.usersCurrentPage === 'form' && !props.userIsMappingForm) &&
                <div>
                    
                    {!props.selectedFormId && <FormMappings />}

                    {(props.selectedFormId && !props.formConfirmed) && <CreateEditFormMapping />}

                    {(props.formConfirmed && !props.preMapConfirmed) && <PreMapConfirmForm />}

                    {props.preMapConfirmed && <PreMapInstructions />}

                </div>
            }
            
        </div>
    )

}


//LEFT OFF - (props.selectedImportFileSetup && !isImportedData) && <SelectImportFile ... />
//change "handleOnChange prop you pass to it depending on value of selectedImportFileSetup (new vs. id of existing)"


// {((props.isImportedData && !props.importConfirmed) && (!props.userHasImportFileSetups || props.userCreatingNewImportFileSetup)) &&
//     <MapImportToStandardFields />}


// TODO - WHICH OF THESE PROPS DO YOU NO LONGER NEED? (REMOVE FROM ACTIONS / REDUCERS)
// {!props.isImportedData && <SelectImportFile
//     message={`Hi ${props.firstName}, lets get started by uploading your import file.`}
//     handleOnChange={loadFileToStore}
// />}
// {(props.userHasImportFileSetups && !props.userCreatingNewImportFileSetup && !props.importFileNameConfirmed) 
//     && <SelectImportFileSetup />}
//DONE pull importFileSetups for that users on init, store in Redux
//DONE set userCreatingNewImportFileSetup = false on init
//DONE assign userHasImportFileSetups and userCreatingNewImportFileSetup in component
//DONE (!props.userHasImportFileSetups || props.userCreatingNewImportFileSetup - render MapImportToStandardFields
//DONE props.userHasImportFileSetups && !props.userCreatingNewImportFileSetup &&  !props.importFileNameConfirmed - render SelectImportFileSetup

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
    userIsMappingForm: state.imports.userIsMappingForm
})

const mapDispatchToProps = (dispatch, props) => ({
    storeRawImportData: (importedData, standardFields, selectedImportFileSetupId) => {
        dispatch(storeRawImportData(importedData, standardFields, selectedImportFileSetupId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)