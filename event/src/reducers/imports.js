const imports = {
  // confirmRowIdentifiers: false,
  // importConfirmed: false,
  // importFileNameConfirmed: false,
  // importRowIdentifierValues: [],
  // importSetupArray: [], // holds import setup values to be matched with formMappingArray from DB
  // formMappingArray: [], // holds a dump of that form's mappings from DB
  // importDataArray: [] // holds the final cut of data to be imported to the form
}

export default (state = imports, action) => {
  switch (action.type) {
    case 'SET_ROW_IDENTIFIERS_AND_STANDARD_FIELDS':
      return {
        // ...state,
        importFileSetups: state.importFileSetups,
        usersCurrentPage: 'main',
        confirmRowIdentifiers: false,
        importConfirmed: false,
        importFileNameConfirmed: false,
        importRowIdentifierValues: [],
        importSetupArray: [], // holds import setup values to be matched with formMappingArray from DB
        formMappingArray: [], // holds a dump of that form's mappings from DB
        importDataArray: [], // holds the final cut of data to be imported to the form
        standardFields: action.standardFields,
        rowIdentifiers: action.rowIdentifiers,
        importRowIdentifierStandardFieldName: 'Address',
        mapImportToStandardFieldsERROR: false,
        promptUserOnStartOver: false,
        // userCreatingNewImportFileSetup: false,
        selectedImportFileSetupId: null,
        selectedImportFileSetupText: null,
        selectedFormId: null,
        selectedFormName: null,
        selectedFormDescription: null,
        selectedFormPublic: null,
        formConfirmed: false,
        importFieldMappingDbUpdates: [],
        preMapConfirmed: false,
        userIsMappingForm: false
      }
    case 'STORE_IMPORT_FILE_SETUPS':
      return {
        ...state,
        importFileSetups: action.importFileSetups
      }
    case 'STORE_RAW_IMPORT_DATA':
      return {
        ...state,
        importedData: action.importedData,
        standardFields: action.standardFields,
        importedFieldNames: action.importedFieldNames,
        importRowIdentifierField: action.importRowIdentifierField,
        importRowIdentifierValues: action.importRowIdentifierValues
      }
    case 'UPDATE_IMPORT_FILE_MAPPING_IN_STORE':
      return {
        ...state,
        standardFields: action.standardFields,
        importRowIdentifierField: action.importRowIdentifierField
      }
    case 'UPDATE_IMPORT_FILE_MAPPING_IN_STORE_AND_FLAG_FOR_DB_UPDATE':
      return {
        ...state,
        standardFields: action.standardFields,
        importRowIdentifierField: action.importRowIdentifierField,
        importFieldMappingDbUpdates: action.newImportFieldMappingDbUpdates
      }
    case 'COMPLETE_UPDATE_IMPORT_FIELD_MAPPINGS_IN_DB':
      return {
        ...state,
        importFieldMappingDbUpdates: action.importFieldMappingDbUpdates
      }
    case 'SET_MAP_IMPORT_TO_STANDARDFIELDS_ERROR':
      return {
        ...state,
        mapImportToStandardFieldsERROR: true
      }
    case 'CONFIRM_IMPORT':
      return {
        ...state,
        importConfirmed: action.importConfirmed,
        standardFields: action.standardFields,
        mapImportToStandardFieldsERROR: false
      }
    case 'NAME_IMPORT_FILE':
      return {
        ...state,
        selectedImportFileSetupName: action.selectedImportFileSetupName
        // importFileName: action.importFileName
      }
    case 'COMPLETE_CONFIRM_NEW_IMPORT_FILE_NAME':
      return {
        ...state,
        importFileNameConfirmed: action.importFileNameConfirmed,
        selectedImportFileSetupId: action.selectedImportFileSetupId
      }
    case 'CONFIRM_EXISTING_IMPORT_FILE_NAME':
      return {
        ...state,
        importFileNameConfirmed: action.importFileNameConfirmed
      }
    case 'SET_IMPORT_ROW_IDENTIFIER_VALUE':
      return {
        ...state,
        rowIdentifiers: action.rowIdentifiers
      }
    case 'CONFIRM_ROW_IDENTIFIERS':
      return {
        ...state,
        confirmRowIdentifiers: action.confirmRowIdentifiers,
        importSetupArray: action.importSetupArray
      }
    case 'SET_SELECTED_IMPORT_FILE_SETUP':
      return {
        ...state,
        selectedImportFileSetupId: action.selectedImportFileSetupId,
        selectedImportFileSetupName: action.selectedImportFileSetupName
      }
    case 'STORE_IMPORT_FIELD_MAPPINGS':
      return {
        ...state,
        standardFields: action.standardFields
      }
    case 'TOGGLE_PROMPT_USER_ON_START_OVER':
      return {
        ...state,
        promptUserOnStartOver: action.promptUserOnStartOver
      }
    case 'UPDATE_USERS_CURRENT_PAGE':
      return {
        ...state,
        usersCurrentPage: action.usersCurrentPage
      }
    case 'SET_SELECTED_FORM':
      return {
        ...state,
        selectedFormId: action.selectedFormId,
        selectedFormName: action.selectedFormName,
        selectedFormDescription: action.selectedFormDescription
      }
    case 'NAME_FORM':
      return {
        ...state,
        selectedFormName: action.selectedFormName
      }
    case 'DESCRIBE_FORM':
      return {
        ...state,
        selectedFormDescription: action.selectedFormDescription
      }
    case 'SET_SELECTED_FORM_ID':
      return {
        ...state,
        selectedFormId: action.selectedFormId
      }
    case 'STORE_USER_FORMS':
      return {
        ...state,
        userForms: action.userForms
      }
    case 'CONFIRM_EXISTING_FORM':
      return {
        ...state,
        formConfirmed: action.formConfirmed
      }
    case 'CONFIRM_UPDATE_FORM':
      return {
        ...state,
        formConfirmed: action.formConfirmed
      }
    case 'CONFIRM_PRE_MAP':
      return {
        ...state,
        preMapConfirmed: action.preMapConfirmed
      }
    case 'SET_USER_IS_MAPPING_FORM':
      return {
        ...state,
        userIsMappingForm: action.userIsMappingForm
      }
    default:
      return state
  }
}