// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage
    loadTasks();

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task when button clicked
        removeBtn.onclick = function() {
            li.remove();
            saveTasks();
        };

        // Append elements
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to localStorage
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = function() {
                li.remove();
                saveTasks();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
