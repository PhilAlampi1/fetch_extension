import React from 'react'
import { render } from 'react-dom'
import { Store } from 'react-chrome-redux'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import 'normalize.css/normalize.css';
import '../styles/styles.scss'

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

// *****
// uncomment when not in dev (find a way to control this with env variables)
// const remotedev = require('remotedev-server');
// remotedev({ hostname: 'localhost', port: 8000 });
// *****