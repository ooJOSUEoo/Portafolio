import React from 'react'
import { Link } from 'react-router-dom'

export const IndexLanguagesScreen = ({children}) => {
  return (
    <div className='container mt-3'>
        <div className='d-flex justify-content-evenly'>
            <Link to='/admin/languages/' name="new" id="new" className="btn btn-outline-primary" role="button">
               <i className="fas fa-ballot"></i> All
            </Link>
            <Link to='/admin/languages/new' name="new" id="new" className="btn btn-outline-primary" role="button">
               <i className="fas fa-plus"></i> New
            </Link>
        </div>

        {
            children
        }

    </div>
  )
}
