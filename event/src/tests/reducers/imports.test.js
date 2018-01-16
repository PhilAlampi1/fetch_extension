import importsReducer from '../../reducers/imports'
import {
    defaultState, 
    importedData, 
    standardFields, 
    rowIdentifiers,
    importedFieldNames,
    importRowIdentifierField,
    importRowIdentifierValues,
    importSetupArray
} from '../fixtures/imports'

test('imports reducer should set state correctly with SET_ROW_IDENTIFIERS_AND_STANDARD_FIELDS action', () => {
    const action = {
        type: 'SET_ROW_IDENTIFIERS_AND_STANDARD_FIELDS',
        standardFields,
        rowIdentifiers
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        standardFields,
        rowIdentifiers,
        importRowIdentifierStandardFieldName: 'Address',
        // importRowIdentifierStandardFieldId: '2',
        mapImportToStandardFieldsERROR: false
    })
})

test('imports reducer should set state correctly with STORE_RAW_IMPORT_DATA action', () => {
    const action = {
        type: 'STORE_RAW_IMPORT_DATA',
        importedData,
        standardFields,
        importedFieldNames,
        importRowIdentifierField,
        importRowIdentifierValues
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        importedData,
        standardFields,
        importedFieldNames,
        importRowIdentifierField,
        importRowIdentifierValues
    })
})

test('imports reducer should set state correctly with UPDATE_IMPORT_FILE_MAPPING action', () => {
    const action = {
        type: 'UPDATE_IMPORT_FILE_MAPPING',
        importRowIdentifierField,
        standardFields
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        importRowIdentifierField,
        standardFields
    })
})

test('imports reducer should set state correctly with CONFIRM_IMPORT action', () => {
    const action = {
        type: 'CONFIRM_IMPORT',
        importConfirmed: true,
        standardFields
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        importConfirmed: true,
        standardFields,
        mapImportToStandardFieldsERROR: false
    })
})

test('imports reducer should set state correctly with NAME_IMPORT_FILE action', () => {
    const action = {
        type: 'NAME_IMPORT_FILE',
        importFileName: 'TEST IMPORT FILE NAME'
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        importFileName: 'TEST IMPORT FILE NAME'
    })
})

test('imports reducer should set state correctly with COMPLETE_CONFIRM_IMPORT_FILE_NAME action', () => {
    const action = {
        type: 'COMPLETE_CONFIRM_IMPORT_FILE_NAME',
        importFileNameConfirmed: true,
        selectedImportFileSetupId: "202"
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        importFileNameConfirmed: true,
        selectedImportFileSetupId: "202"
    })
})

test('imports reducer should set state correctly with SET_IMPORT_ROW_IDENTIFIER_VALUE action', () => {
    const action = {
        type: 'SET_IMPORT_ROW_IDENTIFIER_VALUE',
        rowIdentifiers
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        rowIdentifiers
    })
})

test('imports reducer should set state correctly with CONFIRM_ROW_IDENTIFIERS action', () => {
    const action = {
        type: 'CONFIRM_ROW_IDENTIFIERS',
        confirmRowIdentifiers: true,
        importSetupArray
    }
    const state = importsReducer(undefined, action)
    expect(state).toEqual({
        ...defaultState,
        confirmRowIdentifiers: true,
        importSetupArray
    })
})