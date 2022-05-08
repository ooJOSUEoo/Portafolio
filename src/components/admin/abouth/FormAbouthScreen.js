import React from 'react'

export const FormAbouthScreen = () => {
  return (
    <div className='container mt-3'>
       <form className='d-flex flex-column'>
           <div className="form-floating mb-3">
               <textarea
               style={{height: '200px'}}
                    className="form-control" name="description" id="description" placeholder="Descripcion"></textarea>
             <label form="floatingLabel">Description</label>
           </div>
           <div className="mb-3">
             <label form="cv" className="form-label text-light">CV</label>
             <input type="file" className="form-control" name="cv" id="cv" placeholder="CV" />
           </div>
           <div className="mb-3">
             <label form="photo" className="form-label text-light">Photo</label>
             <input type="file" className="form-control" name="photo" id="photo" placeholder="Photo" />
           </div>
           <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
