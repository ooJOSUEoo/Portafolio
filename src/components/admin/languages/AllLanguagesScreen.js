/* eslint-disable eqeqeq */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { activeEditLanguage, deleteLanguage, languagesSetActive } from '../../../actions/languages';
import { Pagination } from '../../layouts/Pagination';

export const AllLanguagesScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { languages } = useSelector(state => state.languages);

  const location = useLocation()
  const num = parseInt(location.hash.split('/')[1] ? location.hash.split('/')[1] : 0)
  const num1 = num <= 0 ? 0 : (num*10)
  const num2 = num <= 0 ? 10 : (num*10)+10
  const array = languages.length > 5 ? languages.slice(num1, num2) : languages

  const handleEdit = (data) => {
    dispatch(activeEditLanguage())
    dispatch(languagesSetActive(data));
    navigate('/admin/languages/new');
  }

  const handleDelete = (id) => {
    dispatch(deleteLanguage(id));
  }

  return (
    <div>
      <div className='table-responsive'> 
      <h3>All</h3>
         <table className="table text-light">
           <thead className="thead-default">
             <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Range</th>
                <th>Actions</th>
             </tr>
             </thead>
             <tbody>
                {
                  array.map((language, i) => (
                    <tr key={language.id}>
                      <th scope="row">{num*10+i+1}</th>
                      <td>{language.name}</td>
                      <td>
                        <img src={language.image} alt="language" className="languages__img" />
                      </td>
                      <td className='fs-3'>
                        {
                          language.range == 0 && (
                            <i className="fas fa-frown text-danger"></i>
                          )
                        }
                        {
                          language.range == 1 && (
                            <i className="fas fa-grin-alt text-warning"></i>
                          )
                        }
                        {
                          language.range == 2 && (
                            <i className="fas fa-grin-beam text-warning"></i>
                          )
                        }
                        {
                          language.range == 3 && (
                            <i className="fas fa-laugh-beam text-success"></i>
                          )
                        }
                        </td>
                      <td>
                        <div className='d-flex justify-content-center'>
                          &nbsp;
                          <button className="btn btn-primary" onClick={()=>handleEdit(language)}><i className="fas fa-edit"></i></button>
                          <button className="btn btn-danger" onClick={()=>handleDelete(language.id)}><i className="fas fa-trash-alt"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
      
             </tbody>
         </table>       
      </div>
      <Pagination data={languages} num={num} />
    </div>
  )
}
