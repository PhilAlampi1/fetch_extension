export const setFormMappingData = (sfId, riId) => ({
    type: 'SET_FORM_MAPPING_DATA', 
    formMappingStandardFieldId: sfId,
    formMappingRowIdentifierId: riId
})

export const createUpdateUserFormFieldMappingInDb = () => ({
    type: 'CREATE_UPDATE_USER_FORM_FIELD_MAPPING_IN_DB'
})