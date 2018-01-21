import { completeLogin } from './auth'
import {
    createImportFileSetup,
    createNewForm,
    getAndStoreImportFieldMappings,
    updateImportFieldMappingsInDb,
    updateExistingImportFileNameInDb,
    fetchStubValuesFromAlias,
    updateFormInDb
} from './imports'

export default {
    'CONFIRM_NEW_IMPORT_FILE_NAME': createImportFileSetup,
    'CONFIRM_NEW_FORM': createNewForm,
    'UPDATE_IMPORT_FIELD_MAPPINGS_IN_DB': updateImportFieldMappingsInDb,
    'UPDATE_EXISTING_IMPORT_FILE_NAME_IN_DB': updateExistingImportFileNameInDb,
    'SIGN_IN': completeLogin,
    'GET_AND_STORE_IMPORT_FIELD_MAPPINGS': getAndStoreImportFieldMappings,
    'FETCH_STUB_VALUES_VIA_ALIAS': fetchStubValuesFromAlias,
    'UPDATE_EXISTING_FORM_IN_DB': updateFormInDb
}