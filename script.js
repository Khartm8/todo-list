const taskForm = document.querySelector('.new-task'),
  taskInput = document.querySelector('.new-task input'),
  taskList = document.querySelector('.tasks'),
  clearCompleted = document.querySelector('.clear-completed'),
  showCompletedBtn = document.querySelector('.show-completed'),
  completedCounter = document.querySelector('.completed-count');
let todos = JSON.parse(localStorage.getItem('todo-list')),
  editedId,
  isEdited = false,
  completedList = document.querySelector('.completed-tasks');

function showTodo() {
  let todo = '';
  let completedTodo = '';
  todos?.forEach((item, i) => {
    let isChecked = todos[i].status == 'completed' ? 'checked' : '';
    let todoText = `<li class="task">
                      <label for="${i}" class="task-body">
                        <input type="checkbox" id="${i}" class="checkbox" onclick='updateStatus(this,${i})' ${isChecked}>
                        <div class="custom-checkbox">
                          <i class="fa-solid fa-check"></i>
                        </div>
                        <p class="task-text">${item.name}</p>
                      </label>
                      <div class="task-menu">
                        <i class="fa-solid fa-ellipsis" onclick='showMenu(this)'></i>
                        <ul class="menu-list">
                          <li class="task-btn edit" onclick='editTask(${i})'>
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </li>
                          <li class="task-btn delete" onclick='deleteTask(${i})'>
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </li>
                        </ul>
                      </div>
                    </li>`;
    if (todos[i].status == 'pending') {
      todo += todoText;
    } else {
      completedTodo += todoText;
    }
  });
  taskList.innerHTML = todo;
  completedList.innerHTML = completedTodo;
}

showTodo();

function showMenu(menuToggle) {
  let taskMenu = menuToggle.parentElement.lastElementChild;
  taskMenu.classList.toggle('show');
  document.addEventListener('click', (e) => {
    if (e.target != menuToggle) {
      taskMenu.classList.remove('show');
    }
  });
}

function deleteTask(id) {
  todos.splice(id, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo();
  setTimeout(completedCount, 350);
}

function editTask(id) {
  taskInput.value = todos[id].name;
  taskInput.focus();
  editedId = id;
  isEdited = true;
}

function updateStatus(task, id) {
  task.checked
    ? (todos[id].status = 'completed')
    : (todos[id].status = 'pending');
  localStorage.setItem('todo-list', JSON.stringify(todos));
  setTimeout(showTodo, 350);
  setTimeout(completedCount, 350);
}

showCompletedBtn.addEventListener('click', () => {
  showCompletedBtn.classList.toggle('show-completed-active');
});

clearCompleted.addEventListener('click', () => {
  todos = todos?.filter((item) => item.status == 'pending');
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo();
  completedCount();
});

function completedCount() {
  let completed = todos?.filter((item) => item.status == 'completed');
  if (completed.length >= 1) {
    completedCounter.textContent = ` (${completed.length})`;
  } else {
    completedCounter.textContent = '';
  }
}

taskForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let taskName = taskInput.value.trim();
  if (!isEdited) {
    todos = !todos ? [] : todos;
    let taskInfo = { name: taskName, status: 'pending' };
    todos.push(taskInfo);
  } else {
    isEdited = false;
    todos[editedId].name = taskName;
  }
  taskInput.value = '';
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo();
});
