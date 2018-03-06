import { completeLogin } from './auth'
import {
    createImportFileSetup,
    createNewForm,
    getAndStoreImportFieldMappings,
    updateImportFieldMappingsInDb,
    updateExistingImportFileNameInDb,
    fetchStubValuesFromAlias,
    updateFormInDb,
    activateContextMenus,
    removeContextMenus,
    createUpdateUserFormFieldMappingInDb,
    fillForm,
    storeFormMappingsInDb
} from './imports'

export default {
    'CONFIRM_NEW_IMPORT_FILE_NAME': createImportFileSetup,
    'CONFIRM_NEW_FORM': createNewForm,
    'UPDATE_IMPORT_FIELD_MAPPINGS_IN_DB': updateImportFieldMappingsInDb,
    'UPDATE_EXISTING_IMPORT_FILE_NAME_IN_DB': updateExistingImportFileNameInDb,
    'SIGN_IN': completeLogin,
    'GET_AND_STORE_IMPORT_FIELD_MAPPINGS': getAndStoreImportFieldMappings,
    'FETCH_STUB_VALUES_VIA_ALIAS': fetchStubValuesFromAlias,
    'UPDATE_EXISTING_FORM_IN_DB': updateFormInDb,
    'SET_UP_CONTEXT_MENUS': activateContextMenus,
    'REMOVE_CONTEXT_MENUS': removeContextMenus,
    'CREATE_UPDATE_USER_FORM_FIELD_MAPPING_IN_DB': createUpdateUserFormFieldMappingInDb,
    'FILL_FORM': fillForm,
    'STORE_FORM_MAPPINGS_IN_DB': storeFormMappingsInDb
    // 'STORE_TRANSACTION_HISTORY': storeTransactionHistory
}