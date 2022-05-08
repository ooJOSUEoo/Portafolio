import React from 'react'

export const AllProjectsScreenAdmin = () => {
  return (
    <div className='table-responsive'> 
       <table className="table text-light">
         <thead className="thead-default">
           <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Link Github</th>
              <th>Link Demo</th>
              <th>Init Date</th>
              <th>End Date</th>
              <th>Favorite</th>
              <th>Actions</th>
           </tr>
           </thead>
           <tbody>
             <tr>
                <th scope='row'>1</th>
                <td>Project 1</td>
                <td>Description 1</td>
                <td>Image 1</td>
                <td>Link Github 1</td>
                <td>Link Demo 1</td>
                <td>Init Date 1</td>
                <td>End Date 1</td>
                <td>Favorite 1</td>
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
