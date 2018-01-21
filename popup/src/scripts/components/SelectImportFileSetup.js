import React from 'react'
import { connect } from 'react-redux'
import { setSelectedImportFileSetup, getAndStoreImportFieldMappings } from '../actions/imports'

export class SelectImportFileSetup extends React.Component {
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
            showError: !newOptionId ? true : false,
            selectedOptionId: newOptionId,
            selectedOptionName: newOptionName
        }))
    }
    setSelectedImportFileSetup = () => {
        const selectedOptionName = (
            (!this.state.selectedOptionName || this.state.selectedOptionName === 'Create new')
                ? ''
                : this.state.selectedOptionName
        )
        this.props.setSelectedImportFileSetup(this.state.selectedOptionId, selectedOptionName)
        if (!this.state.selectedOptionId) {
            this.setState((prevState) => ({
                ...prevState,
                showError: true
            }))
        } else {
            this.setState((prevState) => ({
                ...prevState,
                showError: false
            }))
            this.state.selectedOptionId !== 'create' && this.props.getAndStoreImportFieldMappings()
        }
    }
    render() {
        return (
            <div>
                <p>Hi {this.props.firstName}, what kind of file are we importing today?</p>
                <form>
                    <select className="selectImportFileSetup" onChange={this.setOptionOnChange}>
                        <option value="">Select one</option>
                        {this.props.importFileSetups && this.props.importFileSetups.map((option, index) => (
                            <option key={index} value={option.importFileSetupId}>{option.importFileSetupName}</option>
                        ))}
                        <option value="create">Create new</option>
                    </select>
                </form>
                {this.state.showError
                    ? <p>Please select an option.</p>
                    : <button onClick={this.setSelectedImportFileSetup}>Next</button>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    firstName: state.auth.firstName,
    importFileSetups: state.imports.importFileSetups
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedImportFileSetup: (selectedOptionId, selectedOptionName) => {
        dispatch(setSelectedImportFileSetup(selectedOptionId, selectedOptionName))
    },
    getAndStoreImportFieldMappings: () => dispatch(getAndStoreImportFieldMappings())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectImportFileSetup)