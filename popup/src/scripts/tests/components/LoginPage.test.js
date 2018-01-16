import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage'

let startLogin, wrapper
beforeEach(() => {
    startLogin = jest.fn()
    wrapper = shallow(<LoginPage startLogin={startLogin} />)
})

test('LoginPage should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('LoginPage startLogin() should fire when Login with Google button is clicked', () => {
    wrapper.find('button').simulate('click')
    expect(startLogin).toHaveBeenCalled()
})