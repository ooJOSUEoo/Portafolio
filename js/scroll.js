const acerca_de = document.getElementById('acerca_de');
const contacto = document.getElementById('contacto');
const proyectos = document.getElementById('proyectos');

const btn_acerca_de = document.getElementById('btn_acerca_de');
const btn_contacto = document.getElementById('btn_contacto');
const btn_proyectos = document.getElementById('btn_proyectos');

acerca_de_Y = acerca_de.offsetTop;
contacto_Y = contacto.offsetTop;
proyectos_Y = proyectos.offsetTop;

btn_acerca_de.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, acerca_de_Y);
});
btn_contacto.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, contacto_Y);
});
btn_proyectos.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, proyectos_Y);
});


