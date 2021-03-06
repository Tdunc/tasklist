// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add Task Event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //Create li Element
  const li = document.createElement('li');
  // Add Class
  li.className = 'collection-item';
  // Create Text Node And Append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content';
  // Add icom html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  //Create li Element
  const li = document.createElement('li');
  // Add Class
  li.className = 'collection-item';
  // Create Text Node And Append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content';
  // Add icom html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  console.log(li);
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


localStorage.setItem('tasks', JSON.stringify(tasks));

function deleteTask(e) {
if(e.target.parentElement.classList.contains('delete-item')) {
  if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    // Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  // taskList.innerHTML = '';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

//clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
const text = e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(task){
  const item = task.firstChild.textContent;
  if(item.toLowerCase().indexOf(text) != -1){
    task.style.display = 'block';
  } else{
    task.style.display = 'none';
  }
});
console.log(text);
}