import React from 'react'

export const AllContactScreen = () => {
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
            <tr>
              <th scope='row'>1</th>
              <td>Facebook</td>
              <td>Link 1</td>
              <td>
                <button type="button" className="btn btn-primary"><i className="fas fa-edit"></i></button>
                &nbsp;
                <button type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
      </table>
       
    </div>
  )
}
