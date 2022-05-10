import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { projectsSetActive, startSetProject } from '../../../actions/projects';
import { startLoading } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';

export const FormProjectsScreen = () => {

  const dispatch = useDispatch();

  const [values, handleInputChange, handleFileChange, handleCheckboxChange,] = useForm({
    name: '',
    description: '',
    image: '',
    git: '',
    demo: '',
    init: '',
    end: '',
    favorite: false,
  });

  useEffect(() => {
    dispatch(projectsSetActive(values))
  }, [dispatch, values])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading())
    dispatch(startSetProject(values))
  }

  return (
    <div className='container mt-3'>
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
