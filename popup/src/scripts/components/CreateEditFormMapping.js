import React from 'react'
import { connect } from 'react-redux'
import {
    nameForm,
    describeForm,
    confirmNewForm,
    updateExistingFormInDb,
    confirmExistingForm
} from '../actions/imports'

export class CreateEditFormMapping extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dbUpdateNeeded: false,
            showError: false,
            enteredName: this.props.selectedFormName || '',
            enteredDescription: this.props.selectedFormDescription || ''
        }
    }
    nameForm = (e) => {
        e.persist()
        const enteredName = (
            (!e.target.value || e.target.value === 'Create new')
                ? ''
                : e.target.value
        )
        this.setState((prevState) => ({
            ...prevState,
            enteredName,
            showError: (!enteredName || !this.state.enteredDescription)
                ? true : false
        }))
        if ((this.props.selectedFormId !== 'create')
            && (this.props.selectedFormName && enteredName !== this.props.selectedFormName)) {
            this.setState((prevState) => ({
                ...prevState,
                dbUpdateNeeded: true,
            }))
        }
        this.props.nameForm(enteredName)
    }
    describeForm = (e) => {
        e.persist()
        const enteredDescription = !e.target.value ? '' : e.target.value
        this.setState((prevState) => ({
            ...prevState,
            enteredDescription,
            showError: (!enteredDescription || !this.state.enteredName)
                ? true : false
        }))
        if ((this.props.selectedFormId !== 'create')
            && (this.props.selectedFormDescription && enteredDescription !== this.props.selectedFormDescription)) {
            this.setState((prevState) => ({
                ...prevState,
                dbUpdateNeeded: true,
            }))
        }
        this.props.describeForm(enteredDescription)
    }
    createOrModifyForm = () => {
        if (!this.props.selectedFormName || (this.props.selectedFormName === 'Create new')) {
            this.setState((prevState) => ({
                ...prevState,
                showError: true
            }))
        } else {
            if (this.props.selectedFormId === 'create') {
                this.props.confirmNewForm()
            } else if (this.state.dbUpdateNeeded) {
                this.props.updateExistingForm()
                this.setState((prevState) => ({
                    ...prevState,
                    dbUpdateNeeded: false
                }))
            } else { // no change made to existing Form
                this.props.confirmExistingForm()
            }
        }
    }
    render() {
        return (
            <div>
                {this.props.selectedFormId === 'create'
                    ? <p>Tell us a little about the form you are mapping to.</p>
                    : <p>Here's the information we have for your import file. Feel free to change or just click Next to continue.</p>
                }
                <div>
                    <input onBlur={this.nameForm}
                        defaultValue={
                            this.props.selectedFormName !== 'Create new'
                                ? this.props.selectedFormName
                                : ''
                        }
                        name="formName"
                        type="text"
                        placeholder="enter your form name">
                    </input>
                    <input onBlur={this.describeForm}
                        defaultValue={
                            this.props.selectedFormName !== 'Create new'
                                ? this.props.selectedFormDescription
                                : ''
                        }
                        name="formDescription"
                        type="text"
                        placeholder="enter your form description">
                    </input>
                    {this.state.showError
                        ? <p>Please enter a form name and description.</p>
                        : <button onClick={this.createOrModifyForm}>Next</button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedFormName: state.imports.selectedFormName,
    selectedFormDescription: state.imports.selectedFormDescription,
    selectedFormId: state.imports.selectedFormId
})

const mapDispatchToProps = (dispatch, props) => ({
    nameForm: (enteredName) => dispatch(nameForm(enteredName)),
    describeForm: (value) => dispatch(describeForm(value)),
    confirmNewForm: () => dispatch(confirmNewForm()),
    updateExistingForm: () => dispatch(updateExistingFormInDb()),
    confirmExistingForm: () => dispatch(confirmExistingForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditFormMapping)