const form = document.querySelector("#todo-form");
const inputItem = document.querySelector("#input-text");
const list = document.querySelector("#list");
const LOCAL_STORAGE_PREFIX = "TODOLIST";
const TODO_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}_todos`;
let allTodos = LoadStorage();

allTodos.forEach(textOnList);

//checkbox behavour
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-item-checkbox]")) return;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  const todo = allTodos.find((t) => t.id === todoId);

  todo.complete = e.target.checked;
  saveLocal();
});

//delete buttom behaviour
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  allTodos = allTodos.filter((t) => t.id !== todoId);
  saveLocal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const itemList = inputItem.value;
  if (itemList === "") return;
  const newItem = {
    name: itemList,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  allTodos.push(newItem);
  textOnList(newItem);
  saveLocal();
  inputItem.value = "";
});

function textOnList(itemList) {
  const TemplateClone = template.content.cloneNode(true);
  const listTemplate = TemplateClone.querySelector(".list-item");
  listTemplate.dataset.todoId = itemList.id;
  const itemText = TemplateClone.querySelector("[data-list-item]");
  itemText.innerText = itemList.name;
  const checkbox = TemplateClone.querySelector("[data-item-checkbox]");
  checkbox.checked = itemList.complete;
  list.appendChild(listTemplate);
}

function saveLocal() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(allTodos));
}

function LoadStorage() {
  const savedStorage = localStorage.getItem(TODO_STORAGE_KEY);
  return JSON.parse(savedStorage) || [];
}
