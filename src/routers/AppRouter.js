/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter, Navigate, Route, Routes  } from 'react-router-dom'
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
import { FormContactScreen } from '../components/admin/contact/FormContactScreen'
import { startLoadingAbouth } from '../actions/abouth'
import { startLoadingProjects } from '../actions/projects'
import { startLoadingContacts } from '../actions/contact'
import { AllLanguagesScreen } from '../components/admin/languages/AllLanguagesScreen'
import { FormLanguagesScreen } from '../components/admin/languages/FormLanguagesScreen'
import { IndexLanguagesScreen } from '../components/admin/languages/IndexLanguagesScreen'
import { startLoadingLanguages } from '../actions/languages'
import { BtnTheme } from '../components/layouts/BtnTheme'
import { SpecificProjectScreen } from '../components/main/projects/SpecificProjectScreen'
import { View404Screen } from '../components/main/View404Screen'

export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const doc = 'doc'

  
  useEffect(() => {
    dispatch(startLoadingProjects(doc));
    dispatch(startLoadingAbouth(doc));
    dispatch(startLoadingLanguages(doc));
    dispatch(startLoadingContacts(doc));
  }, [])


  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        setIsLoggedIn(true);
        
      } else {
        setIsLoggedIn(false);
      }
      setTimeout(() => {
        setChecking(false);
      }, 1000);
    })
  }, [dispatch, setChecking, setIsLoggedIn]);
  
  if(checking) {
    return ( 
      <div className='d-flex justify-content-center align-items-center h100vh'>  
        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif' className='' alt='loading' />
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>

        {/* Publicas */}
        <Route path="/*" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Navbar />
            <BtnTheme />
            <Routes>
              <Route path="/" element={<IndexScreen />} />
              <Route path="/abouth" element={<AbouthScreen />} />
              <Route path="/projects" element={<MainProjectsScreen />} />
              <Route path="/projects/all/" element={<AllProjectsScreen />} />
              <Route path="/projects/:id" element={<SpecificProjectScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="*" element={<View404Screen />} />
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
            <BtnTheme />
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
              <Route path="/languages/*" element={<IndexLanguagesScreen>
                <Routes>
                  <Route path="/*" element={<AllLanguagesScreen />} />
                  <Route path="/new" element={<FormLanguagesScreen />} />
                </Routes>
              </IndexLanguagesScreen>} />
              <Route path="/contact/*" element={<IndexContactScreen>
                <Routes>
                  <Route path="/*" element={<AllContactScreen />} />
                  <Route path="/new" element={<FormContactScreen />} />
                </Routes>
              </IndexContactScreen>} />  
            </Routes>
          </PrivateRoute>} 
        />
      </Routes>
    </HashRouter>
  )
}
