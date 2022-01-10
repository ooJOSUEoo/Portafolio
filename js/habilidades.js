let list_h = document.querySelectorAll('.habilidades_button');
function setActiveClass(){
    list_h.forEach((item) => 
    item.classList.remove('habilidades__active-progress'));
    this.classList.add('habilidades__active-progress');
}
list_h.forEach((item) =>
item.addEventListener('mouseover', setActiveClass));