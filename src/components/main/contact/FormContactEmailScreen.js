import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { useForm } from '../../../hooks/useForm';
import validator from 'validator';

export const FormContactEmailScreen = () => {

    const form = useRef();
    const [message, setMessage] = useState(1)
    const [messageOK, setMessageOK] = useState(null)
    const [title, setTitle] = useState('¡Error!')

    const [formValue, handleInputChange] = useForm({
        user_email: '',
        user_name: '',
        user_tel: '',
        user_message: ''
    });

    const handleSubmit = (e) => { 
        e.preventDefault()
        document.getElementById('btn-form-contc').innerHTML = 'Enviando...'
        document.getElementById('btn-form-contc').disabled = true

        if (!message){
            const serviceID = 'service_2il2lxg';
            const templateID = 'template_fpo2t8y';
            const publicKey = '1mA_Ykh5wOGGZe8uX'
            
            emailjs.sendForm(serviceID, templateID, form.current, publicKey)
            .then(res => {
                console.log(res);
                document.getElementById('alert-contact').classList.remove('d-none')
                document.getElementById('alert-contact').classList.add('alert-success')
                document.getElementById('alert-contact').classList.remove('alert-danger')
                setTitle('¡Mensaje enviado!')
                setMessageOK('Mensaje enviado correctamente')
            })
            .catch(err => {
                console.log(err);
                setMessage('Error al enviar el mensaje, intente más tarde')
            })
            .finally(() => {
                document.getElementById('btn-form-contc').innerHTML = 'Enviar'
                document.getElementById('btn-form-contc').disabled = false
                setTimeout(() => {
                    document.getElementById('alert-contact').classList.add('d-none')
                }, 3000)
            })
        }
    }

    useEffect(() => {

        const regexTel = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

        document.getElementById('alert-contact').classList.remove('d-none')
        document.getElementById('alert-contact').classList.remove('alert-success')
        document.getElementById('alert-contact').classList.add('alert-danger')
        setTitle('¡Error!')
        
        if (!formValue.user_email || !formValue.user_name || !formValue.user_tel || !formValue.user_message){
            setMessage('Todos los campos son obligatorios')
        }else if (!validator.isEmail(formValue.user_email)){
            setMessage('El email no es válido')
        }else if (!regexTel.test(formValue.user_tel)){
            setMessage('El teléfono no es válido')
        }else if (!regexName.test(formValue.user_name)){
            setMessage('El nombre no es válido')
        }else if (formValue.user_message.length < 10){
            setMessage('El mensaje debe tener al menos 10 caracteres')
        }else{
            setMessage(null)
            document.getElementById('alert-contact').classList.add('d-none')
        }


        if (validator.isEmail(formValue.user_email)){
            document.getElementById('user_email').classList.remove('is-invalid')
            document.getElementById('user_email').classList.add('is-valid')
        }else{
            document.getElementById('user_email').classList.remove('is-valid')
            document.getElementById('user_email').classList.add('is-invalid')
        }

        if (regexTel.test(formValue.user_tel)){
            document.getElementById('user_tel').classList.remove('is-invalid')
            document.getElementById('user_tel').classList.add('is-valid')
        }else{
            document.getElementById('user_tel').classList.remove('is-valid')
            document.getElementById('user_tel').classList.add('is-invalid')
        }

        if (regexName.test(formValue.user_name)){
            document.getElementById('user_name').classList.remove('is-invalid')
            document.getElementById('user_name').classList.add('is-valid')
        }else{
            document.getElementById('user_name').classList.remove('is-valid')
            document.getElementById('user_name').classList.add('is-invalid')
        }

        if (formValue.user_message.length >= 10){
            document.getElementById('user_message').classList.remove('is-invalid')
            document.getElementById('user_message').classList.add('is-valid')
        }else{
            document.getElementById('user_message').classList.remove('is-valid')
            document.getElementById('user_message').classList.add('is-invalid')
        }
    }, [formValue, message])


  return (
    <form  id="form-contact" ref={form} onSubmit={handleSubmit} className="container">
        {/* <!--- Alerta que se quita despues de 3 segundos --> */}
        <div className="alert alert-danger alert-dismissible fade show d-flex justify-content-center align-items-center"
            role="alert" id="alert-contact">
            <strong id="b-alert">{title}</strong>
            &nbsp;
            <p id="p-alert" className='m-0'>{
                message ? message : messageOK
            }</p>
        </div>
        <div className="row g-2 mb-3">
            <div className="col-md">
                <div className="form-floating">
                    <input type="email" className="form-control" id="user_email" name="user_email"
                        value={formValue.user_email} onChange={handleInputChange}
                        placeholder="name@example.com" />
                    <label form="user_email"><i className="fas fa-envelope"></i> Correo electronico</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                    <input type="text" className="form-control" id="user_name" name="user_name"
                        value={formValue.user_name} onChange={handleInputChange}
                        placeholder="name@example.com" />
                    <label form="user_name"><i className="fas fa-user"></i> Nombre Completo</label>
                </div>
            </div>
        </div>
        <div className="row g-2 mb-3">
            <div className="col-md">
                <div className="form-floating">
                    <input type="number" min="0" className="form-control" id="user_tel" name="user_tel"
                        value={formValue.user_tel} onChange={handleInputChange}
                        placeholder="name@example.com" />
                    <label form="user_tel"><i className="fas fa-phone"></i> Teléfono</label>
                </div>
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" name="user_message"
                    value={formValue.user_message} onChange={handleInputChange}
                    id="user_message" style={{ height: '100px' }}>
                    {formValue.user_message}
                    </textarea>
                <label form="user_message"><i className="fas fa-comment"></i> Mensaje</label>
            </div>
        </div>
        <div className="d-grid gap-2">
            <button className='btn' id="btn-form-contc" type="submit">Enviar</button>
        </div>
    </form>
  )
}
