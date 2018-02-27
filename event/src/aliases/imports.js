import {
    status,
    json,
    serverPath,
    formatForXhr,
    findAndStoreImportFileSetups,
    fetchStubValues,
    findAndStoreUserForms,
    setupContextMenu
} from '../utilities/utilities'

export const updateExistingImportFileNameInDb = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        fetch(serverPath + 'updateimportfilesetupname/' +
            state.imports.selectedImportFileSetupId + '/' +
            state.auth.userToken + '/' +
            state.imports.selectedImportFileSetupName
        )
            .then(json)
            .then(result => {
                return dispatch({
                    type: 'CONFIRM_EXISTING_IMPORT_FILE_NAME',
                    importFileNameConfirmed: true
                })
            })
    }
}

export const updateImportFieldMappingsInDb = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        const importFieldMappings = state.imports.importFieldMappingDbUpdates
        const tok = state.auth.userToken
        const data = formatForXhr([{
            name: 'values',
            value: JSON.stringify(importFieldMappings)
        }, {
            name: 'userToken',
            value: tok
        }])
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                const res = JSON.parse(xhr.responseText)
                if (res.success) {
                    return dispatch({
                        type: 'COMPLETE_UPDATE_IMPORT_FIELD_MAPPINGS_IN_DB',
                        importFieldMappingDbUpdates: []
                    })
                } else {
                    // TODO - ADD ERROR HANDLING TO REDUCERS AND THROW ERROR HERE
                    // UPDATE UI COMPONENT TO DISPLAY ERROR
                    console.log('DATABASE REQUEST ERROR', res)
                }
            }
        }
        xhr.open("POST", serverPath + 'importfieldmappings/update')
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data)
    }
}

export const createImportFileSetup = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        fetch(serverPath + 'createimportfilesetup/' +
            state.imports.selectedImportFileSetupName + '/' +
            state.auth.userId + '/' +
            state.auth.userToken
        )
            .then(json)
            .then(result => {
                // Insert all Import_Field_Mapping records into DB
                // Create Import_Field_Mapping array out of state
                let importFieldMappings = []
                const standardFieldsCopy = state.imports.standardFields
                standardFieldsCopy.map(sf => {
                    if (sf.importedFieldName) {
                        importFieldMappings.push({
                            userId: state.auth.userId,
                            importFileSetupId: result.data.importFileSetupId,
                            standardFieldId: sf.standardFieldId,
                            importedFieldName: sf.importedFieldName
                        })
                    }
                })
                const tok = state.auth.userToken
                const data = formatForXhr([{
                    name: 'values',
                    value: JSON.stringify(importFieldMappings)
                }, {
                    name: 'userToken',
                    value: tok
                }])
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        const res = JSON.parse(xhr.responseText)
                        if (res.success) {
                            findAndStoreImportFileSetups(state.auth.userId, state.auth.userToken, dispatch)
                            return dispatch({
                                type: 'COMPLETE_CONFIRM_NEW_IMPORT_FILE_NAME',
                                selectedImportFileSetupId: result.data.importFileSetupId,
                                importFileNameConfirmed: true
                            })
                        } else {
                            // TODO - ADD ERROR HANDLING TO REDUCERS AND THROW ERROR HERE
                            // UPDATE UI COMPONENT TO DISPLAY ERROR
                            console.log('DATABASE REQUEST ERROR', res)
                        }
                    }
                }
                xhr.open("POST", serverPath + "importfilemappings/add")
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("cache-control", "no-cache");
                xhr.send(data)
            })
    }
}

export const createNewForm = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        fetch(serverPath + 'createform/' +
            state.imports.selectedFormName + '/' +
            state.imports.selectedFormDescription + '/' +
            state.auth.userToken
        )
            .then(json)
            .then(result => {
                return dispatch({
                    type: 'SET_SELECTED_FORM_ID',
                    selectedFormId: result.data.formId,
                    formConfirmed: true
                })
            })
            .then(result2 => {
                findAndStoreUserForms(state.auth.userToken, dispatch)
            })
    }
}

export const getAndStoreImportFieldMappings = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        fetch(serverPath + 'findimportfieldmappings/' +
            state.imports.selectedImportFileSetupId + '/' +
            state.auth.userToken
        )
            .then(json)
            .then(result => {
                // Instead of returing ImportFieldMappings, update standardFields for the user's selected Import File Setup
                // and replace the old standardFields with the new standardFields in the store               
                return dispatch({
                    type: 'STORE_IMPORT_FIELD_MAPPINGS',
                    standardFields: result.data
                })
            })
    }
}

