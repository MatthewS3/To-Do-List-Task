document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();

    // Add event listener for the Add Task button
    document.getElementById('addTaskBtn').addEventListener('click', addTask);

    // Add event listener for the task list
    document.getElementById('taskList').addEventListener('change', function (event) {
      if (event.target.classList.contains('completeBtn')) {
        updateTaskStatus(event.target);
      }
    });

    // Add event listener for delete buttons
    document.getElementById('taskList').addEventListener('click', function (event) {
      if (event.target.classList.contains('deleteBtn')) {
        deleteTask(event.target);
      }
    });
  });

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
      // Create a new task item
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = `
        <input type="checkbox" class="completeBtn">
        <span>${taskInput.value}</span>
        <button class="deleteBtn">Delete</button>
      `;

      // Add the new task to the list
      taskList.appendChild(li);

      // Save tasks to local storage
      saveTasks();

      // Clear the input field
      taskInput.value = '';
    }
  }

  function updateTaskStatus(checkbox) {
    const taskText = checkbox.nextElementSibling;
    taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    // Save tasks to local storage
    saveTasks();
  }

  function deleteTask(button) {
    const li = button.parentElement;
    li.remove();

    // Save tasks to local storage
    saveTasks();
  }

  function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Iterate through each task item and store its text and completion status
    taskList.querySelectorAll('.task').forEach((task) => {
      const taskText = task.querySelector('span').innerText;
      const isCompleted = task.querySelector('.completeBtn').checked;

      tasks.push({ text: taskText, completed: isCompleted });
    });

    // Save tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Populate the task list with saved tasks
    savedTasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = `
        <input type="checkbox" class="completeBtn" ${task.completed ? 'checked' : ''}>
        <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</span>
        <button class="deleteBtn">Delete</button>
      `;

      taskList.appendChild(li);
    });
  }