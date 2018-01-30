import { setRowIdentifiersAndStandardFields } from '../actions/init'
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

export const setupContextMenu = () => {
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
                // Get required data if the user selects a "MapToFieldContext" child:
                // (FK) importRowIdentifierId (bigint) - from selected RowIdentifier contextMenuID
                // (FK) createdByUserId (bigint) - from store
                // (FK) formId (bigint) - from store
                // (FK) standardFieldId (bigint) - from selected Standard Field contextMenuId
                // formFieldSelector (text) - from store    
                // publicMapping (boolean) - false unless form is public and user role is ADMIN

                const sfId = menuId.substr(0, menuDashIndex)
                const riId = menuId.substr(menuDashIndex + 1, menuId.length)
                console.log('sfId: ', sfId)
                console.log('riId: ', riId)

                //LEFT OFF - MAKE SURE ALL OF THESE ARE BEING STORED IN STATE THEN CALL ALIAS FUNCTION VIA ACTION
                // req.params.irid,
                // req.params.formid,
                // req.params.standardfieldid,
                // req.params.formfieldselector,
                // req.params.publicmapping,
                // req.params.defaultvalue,
                // req.params.override,
                // req.params.usertoken))



            }
        })
    }


    // TODO code some indicator for Set defaul modal here (need to execute in context script though)

}