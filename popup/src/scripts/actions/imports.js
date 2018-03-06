import fuzz from 'fuzzball'

export const storeRawImportData = (importedData, standardFields, selectedImportFileSetupId) => {
    // Get all field names from import file
    const importedFieldNames = []
    Object.keys(importedData[0]).map((fieldName) => {
        importedFieldNames.push(fieldName)
    })
    let importRowIdentifierField = ''
    let query, choices, options, results
    for (let j = 0; j < standardFields.length; j++) {
        if (selectedImportFileSetupId === 'create') {
            // If creating new Import File Setup...
            // Compare imported file field names to standard field names and recommend or display saved mappings
            // Save importRowIdentifierField if standard field has importRowIdentifier = true 
            query = standardFields[j].standardFieldName
            choices = importedFieldNames
            options = { limit: 1 }
            results = fuzz.extract(query, choices, options)
            standardFields[j].importedFieldName = results[0][0] // set recommented mapping
            standardFields[j].importRowIdentifier ? importRowIdentifierField = results[0][0] : true // if importRowIdentifier, set importRowIdentifierField in state
        } else {
            // If using an existing Import File Setup, need to set importRowIdentifierField
            // Note, all the other work done above is already handled in getAndStoreImportFieldMappings (see DB query)
            standardFields[j].importRowIdentifier && (importRowIdentifierField = standardFields[j].importedFieldName)
        }
    }
    // Get value to identify each row of import file
    let importRowIdentifierValues = []
    for (let i = 0, max = importedData.length; i < max; i++) {
        importedData[i][importRowIdentifierField] && importRowIdentifierValues.push(importedData[i][importRowIdentifierField])
    }
    return {
        type: 'STORE_RAW_IMPORT_DATA',
        importedData,
        standardFields,
        importedFieldNames,
        importRowIdentifierField,
        importRowIdentifierValues
    }
}

export const updateImportFileMapping = (standardFieldId,
    importedFieldName,
    importRowIdentifierField,
    standardFields,
    importFieldMappingDbUpdates) => {
    // When standard field to import file field mapping is changed by user, update in mapping in state and possibly DB
    const match = (item) => item.standardFieldId === standardFieldId
    const updateIndex = standardFields.findIndex(match)
    let newImportFieldMappingDbUpdates = []
    importFieldMappingDbUpdates && (newImportFieldMappingDbUpdates = importFieldMappingDbUpdates.slice(0))
    console.log('newImportFieldMappingDbUpdates', newImportFieldMappingDbUpdates)
    let importFieldMappingDbUpdate = [] // will set below if updating an existing record in the DB vs creating a new one
    if (updateIndex !== -1) { // if this is the Standard Field being updated
        standardFields[updateIndex].importedFieldName = importedFieldName
        standardFields[updateIndex].importRowIdentifier ? importRowIdentifierField = importedFieldName : true
        if (standardFields[updateIndex].importFieldMappingId) {
            const importFieldMappingId = parseInt(standardFields[updateIndex].importFieldMappingId)
            const importedFieldName = standardFields[updateIndex].importedFieldName
            importFieldMappingDbUpdate = {
                importFieldMappingId,
                importedFieldName
            }
            // Update or add to importFieldMappingDbUpdates depending on if the field has already been marked for change
            if (newImportFieldMappingDbUpdates) {
                let existingIndex = newImportFieldMappingDbUpdates.findIndex((mapping) => {
                    return mapping.importFieldMappingId === importFieldMappingId
                })
                if (existingIndex !== -1) { // existing field marked for change
                    newImportFieldMappingDbUpdates[existingIndex] = importFieldMappingDbUpdate
                } else { // no existing field marked for change
                    newImportFieldMappingDbUpdates.push(importFieldMappingDbUpdate)
                }
            } else {
                newImportFieldMappingDbUpdates = [importFieldMappingDbUpdate]
            }
        }
    }
    if (importFieldMappingDbUpdate) { // updating existing DB record via updateImportFileSetupAndMappings alias function
        return {
            type: 'UPDATE_IMPORT_FILE_MAPPING_IN_STORE_AND_FLAG_FOR_DB_UPDATE',
            standardFields,
            importRowIdentifierField,
            newImportFieldMappingDbUpdates
        }
    } else { // will be creating a new DB record via createImportFileSetup alias function
        return {
            type: 'UPDATE_IMPORT_FILE_MAPPING_IN_STORE',
            standardFields,
            importRowIdentifierField
        }
    }
}

export const setMapImportToStandardFieldsERROR = () => ({
    type: 'SET_MAP_IMPORT_TO_STANDARDFIELDS_ERROR'
})

export const confirmImport = (standardFields) => {
    // Remove standardFields that don't have an importedFieldName
    let newStandardFields = []
    for (let i = 0, sf = standardFields; i < sf.length; i++) {
        sf[i].importedFieldName && newStandardFields.push(sf[i])
    }
    return {
        type: 'CONFIRM_IMPORT',
        importConfirmed: true,
        standardFields: newStandardFields
    }
}

export const updateImportFieldMappingsInDb = () => ({
    type: 'UPDATE_IMPORT_FIELD_MAPPINGS_IN_DB'
})

export const nameImportFile = (importFileName) => ({
    type: 'NAME_IMPORT_FILE',
    selectedImportFileSetupName: importFileName
    // importFileName
})

export const confirmNewImportFileName = () => ({
    type: 'CONFIRM_NEW_IMPORT_FILE_NAME'
})

export const updateExistingImportFileNameInDb = () => ({
    type: 'UPDATE_EXISTING_IMPORT_FILE_NAME_IN_DB'
})

export const confirmExistingImportFileName = () => ({
    type: 'CONFIRM_EXISTING_IMPORT_FILE_NAME',
    importFileNameConfirmed: true
})

////HERE
export const nameForm = (formName) => ({
    type: 'NAME_FORM',
    selectedFormName: formName
})

export const describeForm = (formDescription) => ({
    type: 'DESCRIBE_FORM',
    selectedFormDescription: formDescription
})

export const confirmNewForm = () => ({
    type: 'CONFIRM_NEW_FORM'
})

// export const updateExistingImportFileNameInDb = () => ({
//     type: 'UPDATE_EXISTING_IMPORT_FILE_NAME_IN_DB'
// })

// export const confirmExistingImportFileName = () => ({
//     type: 'CONFIRM_EXISTING_IMPORT_FILE_NAME',
//     importFileNameConfirmed: true
// })

///HERE

export const setImportedRowIdentifierValue = (importedRowIdentifierValue, rowIdentifierId, rowIdentifiers) => {
    const match = (item) => item.rowIdentifierId === rowIdentifierId
    const updateIndex = rowIdentifiers.findIndex(match)
    let newRowIdentifiers = rowIdentifiers
    rowIdentifiers[updateIndex].importedRowIdentifierValue = importedRowIdentifierValue
    return {
        type: 'SET_IMPORT_ROW_IDENTIFIER_VALUE',
        rowIdentifiers: newRowIdentifiers
    }
}

export const confirmRowIdentifiers = (rowIdentifiers, importedData, importRowIdentifierField, standardFields) => {
    // Populate importSetupArray with standardFieldId, importedFieldValue, importRowIdentifierId
    const importSetupArray = []
    // Loop through rowIdentifiers - for each row
    for (let i = 0; i < rowIdentifiers.length; i++) {
        // Find importedData index where importRowIdentifierField = rowIdentifier.importedRowIdentifierValue
        const match2 = (item) => {
            return item[importRowIdentifierField] === rowIdentifiers[i]['importedRowIdentifierValue']
        }
        const importedDataIndex = importedData.findIndex(match2)
        // Loop through standardFields to set importSetupArray values
        if (importedDataIndex !== -1) {
            for (let j = 0; j < standardFields.length; j++) {
                if (importedData[importedDataIndex][standardFields[j]['importedFieldName']]) {
                    importSetupArray.push({
                        importedFieldValue: importedData[importedDataIndex][standardFields[j]['importedFieldName']],
                        importRowIdentifierId: rowIdentifiers[i]['rowIdentifierId'],
                        standardFieldId: standardFields[j]['standardFieldId']
                    })
                }
            }
        }
    }
    return {
        type: 'CONFIRM_ROW_IDENTIFIERS',
        confirmRowIdentifiers: true,
        importSetupArray
    }
}

export const setSelectedImportFileSetup = (selectedOptionId, selectedOptionName) => ({
    type: 'SET_SELECTED_IMPORT_FILE_SETUP',
    selectedImportFileSetupId: selectedOptionId,
    selectedImportFileSetupName: selectedOptionName
})

export const getAndStoreImportFieldMappings = () => ({
    type: 'GET_AND_STORE_IMPORT_FIELD_MAPPINGS'
})

export const fetchStubValuesViaAlias = () => ({
    type: 'FETCH_STUB_VALUES_VIA_ALIAS'
})

export const togglePromptUserOnStartOver = (newValue) => ({
    type: 'TOGGLE_PROMPT_USER_ON_START_OVER',
    promptUserOnStartOver: newValue
})

export const setUsersCurrentPageToFormPage = () => ({
    type: 'UPDATE_USERS_CURRENT_PAGE',
    usersCurrentPage: 'form'
})

export const setUsersCurrentPageToMainPage = () => ({
    type: 'UPDATE_USERS_CURRENT_PAGE',
    usersCurrentPage: 'main'
})

export const setSelectedForm = (selectedFormId, selectedFormName, selectedFormDescription, selectedFormPublic, selectedFormConfirmedForImport) => ({
    type: 'SET_SELECTED_FORM',
    selectedFormId,
    selectedFormName,
    selectedFormDescription,
    selectedFormPublic,
    selectedFormConfirmedForImport
})

export const updateExistingFormInDb = () => ({
    type: 'UPDATE_EXISTING_FORM_IN_DB'
})

export const confirmExistingForm = () => ({
    type: 'CONFIRM_EXISTING_FORM',
    formConfirmed: true
})

export const confirmPreMap = () => ({
    type: 'CONFIRM_PRE_MAP',
    preMapConfirmed: true
})

export const setUserIsMappingForm = (setting) => ({
    type: 'SET_USER_IS_MAPPING_FORM',
    userIsMappingForm: setting
})

export const setUpContextMenus = () => ({
    type: 'SET_UP_CONTEXT_MENUS'
})

export const setSelectedFormPublic = (setting) => ({
    type: 'SET_SELECTED_FORM_PUBLIC',
    selectedFormPublic: setting
})

export const removeContextMenus = () => ({
    type: 'REMOVE_CONTEXT_MENUS'
})

export const fillForm = () => ({
    type: 'FILL_FORM'
})

export const storeFormMappingsInDb = () => ({
    type: 'STORE_FORM_MAPPINGS_IN_DB'
})

