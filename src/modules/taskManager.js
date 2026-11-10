import { Storage } from './storage.js';

// Модуль управления задачами (бизнес-логика)
export class TaskManager {
    constructor() {
        this.tasks = Storage.getTasks();
        // Если хранилище пустое — добавим демо-задачи
        if (this.tasks.length === 0) {
            this.tasks = [
                { id: 1, text: 'Купить продукты', status: 'todo' },
                { id: 2, text: 'Сделать лабу', status: 'work' },
                { id: 3, text: 'Скачать VS Code', status: 'done' }
            ];
            Storage.saveTasks(this.tasks);
        }
    }

    addTask(text) {
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            status: 'todo'
        };
        this.tasks.push(newTask);
        Storage.saveTasks(this.tasks);
        return newTask;
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        Storage.saveTasks(this.tasks);
    }

    moveTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return null;

        if (task.status === 'todo') task.status = 'work';
        else if (task.status === 'work') task.status = 'done';
        else task.status = 'done';

        Storage.saveTasks(this.tasks);
        return task;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(t => t.status === status);
    }

    sortTasks(order = 'asc') {
        // order: 'asc' — А→Я, 'desc' — Я→А
        this.tasks.sort((a, b) => {
            const cmp = a.text.localeCompare(b.text, 'ru', { sensitivity: 'base' });
            return order === 'asc' ? cmp : -cmp;
        });
        Storage.saveTasks(this.tasks);
    }
}