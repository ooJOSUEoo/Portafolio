import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { changeToNewProject } from '../../../actions/projects';

export const IndexProjectsScreen = ({children}) => {

  const dispatch = useDispatch();
  const {isNewProject} = useSelector(state => state.projects);

  const handleNewLanguage = () => {
    dispatch(changeToNewProject());
  }

  return (
    <div className='container mt-3'>
        <div className='d-flex justify-content-evenly'>
            <Link to='/admin/projects/' name="new" id="new" className="btn btn-outline-primary" role="button">
               <i className="fas fa-ballot"></i> All
            </Link>
            <Link to='/admin/projects/favorites' name="new" id="new" className="btn btn-outline-primary" role="button">
               <i className="fas fa-star"></i> Favorites
            </Link>
            <Link to='/admin/projects/new' name="new" id="new" className="btn btn-outline-primary" role="button">
            {
                  isNewProject ? 
                  (
                    <div>
                      <i className="fas fa-plus"></i> New
                    </div>
                  ) :
                  (
                    <div>
                      <i className="fas fa-edit"></i> Edit
                    </div>
                  )
                }
            </Link>
            {
              !isNewProject &&
              (
                <div>
                  <button type="button" onClick={handleNewLanguage} className="btn btn-outline-warning">Change to New</button>
                </div>
              )
            }
        </div>

        {
            children
        }

    </div>
  )
}
