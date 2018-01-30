import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    fetchStubValuesViaAlias,
    togglePromptUserOnStartOver,
    setUsersCurrentPageToMainPage,
    setUsersCurrentPageToFormPage
} from '../actions/imports'

export const Header = (props) => {
    const togglePromptUserOnStartOver = () => {
        props.togglePromptUserOnStartOver(!props.promptUserOnStartOver)
    }
    return (
        <div>
            <span><h1>Fetch</h1></span>
            {!props.userIsMappingForm &&
                <div>
                    {!props.promptUserOnStartOver
                        ?
                        <span>
                            {props.usersCurrentPage === 'main'
                                ? <Link to='/main' onClick={togglePromptUserOnStartOver}>Start Over</Link>
                                : <Link to='/main' onClick={props.setUsersCurrentPageToMainPage}>Continue Import</Link>
                            }
                            <Link to='/main' onClick={props.setUsersCurrentPageToFormPage}>Form Mappings</Link>
                        </span>
                        :
                        <span>
                            Are you sure?
                    <button onClick={props.fetchStubValuesViaAlias}>Yes</button>
                            <button onClick={togglePromptUserOnStartOver}>Cancel</button>
                        </span>
                    }
                </div>
            }
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
    setUsersCurrentPageToFormPage: () => dispatch(setUsersCurrentPageToFormPage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)