import React from 'react'
import { connect } from 'react-redux'
import { clearFillFormResults } from '../actions/imports' 

const Results = (props) => {

    return (
        <div>
            <p>Your form is now populated, well done! We were able to fill {props.totalFieldsPopulated} fields ({props.importFieldsPopulated} from your import file and {props.defaultFieldsPopulated} from your defaults).</p>
            <p>You can set or change your defaults for the next time you import to this form. To do so, press Escape to exit, then right click on the field you'd like to default within the form. A menu will pop up to give you the options you'll need from there and your settings will be saved an applied the next time you import to this form.</p>
            <p>Thanks for using Fetch. Have a good one!</p>
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