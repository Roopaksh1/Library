const myLibrary = [];

const addNewBookButton = () => {
  const button = document.createElement('div');
  button.classList.add('add-book');
  button.innerHTML = '<i class="fa-solid fa-plus"></i>';
  document.querySelector('.book-container').appendChild(button);
  document.querySelector('.add-book i').addEventListener('click', openForm);
};

const bindEvents = () => {
  document
    .querySelector("button[type='submit']")
    .addEventListener('click', addBookToLibrary);
  document
    .querySelector("button[type='button']")
    .addEventListener('click', closeForm);
};

window.addEventListener('load', addNewBookButton);
window.addEventListener('load', bindEvents);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info(index) {
    return `<p>Title: ${this.title}<br> By: ${this.author}<br> No. of pages: ${
      this.pages
    }<br></p>${
      this.read
        ? `<button class="read" data-index="${index}">Read</button>`
        : `<button class="not-read" data-index="${index}">Not Read</button>`
    }<button class="remove" data-index="${index}">Remove</button>`;
  }

  toggleRead() {
    this.read = !this.read;
  }
}
const isBookInLibrary = (book) => myLibrary.some((b) => b.title === book.title);

const addBookToLibrary = (e) => {
  e.preventDefault();
  if (isValidate()) {
    const title = Form.getTitle().value;
    const author = Form.getAuthor().value;
    const pages = Form.getPages().value;
    const read = Form.getReadFlag().checked;
    const book = new Book(title, author, pages, read);
    if (isBookInLibrary(book)) {
      document.querySelector('.error.title').classList.remove('hidden');
      document.querySelector('#title').style.border = 'solid red 2px';
      document.querySelector('.error.title').textContent =
        'This book already exists in your library';
      return;
    }
    myLibrary.push(book);
    closeForm();
    displayBookCard();
  }
};

const openForm = () => {
  document.querySelector('.wrapper').classList.add('not-active');
  document.querySelector('.form').classList.remove('hidden');
};

const closeForm = () => {
  clearForm();
  document.querySelector('.wrapper').classList.remove('not-active');
  document.querySelector('.form').classList.add('hidden');
};

const clearForm = () => {
  Form.getTitle().value = '';
  Form.getAuthor().value = '';
  Form.getPages().value = '';
  Form.getReadFlag().checked = false;
};

const displayBookCard = () => {
  const container = document.querySelector('.book-container');
  container.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = book.info(index);
    container.appendChild(card);
  });
  addNewBookButton();
  addEventToBookCard();
};

const addEventToBookCard = () => {
  document
    .querySelectorAll('.book-card button')
    .forEach((b) => b.addEventListener('click', handleBookCard));
};

const removeBook = (index) => {
  myLibrary.splice(index, 1);
};

const handleBookCard = (e) => {
  const index = e.target.getAttribute('data-index');
  if (e.target.textContent === 'Remove') {
    removeBook(index);
  } else {
    myLibrary[index].toggleRead();
  }
  displayBookCard();
};

const isValidate = () => {
  const title = Form.getTitle();
  const author = Form.getAuthor();
  const pages = Form.getPages();
  if (title.validity.valueMissing) {
    document.querySelector('.error.title').textContent =
      'This field is required';
    document.querySelector('.error.title').classList.remove('hidden');
  }
  if (title.validity.tooShort || title.validity.tooLong) {
    document.querySelector('.error.title').classList.remove('hidden');
    document.querySelector('.error.title').textContent =
      'Title needs to be between 3 to 20 characters.';
  }
  if (author.validity.valueMissing) {
    document.querySelector('.error.author').textContent =
      'This field is required';
    document.querySelector('.error.author').classList.remove('hidden');
  }
  if (author.validity.tooShort || title.validity.tooLong) {
    document.querySelector('.error.author').textContent =
      'Title needs to be between 2 to 20 characters.';
    document.querySelector('.error.author').classList.remove('hidden');
  }
  if (pages.validity.valueMissing) {
    document.querySelector('.error.pages').textContent =
      'This field is required';
    document.querySelector('.error.pages').classList.remove('hidden');
  }
  if (pages.validity.rangeUnderflow || pages.validity.rangeOverflow) {
    document.querySelector('.error.pages').textContent =
      'Pages must be greater than 0.';
    document.querySelector('.error.pages').classList.remove('hidden');
  }

  return Form.getForm().checkValidity();
};

const Form = (() => {
  const getForm = () => document.querySelector('form');
  const getTitle = () => document.querySelector('#title');
  const getAuthor = () => document.querySelector('#author');
  const getPages = () => document.querySelector('#pages');
  const getReadFlag = () => document.querySelector('#read-flag');
  return {
    getForm,
    getTitle,
    getAuthor,
    getPages,
    getReadFlag,
  };
})();
