const addBtn = document.querySelector(".add-btn");
const inputBox = document.querySelector(".input-box");
const tasks = document.querySelector(".tasks-list");

// Create CheckBox
const createCheckBox = () => {
  let checkBox = document.createElement("input");
  checkBox.classList.add("check-box");
  checkBox.type = "checkbox";
  return checkBox;
};

// Create Task Span
const createTaskSpan = (taskText) => {
  let span = document.createElement("span");
  span.classList.add("task-value");
  span.textContent = taskText;
  return span;
};

// Create Delete Button
const createDeleteButton = () => {
  let deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");
  return deleteBtn;
};

// Handle checkBox Click
const handleCheckBoxClick = (li, taskSpan, checkBox) => {
  const isChecked = checkBox.checked;
  li.classList.toggle("checked", isChecked);
  li.style.backgroundColor = isChecked ? "#148b07" : "#5b5f62";
  taskSpan.classList.toggle("completed-task", isChecked);

  if (isChecked) {
    let delTag = document.createElement("del");
    delTag.textContent = taskSpan.textContent;
    taskSpan.textContent = "";
    taskSpan.appendChild(delTag);
  } else {
    let delTag = taskSpan.querySelector("del");
    if (delTag) {
      taskSpan.textContent = delTag.textContent;
      delTag.remove();
    }
  }

  saveData(); // Save data after handling checkbox click
};

// Handle Delete Button
const handleDeleteButtonClick = (li) => {
  li.remove();
  saveData(); // Save data after handling delete button click
};

// Save Data
const saveData = () => {
  localStorage.setItem("tasks", tasks.innerHTML);
};

// Load Data
const loadData = () => {
  if (localStorage.getItem("tasks")) {
    tasks.innerHTML = localStorage.getItem("tasks");
    addEventListenersToTasks();
  }
};

// Add new Task
const addTask = () => {
  if (inputBox.value !== "") {
    let li = document.createElement("li");
    let checkbox = createCheckBox();
    let taskSpan = createTaskSpan(inputBox.value);
    let deleteBtn = createDeleteButton();

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    tasks.appendChild(li);

    checkbox.addEventListener("click", () =>
      handleCheckBoxClick(li, taskSpan, checkbox)
    );
    deleteBtn.addEventListener("click", () => handleDeleteButtonClick(li));

    saveData(); // Save data after adding a new task
  } else {
    alert("You must write something!");
  }
  inputBox.value = "";
};


// Handle The Enter Key
addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Add event listeners to tasks after loading data
const addEventListenersToTasks = () => {
  const checkboxes = document.querySelectorAll(".check-box");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  checkboxes.forEach((checkbox) => {
    const li = checkbox.closest("li");
    const taskSpan = li.querySelector(".task-value");
    checkbox.addEventListener("click", () =>
      handleCheckBoxClick(li, taskSpan, checkbox)
    );
  });

  deleteButtons.forEach((deleteBtn) => {
    const li = deleteBtn.closest("li");
    deleteBtn.addEventListener("click", () => handleDeleteButtonClick(li));
  });
};

// Event Listeners
window.addEventListener("load", loadData);
addBtn.addEventListener("click", addTask);
