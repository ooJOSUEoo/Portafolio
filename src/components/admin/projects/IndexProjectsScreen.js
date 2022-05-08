import React from 'react'
import { Link } from 'react-router-dom'

export const IndexProjectsScreen = ({children}) => {
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
               <i className="fas fa-plus"></i> New
            </Link>
        </div>

        {
            children
        }

    </div>
  )
}
