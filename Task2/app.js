document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();

    // Add event listener for Enter key
    document.getElementById('taskInput').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create task object
    var task = {
        id: new Date().getTime(),
        text: taskText,
    };

    // Get existing tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task
    tasks.push(task);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear input field
    taskInput.value = '';

    // Reload tasks
    loadTasks();
}

function loadTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Get tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create list items for each task
    tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(taskId) {
    // Get tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove task with the given ID
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Reload tasks
    loadTasks();
}
