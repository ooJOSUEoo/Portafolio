import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import './Fontawesome_PRO/css/all.css'

export const PortafolioApp = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  )
}
