import React from 'react'
import { connect } from 'react-redux'
import { setSelectedForm, describeForm, confirmExistingForm, fillForm, setUsersCurrentPageToFormPage } from '../actions/imports'

export class FormMappings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOptionId: '',
            selectedOptionName: '',
            showError: true
        }
    }
    checkForError = () => {
        !this.state.selectedOptionId
            ? this.setState((prevState) => ({
                ...prevState,
                showError: true
            }), () => null)
            : this.setState((prevState) => ({
                ...prevState,
                showError: false
            }), () => null)
    }
    setOptionOnChange = (e) => {
        const newOptionId = e.target.value
        const newOptionName = e.target.options[e.target.selectedIndex].text
        this.setState((prevState) => ({
            ...prevState,
            selectedOptionId: newOptionId,
            selectedOptionName: newOptionName
        }), () => this.checkForError())
    }
    setSelectedForm = () => {
        let description = null
        let formPublic = false
        let selectedFormConfirmedForImport = false
        this.checkForError()
        const foundIndex = parseInt(this.props.userForms.findIndex((item) => {
            return item.formId === this.state.selectedOptionId
        }), 10)
        if (foundIndex !== -1) {
            description = this.props.userForms[foundIndex].formDescription
            formPublic = this.props.userForms[foundIndex].public ? true : false
        }
        if (formPublic && this.props.userRole !== 'ADMIN') { // only admins can edit public forms
            this.props.confirmExistingForm()
        }
        // if (this.props.usersCurrentPage === 'main' && this.state.selectedOptionId !== 'create') {
        //     selectedFormConfirmedForImport = true
        // }

        if (this.state.showError === false) {
            if (this.state.selectedOptionId !== 'create') {
                if (this.props.usersCurrentPage !== 'main') {
                    this.props.setSelectedForm(this.state.selectedOptionId, this.state.selectedOptionName, description, formPublic, selectedFormConfirmedForImport)
                } else { //this.props.usersCurrentPage !== 'main' (aka. 'form')
                    selectedFormConfirmedForImport = true
                    this.props.setSelectedForm(this.state.selectedOptionId, this.state.selectedOptionName, description, formPublic, selectedFormConfirmedForImport)
                    this.props.fillForm()
                }

                // NOT create and NOT main (aka - is form) - setSelectedForm -- DONE
                // NOT create and IS main - selectedFormConfirmedForImport = true -- DONE
                // NOT create and IS main - setSelectedForm, fillForm () -- DONE
                // IS create and IS main - setUsersCurrentPageToFormPage () -- DONE
                // IS create and NOT main (aka - is form) - setSelectedForm -- DONE




            } else { //this.state.selectedOptionId === 'create' 
                if (this.props.usersCurrentPage === 'main') {
                    this.props.setUsersCurrentPageToFormPage()
                } else { //this.props.usersCurrentPage !== 'main' (aka. 'form')
                    this.props.setSelectedForm(this.state.selectedOptionId, this.state.selectedOptionName, description, formPublic, selectedFormConfirmedForImport)
                }
            }
        }
    }
    render() {
        // defaultValue={this.props.selectedFormId}
        return (
            <div>
                <p>{this.props.message}</p>
                <form>
                    <select onChange={this.setOptionOnChange}>
                        <option value="">Select one</option>
                        {this.props.userForms && this.props.userForms.map((option, index) => (
                            <option key={index} value={option.formId}>{option.formName}</option>
                        ))}
                        <option value="create">
                            {this.props.usersCurrentPage === 'main'
                                ? 'Create and manage forms'
                                : 'Create new'
                            }
                        </option>
                    </select>
                </form>
                {this.state.showError
                    ? <p>Please select an option.</p>
                    : <button onClick={this.setSelectedForm}>{
                        (this.props.usersCurrentPage !== 'main' || this.state.selectedOptionId === 'create') ? 'Next' : 'Start Import'
                    }</button>
                }
            </div>
        )
    }
}

//LEFT OFF - IF THE ABOVE IS "CREATE", NEED TO UPDATE REDUX SO MAIN PAGE DISPLAYS FORM WORKFLOW

const mapStateToProps = (state) => ({
    userForms: state.imports.userForms,
    userRole: state.auth.userRole,
    usersCurrentPage: state.imports.usersCurrentPage,
    selectedFormId: state.imports.selectedFormId
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedForm: (id, name, description, formPublic, confirmed) => dispatch(setSelectedForm(id, name, description, formPublic, confirmed)),
    confirmExistingForm: () => dispatch(confirmExistingForm()),
    fillForm: () => dispatch(fillForm()),
    setUsersCurrentPageToFormPage: () => dispatch(setUsersCurrentPageToFormPage())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormMappings)