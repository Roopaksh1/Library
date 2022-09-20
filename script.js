const myLibrary = [];

const addNewBookButton = () => {
  const button = document.createElement("div");
  button.classList.add("add-book");
  button.innerHTML = '<i class="fa-solid fa-plus"></i>';
  document.querySelector(".book-container").appendChild(button);
  document.querySelector(".add-book i").addEventListener("click", openForm);
};

const bindEvents = () => {
  document
    .querySelector("button[type='submit']")
    .addEventListener("click", addBookToLibrary);
  document
    .querySelector("button[type='button']")
    .addEventListener("click", closeForm);
};

window.addEventListener("load", addNewBookButton);
window.addEventListener("load", bindEvents);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function (index) {
  return `<p>Title: ${this.title}<br> By: ${this.author}<br> No. of pages: ${
    this.pages
  }<br></p>${
    this.read
      ? `<button class="read" data-index="${index}">Read</button>`
      : `<button class="not-read" data-index="${index}">Not Read</button>`
  }<button class="remove" data-index="${index}">Remove</button>`;
};

Book.prototype.toggleRead = function () {
  this.read = this.read ? false : true;
};

const isBookInLibrary = (book) => {
  return myLibrary.some((b) => b.title === book.title);
};

const addBookToLibrary = (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read-flag").checked;
  const book = new Book(title, author, pages, read);
  if (isBookInLibrary(book)) {
    document.querySelector(".error").classList.remove("hidden");
    return;
  }
  myLibrary.push(book);
  closeForm();
  displayBookCard();
};

const openForm = () => {
  document.querySelector(".wrapper").classList.add("not-active");
  document.querySelector(".form").classList.remove("hidden");
};

const closeForm = () => {
  document.querySelector(".wrapper").classList.remove("not-active");
  document.querySelector(".form").classList.add("hidden");
};

const displayBookCard = () => {
  const container = document.querySelector(".book-container");
  container.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = book.info(index);
    container.appendChild(card);
  });
  addNewBookButton();
  addEventToBookCard();
};

const addEventToBookCard = () => {
  document
    .querySelectorAll(".book-card button")
    .forEach((b) => b.addEventListener("click", handleBookCard));
};

const removeBook = (index) => {
  myLibrary.splice(index, 1);
};

const handleBookCard = (e) => {
  const index = e.target.getAttribute("data-index");
  if (e.target.textContent === "Remove") {
    removeBook(index);
  } else {
    myLibrary[index].toggleRead();
  }
  displayBookCard();
};
