import React from 'react'
import { shallow } from 'enzyme'
import { RowIdentifierLineItem } from '../../components/RowIdentifierLineItem'
import { importRowIdentifierValues, rowIdentifiers } from '../../../../../event/src/tests/fixtures/imports'

test('RowIdentifierLineItem renders correctly', () => {
    const rowIdentifier = {
        rowIdentifierName: "Listing Comp ##1",
        rowIdentifierPrefix: "L##1"
    }
    const wrapper = shallow(<RowIdentifierLineItem 
        importRowIdentifierValues
        rowIdentifierId = "1"
        setImportedRowIdentifierValue = "2983 Briggs Avenue"
        importedRowIdentifierValue = ""
        rowIdentifiers
        rowIdentifier
    />)
    expect(wrapper).toMatchSnapshot()
})