document.addEventListener("DOMContentLoaded", () => {

    // Getting inputs from input field
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage on page load
    const LoadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Loading tasks from the localStorage and parsing it to JSON format
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            createTaskElement(task, index);
        });
    };

    // Create a task element
    const createTaskElement = (task, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);

        const span = document.createElement("span");
        span.textContent = task.text;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index)); // Adding actionEvent to the checkbox

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => deleteTask(index)); // Adding actionEvent to the delete button

        // Appending tasks to the list
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // Toggle task completion status using check box
    const toggleTaskCompletion = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        LoadTasks();
    };

    // Delete task
    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        LoadTasks();
    };

    // Add a new task
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push({ text: taskText, completed: false }); // Pushing task into tasks array
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = ''; // Clear the input field
            LoadTasks();
        }
    });

    // Load tasks initially
    LoadTasks();
});