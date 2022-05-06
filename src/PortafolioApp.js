import React from 'react'
import { Provider } from 'react-redux'
//import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const PortafolioApp = () => {
  return (
    <Provider store={store}>
        <h1>PortafolioApp</h1>
      {/* <AppRouter/> */}
    </Provider>
  )
}
