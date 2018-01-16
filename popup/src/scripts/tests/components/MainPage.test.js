import React from 'react'
import { shallow } from 'enzyme'
import { MainPage } from '../../components/MainPage'
import { standardFields, defaultState } from '../../../../../event/src/tests/fixtures/imports'
import auth from '../../../../../event/src/tests/fixtures/auth'

let firstName = auth.firstName,
    isImportedData = false,
    importConfirmed = false,
    importFileNameConfirmed = false

test('MainPage renders SelectImportFile component when props.isImportedData=false', () => {
    const wrapper = shallow(<MainPage 
        firstName
        isImportedData
        importConfirmed
        importFileNameConfirmed
        standardFields
    />)
    expect(wrapper).toMatchSnapshot()
})

test('MainPage renders MapImportToStandardFields component when props.isImportedData && !props.importConfirmed', () => {
    let isImportedData2 = true
    const wrapper = shallow(<MainPage 
        firstName
        isImportedData2
        importConfirmed
        importFileNameConfirmed
        standardFields
    />)
    expect(wrapper).toMatchSnapshot()
})

test('MainPage renders ImportFileName component when props.importConfirmed && !props.importFileNameConfirmed', () => {
    isImportedData = true
    importConfirmed = true
    const wrapper = shallow(<MainPage 
        firstName
        isImportedData
        importConfirmed
        importFileNameConfirmed
        standardFields
    />)
    expect(wrapper).toMatchSnapshot()
})

test('MainPage renders RowIdentifierMappings when props.importFileNameConfirmed', () => {
    isImportedData = true
    importConfirmed = true
    importFileNameConfirmed = true
    const wrapper = shallow(<MainPage 
        firstName
        isImportedData
        importConfirmed
        importFileNameConfirmed
        standardFields
    />)
    expect(wrapper).toMatchSnapshot()
})