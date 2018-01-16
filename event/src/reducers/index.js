import {combineReducers} from 'redux'
import auth from './auth'
import imports from './imports'

export default combineReducers({
  auth,
  imports
})
