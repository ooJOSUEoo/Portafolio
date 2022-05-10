import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLoginWithEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password))
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1em' }}>
              <form className="card-body p-5 text-center position-relative" onSubmit={handleSubmit}>
                <Link to='/' className="btn btn-lg px-5 position-absolute top-0 start-0 text-light">
                  <i className="fas fa-angle-left"></i>
                </Link>

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Login para administrar el portafolio ☺</p>

                  <div className="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" name='email' className="form-control form-control-lg" value={email} onChange={handleInputChange} />
                    <label className="form-label text-light" form="typeEmailX">Email</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" name='password' className="form-control form-control-lg" value={password} onChange={handleInputChange} />
                    <label className="form-label text-light" form="typePasswordX">Password</label>
                  </div>

                  <input className="btn btn-outline-light btn-lg px-5" type="submit" value="Login" />
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
