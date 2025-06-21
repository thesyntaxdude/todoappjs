const container = document.querySelector(".todo-container");
// const desc = document.querySelector("#description");
const titleInput = document.querySelector("#title");
const submitBtn = document.querySelector("#submit-btn");
const clearBtn = document.querySelector("#clear-board");

submitBtn.addEventListener("click", () => addTasks());
titleInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTasks();
  }
});

let taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
renderTasks(taskList);

clearBtn.addEventListener("click", (e) => removeAllTasks());

container.addEventListener("click", (e) => deleteTasks(e, taskList));

function addTasks() {
  if (title.value !== "" && title.value !== undefined) {
    const title = document.querySelector("#title").value;
    taskList.push(title);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTasks(taskList);
  } else {
    alert("You should type in a value");
  }
  title.value = "";
}

function renderTasks(taskList) {
  container.textContent = "";
  for (const task of taskList) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    const listItem = document.createElement("p");
    listItem.classList.add("list-item");
    listItem.textContent = task;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Task";
    delBtn.classList.add("delete-tasks");
    delBtn.style.background = "pink";
    itemContainer.appendChild(listItem);
    itemContainer.appendChild(delBtn);
    container.appendChild(itemContainer);
  }
}

function removeAllTasks() {
  taskList = [];
  localStorage.removeItem("taskList");
  renderTasks(taskList);
}

function deleteTasks(e, taskList) {
  if (e.target.classList.contains("delete-tasks")) {
    const parentContainer = e.target.parentElement;
    const siblingElement = e.target.previousSibling;
    parentContainer.remove();
    if (taskList.includes(siblingElement.textContent)) {
      const index = taskList.indexOf(siblingElement.textContent);
      taskList.splice(index, 1);
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }
}
