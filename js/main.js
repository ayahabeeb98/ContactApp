//Add Contact Modal script
let addBtn = document.querySelector('#addBtn');
let addContactModal = document.querySelector('#addContact');
let closeModalIcon = document.querySelector('.close');

addBtn.addEventListener('click', () => {
    addContactModal.style.display = "block"
});

closeModalIcon.addEventListener('click', () => {
    addContactModal.style.display = "none";

});

window.onclick = function (event) {
    if (event.target === addContactModal) {
        addContactModal.style.display = "none";
    }
};

//upload and preview avatar
let avatarFile = document.querySelector('.form-file');
const thump = document.querySelector('.avatar__thump');
const noUserThump = './images/no-user.png';
let newSrc = '' || noUserThump;

function previewImage() {
    const thumpFile = avatarFile.files;
    if (thumpFile.length === 0) {
        thump.src = noUserThump
    } else {
        newSrc = URL.createObjectURL(thumpFile[0]);
        thump.src = newSrc;
        thump.style.opacity = "1";
    }
}

avatarFile.addEventListener('change', previewImage);

//create a new contact
function createNewContact(src, name, notes, key) {
    const contactItem = document.createElement('DIV');
    contactItem.classList.add('contact__item');
    const avatarImage = document.createElement('IMG');
    avatarImage.src = src;
    const contactInfo = document.createElement('DIV');
    contactInfo.classList.add('contact__info');
    const contactName = document.createElement('H3');
    contactName.classList.add('contact_name');
    contactName.textContent = name;
    const note = document.createElement('P');
    note.classList.add('contact__bio');
    note.textContent = notes.slice(0, 20);
    const delUser = document.createElement('I');
    delUser.className = 'fas fa-user-times';
    delUser.setAttribute('data-id', key);


    contactInfo.appendChild(contactName);
    contactInfo.appendChild(note);
    contactItem.appendChild(avatarImage);
    contactItem.appendChild(contactInfo);
    contactItem.appendChild(delUser);
    contactItem.setAttribute('data-key', key);
    return contactItem;
}


//Add a new contact script

const createContactBtn = document.querySelector('.btn-add');
const wrapper = document.querySelector('.wrapper');
const contactName = document.querySelector('#name');
const contactEmail = document.querySelector('#email');
const contactPhone = document.querySelector('#phone');
const contactBio = document.querySelector('#bio');

//Store data in array of objects
const contact = [
    {
        name: "Aya Habeeb",
        email: "aya.r.h98@gmail.com",
        phone: "05900000000",
        bio: "Lorem ipsum dolor sit ametconsectetur adipisicing elit. Magnam, sunt!",
        key: 0,
        newSrc: noUserThump
    }
];

let k = 1;

createContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = contactName.value;
    const email = contactEmail.value;
    const phone = contactPhone.value;
    const bio = contactBio.value;
    const key = k;
    contact.push({name, email, phone, bio, key, newSrc});
    wrapper.appendChild(createNewContact(newSrc, name, bio, key));
    addContactModal.style.display = "none";
    k += 1;
    clearFields();
});

function clearFields() {
    contactName.value = '';
    contactPhone.value = '';
    contactEmail.value = '';
    contactBio.value = '';
    thump.src = noUserThump;
    newSrc = noUserThump;
}

let contactDetails = document.querySelector('.contact_details');
const closeContactMobile = document.querySelector('.contact_details .details__close');

//Display specific contact
let screenWidth = document.body.clientWidth;

wrapper.addEventListener('click', e => {
    let singleContact = e.target;
    if (singleContact.dataset.id) {
        let k = singleContact.dataset.id;
        deleteUser(k)
    } else {

        let contactKey = singleContact.dataset.key;
        if (contactKey) {
            let user = contact.filter(item => item.key === Number(contactKey));
            showDetails(user[0]);
            if(screenWidth <= 556){
                contactDetails.classList.add('mobile-version');
            }
        } else {
            console.log('something went wrong')
        }
    }
});

const userImage = document.querySelector('.contact_details img');
const userName = document.querySelector('.contact__name--main');
const userPhone = document.querySelector('.phone p');
const userEmail = document.querySelector('.email p');
const userBio = document.querySelector('.bio p');
const closeContact = document.querySelector('.details__close');
const detailsWrapper = document.querySelector('.details__wrapper');
const no_user = document.querySelector('.no_user');

function showDetails(user) {
    no_user.style.display = "none";
    detailsWrapper.style.display = "block";
    userImage.src = user.newSrc;
    userName.textContent = user.name;
    userPhone.textContent = user.phone;
    userEmail.textContent = user.email;
    userBio.textContent = user.bio;
}


closeContact.addEventListener('click', () => {
    detailsWrapper.style.display = "none";
    no_user.style.display = "block";
    userImage.src = noUserThump;
    if (screenWidth <= 556){
        contactDetails.classList.remove('mobile-version');
    }
});


//Search Feature
const searchKey = document.querySelector('#search');
const searchBtn = document.querySelector('.search__btn');
let filteredContact = [];

function searchContact(e) {
    e.preventDefault();
    if (searchKey.value.trim().length > 0) {

        let cloneContact = contact.map(a => ({...a}));
        let copyContact = cloneContact.map(item => {
            delete item.newSrc;
            delete item.key;
            return item;
        });

        for (let j = 0; j < copyContact.length; j++) {
            let userInfo = Object.values(copyContact[j]);
            for (let v = 0; v < userInfo.length; v++) {
                if (userInfo[v].includes(searchKey.value.toLowerCase())) {
                    filteredContact.push(contact[j]);
                    break
                }
            }
        }

        wrapper.innerHTML = '';

        filteredContact.forEach(item => {
            wrapper.appendChild(createNewContact(item.newSrc, item.name, item.bio, item.key));
        });
    }

}

searchBtn.addEventListener('click', searchContact);

searchKey.addEventListener('keyup', (e) => {
    if (e.target.value.trim() === '') {
        wrapper.innerHTML = '';
        filteredContact = [];
        contact.forEach(item => {
            wrapper.appendChild(createNewContact(item.newSrc, item.name, item.bio, item.key));
        });
    }
});


//Dark mode switcher

const toggleMode = document.querySelector('#themeToggle');
const modeIcon = document.querySelector('#modeIcon');

let dark = false;
toggleMode.addEventListener('click', () => {
    modeIcon.className = dark ? "fas fa-moon" : "fas fa-sun";
    document.querySelector('body').classList.toggle('dark--mode');
    dark = !dark;
});


//Delete user

function deleteUser(id) {
    filteredContact = contact.filter(item => {
        return String(item.key) !== id
    });

    wrapper.innerHTML = '';
    filteredContact.forEach(item => {
        wrapper.appendChild(createNewContact(item.newSrc, item.name, item.bio, item.key));
    });

    contact.splice(id,1);
}

