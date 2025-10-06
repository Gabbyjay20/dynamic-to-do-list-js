// script.js
// To-Do List with localStorage support — ALX-compliant

document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array (source of truth for localStorage)
    let tasks = [];

    // Save tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render a single task in the DOM (does NOT modify `tasks` array)
    function renderTask(taskText) {
        const li = document.createElement('li');

        // Use a span to store the text separately from the Remove button
        const span = document.createElement('span');
        span.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // ALX expects classList.add usage

        // When clicked, remove the li and update localStorage and tasks array
        removeBtn.onclick = function () {
            // Remove element from DOM
            taskList.removeChild(li);

            // Remove from tasks array (removes first matching entry)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append elements and add to DOM
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * Add a task.
     * @param {string|null} taskText - If provided, uses this text; otherwise reads input value.
     * @param {boolean} save - If true, update tasks array and localStorage (default true).
     */
    function addTask(taskText = null, save = true) {
        const text = (taskText !== null) ? taskText : taskInput.value.trim();

        // If attempting to add from input and it's empty, alert user
        if (text === '') {
            if (taskText === null) {
                alert('Please enter a task');
            }
            return;
        }

        // If this should be saved to persistent storage, update tasks array
        if (save) {
            tasks.push(text);
        }

        // Render task in DOM
        renderTask(text);

        // If task was added via input (save === true), clear field and persist
        if (save) {
            taskInput.value = '';
            saveTasks();
        }
    }

    // Load tasks from localStorage and render them
    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => renderTask(taskText));
    }

    // Attach event listeners required by ALX
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize from localStorage when the page loads
    loadTasks();
});
