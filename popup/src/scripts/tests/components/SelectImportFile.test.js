import React from 'react'
import { shallow } from 'enzyme'
import { SelectImportFile } from '../../components/SelectImportFile'

const onChangeSpy = jest.fn()
test('SelectImportFile renders correctly', () => {
    const wrapper = shallow(<SelectImportFile
        message='Test message'
        handleOnChange={onChangeSpy}
    />)
    expect(wrapper).toMatchSnapshot()
})

test('SelectImportFile input calls handleOnChange when changed', () => {
    const wrapper = shallow(<SelectImportFile
        message='Test message'
        handleOnChange={onChangeSpy}
    />)
    wrapper.find('input').simulate('change')
    expect(onChangeSpy).toHaveBeenCalled()
})