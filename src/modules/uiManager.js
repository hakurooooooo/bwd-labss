import { TaskManager } from './taskManager.js';

// Модуль работы с UI
export class UIManager {
    constructor() {
        this.taskManager = new TaskManager();
        this.currentSort = null;
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Кнопка добавления задачи (на странице tasks.html)
        document.querySelectorAll('[data-add-task]').forEach(btn => {
            btn.addEventListener('click', () => this.showAddDialog());
        });

        // Обработка формы добавления
        document.querySelectorAll('[data-task-form]').forEach(form => {
            form.addEventListener('submit', (e) => this.handleAddTask(e));
        });

        // Сортировка
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const order = e.target.dataset.sort;
                this.currentSort = order;
                this.taskManager.sortTasks(order);
                this.render();
            });
        });
    }

    handleAddTask(e) {
        e.preventDefault();
        const form = e.target;
        const input = form.querySelector('input[name="taskText"]');
        const text = input.value.trim();

        if (!text) return;

        this.taskManager.addTask(text);
        form.reset();

        // Закрыть диалог если открыт
        const dialog = form.closest('dialog');
        if (dialog) dialog.close();

        this.render();
    }

    showAddDialog() {
        const dialog = document.querySelector('[data-task-dialog]');
        if (dialog) {
            dialog.showModal();
        } else {
            // Если нет dialog — используем prompt (fallback)
            const text = prompt('Введите текст задачи:');
            if (text) {
                this.taskManager.addTask(text);
                this.render();
            }
        }
    }

    handleCheckboxChange(id) {
        this.taskManager.moveTask(id);
        this.render();
    }

    handleDelete(id) {
        if (confirm('Удалить задачу?')) {
            this.taskManager.removeTask(id);
            this.render();
        }
    }

    render() {
        const columns = {
            todo: document.querySelector('[data-column="todo"]'),
            work: document.querySelector('[data-column="work"]'),
            done: document.querySelector('[data-column="done"]')
        };

        // Если нет колонок — страница не tasks.html
        if (!columns.todo || !columns.work || !columns.done) return;

        // Очистить колонки
        Object.values(columns).forEach(col => {
            if (col) col.innerHTML = '';
        });

        // Отрисовать задачи по статусам
        ['todo', 'work', 'done'].forEach(status => {
            const tasks = this.taskManager.getTasksByStatus(status);
            tasks.forEach(task => {
                const card = this.createTaskCard(task);
                columns[status].appendChild(card);
            });
        });
    }

    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = `card ${task.status}`;
        card.innerHTML = `
            <label class="card-label">
                <input type="checkbox" class="checkbox" data-task-id="${task.id}">
                <span>${this.escapeHtml(task.text)}</span>
            </label>
            <button class="del-btn" data-delete-id="${task.id}">Удалить</button>
        `;

        // Чекбокс — перемещение задачи
        const checkbox = card.querySelector('.checkbox');
        checkbox.addEventListener('change', () => {
            this.handleCheckboxChange(task.id);
        });

        // Кнопка удаления
        const delBtn = card.querySelector('.del-btn');
        delBtn.addEventListener('click', () => {
            this.handleDelete(task.id);
        });

        return card;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}