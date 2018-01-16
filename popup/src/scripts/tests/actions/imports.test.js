import configureMockStore from 'redux-mock-store'

import {
    storeRawImportData,
    updateImportFileMapping,
    confirmImport,
    nameImportFile,
    confirmImportFileName,
    setImportedRowIdentifierValue,
    confirmRowIdentifiers
} from '../../actions/imports'

import {
    defaultState,
    importedData,
    standardFields,
    rowIdentifiers,
    importedFieldNames,
    importRowIdentifierField,
    importRowIdentifierValues,
    rowIdentifiersWithImportedRowAssignments,
    importSetupArray
} from '../../../../../event/src/tests/fixtures/imports'

const createMockStore = configureMockStore([])

//confirmRowIdentifiers
const expectedConfirmRowIdentifiersAction = {
    type: 'CONFIRM_ROW_IDENTIFIERS',
    confirmRowIdentifiers: true,
    importSetupArray
}

test('confirmRowIdentifiers should create action object correctly', () => {
    const action = confirmRowIdentifiers(
        rowIdentifiersWithImportedRowAssignments,
        importedData,
        importRowIdentifierField,
        standardFields)
    expect(action).toEqual(expectedConfirmRowIdentifiersAction)
})

test('confirmRowIdentifiers should update store correctly', () => {
    const store = createMockStore(defaultState)
    store.dispatch(confirmRowIdentifiers(
        rowIdentifiersWithImportedRowAssignments,
        importedData,
        importRowIdentifierField,
        standardFields
    ))
    const actions = store.getActions()
    expect(actions[0]).toEqual(expectedConfirmRowIdentifiersAction)
})

//storeRawImportData
test('storeRawImportData should create action object correctly', () => {
    const action = storeRawImportData(importedData, standardFields)
    expect(action).toEqual({
        type: 'STORE_RAW_IMPORT_DATA',
        importedData,
        standardFields,
        importedFieldNames,
        importRowIdentifierField,
        importRowIdentifierValues
    })
})

test('storeRawImportData should update database and store correctly', () => {
    const store = createMockStore(defaultState)
    store.dispatch(storeRawImportData(importedData, standardFields))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
        type: 'STORE_RAW_IMPORT_DATA',
        importedData,
        standardFields,
        importedFieldNames,
        importRowIdentifierField,
        importRowIdentifierValues
    })
})

//updateImportFileMapping
const standardFieldId = "2"
const importedFieldName = "Street Address"
const expectedUpdateAction = {
    type: 'UPDATE_IMPORT_FILE_MAPPING',
    standardFields,
    importRowIdentifierField
}

test('updateImportFileMapping should create action object correctly', () => {
    const action = updateImportFileMapping(
        standardFieldId,
        importedFieldName,
        importRowIdentifierField,
        standardFields
    )
    expect(action).toEqual(expectedUpdateAction)
})

test('updateImportFileMapping should update store correctly', () => {
    const store = createMockStore(defaultState)
    store.dispatch(updateImportFileMapping(
        standardFieldId,
        importedFieldName,
        importRowIdentifierField,
        standardFields
    ))
    const actions = store.getActions()
    expect(actions[0]).toEqual(expectedUpdateAction)
})

//confirmImport
const expectedConfirmAction = {
    type: 'CONFIRM_IMPORT',
    importConfirmed: true,
    standardFields
}

test('confirmImport should create action object correctly', () => {
    const action = confirmImport(standardFields)
    expect(action).toEqual(expectedConfirmAction)
})

test('confirmImport should update store correctly', () => {
    const store = createMockStore(defaultState)
    store.dispatch(confirmImport(standardFields))
    const actions = store.getActions()
    expect(actions[0]).toEqual(expectedConfirmAction)
})

//nameImportFile
const expectedNameImportFileAction = {
    type: 'NAME_IMPORT_FILE',
    importFileName: 'Custom MLS Import File'
}

test('nameImportFile should create action object correctly', () => {
    const action = nameImportFile('Custom MLS Import File')
    expect(action).toEqual(expectedNameImportFileAction)
})

test('nameImportFile should update store correctly', () => {
    const store = createMockStore(defaultState)
    store.dispatch(nameImportFile('Custom MLS Import File'))
    const actions = store.getActions()
    expect(actions[0]).toEqual(expectedNameImportFileAction)
})

//confirmImportFileName
test('confirmImportFileName should create action object correctly', () => {
    const action = confirmImportFileName()
    expect(action).toEqual({
        type: 'CONFIRM_IMPORT_FILE_NAME'
    })
})

//setImportedRowIdentifierValue
const expectedSetImportRowIdentifierValueAction = {
    type: 'SET_IMPORT_ROW_IDENTIFIER_VALUE',
    rowIdentifiers: [{
        rowIdentifierId: "1",
        rowIdentifierName: "Listing Comp 1",
        rowIdentifierPrefix: "L1"
    }, {
        rowIdentifierId: "2",
        rowIdentifierName: "Listing Comp 2",
        rowIdentifierPrefix: "L2"
    }, {
        rowIdentifierId: "3",
        rowIdentifierName: "Listing Comp 3",
        rowIdentifierPrefix: "L3",
        importedRowIdentifierValue: "123 Main Street"
    }]
}

test('setImportedRowIdentifierValue should create action object correctly', () => {
    const action = setImportedRowIdentifierValue('123 Main Street', '3', rowIdentifiers)
    expect(action).toEqual(expectedSetImportRowIdentifierValueAction)
})

test('setImportedRowIdentifierValue should update store correctly', () => {
    const store = createMockStore(defaultState)
    store.dispatch(setImportedRowIdentifierValue('123 Main Street', '3', rowIdentifiers))
    const actions = store.getActions()
    expect(actions[0]).toEqual(expectedSetImportRowIdentifierValueAction)
})