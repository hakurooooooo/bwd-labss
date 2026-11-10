// Модуль работы с localStorage
export const STORAGE_KEY = 'taskmaster_tasks';

export const Storage = {
    getTasks() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }
};