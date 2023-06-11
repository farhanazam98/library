
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
    this.toggleReadStatus = function(){
      this.read = this.read === "Read" ? "Not Read" : "Read";
    }
}
function addBookToLibrary(book) {
    myLibrary.push(book);
}

let library = document.querySelector('.library');

function removeBookFromLibrary(book) {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    render();
}

function updateReadStatus(book){
  book.toggleReadStatus();
  render();
}

addBookToLibrary(new Book("Aadsf", "asdf", 12, "Read"));

function render() {
    library.innerHTML = '';
    myLibrary.forEach(element => {
        const bookCard = document.createElement('div');

        bookCard.classList.add('card');
        bookCard.setAttribute('data-index', myLibrary.indexOf(element));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {removeBookFromLibrary(element)
        });
        let title = document.createElement("h2");
        title.textContent = "Title: " + element.title;
        
        let author = document.createElement("h3");
        author.textContent = "Author: " + element.author;

        let pages = document.createElement("p");
        pages.textContent = "Pages read:" + element.pages;
        let read = document.createElement("p");
        read.textContent = "Status: " + element.read;

        let status = document.createElement("button");
        status.textContent = "Change Read Status"
        status.addEventListener("click", function(){
          updateReadStatus(element)
        });

        

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);


        bookCard.appendChild(removeButton);
        bookCard.appendChild(status);
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
    const read = formData.get('read') ?? "Not Read";
  
    let newBook = new Book(author, title, pages, read);
    addBookToLibrary(newBook);
  
    render(); 
    modal.style.display = 'none';
    form.reset();   
  }

const form = document.getElementById('inputForm');
form.addEventListener('submit', submitForm);
render();