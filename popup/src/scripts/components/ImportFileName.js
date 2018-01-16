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
            dbUpdateNeeded: false
        }
    }
    nameImportFile = (e) => {
        if ((this.props.selectedImportFileSetup !== 'create')
            && (this.props.importFileName && e.target.value !== this.props.importFileName)) {
            this.setState((prevState) => ({
                ...prevState,
                dbUpdateNeeded: true
            }))
        }
        this.props.nameImportFile(e)
    }
    createOrModifyImportFileName = () => {
        console.log('dbUpdate: ', this.state.dbUpdateNeeded)
        if (this.props.selectedImportFileSetup === 'create') {
            console.log('confirmNewImportFileName')
            this.props.confirmNewImportFileName()
        } else if (this.state.dbUpdateNeeded) {
            console.log('updateExistingImportFileName')
            this.props.updateExistingImportFileName()
            this.setState((prevState) => ({
                ...prevState,
                dbUpdateNeeded: false
            }))
        } else { // no change made to existing Import File Name
            console.log('confirmExistingImportFileName')
            this.props.confirmExistingImportFileName()
        }
    }
    render() {
        return (
            <div>
                <p>Great job, it's all downhill from here!</p>
                {this.props.selectedImportFileSetup === 'create'
                    ? <p>Now, what name should we give your import file so you can reuse these mappings in future imports?</p>
                    : <p>Here's the name we have for your import file. Feel free to change or just click Next to continue.</p>
                }
                <div>
                    <input onBlur={this.nameImportFile}
                        defaultValue={this.props.importFileName}
                        name="importFileName"
                        type="text"
                        placeholder="import file name"></input>
                    <button onClick={this.createOrModifyImportFileName}>Next</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    importFileName: state.imports.selectedImportFileSetupName,
    importFileSetups: state.imports.importFileSetups,
    selectedImportFileSetup: state.imports.selectedImportFileSetup
})

const mapDispatchToProps = (dispatch, props) => ({
    nameImportFile: (e) => dispatch(nameImportFile(e.target.value)),
    confirmNewImportFileName: () => dispatch(confirmNewImportFileName()),
    updateExistingImportFileName: () => dispatch(updateExistingImportFileNameInDb()),
    confirmExistingImportFileName: () => dispatch(confirmExistingImportFileName())
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportFileName) 