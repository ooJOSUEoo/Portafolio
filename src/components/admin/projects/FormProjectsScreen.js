import React from 'react'

export const FormProjectsScreen = () => {
  return (
    <div className='container mt-3'>
       <form className='d-flex flex-column'>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control" name="name" id="name" placeholder="Name" />
            <label for="floatingLabel">Name</label>
          </div>
          <div className="form-floating mb-3">
              <textarea
              style={{height: '200px'}}
                  className="form-control" name="description" id="description" placeholder="Descripcion"></textarea>
            <label form="floatingLabel">Description</label>
          </div>
          <div className="mb-3">
            <label form="image" className="form-label text-light">Image</label>
            <input type="file" className="form-control" name="image" id="image" placeholder="Image" />
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control" name="git" id="git" placeholder="GitHub" />
            <label for="floatingLabel">GitHub</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control" name="demo" id="demo" placeholder="Demo" />
            <label for="floatingLabel">Demo</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control" name="init" id="init" placeholder="Init Date" />
            <label for="floatingLabel">Init Date</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control" name="end" id="end" placeholder="End Date" />
            <label for="floatingLabel">End Date</label>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" name="favorite" id="favorite" checked={false} />
            <label class="form-check-label text-light" for="favorite">
              Favorite
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
