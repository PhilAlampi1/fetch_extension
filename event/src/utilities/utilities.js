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
