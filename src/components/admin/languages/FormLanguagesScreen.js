import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { languagesSetActive, startSetLanguage } from '../../../actions/languages';
import { startLoading } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';


export const FormLanguagesScreen = () => {

  const {isNewLanguage, languageActive} = useSelector(state => state.languages);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null)

  const [formValues, handleInputChange, handleFileChange] = useForm({
    name: '',
    image: '',
    range: 0
  })
  useEffect(() => {
    if(!isNewLanguage){
      formValues.id = languageActive.id;
      formValues.name = languageActive.name;
      formValues.image = languageActive.image;
      formValues.range = languageActive.range;
      setImage(languageActive.image);
    }
  }, [])
    

  useEffect(() => {
    const inp = document.querySelector('input[type="range"]')
    dispatch(languagesSetActive(formValues))

    // document.getElementById('image').addEventListener('change', (e)=>{
    //   setImage(URL.createObjectURL(e.target.files[0]))
    // })
    typeof formValues.image === 'object' && setImage(URL.createObjectURL(formValues.image))
    inp.style.setProperty('--value', formValues.range)
    inp.addEventListener('input', (e) => { 
      inp.style.setProperty('--value', inp.value) 
    })
  }, [ dispatch, formValues])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(startSetLanguage())
  }

  return (
    <div className='container mt-3'>
       <form className='d-flex flex-column' onSubmit={handleSubmit}>
           <div className="form-floating mb-3">
              <input type="text" name="name" id="name" className="form-control" placeholder="Name" 
              value={formValues.name} onChange={handleInputChange} />
              <label form="floatingLabel">Name</label>
           </div>
           <div className="mb-3">
             <label form="image" className="form-label text-light">Icon</label>
             <input type="file" className="form-control" name="image" id="image" placeholder="image" accept="image/*"
                    onChange={handleFileChange} />
           </div>
           <img src={image} alt="Icon" className="img-fluid w-25" />
           <div className="mb-3">
             <label form="photo" className="form-label text-light">Rango</label>
              <input type='range' className='form-range' name='range' max={3} min={0} value={formValues.range} onChange={handleInputChange} />
           </div>
           <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