export const fetchStubValuesFromAlias = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        const currentPage = state.imports.usersCurrentPage
        fetchStubValues()
            .then(() => {
                findAndStoreImportFileSetups(state.auth.userId, state.auth.userToken, dispatch)
                findAndStoreUserForms(state.auth.userToken, dispatch)
                if (currentPage !== 'main') {
                    return dispatch({
                        type: 'UPDATE_USERS_CURRENT_PAGE',
                        usersCurrentPage: 'main'
                    })
                }
            })
    }
}

export const updateFormInDb = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        fetch(serverPath + 'updateform/' +
            state.imports.selectedFormId + '/' +
            state.imports.selectedFormName + '/' +
            state.imports.selectedFormDescription + '/' +
            state.imports.selectedFormPublic + '/' +
            state.auth.userToken
        )
            .then(json)
            .then(result => {
                return dispatch({
                    type: 'CONFIRM_UPDATE_FORM',
                    formConfirmed: true
                })
            })
    }
}

export const activateContextMenus = () => {
    return (dispatch) => setupContextMenu(dispatch)
}

export const removeContextMenus = () => {
    return () => chrome.contextMenus.removeAll()
}

export const createUpdateUserFormFieldMappingInDb = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        const ffSelector = encodeURIComponent(state.imports.formFieldSelector)
        const publicMapping = state.auth.userRole === 'ADMIN' ? true : false
        fetch(serverPath + 'createupdateuserformfieldmapping/' +
            state.imports.formMappingRowIdentifierId + '/' +
            state.imports.selectedFormId + '/' +
            state.imports.formMappingStandardFieldId + '/' +
            ffSelector + '/' +
            publicMapping + '/' + // for publicMapping in API
            state.imports.enteredDefaultValue + '/' + 
            state.imports.enteredDefaultOverride + '/' + 
            state.imports.rightClickedFormElementType + '/' +
            state.auth.userToken
        )
            .then(json)
            .catch(error => console.error('Error:', error))
            .then(r => { // TODO - DELETE THIS? WHAT WAS IT FOR?

            })
            .then(result => {
                return dispatch({
                    type: 'RESET_FORM_MAPPING_FIELDS',
                    formMappingRowIdentifierId: null,
                    formMappingStandardFieldId: null,
                    enteredDefaultValue: null, 
                    enteredDefaultOverride: true,
                    rightClickedFormElementType: null,
                    rightClickedFormElementValue: null,
                    rightClickedFormElementOptions: null, 
                    defaultValueConfirmed: false,
                    defaultOverrideConfirmed: false,
                    formFieldSelector: null
                })
            })
    }
}

export const fillForm = () => {
    return (dispatch, getState) => {
        const state = getState() // had to use state here because alias wasn't picking up arguements passed in from popup
        fetch(serverPath + 'findformfieldmappings/' + state.imports.selectedFormId + '/' + state.auth.userToken)
            .then(json)
            .then(result => {
                const formMappingArray = result.data
                const importSetupArray = state.imports.importSetupArray
                // Find where standardFieldId and importRowIdentifierId match the same fields in formMappingArray
                // and update importDataArray with the importedFieldValue
                const tempImportDataArray = formMappingArray.map((fmItem) => {
                    let found = importSetupArray.find((isItem) => {
                        return (isItem.standardFieldId === fmItem.standardFieldId
                            && isItem.importRowIdentifierId === fmItem.importRowIdentifierId)
                    })
                    if (found) { // add import value field to importDataArray
                        fmItem['importedFieldValue'] = found.importedFieldValue
                        console.log("HERE: ", fmItem.importedFieldValue)
                    }
                    return fmItem
                })
                const importDataArray = tempImportDataArray.filter((ele) => {
                    console.log('ele ', ele)
                    if (!ele.defaultValue && !ele.importedFieldValue) {
                        return false
                    } else {
                        return true
                    }
                })
                dispatch({
                    type: 'STORE_FORM_MAPPINGS',
                    formMappingArray,
                    importDataArray
                })
                // LEFT OFF - SEND IMPORTDATAARRAY TO CONTENT SCRIPT VIA MESSAGING

            })







        // 1 - DONE
        // - Create importSetupArray that includes JSON objects for each mapped standard field: 
        // [{
        // standardFieldId: X,
        // importedFieldValue: Y,
        // importRowIdentifierId
        // }]

        // 2 - Get form mappings from DB [{
        // standardFieldId,
        // importRowIdentifierId,
        // formFieldSelector,
        // defaultValue,
        // overrideImportWithDefault
        // formFieldType
        // }]

        // 3 - Loop through form mappings results from DB to create finalImportDataset: [{
        // standardFieldId,
        // importRowIdentifierId,
        // formFieldSelector,
        // defaultValue,
        // overrideImportWithDefault,
        // importedFieldValue
        // }]


    }
}

// export const storeDefaultValueInDb = () => {


//     // Action for:
//     // 1 - clear out enteredDefaultValue (using 'SET_DEFAULT_VALUE')
//     // 2 - clear out defaultValueConfirmed 
// }