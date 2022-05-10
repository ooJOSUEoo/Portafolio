import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { contactsSetActive, startSetContact } from '../../../actions/contact';
import { startLoading } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';

export const FormContactScreen = () => {

  const dispatch = useDispatch();

  const [option, setOption] = useState([
    { name: 'Select an option', value: '' },
    { name: 'Facebook', value: '1' },
    { name: 'Whatsapp', value: '2' },
    { name: 'Github', value: '3' },
    { name: 'Linkedin', value: '4' },
    { name: 'Twitter', value: '5' },
    { name: 'Instagram', value: '6' },
    { name: 'Youtube', value: '7' },
    { name: 'Email', value: '8' },
    { name: 'Phone', value: '9' },
    { name: 'Other', value: '10' },
  ])

  const [values, handleInputChange,] = useForm({
    name: '',
    link: '',
  });

  useEffect(() => {
    dispatch(contactsSetActive(values))
  }, [dispatch, values])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading())
    dispatch(startSetContact(values))
  }

  return (
    <div className='container mt-3'>
       <form className='d-flex flex-column' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label form="name" className="form-label text-light">Social Network</label>
                <select className="form-control form-control-lg" name="name" id="name"
                value={values.name} onChange={handleInputChange}>
                  {option.map((option) => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                  ))}
                </select>
                <div className='d-flex justify-content-around text-light fs-3'>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-whatsapp"></i>
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fas fa-envelope"></i>
                    <i className="fas fa-phone"></i>
                    <i className="fas fa-question-circle"></i>
                </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control" name="link" id="link" placeholder="Link" 
                value={values.link} onChange={handleInputChange} />
              <label form="floatingLabel">Link</label>
            </div>
          
          <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
