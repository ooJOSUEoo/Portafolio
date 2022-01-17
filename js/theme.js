const color = {
    primary_color: '#333',
    secondary_color: 'rgb(221, 63, 63)',
    tertiary_color: '#fff',
    quaternary_color: '#000',
    quinary_color: '#ff0000',
    primary_color_light: '#d8e0e3',
    sky_blue: '#00bfff',
    color_footer: '#888889'
}

const boxShadow = {
    dark: '0px 0px 10px rgb(148, 148, 148)',
    light: '0px 0px 10px rgb(57, 56, 56)',
    transparent: '0px 0px 10px transparent',
}

const urlWaves = {
    waveDark: 'url(./img/wave.png)',
    waveLight: 'url(./img/wave-azul.png)'
}

const theme_btn = document.getElementById('theme-btn');
const theme_check = document.getElementById('theme-check');
const icon_theme = document.getElementById('icon-theme');

const body = document.querySelector('body');
const header = document.getElementById('header');
const icons_header = document.querySelectorAll('.icons_header');
const text_header = document.querySelectorAll('.text');
const main = document.getElementById('main');
const btn_cvs = document.querySelector('.btn-cvs');
const proyect__container = document.querySelectorAll('.proyect__container');
const proyect__view = document.querySelectorAll('.proyect__view');
const fa_github = document.querySelectorAll('.fa-github');
const fa_eye = document.querySelectorAll('.fa-eye');
const habilidades__items = document.querySelectorAll('.habilidades__items');
const habilidades_progress = document.querySelectorAll('.habilidades_progress');
const footer = document.getElementById('footer');
const wave = document.querySelectorAll('.wave');

isThemeDark();

setInterval(hover_cv, 500);
setInterval(hover_proyect__container, 500);

function isThemeDark() {
    if (!localStorage.getItem('ThemeDark')) {
        localStorage.setItem('ThemeDark', 'true');
    }
    
    theme_btn.addEventListener('click', () => {
        if (theme_check.checked) {
            localStorage.setItem('ThemeDark', 'false');
            theme_check.checked = false;
        } else {
            theme_check.checked = true;
            localStorage.setItem('ThemeDark', 'true');
        }
        changeStyle();
    });
    changeStyle();
    isChecked();
}

function isChecked() {
    if (localStorage.getItem('ThemeDark') == 'true') { //si el tema es oscuro
        theme_check.checked = true;
    } else {
        theme_check.checked = false; 
    }

    return theme_check.checked;
}

function hover_cv() { //funcion para cambiar el color del cv al pasar el mouse
    if (!isChecked()) {
        btn_cvs.addEventListener('mouseover', () => {
            btn_cvs.style.backgroundColor = color.tertiary_color;
            btn_cvs.style.color = color.sky_blue;
        });
    
        btn_cvs.addEventListener('mouseout', () => {
            changeStyle();
        });
    }else{
        btn_cvs.addEventListener('mouseover', () => {
            btn_cvs.style.backgroundColor = color.tertiary_color;
            btn_cvs.style.color = color.secondary_color;
        });
    
        btn_cvs.addEventListener('mouseout', () => {
            changeStyle();
        });
    }
}

function hover_proyect__container(){ //funcion para cambiar el color del proyecto al pasar el mouse
    if(!isChecked()){
        proyect__container.forEach(proyect => {
            proyect.addEventListener('mouseover', () => {
                proyect.style.boxShadow = boxShadow.light;
            });
            proyect.addEventListener('mouseout', () => {
                proyect.style.boxShadow = boxShadow.transparent;

            });
        });
    }else{
        proyect__container.forEach(proyect => {
            proyect.addEventListener('mouseover', () => {
                proyect.style.boxShadow = boxShadow.dark;
            });
            proyect.addEventListener('mouseout', () => {
                proyect.style.boxShadow = boxShadow.transparent;
            });
        });
    }
}

function changeStyle() {
    if (localStorage.getItem('ThemeDark') == 'true') { //si el tema es oscuro
        theme_btn.style.backgroundColor = color.tertiary_color;
        theme_btn.style.borderColor = color.quaternary_color;

        icon_theme.classList.remove('fa-sun');
        icon_theme.classList.add('fa-moon');

        body.style.background = color.primary_color;

        header.classList.add('bg-dark');
        header.classList.remove('bg-info');

        header.children[0].children[0].children[1].classList.add('text-light');
        header.children[0].children[0].children[1].classList.remove('text-dark');

        icons_header.forEach(icon => {
            icon.classList.add('text-light');
            icon.classList.remove('text-dark');
        });

        text_header.forEach(text => {
            text.classList.add('text-light');
            text.classList.remove('text-dark');
        });

        btn_cvs.style.backgroundColor = color.secondary_color;
        btn_cvs.style.color = color.tertiary_color;

        main.classList.add('text-light');
        main.classList.remove('text-dark');

        proyect__container.forEach(proyect => {
            proyect.style.borderColor = color.quinary_color;
        });

        fa_github.forEach(fa => {
            fa.classList.add('text-light');
            fa.classList.remove('text-dark');
        });

        fa_eye.forEach(eye => {
            eye.style.color = color.sky_blue;
        });

        habilidades__items.forEach(habilidad => {
            habilidad.style.borderColor = color.quinary_color;
        });

        habilidades_progress.forEach(habilidad => {
            habilidad.style.color = color.tertiary_color;
        });

        proyect__view.forEach(proyect => {
            proyect.style.background = color.quinary_color;
        });

        footer.classList.add('text-light');
        footer.classList.remove('text-dark');
        footer.style.background = color.color_footer

        wave.forEach(wave => {
            wave.style.backgroundImage = urlWaves.waveDark;
        });

    } else {
        theme_btn.style.backgroundColor = color.quaternary_color;
        theme_btn.style.borderColor = color.tertiary_color;

        icon_theme.classList.remove('fa-moon');
        icon_theme.classList.add('fa-sun');

        body.style.background = color.primary_color_light;

        header.classList.add('bg-info');
        header.classList.remove('bg-dark');

        header.children[0].children[0].children[1].classList.add('text-dark');
        header.children[0].children[0].children[1].classList.remove('text-light');

        icons_header.forEach(icon => {
            icon.classList.add('text-dark');
            icon.classList.remove('text-light');
        });

        text_header.forEach(text => {
            text.classList.add('text-dark');
            text.classList.remove('text-light');
        });

        btn_cvs.style.backgroundColor = color.sky_blue;
        btn_cvs.style.color = color.tertiary_color;

        main.classList.add('text-dark');
        main.classList.remove('text-light');

        proyect__container.forEach(proyect => {
            proyect.style.borderColor = color.sky_blue;
        });

        fa_github.forEach(fa => {
            fa.classList.add('text-dark');
            fa.classList.remove('text-light');
        });

        fa_eye.forEach(eye => {
            eye.style.color = color.quinary_color;
        });

        habilidades__items.forEach(habilidad => {
            habilidad.style.borderColor = color.sky_blue;
        });

        habilidades_progress.forEach(habilidad => {
            habilidad.style.color = color.quaternary_color;
        });

        proyect__view.forEach(proyect => {
            proyect.style.background = color.sky_blue;
        });

        footer.classList.add('text-dark');
        footer.classList.remove('text-light');
        footer.style.background = color.sky_blue

        wave.forEach(wave => {
            wave.style.backgroundImage = urlWaves.waveLight;
        });
    }
}
