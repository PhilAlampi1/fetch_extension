export const setFormFieldSelector = (newSelector) => ({
    type: 'SET_FORM_FIELD_SELECTOR',
    formFieldSelector: newSelector
})

export const setDefaultValue = (newDefaultValue) => ({
    type: 'SET_DEFAULT_VALUE',
    enteredDefaultValue: newDefaultValue
})

export const setDefaultOverride = (newDefaultOverride) => ({
    type: 'SET_DEFAULT_OVERRIDE',
    enteredDefaultOverride: newDefaultOverride
})

export const toggleConfirmDefaultValue = (toggleValue) => ({
    type: 'TOGGLE_CONFIRM_DEFAULT_VALUE',
    defaultValueConfirmed: toggleValue
})

export const toggleConfirmDefaultOverride = (toggleValue) => ({
    type: 'TOGGLE_CONFIRM_DEFAULT_OVERRIDE',
    defaultOverrideConfirmed: toggleValue
})

export const setRightClickedFormElementItems = (type, value, options) => ({
    type: 'SET_RIGHT_CLICKED_FORM_ELEMENT_ITEMS',
    rightClickedFormElementType: type,
    rightClickedFormElementValue: value, 
    rightClickedFormElementOptions: options
})

export const createUpdateUserFormFieldMappingInDbFromDefaultModal = () => ({
    type: 'CREATE_UPDATE_USER_FORM_FIELD_MAPPING_IN_DB'
})

export const setDefaultModalItems = (value, override) => ({
    type: 'SET_DEFAULT_MODAL_ITEMS',
    enteredDefaultValue: value,
    enteredDefaultOverride: override
})

export const setRightClickSelectionIsValid = (setting) => ({
    type: 'SET_RIGHT_CLICK_SELECTION_IS_VALID',
    rightClickSelectionIsValid: setting
})

export const storeTransactionHistory = () => ({
    type: 'STORE_TRANSACTION_HISTORY'
})