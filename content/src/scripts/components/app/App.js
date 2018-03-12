import React, { Component } from 'react'
import { connect } from 'react-redux'
import { select } from 'optimal-select'
import ReactModal from 'react-modal'
import {
  setFormFieldSelector,
  toggleConfirmDefaultValue,
  setDefaultValue,
  setDefaultOverride,
  toggleConfirmDefaultOverride,
  setRightClickedFormElementItems,
  setDefaultModalItems,
  setRightClickSelectionIsValid,
  storeTransactionHistory
} from './actions'
import { fillForm } from './utilities'
import SetDefaultValue from './SetDefaultValue'
import SetDefaultOverride from './SetDefaultOverride'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentDidMount() {

    document.addEventListener('contextmenu', (e) => {

      // Ignore if not a text, textarea, radio, checkbox or select field
      let isValidSelection = this.validateSelection(e.target)

      // Store formFieldSelector and other field attributes in Redux when user right clicks a DOM element while mapping
      if (isValidSelection && this.props.userIsMappingForm) {
        this.props.setRightClickSelectionIsValid(true)
        let eleSelector = select(e.target)

        if (eleSelector !== undefined && !eleSelector.includes('ReactModal')) { // not right clicking in modal, so proceed
          const ele = document.querySelector(eleSelector)
          const eleType = ele.type ? ele.type : null
          const eleValue = ele.value ? ele.value : null
          let eleOptions = null

          if (ele.options) {
            eleOptions = []
            for (let i = 0; i < ele.options.length; i++) {
              eleOptions.push({ label: ele.options[i].text, value: ele.options[i].value })
            }
          }

          this.props.setRightClickedFormElementItems(eleType, eleValue, eleOptions)
          let setSelectorPromise = new Promise((resolve, reject) => {
            resolve(this.props.setFormFieldSelector(eleSelector))
          })

          setSelectorPromise.then((selector) => {
            // Check and set initial modal values
            if (this.props.formFieldSelector !== null && this.props.formMappingArray !== []) { // compare formFieldSelector with each formMapping in store
              const foundIndex = this.props.formMappingArray.findIndex((item) => item.formFieldSelector === this.props.formFieldSelector)
              if (foundIndex !== -1) { // if a match is found, set the default modal items in the store
                const foundItem = this.props.formMappingArray[foundIndex]
                this.props.setDefaultModalItems(foundItem.defaultValue, foundItem.overrideImportWithDefault)
              }
            }
          })

        }
      }
    }, true)

    // Listen for message from context menu when "Set Default" item is selected
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

      switch (request.type) {

        case 'openModal':
          this.toggleModal()
          break

        case 'fillFormContent':
          // Content script is loaded multiple times (3x), unable to prevent using APIs available
          // So instead, check to see if fillForm has already run, if not run it
          if (!this.props.totalFieldsPopulated || this.props.totalFieldsPopulated === 0) {
            sendResponse({ result: fillForm(request.ida, this.props.userIsMappingForm) })
          }
          // return true
          break

      }

    })



    // // Listen for message from context menu when "Set Default" item is selected
    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    //   switch (request.type) {

    //     case 'openModal':
    //       this.toggleModal()
    //       break

    //     case 'fillFormContent':
    //       sendResponse({ result: fillForm(request.ida) })
    //       return true
    //     // break

    //   }

    // })

  }

  validateSelection = (e) => {

    const validTagNames = ['input', 'textarea', 'select']
    const validInputTypes = ['text', 'radio', 'checkbox', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password', 'range']
    let isValid = validTagNames.includes(e.tagName.toLowerCase())

    if (isValid && e.tagName.toLowerCase() === 'input') {
      isValid = validInputTypes.includes(e.type.toLowerCase())
    }

    return isValid

  }

  toggleModal = () => {

    this.setState((prevState) => ({
      ...prevState,
      showModal: !this.state.showModal
    }))

  }

  clearDefaultValues = () => {
    this.props.toggleConfirmDefaultValue(false)
    this.props.setDefaultValue(null)
    this.props.setDefaultOverride(null)
    this.props.toggleConfirmDefaultOverride(false)
    this.props.setRightClickedFormElementItems(null, null, null)
    this.props.setFormFieldSelector(null)
    this.props.setRightClickSelectionIsValid(false)
  }

  onRequestClose = (event) => {
    // Ignore react-modal esc-close handling to ensure clearDefaultValues is run on every close (via Cancel button)
    if (event.type === 'keydown' && event.keyCode === 27) {
      return
    } else {
      toggleModal()
    }
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.onRequestClose}
          contentLabel="Set Defaults"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          {!this.props.defaultValueConfirmed
            ? <SetDefaultValue toggleModal={this.toggleModal}
              clearDefaultValues={this.clearDefaultValues}
            />
            : <SetDefaultOverride toggleModal={this.toggleModal} clearDefaultValues={this.clearDefaultValues} />
          }
        </ReactModal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userIsMappingForm: state.imports.userIsMappingForm,
  defaultValueConfirmed: state.imports.defaultValueConfirmed,
  formFieldSelector: state.imports.formFieldSelector,
  formMappingArray: state.imports.formMappingArray,
  totalFieldsPopulated: state.imports.totalFieldsPopulated
})

const mapDispatchToProps = (dispatch) => ({
  setFormFieldSelector: (newSelector) => dispatch(setFormFieldSelector(newSelector)),
  setDefaultValue: (newDefaultValue) => dispatch(setDefaultValue(newDefaultValue)),
  setDefaultOverride: (newDefaultOverride) => dispatch(setDefaultOverride(newDefaultOverride)),
  toggleConfirmDefaultValue: (toggleValue) => dispatch(toggleConfirmDefaultValue(toggleValue)),
  toggleConfirmDefaultOverride: (toggleValue) => dispatch(toggleConfirmDefaultOverride(toggleValue)),
  setRightClickedFormElementItems: (type, value, options) => dispatch(setRightClickedFormElementItems(type, value, options)),
  setDefaultModalItems: (value, override) => dispatch(setDefaultModalItems(value, override)),
  setRightClickSelectionIsValid: (setting) => dispatch(setRightClickSelectionIsValid(setting)),
  storeTransactionHistory: () => dispatch(storeTransactionHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)