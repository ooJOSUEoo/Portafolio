import React from 'react'
import { useSelector } from 'react-redux'
import { LanguagesScreen } from './LanguagesScreen'

export const AbouthScreen = () => {

  const {abouth} = useSelector(state => state.abouth)
  //const { cv, description, experience, education, skills, languages, hobbies } = abouth
  const { cv, description, photo } = abouth[0]

  return (
    <div className='container'>
       
      <div className="row align-items-center myInfo mb-3" >
        <div className="col d-flex justify-content-center">
          <img src={photo} className="myPhoto-lg" alt="mi foto" />
        </div>
        <div className="col d-flex justify-content-center flex-column text-dark">
          <h1 className="text-center">Acerca de mi</h1>
          <p className="text-center" id="acerca_de">
            
            {description}

          </p>
          <a href={cv} className="btn-cvs">Ver mi CV</a>
        </div>
      </div>

      <LanguagesScreen />
       
    </div>
  )
}
