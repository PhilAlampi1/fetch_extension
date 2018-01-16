import { status, json, serverPath, findAndStoreImportFileSetups } from '../utilities/utilities'

// COMPLETE_SIGN_IN
export const completeLogin = () => {
    return (dispatch) => {
        chrome.identity.getAuthToken({ interactive: true }, (googleToken) => {
            if (chrome.runtime.lastError) {
                alert(chrome.runtime.lastError.message)
                return
            }
            fetch('https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + googleToken)
                .then(status)
                .then(json)
                .then((data) => {
                    //Add or update user in DB
                    fetch(serverPath + 'signin/' +
                        data.id + '/' +
                        data.given_name + '/' +
                        data.email + '/' +
                        googleToken)
                        .then(json)
                        .then(dbValues => {
                            findAndStoreImportFileSetups(dbValues.data.userId, dbValues.data.userToken, dispatch)
                            return dispatch({
                                type: 'COMPLETE_SIGN_IN',
                                googleId: data.id,
                                googleToken: googleToken,
                                firstName: data.given_name,
                                email: data.email,
                                userToken: dbValues.data.userToken,
                                userId: dbValues.data.userId
                            })
                        })
                }).catch((error) => {
                    console.log('Request failed', error);
                })
        })
    }
}