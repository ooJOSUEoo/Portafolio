import React from 'react'

export const FromContactScreen = () => {
  return (
    <div className='container mt-3'>
       <form className='d-flex flex-column'>
            <div className="mb-3">
                <label form="name" className="form-label text-light">Social Network</label>
                <select className="form-control form-control-lg" name="name" id="name">
                    <option>Facebook</option>
                    <option>Whatsapp</option>
                    <option>GitHub</option>
                    <option>Linkedin</option>
                    <option>Twitter</option>
                    <option>Instagram</option>
                    <option>Youtube</option>
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Other</option>
                </select>
                <div className='d-flex justify-content-around text-light fs-3'>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-whatsapp"></i>
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fas fa-envelope"></i>
                    <i className="fas fa-phone"></i>
                    <i className="fas fa-question-circle"></i>
                </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control" name="link" id="link" placeholder="Link" />
              <label form="floatingLabel">Link</label>
            </div>
          
          <button type="submit" className="btn btn-primary">Save</button>
       </form>
       
    </div>
  )
}
