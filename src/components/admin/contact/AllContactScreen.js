import React from 'react'
import { useSelector } from 'react-redux';

export const AllContactScreen = () => {

  const { socials } = useSelector(state => state.socials);

  return (
    <div>
       
      <table className="table table-responsive text-light">
        <thead className="thead-default">
          <tr>
            <th>ID</th>
            <th>Social Network</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {socials.map((social,i) => (
              <tr key={social.id}>
                <th scope="row">{i+1}</th>
                <td>{social.name}</td>
                <td>{social.link}</td>
                <td>
                  <div className='d-flex justify-content-center'>
                    <button className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                    &nbsp;
                    <button className="btn btn-primary"><i className="fas fa-edit"></i></button>
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
       
    </div>
  )
}
