import React from 'react'
import { connect } from 'react-redux'
import {
    nameImportFile,
    confirmNewImportFileName,
    updateExistingImportFileNameInDb,
    confirmExistingImportFileName
} from '../actions/imports'

export class ImportFileName extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dbUpdateNeeded: false,
            showError: false,
            enteredName: ''
        }
    }

    nameImportFile = (e) => {
        e.persist()
        !!e.target.value && console.log('VALUE: ', e.target.value)
        this.setState((prevState) => ({
            ...prevState,
            enteredName: !e.target.value ? null : e.target.value,
            showError: !e.target.value ? true : false
        }))
        if ((this.props.selectedImportFileSetupId !== 'create')
            && (this.props.selectedImportFileSetupName && e.target.value !== this.props.selectedImportFileSetupName)) {
            this.setState((prevState) => ({
                ...prevState,
                dbUpdateNeeded: true,
            }))
        }
        this.props.nameImportFile(e)
    }

    createOrModifyImportFileName = () => {
        if (!this.props.selectedImportFileSetupName) {
            this.setState((prevState) => ({
                ...prevState,
                showError: true
            }))
        } else {
            if (this.props.selectedImportFileSetupId === 'create') {
                this.props.confirmNewImportFileName()
            } else if (this.state.dbUpdateNeeded) {
                this.props.updateExistingImportFileName()
                this.setState((prevState) => ({
                    ...prevState,
                    dbUpdateNeeded: false
                }))
            } else { // no change made to existing Import File Name
                this.props.confirmExistingImportFileName()
            }
        }
    }

    render() {

        return (
            <div className="container__centertext">
                <p className="narrative-text">Great job, it's all downhill from here!</p>
                {this.props.selectedImportFileSetupId === 'create'
                    ? <p className="narrative-text">Now, what name should we give your import file so you can reuse these mappings in future imports?</p>
                    : <p className="narrative-text">Here's the name we have for your import file. Feel free to change or just click Next to continue.</p>
                }
                <div>
                    <input onChange={this.nameImportFile}
                        defaultValue={
                            this.props.selectedImportFileSetupId !== 'create'
                                ? this.props.selectedImportFileSetupName
                                : ''
                        }
                        name="importFileName"
                        type="text"
                        placeholder="Enter your file name"></input>
                    {this.state.showError
                        ? <p className="narrative-text">Please enter an import file name.</p>
                        : <div><button onClick={this.createOrModifyImportFileName}>Next</button></div>
                    }
                </div>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    selectedImportFileSetupName: state.imports.selectedImportFileSetupName,
    selectedImportFileSetupId: state.imports.selectedImportFileSetupId
})

const mapDispatchToProps = (dispatch, props) => ({
    nameImportFile: (e) => dispatch(nameImportFile(e.target.value)),
    confirmNewImportFileName: () => dispatch(confirmNewImportFileName()),
    updateExistingImportFileName: () => dispatch(updateExistingImportFileNameInDb()),
    confirmExistingImportFileName: () => dispatch(confirmExistingImportFileName())
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportFileName) 