export const setFormMappingData = (sfId, riId) => ({
    type: 'SET_FORM_MAPPING_DATA',
    formMappingStandardFieldId: sfId,
    formMappingRowIdentifierId: riId
})

export const createUpdateUserFormFieldMappingInDb = () => ({
    type: 'CREATE_UPDATE_USER_FORM_FIELD_MAPPING_IN_DB'
})

export const resetFormMappingFields = () => ({
    type: 'RESET_FORM_MAPPING_FIELDS',
    formMappingRowIdentifierId: null,
    formMappingStandardFieldId: null,
    enteredDefaultValue: null,
    enteredDefaultOverride: null,
    rightClickedFormElementType: null,
    rightClickedFormElementValue: null,
    rightClickedFormElementOptions: null,
    defaultValueConfirmed: false,
    defaultOverrideConfirmed: false,
    formFieldSelector: null,
    rightClickSelectionIsValid: false,
    totalFieldsPopulated: null, 
    importFieldsPopulated: null,
    defaultFieldsPopulated: null
})

export const setPostFillFormFields = (total, def, imported) => ({
    type: 'SET_POST_FILL_FORM_FIELDS',
    totalFieldsPopulated: total, 
    importFieldsPopulated: imported,
    defaultFieldsPopulated: def
})

export const setFillFormFailed = (value) => ({
    type: 'SET_FILL_FORM_FAILED',
    fillFormFailed: value
})

