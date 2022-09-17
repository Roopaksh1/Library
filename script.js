const myLibrary = [];

const addButton = () => {
  const button = document.createElement("div");
  button.classList.add("add-book");
  button.innerHTML = '<i class="fa-solid fa-plus"></i>';
  document.querySelector(".book-container").appendChild(button);
}

const bindEvents = () => {
  document.querySelector(".add-book").addEventListener("click", openForm);
}

window.addEventListener("load", addButton);
window.addEventListener("load", bindEvents);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookToLibrary = () => {

}

const openForm = () => {
  
}