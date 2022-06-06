/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { abouthSetActive, startSetAbouth } from '../../../actions/abouth';
import { startLoading } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm'

export const FormAbouthScreen = () => {

  const {abouth} = useSelector(state => state.abouth);
  const dispatch = useDispatch();
  const [cv, setCv] = useState(null)
  const [photo, setPhoto] = useState(null)

  const [formValues, handleInputChange, handleFileChange] = useForm({
    description: '',
    cv: '',
    photo: ''
  })

  
  useEffect(() => {
    setTimeout(() => {
      abouth.forEach(abouth => {
        formValues.description = abouth.description;
        formValues.cv = abouth.cv;
        formValues.photo = abouth.photo;
        setCv(abouth.cv);
        setPhoto(abouth.photo);
      })
    }, 500)
  }, [])

  useEffect(() => {
    dispatch(abouthSetActive(formValues))

    typeof formValues.cv !== 'string' && setCv(URL.createObjectURL(document.getElementById('cv').files[0]))
    typeof formValues.photo !== 'string' && setPhoto(URL.createObjectURL(document.getElementById('photo').files[0]))

  }, [abouth, dispatch, formValues])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(startSetAbouth(formValues));
  }

  return (
    <div className='container mt-3'>
       <form className='d-flex flex-column' onSubmit={handleSubmit}>
           <div className="form-floating mb-3">
               <textarea
               style={{height: '200px'}}
                    className="form-control" name="description" id="description" placeholder="Descripcion"
                    value={formValues.description} onChange={handleInputChange}></textarea>
             <label form="floatingLabel">Description</label>
           </div>
           <div className="mb-3">
             <label form="cv" className="form-label text-light">CV</label>
             <input type="file" className="form-control" name="cv" id="cv" placeholder="CV" accept="application/pdf"
                    onChange={handleFileChange} />
           </div>
           <a href={cv} target="_blank" rel="noopener noreferrer">{cv ? 'Ver CV' : ''}</a>
           {/* <img src={cv} alt="cv" className="img-fluid w-25" /> */}
           <div className="mb-3">
             <label form="photo" className="form-label text-light">Photo</label>
             <input type="file" className="form-control" name="photo" id="photo" placeholder="Photo" accept="image/*"
                    onChange={handleFileChange} />
           </div>
            <img src={photo} alt="me" className="img-fluid w-25 mb-3" />
           <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
