import React from 'react'
import { FormContactEmailScreen } from './FormContactEmailScreen'
import { SocialMediaScreen } from './SocialMediaScreen'

export const ContactScreen = () => {
  return (
    <div>
       <div className="container text-dark">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Contacto</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="text-center">Si quieres contactar conmigo, puedes hacerlo a través de los siguientes
                        medios:</p>
                </div>
            </div>
              <FormContactEmailScreen />

              <SocialMediaScreen />

       </div>

       
    </div>
  )
}
