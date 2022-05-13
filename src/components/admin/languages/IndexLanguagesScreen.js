import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { changeToNewLanguage } from '../../../actions/languages';

export const IndexLanguagesScreen = ({children}) => {
  const dispatch = useDispatch();
  const {isNewLanguage} = useSelector(state => state.languages);

  const handleNewLanguage = () => {
    dispatch(changeToNewLanguage());
  }

  return (
    <div className='container mt-3'>
        <div className='d-flex justify-content-evenly'>
            <Link to='/admin/languages/' name="new" id="new" className="btn btn-outline-primary" role="button">
               <i className="fas fa-ballot"></i> All
            </Link>
            <Link to='/admin/languages/new' name="new" id="new" className="btn btn-outline-primary" role="button">
                {
                  isNewLanguage ? 
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
              !isNewLanguage &&
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
