import React from 'react'
import { connect } from 'react-redux'
import { setSelectedForm, describeForm, confirmExistingForm } from '../actions/imports'

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
        let formPublic = false
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
        if (foundIndex !== -1) {
            description = this.props.userForms[foundIndex].formDescription
            formPublic = this.props.userForms[foundIndex].public ? true : false
        }
        (formPublic && this.props.userRole !== 'ADMIN') && this.props.confirmExistingForm() // only admins can edit public forms
        this.props.setSelectedForm(this.state.selectedOptionId, this.state.selectedOptionName, description, formPublic)
    }
    render() {
        return (
            <div>
                <p>{this.props.message}</p>
                <form>
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
    userForms: state.imports.userForms,
    userRole: state.auth.userRole
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedForm: (id, name, description, formPublic) => dispatch(setSelectedForm(id, name, description, formPublic)),
    confirmExistingForm: () => dispatch(confirmExistingForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormMappings)