$('#form-contact').submit(function (e) {
    e.preventDefault();
    if (validateForm()) {
        $('#btn-form-contc').attr('disabled', true);
        $('#btn-form-contc').html('Enviando...');

        const serviceID = 'default_service';
        const templateID = 'template_fpo2t8y';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                $('#btn-form-contc').attr('disabled', false);
                $('#btn-form-contc').html('Enviar');
                $('#alert-contact').removeClass('alert-danger');
                $('#alert-contact').addClass('alert-success');
                $('#alert-contact').removeClass('d-none');
                hiddenAlert();
                $('#b-alert').html('Mensaje enviado correctamente! &nbsp;');
                $('#p-alert').html('Gracias por contactarme, pronto me pondré en contacto contigo.');
            }, (err) => {
                $('#btn-form-contc').attr('disabled', false);
                $('#btn-form-contc').html('Enviar');
                $('#b-alert').html('Error: &nbsp;' + JSON.stringify(err));
            });
    }
});

function validateForm() {
    var email = $('#contc-email').val();
    var name = $('#contc-name').val();
    var message = $('#contc-message').val();
    var tel = $('#contc-tel').val();
    var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var regexTel = /^[0-9]{9,13}$/;
    var regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,30}$/;

    if (email.trim().length !== 0 || name.trim().length !== 0 || message.trim().length !== 0 || tel.trim().length !== 0) {
        if (regexEmail.test(email) && regexName.test(name) && regexTel.test(tel) && message.trim().length > 4) {
            return true;
        } else {
            $('#alert-contact').removeClass('alert-success');
            $('#alert-contact').addClass('alert-danger');
            $('#alert-contact').removeClass('d-none');
            $('#b-alert').html('Error! &nbsp;');
            if (message.trim().length < 5) {
                $('#p-alert').html('El mensaje no es válido');
            }
            if (!regexTel.test(tel)) {
                $('#p-alert').html('El teléfono no es válido');
            }
            if (!regexName.test(name)) {
                $('#p-alert').html('El nombre no es válido');
            }
            if (!regexEmail.test(email)) {
                $('#p-alert').html('El email no es válido');
            }
            hiddenAlert();
            return false;
        }
    } else {
        $('#alert-contact').removeClass('alert-success');
        $('#alert-contact').addClass('alert-danger');
        $('#alert-contact').removeClass('d-none');
        $('#b-alert').html('Error: &nbsp;')
        $('#p-alert').html('Debes rellenar todos los campos');
        hiddenAlert();
        return false;
    }
}

function hiddenAlert() {
    setTimeout(function () {
        $('#alert-contact').addClass('d-none');
    }, 3000);
}