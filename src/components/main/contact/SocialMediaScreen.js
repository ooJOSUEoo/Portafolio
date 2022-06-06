import React from 'react'
import { useSelector } from 'react-redux'

export const SocialMediaScreen = () => {
  const {contacts} = useSelector(state => state.contacts)

  const icons = {
    1: 'fab fa-facebook-f text-primary',
    2: 'fab fa-whatsapp text-success',
    3: 'fab fa-github text-dark',
    4: 'fab fa-linkedin-in text-info',
    5: 'fab fa-twitter text-info',
    6: 'fab fa-instagram text-danger',
    7: 'fab fa-youtube text-danger',
    8: 'fa fa-envelope text-warning',
    9: 'fa fa-phone text-warning',
    10: 'fa fa-question-circle text-warning'
  }

  return (
      <ul className="social_icon">

        {
          contacts.sort(()=> .5 - Math.random()).map(contact => (
            <li key={contact.id}>
              <a href={contact.link} className="text-decoration-none" target="_blank" rel="noopener noreferrer">
                <i className={icons[contact.name]}></i>
                {/* {
                  contact.name === '2'&& (
                    <span className="fs-5 text-dark">{contact.link}</span>
                  )
                }
                {
                  contact.name === '9'&& (
                    <span className="fs-5 text-dark">{contact.link}</span>
                  )
                }
                {
                  contact.name === '10'&& (
                    <span className="fs-5 text-dark">{contact.link}</span>
                  )
                } */}
              </a>
            </li>
          ))
        }

          {/* <li><a href="mailto:sjosue5082002@gmail.com"><i className="fa fa-envelope text-warning"></i></a></li>
          <li><a href="https://wa.me/5212411853099"><i className="fab fa-whatsapp text-green"></i></a></li>
          <li><a href="https://github.com/josuema2002/"><i className="fab fa-github text-dark"></i></a></li> */}
      </ul>
  )
}
