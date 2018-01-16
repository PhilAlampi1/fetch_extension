import React from 'react'
import { shallow } from 'enzyme'
import { MapImportToStandardFields } from '../../components/MapImportToStandardFields'
import { standardFields } from '../../../../../event/src/tests/fixtures/imports'

const onClickSpyOk = jest.fn()
const onClickSpyError = jest.fn()
const standardFieldsNoImportRowIdentifier = [{
    standardFieldId: "1",
    standardFieldName: "Mapping Field (IDX)",
    standardFieldDescription: "A field for mapping.",
    importRowIdentifier: false,
    importedFieldName: "IDX Address Mapg"
}, {
    standardFieldId: "2",
    standardFieldName: "Type of Property",
    standardFieldDescription: "The type of building or structure the property is.",
    importRowIdentifier: false,
    importedFieldName: "Property Type"
}, {
    standardFieldId: "3",
    standardFieldName: "Address",
    standardFieldDescription: "Address of property.",
    importRowIdentifier: false, // changed this from 'true' for test
    importedFieldName: "Street Address"
}]
const standardFieldsNoImportedFieldName= [{
    standardFieldId: "1",
    standardFieldName: "Mapping Field (IDX)",
    standardFieldDescription: "A field for mapping.",
    importRowIdentifier: false,
    importedFieldName: "IDX Address Mapg"
}, {
    standardFieldId: "2",
    standardFieldName: "Type of Property",
    standardFieldDescription: "The type of building or structure the property is.",
    importRowIdentifier: false,
    importedFieldName: "Property Type"
}, {
    standardFieldId: "3",
    standardFieldName: "Address",
    standardFieldDescription: "Address of property.",
    importRowIdentifier: true,
    importedFieldName: "" // changed this from "Street Address" for test
}]

test('MapImportToStandardFields renders correctly', () => {
    const wrapper = shallow(<MapImportToStandardFields
        standardFields={standardFields}
        updateImportFileMapping={onClickSpyOk}
        setMapImportToStandardFieldsERROR={onClickSpyError}
    />)
    expect(wrapper).toMatchSnapshot()
})

test('MapImportToStandardFields calls confirmImport when button is clicked', () => {
    const wrapper = shallow(<MapImportToStandardFields
        standardFields={standardFields}
        confirmImport={onClickSpyOk}
        importRowIdentifierStandardFieldName="Address"
        mapImportToStandardFieldsERROR={false}
        setMapImportToStandardFieldsERROR={onClickSpyError}
    />)
    wrapper.find('button').simulate('click', standardFields)
    expect(onClickSpyOk).toHaveBeenLastCalledWith(standardFields)
})

test('MapImportToStandardFields calls setMapImportToStandardFieldsERROR when ' +
     'standardFieldSet does not have any importRowIdentifier in it and the button is clicked', () => {
    const wrapper = shallow(<MapImportToStandardFields 
        standardFields={standardFieldsNoImportRowIdentifier}
        confirmImport={onClickSpyOk}
        importRowIdentifierStandardFieldName="Address"
        setMapImportToStandardFieldsERROR={onClickSpyError}
        mapImportToStandardFieldsERROR={false}
    />)
    wrapper.find('button').simulate('click', standardFieldsNoImportRowIdentifier)
    expect(onClickSpyError).toHaveBeenLastCalledWith()
})

test('MapImportToStandardFields calls setMapImportToStandardFieldsERROR when standardField with importRowIdentifier' +
     'does not have an importedFieldName and the button is clicked', () => {
    const wrapper = shallow(<MapImportToStandardFields 
        standardFields={standardFieldsNoImportedFieldName}
        confirmImport={onClickSpyOk}
        importRowIdentifierStandardFieldName="Address"
        setMapImportToStandardFieldsERROR={onClickSpyError}
        mapImportToStandardFieldsERROR={false}
    />)
    wrapper.find('button').simulate('click', standardFieldsNoImportedFieldName)
    expect(onClickSpyError).toHaveBeenLastCalledWith()
})