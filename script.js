
// Library Managment
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
  this.toggleReadStatus = function () {
    this.read = this.read === "Read" ? "Not Read" : "Read";
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}


function removeBookFromLibrary(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

function updateReadStatus(book) {
  book.toggleReadStatus();
}

addBookToLibrary(new Book("Aadsf", "asdf", 12, "Read"));

// Rendering
function renderLibrary() {
  let library = document.querySelector('.library');
  library.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    library.appendChild(bookCard);
  });
}

function createBookCard(book, index) {
  const bookCard = document.createElement('div');

  bookCard.classList.add('card');
  bookCard.setAttribute('data-index', myLibrary.indexOf(index));

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', function () {
    removeBookFromLibrary(book)
    renderLibrary();
  });
  const readStatusButton = document.createElement("button");
  readStatusButton.textContent = "Change Read Status"
  readStatusButton.addEventListener("click", function () {
    updateReadStatus(book)
    renderLibrary();
  });

  const title = document.createElement("h2");
  title.textContent = "Title: " + book.title;

  const author = document.createElement("h3");
  author.textContent = "Author: " + book.author;

  const pages = document.createElement("p");
  pages.textContent = "Pages read:" + book.pages;

  const read = document.createElement("p");
  read.textContent = "Status: " + book.read;


  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);


  bookCard.appendChild(removeButton);
  bookCard.appendChild(readStatusButton);
  return bookCard;
}

// User interaction
function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('inputForm');
  const formData = new FormData(form);


  const author = formData.get('author');
  const title = formData.get('title');
  const pages = formData.get('pages');
  const read = formData.get('read') ?? "Not Read";

  let newBook = new Book(author, title, pages, read);
  addBookToLibrary(newBook);

  renderLibrary();
  modal.style.display = 'none';
  form.reset();
}

function setupModal(){
  const modal = document.getElementById('modal');

  const showFormButton = document.getElementById('showFormButton');
  showFormButton.addEventListener('click', function () {
    modal.style.display = 'block';
  });


  const closeModal = document.getElementsByClassName('close')[0];
  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
}

function initializeApp() {
  const form = document.getElementById('inputForm');
  form.addEventListener('submit', submitForm);
  setupModal();
  renderLibrary();
}

initializeApp();