import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    fetchStubValuesViaAlias,
    togglePromptUserOnStartOver,
    setUsersCurrentPageToMainPage,
    setUsersCurrentPageToFormPage,
    clearFillFormResults
} from '../actions/imports'

export const Header = (props) => {

    const formMappingsSelected = () => {
        props.clearFillFormResults()
        props.setUsersCurrentPageToFormPage()
    }

    const togglePromptUserOnStartOver = () => {
        props.togglePromptUserOnStartOver(!props.promptUserOnStartOver)
    }
    
    return (
        <div className='header'>
            <div className='header__container'>
                <h2 className='header__title'>Fetch</h2>
                <div className='header__linkgroup'>
                    {!props.userIsMappingForm &&
                        <div>
                            {!props.promptUserOnStartOver
                                ?
                                <span className="flexy-parent">
                                    {props.usersCurrentPage === 'main'
                                        ? <Link to='/main' onClick={togglePromptUserOnStartOver} className='header__links flexy-child'>Start Over</Link>
                                        : <Link to='/main' onClick={props.setUsersCurrentPageToMainPage} className='header__links flexy-child'>Continue Import</Link>
                                    }
                                    <Link to='/main' onClick={formMappingsSelected} className='header__links flexy-child'>Form Mappings</Link>
                                </span>
                                :
                                <span className="header-question-parent">
                                    <p>Are you sure?</p>
                                    <button className="header-question-child" onClick={props.fetchStubValuesViaAlias}>Yes</button>
                                    <button className="header-question-child" onClick={togglePromptUserOnStartOver}>Cancel</button>
                                </span>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    promptUserOnStartOver: !!state.imports.promptUserOnStartOver,
    usersCurrentPage: state.imports.usersCurrentPage,
    userIsMappingForm: state.imports.userIsMappingForm
})

const mapDispatchToProps = (dispatch) => ({
    fetchStubValuesViaAlias: () => dispatch(fetchStubValuesViaAlias()),
    togglePromptUserOnStartOver: (newValue) => dispatch(togglePromptUserOnStartOver(newValue)),
    setUsersCurrentPageToMainPage: () => dispatch(setUsersCurrentPageToMainPage()),
    setUsersCurrentPageToFormPage: () => dispatch(setUsersCurrentPageToFormPage()),
    clearFillFormResults: () => dispatch(clearFillFormResults())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)