const formEl = document.querySelector("form");
let bookList = [];
let bookID = 0;
let firstChild = 0;
let currentDate = new Date();
const closeWindow = () => {
  const windowContainer = document.getElementById("edit-window");
  windowContainer.remove();
};
const changeIsCompleted = (bookID, isC) => {
  const bookData = JSON.parse(localStorage.getItem(bookID));
  addNewBook(
    bookData.title,
    bookData.author,
    bookData.year,
    isC,
    bookData.id
  );
  renderBooks();
  closeWindow();
};
const editBookWindow = (bookID) => {
  const bookData = JSON.parse(localStorage.getItem(bookID));
  const coordinate = document.querySelector("main");
  const windowContainer = document.createElement("div");
  windowContainer.innerHTML = `
    <label>Book Name: ${bookData?.title}</label>
    <label>Author: ${bookData?.author}</label>
    <label>Year: ${bookData?.year}</label>
    <section id="checkbox-container">
    <label for="checkbox">Is Complete</label>
    <div>
      <input type="radio" id="isCompleted1" name="isCompleted" value="true" onCLick=changeIsCompleted('Book-${bookData.id}',true) >
      <label for="isCompleted1">True</label>
      <input type="radio" id="isCompleted2" name="isCompleted" value="false" onClick=changeIsCompleted('Book-${bookData.id}',false) >
      <label for="isCompleted2">False</label>
    </div>
</section>
  `;
  windowContainer.setAttribute("class", "edit-window-container");
  windowContainer.setAttribute("id", "edit-window");
  coordinate.insertBefore(windowContainer, coordinate.lastChild);
};
const grabBookNameInput = () => {
  const bNameInput = document.querySelector("#book-find-name");
  const bookByNameRenderCoordinate = document.querySelector(
    ".edit-window-container"
  );
  const newBookLIst = document.createElement("ul");
  const bookItemsContainer = document.createElement("div");
  bookItemsContainer.setAttribute("class", "bookList");
  let listElements = "";

  const bookItCont = document.querySelectorAll(".bookList");
  bookItCont.forEach((d) => d.remove());
  bookByNameRenderCoordinate.insertBefore(
    bookItemsContainer,
    bookByNameRenderCoordinate.lastChild
  );
  bookItemsContainer.innerHTML = "";
  bookList.map((d, i) => {
    isCompleteBtn = "";
    if (eval(d.isComplete) == true) {
      isCompleteBtn = `<span class="isCompleteBtn complete-true" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></svg></span>`;
    } else {
      isCompleteBtn = `<span class="isCompleteBtn complete-false">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></svg>
      </span>`;
    }
    const title = d.title;
    let inputBook = new RegExp(bNameInput.value.toLowerCase());
    if (inputBook.test(title.toLowerCase())) {
      listElements += `<li class="book-list">
      <div>Book Name: ${d?.title}</div>
      <div>Year: ${d?.year}</div>
      <div>Author: ${d?.author}</div>
      <div>
        <button onCLick=editBookWindow('Book-${d.id}') >Move</button>
        <button onCLick=removeBook('Book-${d.id}') >Remove</button>
        ${isCompleteBtn}
      </div>
      </li>`;
    }
  });
  newBookLIst.innerHTML = listElements;
  bookItemsContainer.appendChild(newBookLIst);
};
const findBookWindow = (bookName) => {
  const bookData = JSON.parse(localStorage.getItem(bookID));
  const coordinate = document.querySelector("main");
  const windowContainer = document.createElement("div");
  windowContainer.innerHTML = `
  <div class="find-book-container">
  <input type="text" id="book-find-name" name="book-find-names" placeholder="enter book name">
  <button onCLick=grabBookNameInput()>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 30, 0, 1);transform: ;msFilter:;"><path d="M9 16c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604-1.392-1.358a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.967 6.967 0 0 0 16 9c0-3.859-3.141-7-7-7S2 5.141 2 9s3.141 7 7 7z"></path></svg>
  </button>
  <button onClick=closeWindow() class="find-book-window-close-btn" >
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(20, 4, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
  </button>
  </div>
  `;
  windowContainer.setAttribute("class", "edit-window-container");
  windowContainer.setAttribute("id", "edit-window");
  coordinate.insertBefore(windowContainer, coordinate.lastChild);
};
function renderBooks(a, whatBooks) {
  let listElements = "";
  bookList = [];
  for (let i = 0; i < localStorage.length; i++) {
    bookList.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  const listContainer = document.querySelector(".list-book-item");
  listContainer.innerHTML = "";
  let isCompleteBtn = "";
  bookList.map((d, i) => {
    isCompleteBtn = "";
    if (eval(d.isComplete) == true) {
      isCompleteBtn = `<span class="isCompleteBtn complete-true" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></svg></span>`;
    } else {
      isCompleteBtn = `<span class="isCompleteBtn complete-false">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></svg>
      </span>`;
    }
    if (whatBooks == undefined) {
      listElements += `<li class="book-list">
      <div>Book Name: ${d?.title}
      <div>Year: ${d?.year}</div>
      <div>Author: ${d?.author}</div>
      <div>
        <button onCLick=editBookWindow('Book-${d.id}') >Move</button>
        <button onCLick=removeBook('Book-${d.id}') >Remove</button>
        ${isCompleteBtn}
      </div>
      </li>`;
    } else if (whatBooks == "unread") {
      if (eval(d.isComplete) == false) {
        listElements += `<li class="book-list">
      <div>Book Name: ${d?.title}
      <div>Year: ${d?.year}</div>
      <div>Author: ${d?.author}</div>
      <div>
        <button onCLick=editBookWindow('Book-${d.id}') >Move</button>
        <button onCLick=removeBook('Book-${d.id}') >Remove</button>
        ${isCompleteBtn}
      </div>
      </li>`;
      }
    } else if (whatBooks == "completed") {
      if (eval(d.isComplete) == true) {
        listElements += `<li class="book-list">
      <div>Book Name: ${d?.title}
      <div>Year: ${d?.year}</div>
      <div>Author: ${d?.author}</div>
      <div>
        <button onCLick=editBookWindow('Book-${d.id}') >Move</button>
        <button onCLick=removeBook('Book-${d.id}') >Remove</button>
        ${isCompleteBtn}
      </div>
      </li>`;
      }
    }
  });
  listContainer.innerHTML = listElements;
}
const removeBook = (bookID) => {
  localStorage.removeItem(bookID);
  renderBooks();
};
const addNewBook = (title, author, year, isComplete, timeStamp) => {
  const bookDatas = {
    id: timeStamp,
    title,
    author,
    year,
    isComplete,
  };
  localStorage.setItem(`Book-${timeStamp}`, JSON.stringify(bookDatas));
  renderBooks();
};
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target[0].value;
  const author = e.target[1].value;
  const year = e.target[2].value;
  const isComplete = e.target.isComplete.value;
  addNewBook(
    title,
    author,
    year,
    isComplete,
    `${currentDate.getFullYear()}-${currentDate.getDate()}-${parseInt(
      e.timeStamp
    )}`
  );
});
if (typeof Storage !== "undefined") {
  window.onload = renderBooks;
} else {
  alert("Browser yang Anda gunakan tidak mendukung Web Storage");
}
