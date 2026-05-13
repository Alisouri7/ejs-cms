const $ = document;
const addModalElem = $.querySelector('#add-new-course-modal');
const showAddModalBtn = $.querySelector('.courses-btn-add-new-course');
const editModalElem = $.querySelector('#edit-course-modal');
const editForm = $.querySelector('.edit-course-form');


const showAddModal = () => {
    addModalElem.classList.add('visible')
};

const hideAddModal = () => {
    addModalElem.classList.remove('visible')
};



const hideEditModal = () => {
    editModalElem.classList.remove('visible')

};

showAddModalBtn.addEventListener('click', showAddModal);

function formAction (id) {
    editModalElem.classList.add('visible')
    editForm.action = `/courses/edit/${id}`
}


window.addEventListener('keydown', (event) => {
    if (event.keyCode === 27) {
        hideAddModal()
        hideEditModal()
    }
});





