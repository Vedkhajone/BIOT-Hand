const body = document.getElementById('body')
/*=============== CHANGE BACKGROUND HEADER ===============*/
const header = document.querySelector('.header')
window.addEventListener('scroll', () => {
    if(window.scrollY >= 50){
        header.classList.add('header-scrolled')
    }else{
        header.classList.remove('header-scrolled')
    }
})

/*=============== Services Modal ===============*/

const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalClose = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}
modalBtns.forEach((mb,i) => {
    mb.addEventListener('click', () => {
        modal(i)
        if(!body.classList.contains('no-scroll')){
            body.classList.add('no-scroll')
        }
    })
})
modalClose.forEach((mb) => {
    mb.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
            if(body.classList.contains('no-scroll')){
                body.classList.remove('no-scroll')
            }
        })
    })
})
/*=============== Mixit Up Filter Portfolio ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target : '.work__card'
    },
    animation: {
        duration : 300
    }
})
// Active Work Item Link
const linkWork = document.querySelectorAll('.work__item')
function activeWork(){
    linkWork.forEach((i) => {
        i.classList.remove('active-work')
        this.classList.add('active-work')
    })
}
linkWork.forEach((i) => {
    i.addEventListener('click', activeWork)
})
/*=============== Swiper Testimonial ===============*/
let swiper = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});
/*=============== Scroll Section Active Link ===============*/
const sections = document.querySelectorAll('section[id]')
function scrollActive(){
    const yScroll = window.scrollY
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')
        if(yScroll > sectionTop && yScroll <= sectionTop + sectionHeight){
            document.querySelector(`.nav__menu a[href*= ${sectionId}]`).classList.add('active-link')
        }else{
            document.querySelector(`.nav__menu a[href*= ${sectionId}]`).classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)
/*=============== Light Dark Theme ===============*/
const themeButton = document.querySelector('#themeButton'),
      lightTheme = 'light-theme',
      iconTheme = 'bx-sun'
// Previously selected topic (If user selected)
const selectedTheme = localStorage.getItem('selected-theme'),
      selectedIcon = localStorage.getItem('selected-icon')
// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'
// We validate if the user previously chose a topic
if(selectedTheme){
    body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}
// Active or deactive theme manually by button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon class
    body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
// Scroll Reveal Animation
const sr = ScrollReveal({
    origin : 'left',
    distance : '60px',
    duration : 2500,
    delay : 400
})
// ===================== Reveal Home ======================
// Viewport With Variable
const viewportWidth = window.visualViewport.width
// Scroll Reveal Function
function srElement(element, od){
    sr.reveal(element, od)
}
let arrHome1 = ['.home__content', '.home__social']
let arrHome2 = ['.home__handle', '.home__scroll']
arrHome1.forEach((element, index) => {
    srElement(element, {delay : 400 + (index * 300)})
})
arrHome2.forEach((element,index) => {
    srElement(element, {origin : 'right', delay : 400 + (index * 300)})
})
// =========== (viewport Width < 1200) ===========
if(viewportWidth < 1200){
    let arrHome = arrHome1.concat(arrHome2)
    arrHome.forEach((element,index) => {
        if(index % 2 === 0){
            srElement(element, {origin : 'top', delay : 400 + (index * 300)})
        }else{
            srElement(element, {origin : 'bottom', delay : 1000})
        }
    })
}
// ====================== Reveal About ======================
let arrAbout = ['.about__handle', '.about__content']
arrAbout.forEach((element, index) => {
    if(index % 2 === 0){
        srElement(element)
    }else{
        srElement(element, {origin : 'right'})
    }
    // =========== (viewport Width < 992) ===========
    if(viewportWidth < 992){
        srElement(element, {origin : 'top', delay : 400 + (index * 300)})
    }
})
// ====================== Reveal Skills ======================
let skillsContentAll = document.querySelectorAll('.skills__content')
skillsContentAll.forEach((element, index) => {
    if(index % 2 === 0){
        srElement(element)
    }else{
        srElement(element, {origin : 'right'})
    }
    // =========== (viewport Width < 992) ===========
    if(viewportWidth < 992){
        srElement(element, {origin : 'top', delay : 400 + (index * 300)})
    }
})
// ====================== Reveal Services ======================
let servicesCard = document.querySelectorAll('.services__card')
servicesCard.forEach((element, index) => {
    srElement(element, {delay : 400 + (index * 300)})
    // =========== (viewport Width < 320) ===========
    if(viewportWidth <= 320){
        srElement(element, {origin : 'top', delay : 400 + (index * 300)})
    }
})
// ====================== Reveal Work ======================
const workCard = document.querySelectorAll('.work__card')
workCard.forEach((element, index) => {
    srElement(element, {origin : 'top', delay : 400 + (index * 300)})
    // =========== (viewport Width >= 768 && viewport Width < 1200) ===========
    if(viewportWidth >= 768 && viewportWidth < 1200){
        if(index % 2 === 0){
            srElement(element, {origin : 'left'})
        }else{
            srElement(element, {origin : 'right'})
        }
    }
    
})
// ====================== Reveal Testimonial ======================
srElement('.testimonial__container', {origin : 'top'})
// ====================== Reveal Contact ======================
let contactContent = document.querySelectorAll('.contact__content')
contactContent.forEach((element, index) => {
    if(index % 2 === 0){
        srElement(element)
    }else{
        srElement(element, {origin : 'right'})
    }
    if(viewportWidth <= 992){
        srElement(element, {origin : 'top', delay : 400 + (index * 300)})
    }
})
// ====================== Reveal Footer ======================
let footerElement = document.querySelector('.footer__container').querySelectorAll('h1, ul, span')
footerElement.forEach((element, index) => {
    srElement(element, {origin : 'bottom', delay : 400 + (index * 100)})
})