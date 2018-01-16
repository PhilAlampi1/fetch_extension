import authReducer from '../../reducers/auth'
import userState from '../fixtures/auth'

let action
beforeEach(() => {
    action = {
        type: 'COMPLETE_SIGN_IN',
        ...userState
    }
})

test('auth reducer should set state correctly with starting with a default (blank) state', () => {
    const state = authReducer(undefined, action)
    expect(state).toEqual(userState)
})

test('auth reducer should set a new state correctly when updating from previous state', () => {
    const prevState = {
        googleToken: "OLD_TOKEN_123",
        googleId: "OLD_GOOGLE_ID_123",
        firstName: "OLD_FIRSTNAME_123",
        email: "OLD_EMAIL_123",
        userId: "OLD_USERID_123",
        userToken: "OLD_TOKEN_123"
    }
    const state = authReducer(prevState, action)
    expect(state).toEqual(userState)
})


