const imports = {}

export default (state = imports, action) => {
  switch (action.type) {
    case 'SET_ROW_IDENTIFIERS_AND_STANDARD_FIELDS':
      return {
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
        selectedImportFileSetupId: null,
        selectedImportFileSetupText: null,
        selectedFormId: undefined,
        selectedFormName: null,
        selectedFormDescription: null,
        selectedFormPublic: false,
        selectedFormConfirmedForImport: false,
        formConfirmed: false,
        importFieldMappingDbUpdates: [],
        preMapConfirmed: false,
        userIsMappingForm: false,
        formFieldSelector: null,
        formMappingStandardFieldId: null,
        formMappingRowIdentifierId: null,
        enteredDefaultValue: null,
        defaultValueConfirmed: false,
        enteredDefaultOverride: null,
        defaultOverrideConfirmed: false,
        rightClickedFormElementType: null,
        rightClickedFormElementValue: null,
        rightClickedFormElementOptions: null,
        rightClickSelectionIsValid: false,
        totalFieldsPopulated: null, 
        importFieldsPopulated: null,
        defaultFieldsPopulated: null,
        fillFormFailed: false
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
        selectedFormDescription: action.selectedFormDescription,
        selectedFormPublic: action.selectedFormPublic,
        selectedFormConfirmedForImport: action.selectedFormConfirmedForImport
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
        selectedFormId: action.selectedFormId,
        formConfirmed: action.formConfirmed
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
        userIsMappingForm: action.userIsMappingForm,
        confirmRowIdentifiers: action.confirmRowIdentifiers
      }
    case 'SET_SELECTED_FORM_PUBLIC':
      return {
        ...state,
        selectedFormPublic: action.selectedFormPublic
      }
    case 'SET_FORM_FIELD_SELECTOR':
      return {
        ...state,
        formFieldSelector: action.formFieldSelector
      }
    case 'SET_FORM_MAPPING_DATA':
      return {
        ...state,
        formMappingRowIdentifierId: action.formMappingRowIdentifierId,
        formMappingStandardFieldId: action.formMappingStandardFieldId
      }
    case 'RESET_FORM_MAPPING_FIELDS':
      return {
        ...state,
        formMappingRowIdentifierId: action.formMappingRowIdentifierId,
        formMappingStandardFieldId: action.formMappingStandardFieldId,
        enteredDefaultValue: action.enteredDefaultValue,
        enteredDefaultOverride: action.enteredDefaultOverride,
        rightClickedFormElementType: action.rightClickedFormElementType,
        rightClickedFormElementValue: action.rightClickedFormElementValue,
        rightClickedFormElementOptions: action.rightClickedFormElementOptions,
        defaultValueConfirmed: action.defaultValueConfirmed,
        defaultOverrideConfirmed: action.defaultOverrideConfirmed,
        formFieldSelector: action.formFieldSelector,
        rightClickSelectionIsValid: action.rightClickSelectionIsValid,
        totalFieldsPopulated: action.totalFieldsPopulated, 
        importFieldsPopulated: action.importFieldsPopulated,
        defaultFieldsPopulated: action.defaultFieldsPopulated
      }
      case 'STORE_FORM_MAPPINGS':
      return {
        ...state,
        formMappingArray: action.formMappingArray,
        importDataArray: action.importDataArray
      }
      case 'SET_DEFAULT_VALUE':
      return {
        ...state,
        enteredDefaultValue: action.enteredDefaultValue
      }
      case 'SET_DEFAULT_OVERRIDE':
      return {
        ...state,
        enteredDefaultOverride: action.enteredDefaultOverride
      }
      case 'TOGGLE_CONFIRM_DEFAULT_VALUE':
      return {
        ...state,
        defaultValueConfirmed: action.defaultValueConfirmed
      }
      case 'TOGGLE_CONFIRM_DEFAULT_OVERRIDE':
      return {
        ...state,
        defaultOverrideConfirmed: action.defaultOverrideConfirmed
      }
      case 'SET_RIGHT_CLICKED_FORM_ELEMENT_ITEMS':
      return {
        ...state,
        rightClickedFormElementType: action.rightClickedFormElementType,
        rightClickedFormElementValue: action.rightClickedFormElementValue,
        rightClickedFormElementOptions: action.rightClickedFormElementOptions
      }
      case 'STORE_FORM_MAPPINGS_DIRECT_FROM_DB':
      return {
        ...state,
        formMappingArray: action.formMappingArray
      }
      case 'SET_DEFAULT_MODAL_ITEMS':
      return {
        ...state,
        enteredDefaultValue: action.enteredDefaultValue,
        enteredDefaultOverride: action.enteredDefaultOverride
      }
      case 'SET_RIGHT_CLICK_SELECTION_IS_VALID':
      return {
        ...state,
        rightClickSelectionIsValid: action.rightClickSelectionIsValid
      }
      case 'SET_POST_FILL_FORM_FIELDS':
      return {
        ...state,
        totalFieldsPopulated: action.totalFieldsPopulated, 
        importFieldsPopulated: action.importFieldsPopulated,
        defaultFieldsPopulated: action.defaultFieldsPopulated
      }
      case 'CLEAR_FILL_FORM_RESULTS':
      return {
        ...state,
        totalFieldsPopulated: action.totalFieldsPopulated,
        importFieldsPopulated: action.importFieldsPopulated,
        defaultFieldsPopulated: action.defaultFieldsPopulated, 
        confirmRowIdentifiers: action.confirmRowIdentifiers,
        selectedFormConfirmedForImport: action.selectedFormConfirmedForImport
      }
      case 'SET_FILL_FORM_FAILED':
      return {
        ...state,
        fillFormFailed: action.fillFormFailed
      }
    default:
      return state
  }
}