import React from 'react'
import { shallow } from 'enzyme'
import { ImportFileName } from '../../components/ImportFileName'

test('ImportFileName should render correctly', () => {
    const wrapper = shallow(<ImportFileName />)
    expect(wrapper).toMatchSnapshot()
})

test('ImportFileName should render correctly with correct prop input value', () => {
    const wrapper = shallow(<ImportFileName importFileName='Test File Name'/>)
    expect(wrapper).toMatchSnapshot()
})

test('confirmImportFileName is called on click', () => {
    const onClickSpy = jest.fn()
    const wrapper = shallow(<ImportFileName localConfirmImportFileName={onClickSpy} importFileName='Test File Name'/>)
    wrapper.find('button').simulate('click')
    expect(onClickSpy).toHaveBeenCalled()
})

test('nameImportFile is called with correct value on blur', () => {
    const onBlurSpy = jest.fn()
    const wrapper = shallow(<ImportFileName localNameImportFile={onBlurSpy} importFileName='Test File Name'/>)
    wrapper.find('input').simulate('blur', 'Test File Name')
    expect(onBlurSpy).toHaveBeenLastCalledWith('Test File Name')
})