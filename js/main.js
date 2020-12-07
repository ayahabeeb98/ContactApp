//Add Contact Modal script
let addBtn = document.querySelector('#addBtn');
let addContactModal = document.querySelector('#addContact');
let closeModalIcon = document.querySelector('.close');

addBtn.addEventListener('click',()=>{
    addContactModal.style.display="block"
});

closeModalIcon.addEventListener('click',()=>{
    addContactModal.style.display="none";

});

window.onclick = function(event) {
    if (event.target === addContactModal) {
        addContactModal.style.display = "none";
    }
};


//TODO
//Add contact script
//1- Validate Form
//2- create contact__item
//3- open contact__details
//4- search contact feature
//5- delete contact feature