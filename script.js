const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value;
  const notes = document.getElementById("taskNotes").value;
  const category = document.getElementById("taskCategory").value;
  const priority = document.getElementById("taskPriority").value;
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  if (!title) return alert("Please enter a task title!");

  const task = { title, notes, category, priority, date, time, completed: false };
  tasks.push(task);
  renderTasks();

  // Clear input
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskNotes").value = "";
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    // Priority color coding
    if (task.priority === "High") taskCard.style.borderLeftColor = "red";
    if (task.priority === "Medium") taskCard.style.borderLeftColor = "orange";
    if (task.priority === "Low") taskCard.style.borderLeftColor = "green";

    const completedClass = task.completed ? "completed-task" : "";

    taskCard.innerHTML = `
      <div class="task-header ${completedClass}">
        <label>
          <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""}>
          <strong>${task.title}</strong>
        </label>
        <span>⭐ ${task.priority}</span>
      </div>
      <div class="task-meta">
        <span>📂 ${task.category}</span>
        <span>⏰ ${task.date || ""} ${task.time || ""}</span>
      </div>
      ${task.notes ? `<div class="task-notes">📝 ${task.notes}</div>` : ""}
      <div class="task-actions">
        <button onclick="deleteTask(${index})">❌ Delete</button>
      </div>
    `;
    taskList.appendChild(taskCard);
  });

  updateProgress();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateProgress() {
  const completedCount = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% Completed`;

  if (percent <= 30) progressBar.style.background = "red";
  else if (percent <= 70) progressBar.style.background = "orange";
  else progressBar.style.background = "green";
}
