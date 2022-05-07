import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes  } from 'react-router-dom'
import { IndexScreenAdmin } from '../components/admin/IndexScreenAdmin'
import { LoginScreen } from '../components/auth/LoginScreen'
import { IndexScreen } from '../components/main/IndexScreen'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>

        <Route path="*" element={<IndexScreen />} />
        <Route path="/admin" element={<IndexScreenAdmin />} />
        <Route path="/login" element={<LoginScreen />} />

      </Routes>
    </Router>
  )
}
