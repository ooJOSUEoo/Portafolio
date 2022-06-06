import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { projectsSetActive, startSetProject } from '../../../actions/projects';
import { startLoading } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';

export const FormProjectsScreen = () => {

  const {isNewProject, projectActive} = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null)


  const [values, handleInputChange, handleFileChange, handleCheckboxChange, reset] = useForm({
    name: '',
    description: '',
    image: '',
    git: '',
    demo: '',
    init: '',
    end: '',
    company: '',
    favorite: false,
  });

  useEffect(() => {
    if(!isNewProject){
      values.id = projectActive.id;
      values.name = projectActive.name;
      values.description = projectActive.description;
      values.image = projectActive.image;
      values.git = projectActive.git;
      values.demo = projectActive.demo;
      values.init = projectActive.init;
      values.end = projectActive.end;
      values.company = projectActive.company;
      values.favorite = projectActive.favorite;
      setImage(projectActive.image);
    }
  }, [])

  useEffect(() => {
    dispatch(projectsSetActive(values))
    typeof values.image === 'object' && setImage(URL.createObjectURL(values.image))
  }, [dispatch, values])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading())
    dispatch(startSetProject())
  }

  const handleReset = () => {
    reset();
    setImage(null);
  }

  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-center mb-2'>
        <button className='btn btn-warning' onClick={handleReset}>
          <i className='fas fa-times'></i> Reset
        </button>
      </div>
       <form className='d-flex flex-column' onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control" name="name" id="name" placeholder="Name" 
              value={values.name} onChange={handleInputChange} />
            <label form="floatingLabel">Name</label>
          </div>
          <div className="form-floating mb-3">
              <textarea
              style={{height: '200px'}}
                  className="form-control" name="description" id="description" placeholder="Descripcion"
                  value={values.description} onChange={handleInputChange}></textarea>
            <label form="floatingLabel">Description</label>
          </div>
          <div className="mb-3">
            <label form="image" className="form-label text-light">Image</label>
            <input type="file" className="form-control" name="image" id="image" placeholder="Image" accept="image/*"
              onChange={handleFileChange} />
            <img src={image} alt="Icon" className="img-fluid w-25" />
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control" name="git" id="git" placeholder="GitHub" 
              value={values.git} onChange={handleInputChange} />
            <label form="floatingLabel">GitHub</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control" name="demo" id="demo" placeholder="Demo" 
              value={values.demo} onChange={handleInputChange} />
            <label form="floatingLabel">Demo</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control" name="init" id="init" placeholder="Init Date" 
              value={values.init} onChange={handleInputChange} />
            <label form="floatingLabel">Init Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control" name="end" id="end" placeholder="End Date" 
              value={values.end} onChange={handleInputChange} />
            <label form="floatingLabel">End Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control" name="company" id="company" placeholder="Company" 
              value={values.company} onChange={handleInputChange} />
            <label form="floatingLabel">Company</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="favorite" id="favorite" 
            checked={values.favorite} onChange={handleCheckboxChange} />
            <label className="form-check-label text-light" form="favorite">
              Favorite
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
