import React from 'react'
import { render } from 'react-dom'
import { Store } from 'react-chrome-redux'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'

const proxyStore = new Store({
  portName: 'lightning0328200804082010'
})


const unsubscribe = proxyStore.subscribe(() => {
   unsubscribe() // make sure to only fire once
   render(
    <Provider store={proxyStore}>
      <AppRouter/>
    </Provider>
    , document.getElementById('app'))
})