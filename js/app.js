// TaskManager · SoftDev Solutions
// Lógica principal: gestión de tareas, render del tablero y filtros.

const STORAGE_KEY = "nexwear-taskboard";

const STATUSES = ["pendiente", "progreso", "completado"];

// Tareas de ejemplo, relacionadas con las ramas definidas en la práctica.
const SEED_TASKS = [
    {
        id: "t-1",
        title: "Implementar catálogo de productos",
        description: "Desarrollar la vista del catálogo con imágenes, tallas, colores y filtros de búsqueda.",
        branch: "feature/Nicol",
        priority: "alta",
        assignee: "Nicol Amairani Gastélum Díaz",
        status: "progreso",
    },
    {
        id: "t-2",
        title: "Implementar carrito de compras",
        description: "Agregar funcionalidad para añadir, eliminar y actualizar productos en el carrito persistente.",
        branch: "feature/Nicol",
        priority: "alta",
        assignee: "Nicol Amairani Gastélum Díaz",
        status: "pendiente",
    },
    {
        id: "t-3",
        title: "Desarrollar autenticación de usuarios",
        description: "Implementar registro, inicio de sesión y manejo de roles cliente y administrador.",
        branch: "feature/Alexa",
        priority: "alta",
        assignee: "Alexa Marian Gastélum Díaz",
        status: "progreso",
    },
    {
        id: "t-4",
        title: "Implementar panel administrativo",
        description: "Crear las vistas para la gestión de productos, usuarios y órdenes.",
        branch: "feature/Alexa",
        priority: "alta",
        assignee: "Alexa Marian Gastélum Díaz",
        status: "pendiente",
    },
    {
        id: "t-5",
        title: "Integrar pasarela de pago",
        description: "Configurar Stripe o MercadoPago para procesar pagos electrónicos.",
        branch: "feature/Alexa",
        priority: "media",
        assignee: "Alexa Marian Gastélum Díaz",
        status: "pendiente",
    },
    {
        id: "t-6",
        title: "Configurar notificaciones por correo",
        description: "Integrar Brevo API para enviar correos de confirmación y recuperación de contraseña.",
        branch: "feature/Nicol",
        priority: "media",
        assignee: "Nicol Amairani Gastélum Díaz",
        status: "pendiente",
    },
];

let tasks = loadTasks();

// ---------- Persistencia ----------

function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (err) {
        console.warn("No se pudieron leer las tareas guardadas:", err);
    }
    return SEED_TASKS.map((t) => ({ ...t }));
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
        console.warn("No se pudieron guardar las tareas:", err);
    }
}

// ---------- Render ----------

function renderBoard() {
    const branchFilter = document.getElementById("filter-branch").value;
    const priorityFilter = document.getElementById("filter-priority").value;
    const searchFilter = document.getElementById("filter-search").value.trim().toLowerCase();

    STATUSES.forEach((status) => {
        const list = document.getElementById(`list-${status}`);
        const counter = document.getElementById(`count-${status}`);
        list.innerHTML = "";

        const filtered = tasks.filter((task) => {
            if (task.status !== status) return false;
            if (branchFilter !== "todas" && task.branch !== branchFilter) return false;
            if (priorityFilter !== "todas" && task.priority !== priorityFilter) return false;
            if (searchFilter && !task.title.toLowerCase().includes(searchFilter)) return false;
            return true;
        });

        counter.textContent = filtered.length;

        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "column__empty";
            empty.textContent = "Sin tareas en esta columna";
            list.appendChild(empty);
            return;
        }

        filtered.forEach((task) => list.appendChild(buildTaskCard(task)));
    });
    document.getElementById("total-tasks").textContent = tasks.length;

    document.getElementById("pending-tasks").textContent =
        tasks.filter(t => t.status === "pendiente").length;

    document.getElementById("progress-tasks").textContent =
        tasks.filter(t => t.status === "progreso").length;

    document.getElementById("completed-tasks").textContent =
        tasks.filter(t => t.status === "completado").length;
}
function buildTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task";
    card.dataset.priority = task.priority;

    const title = document.createElement("h3");
    title.className = "task__title";
    title.textContent = task.title;
    card.appendChild(title);

    if (task.description) {
        const desc = document.createElement("p");
        desc.className = "task__desc";
        desc.textContent = task.description;
        card.appendChild(desc);
    }

    const meta = document.createElement("div");
    meta.className = "task__meta";

    const branch = document.createElement("span");
    branch.className = "task__branch";
    branch.textContent = task.branch;
    meta.appendChild(branch);

    const assignee = document.createElement("span");
    assignee.className = "task__assignee";
    assignee.textContent = task.assignee;
    meta.appendChild(assignee);

    card.appendChild(meta);

    const priority = document.createElement("span");
    priority.className = "task__assignee";
    priority.textContent = `Prioridad: ${task.priority}`;
    card.appendChild(priority);

    const actions = document.createElement("div");
    actions.className = "task__actions";

    const currentIndex = STATUSES.indexOf(task.status);

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.textContent = "← Mover";
    prevBtn.disabled = currentIndex === 0;
    prevBtn.addEventListener("click", () => moveTask(task.id, -1));
    actions.appendChild(prevBtn);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = "Mover →";
    nextBtn.disabled = currentIndex === STATUSES.length - 1;
    nextBtn.addEventListener("click", () => moveTask(task.id, 1));
    actions.appendChild(nextBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "task__delete";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    actions.appendChild(deleteBtn);

    if (task.createdAt) {
        const date = document.createElement("small");
        date.style.color = "#777";
        date.textContent = `Creada: ${task.createdAt}`;
        card.appendChild(date);
    }
    card.appendChild(actions);

    return card;
}

// ---------- Acciones sobre tareas ----------

function moveTask(id, direction) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const currentIndex = STATUSES.indexOf(task.status);
    const newIndex = currentIndex + direction;

    if (newIndex < 0 || newIndex >= STATUSES.length) return;

    task.status = STATUSES[newIndex];
    saveTasks();
    renderBoard();
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    renderBoard();
}

function addTask(data) {
    const newTask = {
        id: `t-${Date.now()}`,
        title: data.title,
        description: data.description,
        branch: data.branch,
        priority: data.priority,
        assignee: data.assignee,
        status: "pendiente",
        createdAt: new Date().toLocaleDateString(),
    };
    tasks.push(newTask);
    saveTasks();
    renderBoard();
}

// ---------- Modal ----------

const modal = document.getElementById("modal");
const taskForm = document.getElementById("task-form");

function openModal() {
    modal.hidden = false;
    document.getElementById("task-title").focus();
}

function closeModal() {
    modal.hidden = true;
    taskForm.reset();
}

document.getElementById("btn-new-task").addEventListener("click", openModal);
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("cancel-task").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    if (!title) return;

    addTask({
        title,
        description: document.getElementById("task-desc").value.trim(),
        branch: document.getElementById("task-branch").value,
        priority: document.getElementById("task-priority").value,
        assignee: document.getElementById("task-assignee").value,
    });

    closeModal();
});

// ---------- Filtros ----------

document.getElementById("filter-branch").addEventListener("change", renderBoard);
document.getElementById("filter-priority").addEventListener("change", renderBoard);
document.getElementById("filter-search").addEventListener("input", renderBoard);

// ---------- Inicio ----------

renderBoard();