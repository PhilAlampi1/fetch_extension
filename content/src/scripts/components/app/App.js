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
  setRightClickedFormElementItems
} from './actions'
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
      // Store formFieldSelector in Redux when user right clicks a DOM element while mapping
      if (this.props.userIsMappingForm) {
        let eleSelector = select(e.target)
        if (eleSelector !== undefined && !eleSelector.includes('ReactModal')) { // not in modal
          const ele = document.querySelector(eleSelector)
          const eleType = ele.type ? ele.type : null
          const eleValue = ele.value ? ele.value : null
          let eleOptions = null
          if (ele.options) {
            eleOptions = []
            for (let i=0; i < ele.options.length; i++) {
              eleOptions.push({label: ele.options[i].text, value: ele.options[i].value})
            }
          }
          this.props.setRightClickedFormElementItems(eleType, eleValue, eleOptions)
          this.props.setFormFieldSelector(eleSelector)
        }
      }
    }, true)
    // Listen for message from context menu when "Set Default" item is selected
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.type) {
        case "openModal":
          this.toggleModal()
          break
      }
    })
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
    this.props.setDefaultOverride(true)
    this.props.toggleConfirmDefaultOverride(false)
    this.props.setRightClickedFormElementItems(null, null, null)
  }
  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Set Defaults"
          ariaHideApp={false}
        >
          {!this.props.defaultValueConfirmed
            ? <SetDefaultValue toggleModal={this.toggleModal} clearDefaultValues={this.clearDefaultValues} />
            : <SetDefaultOverride toggleModal={this.toggleModal} clearDefaultValues={this.clearDefaultValues} />
          }
        </ReactModal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userIsMappingForm: state.imports.userIsMappingForm,
  defaultValueConfirmed: state.imports.defaultValueConfirmed
})

const mapDispatchToProps = (dispatch) => ({
  setFormFieldSelector: (newSelector) => dispatch(setFormFieldSelector(newSelector)),
  setDefaultValue: (newDefaultValue) => dispatch(setDefaultValue(newDefaultValue)),
  setDefaultOverride: (newDefaultOverride) => dispatch(setDefaultOverride(newDefaultOverride)),
  toggleConfirmDefaultValue: (toggleValue) => dispatch(toggleConfirmDefaultValue(toggleValue)),
  toggleConfirmDefaultOverride: (toggleValue) => dispatch(toggleConfirmDefaultOverride(toggleValue)),
  setRightClickedFormElementItems: (type, value, options) => dispatch(setRightClickedFormElementItems(type, value, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)