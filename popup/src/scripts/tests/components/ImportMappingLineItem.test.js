import React from 'react'
import { shallow } from 'enzyme'
import ImportMappingLineItem from '../../components/ImportMappingLineItem'

test('ImportMappingLineItem should render correctly with input values', () => {
    const handleOnChangeSpy = jest.fn()
    const action = shallow(<ImportMappingLineItem 
        standardFieldId="123"
        importedFieldName="# Bedrooms"
        handleOnChange={handleOnChangeSpy}
        standardFieldName="Num Bedrooms"
        standardFieldDescription="Number of bedrooms in the property."
        />)
    expect(action).toMatchSnapshot()
})

test('ImportMappingLineItem should render correctly with input values', () => {

})