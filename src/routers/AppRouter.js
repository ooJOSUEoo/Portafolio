import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes  } from 'react-router-dom'
import { login } from '../actions/auth'
import { IndexScreenAdmin } from '../components/admin/IndexScreenAdmin'
import { NavBarAdmin } from '../components/admin/NavBarAdmin'
import { LoginScreen } from '../components/auth/LoginScreen'
import { Footer } from '../components/layouts/Footer'
import { Navbar } from '../components/layouts/Navbar'
import { AbouthScreen } from '../components/main/abouth/AbouthScreen'
import { ContactScreen } from '../components/main/contact/ContactScreen'
import { IndexScreen } from '../components/main/IndexScreen'
import { AllProjectsScreen } from '../components/main/projects/AllProjectsScreen'
import { MainProjectsScreen } from '../components/main/projects/MainProjectsScreen'
import {firebase} from './../Firebase/firebase-config'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { FormAbouthScreen } from '../components/admin/abouth/FormAbouthScreen'
import { FormProjectsScreen } from '../components/admin/projects/FormProjectsScreen'
import { IndexProjectsScreen } from '../components/admin/projects/IndexProjectsScreen'
import { FavoriteProjectsScreen } from '../components/admin/projects/FavoriteProjectsScreen'
import { AllProjectsScreenAdmin } from '../components/admin/projects/AllProjectsScreenAdmin'
import { IndexContactScreen } from '../components/admin/contact/IndexContactScreen'
import { AllContactScreen } from '../components/admin/contact/AllContactScreen'
import { FromContactScreen } from '../components/admin/contact/FromContactScreen'

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

        {/* Publicas */}
        <Route path="/*" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Navbar />
            <Routes>
              <Route path="/*" element={<IndexScreen />} />
              <Route path="/abouth" element={<AbouthScreen />} />
              <Route path="/projects" element={<MainProjectsScreen />} />
              <Route path="/allprojects" element={<AllProjectsScreen />} />
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

        {/* Privadas */}
        <Route path="/admin/*" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <NavBarAdmin />
            <Routes>
              <Route path="/*" element={<IndexScreenAdmin />} />
              <Route path="/abouth" element={<FormAbouthScreen />} />
              <Route path="/projects/*" element={<IndexProjectsScreen>
                <Routes>
                  <Route path="/*" element={<AllProjectsScreenAdmin />} />
                  <Route path="/favorites" element={<FavoriteProjectsScreen />} />
                  <Route path="/new" element={<FormProjectsScreen />} />
                </Routes>
              </IndexProjectsScreen>} />
              <Route path="/contact/*" element={<IndexContactScreen>
                <Routes>
                  <Route path="/*" element={<AllContactScreen />} />
                  <Route path="/new" element={<FromContactScreen />} />
                </Routes>
              </IndexContactScreen>} />  
            </Routes>
          </PrivateRoute>} 
        />
        <Route path="*" element={<Navigate to='/' />} />

      </Routes>
    </Router>
  )
}
