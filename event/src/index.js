import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { wrapStore, alias } from 'react-chrome-redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from './reducers'
import aliases from './aliases/index'
import { fetchStubValues } from './utilities/utilities'

const middleware = [
  alias(aliases),
  thunk
]

const composeEnhancers = composeWithDevTools({
  realtime: true,
  hostname: 'localhost',
  port: 8000
})

export const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
)

wrapStore(store, {
  portName: 'lightning0328200804082010'
})

// Fetch initial standardFields and rowIdentifiers stub values from DB, update store
fetchStubValues()