
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}
function addBookToLibrary(book) {
    myLibrary.push(book);
}

let library = document.querySelector('.library');

function render() {
    library.innerHTML = '';
    myLibrary.forEach(element => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCard.textContent = element.info();
        library.appendChild(bookCard);
    });
}

const showFormButton = document.getElementById('showFormButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementsByClassName('close')[0];

showFormButton.addEventListener('click', function() {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

function submitForm(event) {
    event.preventDefault(); 
  
    const form = document.getElementById('inputForm');
    const formData = new FormData(form);

  
    const author = formData.get('author');
    const title = formData.get('title');
    const pages = formData.get('pages');
    const read = formData.get('read');
  
    let newBook = new Book(author, title, pages, read);
    addBookToLibrary(newBook);
  
    render(); 
    modal.style.display = 'none';
    form.reset();   
  }

const form = document.getElementById('inputForm');
form.addEventListener('submit', submitForm);