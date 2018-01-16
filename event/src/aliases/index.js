import { completeLogin } from './auth'
import { createImportFileSetup, 
    getAndStoreImportFieldMappings, 
    updateImportFieldMappingsInDb, 
    updateExistingImportFileNameInDb } from './imports'

export default {
    'CONFIRM_NEW_IMPORT_FILE_NAME': createImportFileSetup,
    'UPDATE_IMPORT_FIELD_MAPPINGS_IN_DB': updateImportFieldMappingsInDb,
    'UPDATE_EXISTING_IMPORT_FILE_NAME_IN_DB': updateExistingImportFileNameInDb,
    'SIGN_IN': completeLogin,
    'GET_AND_STORE_IMPORT_FIELD_MAPPINGS': getAndStoreImportFieldMappings
}