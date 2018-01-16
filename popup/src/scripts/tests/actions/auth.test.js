import {startLogin} from '../../actions/auth'

test('startLogin() creates action object correctly', () => {
    const action = startLogin()
    expect(action).toEqual({
        type: 'SIGN_IN'
    })
})