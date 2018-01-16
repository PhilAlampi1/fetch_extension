import React from 'react'
import { shallow } from 'enzyme'
import { SelectWithImportOptions } from '../../components/SelectWithImportOptions'
import { importFieldOptions } from '../../../../../event/src/tests/fixtures/imports'
// import auth from '../../../../../event/src/tests/fixtures/auth'

// test('', () => {

// })

const onChangeSpy = jest.fn()
const importedFieldName = "Number of Bathrooms"
const localImportFieldOptions = importFieldOptions
const standardFieldId = "4"
test('SelectWithImportOptions renders correctly with inputs', () => {
    const wrapper = shallow(<SelectWithImportOptions
        handleOnChange={onChangeSpy}
        importFieldOptions={localImportFieldOptions}
        importedFieldName
        standardFieldId
    />)
    expect(wrapper).toMatchSnapshot()
})

test('SelectWithImportOptions select element calls handleOnChange with correct values on change', () => {
    const e = {
        target: {
            value: "Property Type"
        }   
    }
    const wrapper = shallow(<SelectWithImportOptions
        handleOnChange={onChangeSpy}
        importFieldOptions={localImportFieldOptions}
        importedFieldName
        standardFieldId
    />)
    wrapper.find('select').simulate('change', e)
    expect(onChangeSpy).toHaveBeenCalled()
})