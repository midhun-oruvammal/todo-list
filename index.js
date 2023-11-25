const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const ulElement = document.querySelector(".list");

let list = [];

const savedList = localStorage.getItem("list");
if (savedList) {
  list = JSON.parse(savedList);
  renderList();
}

formElement.addEventListener("submit", function(event) {
  event.preventDefault();
  addTask();
});

function addTask() {
  const newTask = inputElement.value.trim();

  if (newTask) {
    list.push({ name: newTask, checked: false });
    inputElement.value = "";
    saveAndRender();
  }
}

function renderList() {
  ulElement.innerHTML = "";

  list.forEach(function(task, index) {
    const listElement = document.createElement("li");
    listElement.innerText = task.name;

    if (task.checked) {
      listElement.classList.add("checked");
    }

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = "<i class='fas fa-check-square'></i>";
    listElement.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = "<i class='fas fa-trash'></i>";
    listElement.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", function() {
      toggleTask(index);
    });

    trashBtnEl.addEventListener("click", function() {
      deleteTask(index);
    });

    ulElement.appendChild(listElement);
  });
}

function toggleTask(index) {
  list[index].checked = !list[index].checked;
  saveAndRender();
}

function deleteTask(index) {
  list.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  saveList();
  renderList();
}

function saveList() {
  localStorage.setItem("list", JSON.stringify(list));
}
