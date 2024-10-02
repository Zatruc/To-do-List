const addTaskButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// ESTA FUNCION CONVIERTE EL ARREGLO DE OBJETOS DE TODAS LAS TAREAS EN UN STRING
function saveTaskToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ESTA FUNCION SE ENCARGA DE VERIFICAR SI EN EL LOCALSTORAGE EXIXTE UN ITEM CON LA CLAVE tasks
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

// ESTA FUNCION ES LA QUE SE EJECUTA CUANDO HAY ALGUN CAMBIO Y EJECUTA saveTaskToLocalStorage PARA SOBREESCRIBIR EL LOCAL STORAGE
function updatelocalStorage() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach((taskItem) => {
    const tasktext = taskItem.querySelector(".task-text").textContent;
    const completed = taskItem.classList.contains("completed");
    tasks.push({ text: tasktext, completed: completed });
  });
  saveTaskToLocalStorage(tasks);
}

// SIRVE PARA CARGAR LAS TAREAS CUANDO SE VUELVE A ABRIR EL NAVEGADOR Y LLAMA A getTasksFromLocalStorage OBTENER TODAS LAS TAREAS DEL LOCAL STORAGE
function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    taskCheckBox.classList.add("task-checkbox");
    taskCheckBox.checked = task.completed;

    function checkboxCheck() {
      if (taskCheckBox.checked) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.remove("completed");
      }
      updatelocalStorage();
    }

    taskCheckBox.addEventListener("change", checkboxCheck);

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = task.text;

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-task-btn");

    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      updatelocalStorage();
    });

    taskItem.appendChild(taskCheckBox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

// CARGA LAS TAREAS CUANDO SE CARGA LA PAGINA
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// FUNCIONALIDAD PARA AGREGAR UNA TAREA
function addTask() {
  const newContentTask = taskInput.value.trim();
  if (newContentTask !== "") {
    // CREA EL LI PARA CADA NUEVA TAREA
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // CREA EL CHECKBOX PARA CADA TAREA
    const taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    taskCheckBox.classList.add("task-checkbox");

    //FUNCIONALIDAD DEL CHECKBOX
    function checkboxCheck() {
      if (taskCheckBox.checked) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.remove("completed");
      }
      updatelocalStorage();
    }

    taskCheckBox.addEventListener("change", checkboxCheck);

    // CREO EL ESPACIO PARA EL TEXTO DE LA TAREA
    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = newContentTask;

    // CREO EL BOTON DE ELIMINAR
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-task-btn");

    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      updatelocalStorage();
    });

    // AGREGAMOS TODO DENTRO DEL LI
    taskItem.appendChild(taskCheckBox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);

    // AGREGAOS EL LI DENTRO DEL UL
    taskList.appendChild(taskItem);
    updatelocalStorage();

    // LIMPIAMOS EL INPUT
    taskInput.value = "";
  }
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
const titulo = document.querySelector("h2");

// FILTRAR TODAS LAS TAREAS
function showAllTasks() {
  const tasks = document.querySelectorAll(".task-item");
  titulo.textContent = "Todas";
  tasks.forEach((task) => {
    task.style.display = "flex";
  });
}

const allTasks = document.querySelector(".filter-all");
allTasks.addEventListener("click", showAllTasks);

// FILTRAR LAS TAREAS COMPLETAS
function showCompletedTasks() {
  const tasks = document.querySelectorAll(".task-item");
  titulo.textContent = "Tareas completadas";
  tasks.forEach((task) => {
    if (task.classList.contains("completed")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

const completedTasks = document.querySelector(".filter-completed");
completedTasks.addEventListener("click", showCompletedTasks);

// FILTRAR LAS TAREAS PENDIENTES
function showPendingTasks() {
  const tasks = document.querySelectorAll(".task-item");
  titulo.textContent = "Tareas pedientes";
  tasks.forEach((task) => {
    if (!task.classList.contains("completed")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

const pendingTasks = document.querySelector(".filter-pending");
pendingTasks.addEventListener("click", showPendingTasks);

// UTILIZACION DEL LOCAL STORAGE PARA ALMACENAR LAS TAREAS
