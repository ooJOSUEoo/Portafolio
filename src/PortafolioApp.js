import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './Fontawesome_PRO/css/all.css'

import('./styles/styles.scss')

export const PortafolioApp = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  )
}
