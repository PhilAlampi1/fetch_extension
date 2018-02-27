import { setRowIdentifiersAndStandardFields } from '../actions/init'
import { setFormMappingData, createUpdateUserFormFieldMappingInDb } from '../actions/imports'
import { store } from '../index'

export const status = (response) => {
    const status = response.status
    if (status >= 200 && status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

export const json = (response) => {
    return response.json()
}

export const serverPath = 'http://localhost:3000/'

export const formatForXhr = (unformattedData) => {
    let formattedData = ''
    unformattedData.map((dataItem) => {
        formattedData = formattedData
            .concat(
            formattedData && '&',
            dataItem.name,
            '=',
            dataItem.value)
    })
    return formattedData
}

export const findAndStoreImportFileSetups = (userId, userToken, dispatch) => {
    return fetch(serverPath + 'findimportfilesetups/' +
        userId + '/' +
        userToken)
        .then(json)
        .then(result => {
            dispatch({
                type: 'STORE_IMPORT_FILE_SETUPS',
                importFileSetups: result.data
            })
        })
}

export const findAndStoreUserForms = (userToken, dispatch) => {
    return fetch(serverPath + 'finduserforms/' + userToken)
        .then(json)
        .then(result => {
            dispatch({
                type: 'STORE_USER_FORMS',
                userForms: result.data
            })
        })
}

export const fetchStubValues = () => {
    // Fetch initial standardFields and rowIdentifiers stub values from DB, update store
    const rowIdentifiersPromise = fetch(serverPath + 'rowidentifiersstub').then(json)
    const standardFieldsPromise = fetch(serverPath + 'standardfieldsstub').then(json)
    return Promise.all([standardFieldsPromise, rowIdentifiersPromise])
        .then(values => {
            const standardFields = values[0].data
            const rowIdentifiers = values[1].data
            store.dispatch(setRowIdentifiersAndStandardFields(rowIdentifiers, standardFields))
        })
}

export const setupContextMenu = (dispatch) => {
    const state = store.getState()
    if (state.imports.userIsMappingForm) {
        const contextMenuFetchItem = {
            id: "TopLevelContext",
            title: "Fetch",
            contexts: ['all']
        }
        const contextMenuSetDefaultItem = {
            id: "SetDefaultContext",
            title: "Set Default",
            parentId: "TopLevelContext",
            contexts: ['all']
        }
        const contextMenuMapToFieldItem = {
            id: "MapToFieldContext",
            title: "Map to Field",
            parentId: "TopLevelContext",
            contexts: ['all']
        }
        const menuFetchItem = chrome.contextMenus.create(contextMenuFetchItem)
        const setDefaultItem = chrome.contextMenus.create(contextMenuSetDefaultItem)
        const mapToFieldItem = chrome.contextMenus.create(contextMenuMapToFieldItem)
        // Create a contextMenuItem for each Row Identifier
        // For each Row Identifier, create an option for each Standard Field
        // If the Standard Field has an importedFieldName, show as: <StandardFieldName> - <Imported Field Name>
        const standardFields = state.imports.standardFields
        const rowIdentifiers = state.imports.rowIdentifiers
        rowIdentifiers.map((ri) => {
            const riContextItemInfo = {
                id: ri.rowIdentifierId,
                title: ri.rowIdentifierName,
                parentId: "MapToFieldContext",
                contexts: ['all']
            }
            const riContextItem = chrome.contextMenus.create(riContextItemInfo, () => {
                //LEFT OFF - TODO - you could lookup the import file value here (if one) and add to sfTitle below
                //This would make it easier to map because the user would see the value while mapping
                standardFields.map((sf) => {
                    const sfTitle = sf.importedFieldName
                        ? sf.standardFieldName + ' - ' + sf.importedFieldName
                        : sf.standardFieldName
                    const sfContextItemInfo = {
                        id: '' + sf.standardFieldId + '-' + ri.rowIdentifierId, //concat for unique id
                        title: sfTitle,
                        parentId: ri.rowIdentifierId,
                        contexts: ['all']
                    }
                    const sfContextItem = chrome.contextMenus.create(sfContextItemInfo)
                })
            })
        })
        chrome.contextMenus.onClicked.addListener((item) => {
            const menuId = item.menuItemId
            const menuDashIndex = item.menuItemId.indexOf('-')
            if (menuDashIndex !== -1) { // a "MapToFieldContext" child has been selected
                const sfId = Number(menuId.substr(0, menuDashIndex))
                const riId = Number(menuId.substr(menuDashIndex + 1, menuId.length))
                dispatch(setFormMappingData(sfId, riId))
                dispatch(createUpdateUserFormFieldMappingInDb())
                alert('Mapping complete')
            } else if (menuId === 'SetDefaultContext') { // "Set Defaults" has been clicked
                // Send message to content script to open modal
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { type: "openModal" })
                })
            }
        })
    }
}