import React from 'react'
import { connect } from 'react-redux'
import { setSelectedForm, describeForm } from '../actions/imports'

export class FormMappings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOptionId: '',
            selectedOptionName: '',
            showError: false
        }
    }
    setOptionOnChange = (e) => {
        const newOptionId = e.target.value
        const newOptionName = e.target.options[e.target.selectedIndex].text
        this.setState((prevState) => ({
            ...prevState,
            selectedOptionId: newOptionId,
            selectedOptionName: newOptionName
        }))
    }
    setSelectedForm = () => {
        let description = null
        !this.state.selectedOptionId
            ? this.setState((prevState) => ({
                ...prevState,
                showError: true
            }))
            : this.setState((prevState) => ({
                ...prevState,
                showError: false
            }))
        const foundIndex = parseInt(this.props.userForms.findIndex((item) => {
            return item.formId === this.state.selectedOptionId
        }), 10)
        foundIndex !== -1 && (description = this.props.userForms[foundIndex].formDescription)
        this.props.setSelectedForm(this.state.selectedOptionId, this.state.selectedOptionName, description)
    }
    render() {
        return (
            <div>
                <p>Heads up, Form Mappings enable us to map Standard Fields to any web form, so they are kind of important. Select from the dropdown below to map a new form or edit an existing one.</p>
                <form>
                    <p>Selected Form ID: {this.state.selectedOptionId}</p>
                    <select onChange={this.setOptionOnChange}>
                        <option value="">Select one</option>
                        {this.props.userForms && this.props.userForms.map((option, index) => (
                            <option key={index} value={option.formId}>{option.formName}</option>
                        ))}
                        <option value="create">Create new</option>
                    </select>
                </form>
                {this.state.showError && <p>Please select an option.</p>}
                <button onClick={this.setSelectedForm}>Next</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userForms: state.imports.userForms
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedForm: (id, name, description) => dispatch(setSelectedForm(id, name, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormMappings)