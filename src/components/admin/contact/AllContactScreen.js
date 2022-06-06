import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { activeEditContact, contactsSetActive, deleteContactDB } from '../../../actions/contact';
import { Pagination } from '../../layouts/Pagination';

export const AllContactScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);

  const location = useLocation()
  const num = parseInt(location.hash.split('/')[1] ? location.hash.split('/')[1] : 0)
  const num1 = num <= 0 ? 0 : (num*10)
  const num2 = num <= 0 ? 10 : (num*10)+10
  const array = contacts.length > 5 ? contacts.slice(num1, num2) : contacts

  const handleEdit = (data) => {
    dispatch(activeEditContact())
    dispatch(contactsSetActive(data));
    navigate('/admin/contact/new');
  }

  const handleDelete = (id) => {
    dispatch(deleteContactDB(id));
  }

  return (
    <div>
       
      <table className="table table-responsive text-light">
        <thead className="thead-default">
          <tr>
            <th>ID</th>
            <th>Contact Network</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {array.map((contact,i) => (
              <tr key={contact.id}>
                <th key={contact.id} scope="row">{num*10+i+1}</th>
                <td>{contact.name}</td>
                <td>{contact.link}</td>
                <td>
                  <div className='d-flex justify-content-center'>
                    <button className="btn btn-primary" onClick={()=>handleEdit(contact)}><i className="fas fa-edit"></i></button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={()=>handleDelete(contact.id)}><i className="fas fa-trash-alt"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {/* <tr>
              <th scope='row'>1</th>
              <td>Facebook</td>
              <td>Link 1</td>
              <td>
                <button type="button" className="btn btn-primary"><i className="fas fa-edit"></i></button>
                &nbsp;
                <button type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
              </td>
            </tr> */}
          </tbody>
      </table>
      <Pagination data={contacts} num={num} />
    </div>
  )
}
