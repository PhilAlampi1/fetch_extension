import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store } from 'react-chrome-redux'
import App from './components/app/App'
import './styles/styles.scss'

const proxyStore = new Store({ portName: 'lightning0328200804082010' })
const anchor = document.createElement('div')
let firstTimeCalling = true
let previousState
let currentState

anchor.id = 'rcr-anchor'
document.body.insertBefore(anchor, document.body.childNodes[0])

const unsubscribe = proxyStore.subscribe(() => {
  unsubscribe() // make sure to only fire once
  render(
   <Provider store={proxyStore}>
     <App />
   </Provider>
   , document.getElementById('rcr-anchor'))
})