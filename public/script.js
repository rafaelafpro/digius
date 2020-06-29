modalOverlay = document.querySelector('.modal-overlay');
cards = document.querySelectorAll('.card');
courseCards = document.querySelector ('.course-card')


for (let card of cards) {
    card.addEventListener ('click', ()=> {
        let page = card.getAttribute('id');
        window.location.href = `/courses/${page}`;
    })
}





