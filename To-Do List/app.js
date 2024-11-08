let todoList = [];
let editingTaskIndex = -1; // Track the index of the task being edited
//
function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueTime = document.getElementById("due-time").value;

  if (!title || !dueTime) {
    alert("Title and Due Date are required!");
    return;
  }

  // Check if the due time is in the future

  const dueDate = new Date(dueTime);
  if (dueDate < new Date()) {
    alert("Due date must be in the future.");
    return;
  }

  const newTask = {
    title: title,
    description: description,
    dueTime: dueDate,
    completed: false,
  };

  if (editingTaskIndex === -1) {
    // Adding a new task
    todoList.push(newTask);
  } else {
    todoList[editingTaskIndex] = newTask;
  }

  renderTaskList();
  clearInputs();
  resetAddButton();
}

function renderTaskList() {
  const taskListContainer = document.getElementById("task-list");
  taskListContainer.innerHTML = "";

  todoList.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task-item";

    const taskTitle = document.createElement("strong");
    taskTitle.textContent = task.title;
    if (task.completed) taskTitle.classList.add("completed");

    const taskDescription = document.createElement("span");
    taskDescription.textContent = task.description || "No description";

    const taskDueTime = document.createElement("span");
    taskDueTime.textContent = `Due: ${task.dueTime.toLocaleString()}`;

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.onclick = () => toggleComplete(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(index);

    taskElement.appendChild(taskTitle);
    taskElement.appendChild(taskDescription);
    taskElement.appendChild(taskDueTime);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(editButton);

    taskListContainer.appendChild(taskElement);
  });
}

//Editing function

function editTask(index) {
  const task = todoList[index];
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("due-time").value = task.dueTime
    .toISOString()
    .slice(0, 16);

  editingTaskIndex = index;

  document.getElementById("add-task").textContent = "Update Task";
}

function resetAddButton() {
  document.getElementById("add-task").textContent = "Add Task";
  editingTaskIndex = -1; // Clear the editing task index
}

function deleteTask(index) {
  todoList.splice(index, 1);
  renderTaskList();
}

function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed;
  renderTaskList();
}

function sortTasks(ascending = true) {
  todoList.sort((a, b) =>
    ascending ? a.dueTime - b.dueTime : b.dueTime - a.dueTime
  );
  renderTaskList();
}

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("due-time").value = "";
}

document.getElementById("add-task").addEventListener("click", addTask);
document
  .getElementById("sort-asc")
  .addEventListener("click", () => sortTasks(true));
document
  .getElementById("sort-desc")
  .addEventListener("click", () => sortTasks(false));

document.addEventListener("DOMContentLoaded", () => {
  renderTaskList();
  sortTasks(true);
});