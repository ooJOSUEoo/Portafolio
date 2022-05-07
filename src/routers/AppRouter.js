import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes  } from 'react-router-dom'
import { login } from '../actions/auth'
import { IndexScreenAdmin } from '../components/admin/IndexScreenAdmin'
import { LoginScreen } from '../components/auth/LoginScreen'
import { Footer } from '../components/layouts/Footer'
import { Navbar } from '../components/layouts/Navbar'
import { AbouthScreen } from '../components/main/abouth/AbouthScreen'
import { ContactScreen } from '../components/main/contact/ContactScreen'
import { IndexScreen } from '../components/main/IndexScreen'
import { AllProyectsScreen } from '../components/main/proyects/AllProyectsScreen'
import { MainProyectsScreen } from '../components/main/proyects/MainProyectsScreen'
import {firebase} from './../Firebase/firebase-config'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        setIsLoggedIn(true);
        setDataUser(user);
        
        //dispatch(startLoadingPosts(user.uid));
      } else {
        setIsLoggedIn(false);
        setDataUser(null);
      }
      setTimeout(() => {
        setChecking(false);
      }, 1000);
    })
  }, [dispatch, setChecking, setIsLoggedIn]);
  
  if(checking) {
    return ( 
      <div className='d-flex justify-content-center align-items-center'>  
        <img src='https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif' className='' alt='loading' />
      </div>
    );
  }

  return (
    <Router>
      <Routes>

        <Route path="/*" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Navbar />
            <Routes>
              <Route path="/*" element={<IndexScreen />} />
              <Route path="/abouth" element={<AbouthScreen />} />
              <Route path="/projects" element={<MainProyectsScreen />} />
              <Route path="/allproyects" element={<AllProyectsScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
            </Routes>
            <Footer />
          </PublicRoute>} 
        />
        {
          isLoggedIn ? (
            <Route path="/login" element={<Navigate to="/admin" />} />
            ) : (
            <Route path="/login" element={<LoginScreen />} />
          )
        }
        <Route path="/admin/*" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/*" element={<IndexScreenAdmin />} />  
            </Routes>
          </PrivateRoute>} 
        />
        <Route path="*" element={<Navigate to='/' />} />

      </Routes>
    </Router>
  )
}
