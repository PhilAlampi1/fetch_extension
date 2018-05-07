import React from 'react'
import { connect } from 'react-redux'
import { clearFillFormResults } from '../actions/imports' 

const Results = (props) => {

    return (
        <div className="container__centertext">
            <p className="narrative-text">Your form is now populated, well done! We were able to fill {props.totalFieldsPopulated} fields ({props.importFieldsPopulated} from your import file and {props.defaultFieldsPopulated} from your defaults).</p>
            <p className="narrative-text">FYI, you can set or change your defaults for the next time you import to this form. Click on "Form Mappings" above to get started.</p>
            <p className="narrative-text">Thanks for using Fetch!</p>
            <button onClick={props.clearFillFormResults}>Fill Form Again</button>
        </div>
    )

}

const mapStateToProps = (state) => ({
    totalFieldsPopulated: state.imports.totalFieldsPopulated,
    importFieldsPopulated: state.imports.importFieldsPopulated,
    defaultFieldsPopulated: state.imports.defaultFieldsPopulated
})

const mapDispatchToProps = (dispatch, props) => ({
    clearFillFormResults: () => dispatch(clearFillFormResults())
})

export default connect(mapStateToProps, mapDispatchToProps)(Results)