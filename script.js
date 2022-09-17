const myLibrary = [];

const addButton = () => {
  const button = document.createElement("div");
  button.classList.add("add-book");
  button.innerHTML = '<i class="fa-solid fa-plus"></i>';
  document.querySelector(".book-container").appendChild(button);
}

const bindEvents = () => {

}

window.addEventListener("load", addButton);
window.addEventListener("load", bindEvents);

