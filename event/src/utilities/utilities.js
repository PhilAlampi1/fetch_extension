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
