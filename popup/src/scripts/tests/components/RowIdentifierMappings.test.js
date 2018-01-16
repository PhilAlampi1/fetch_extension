import React from 'react'
import { shallow } from 'enzyme'
import { RowIdentifierMappings } from '../../components/RowIdentifierMappings'
import {
    rowIdentifiers,
    importedData,
    standardFields,
    importRowIdentifierValues,
    importedRowIdentifierField
} from '../../../../../event/src/tests/fixtures/imports'

const importedRowIdentifierValue = "2983 Briggs Avenue"
const rowIdentifier = rowIdentifiers[0]
const setImportedRowIdentifierValue = "2731 Kingsbridge Terrace"
const rowIdentifiersObj = rowIdentifiers

test('RowIdentifierMappings should render correctly', () => {
    const wrapper = shallow(<RowIdentifierMappings
        rowIdentifiers={rowIdentifiersObj}
        importedData
        importedRowIdentifierField
        setImportedRowIdentifierValue
        importRowIdentifierValues
    />)
    expect(wrapper).toMatchSnapshot()
})

test('RowIdentifierMappings should call confirmRowIdentifiers when button is clicked', () => {
    const onClickSpy = jest.fn()
    const wrapper = shallow(<RowIdentifierMappings
        rowIdentifiers={rowIdentifiersObj}
        importedData
        importedRowIdentifierField
        setImportedRowIdentifierValue
        importRowIdentifierValues
        confirmRowIdentifiers = {onClickSpy}
    />)
    //LEFT OFF HERE - GETTING ERROR ON TOHAVEBEENLASTCALLEDWITH
    wrapper.find('button').simulate('click')
    expect(onClickSpy).toHaveBeenCalled()
})