import React, { Component } from 'react'
import { connect } from 'react-redux'
import { select } from 'optimal-select'
import { setFormFieldSelector } from './actions'

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    document.addEventListener('contextmenu', (e) => {
      if (this.props.userIsMappingForm) {
        console.log('settingFormSelector!')
        let clickedEl = select(e.target)
        this.props.setFormFieldSelector(clickedEl)
      }
    }, true)
  }
  componentWillUpdate() {
    console.log('Updating')
  }
  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  userIsMappingForm: state.imports.userIsMappingForm
})

const mapDispatchToProps = (dispatch) => ({
  setFormFieldSelector: (newSelector) => dispatch(setFormFieldSelector(newSelector))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)