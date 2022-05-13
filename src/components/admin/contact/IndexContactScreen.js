import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { changeToNewContact } from '../../../actions/contact';


export const IndexContactScreen = ({children}) => {

  const dispatch = useDispatch();
  const {isNewContact} = useSelector(state => state.contacts);

  const handleNewLanguage = () => {
    dispatch(changeToNewContact());
  }

  return (
    <div className='container mt-3'>
        <div className='d-flex justify-content-evenly'>
            <Link to='/admin/contact/' name="new" id="new" className="btn btn-outline-primary" role="button">
               <i className="fas fa-ballot"></i> All
            </Link>
            <Link to='/admin/contact/new' name="new" id="new" className="btn btn-outline-primary" role="button">
            {
                isNewContact ? 
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
              !isNewContact &&
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
