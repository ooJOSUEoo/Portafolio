import React from 'react'
import { useSelector } from 'react-redux'
import { LanguagesScreen } from './LanguagesScreen'

export const AbouthScreen = () => {

  const {abouth} = useSelector(state => state.abouth)
  //const { cv, description, experience, education, skills, languages, hobbies } = abouth
  const { cv, description, photo } = abouth[0]

  //saber si descripcion tiene \n
  const descriptionArray = description.split('\n')
  
  return (
    <div className='container'>
       
      <div className="row align-items-center myInfo mb-3" >
        <div className="col d-flex justify-content-center">
          <img src={photo} className="myPhoto-lg" alt="mi foto" />
        </div>
        <div className="col d-flex justify-content-center flex-column text-dark">
          <h1 className="text-center">Acerca de mi</h1>
          <div className="text-center" id="acerca_de">
            
            {/* {description} */}

            {
              //reemplazar \n por <br>
              descriptionArray.map((item, i) => {
                return <p key={i}>{item}</p>
              })
            }

          </div>
          <a href={cv} target='_blank' className="btn-cvs" rel="noreferrer">Ver mi CV</a>
        </div>
      </div>

      <LanguagesScreen />
       
    </div>
  )
}
