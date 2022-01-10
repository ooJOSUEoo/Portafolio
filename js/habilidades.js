let list_h = document.querySelectorAll('.habilidades_button');
function setActiveClass(){
    list_h.forEach((item) => 
    item.classList.remove('habilidades__active-progress'));
    this.classList.add('habilidades__active-progress');

    setTimeout(() => {
        this.classList.remove('habilidades__active-progress');
    }, 3000);
}
list_h.forEach((item) =>
item.addEventListener('mouseover', setActiveClass));