import React from 'react'

export const FormContactEmailScreen = () => {
  return (
    <form  id="form-contact" className="container">
        {/* <!--- Alerta que se quita despues de 3 segundos --> */}
        <div className="alert alert-success alert-dismissible fade show d-none d-flex justify-content-center align-items-center"
            role="alert" id="alert-contact">
            <strong id="b-alert">¡Mensaje enviado!</strong>
            <p id="p-alert"></p>
        </div>
        <div className="row g-2 mb-3">
            <div className="col-md">
                <div className="form-floating">
                    <input type="email" className="form-control" id="contc-email" name="email"
                        placeholder="name@example.com" />
                    <label form="contc-email">Correo electronico</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                    <input type="text" className="form-control" id="contc-name" name="name"
                        placeholder="name@example.com" />
                    <label form="contc-name">Nombre completo</label>
                </div>
            </div>
        </div>
        <div className="row g-2 mb-3">
            <div className="col-md">
                <div className="form-floating">
                    <input type="number" min="0" className="form-control" id="contc-tel" name="tel"
                        placeholder="name@example.com" />
                    <label form="contc-tel">Telefono</label>
                </div>
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" name="message"
                    id="contc-message" style={{ height: '100px' }}></textarea>
                <label form="contc-message">Mensaje</label>
            </div>
        </div>
        <div className="d-grid gap-2">
            <button className="btn btn-outline-dark" id="btn-form-contc" type="submit">Enviar</button>
        </div>
    </form>
  )
}
