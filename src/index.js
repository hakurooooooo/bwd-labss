import './styles.css';
import { UIManager } from './modules/uiManager.js';

// Защита от двойной инициализации
if (!window.__APP_INITIALIZED__) {
    window.__APP_INITIALIZED__ = true;

    document.addEventListener('DOMContentLoaded', () => {
        // Инициализация UI
        const ui = new UIManager();
        ui.init();

        // Бургер-меню
        const burger = document.getElementById('burger');
        const nav = document.getElementById('nav');
        const overlay = document.getElementById('overlay');

        if (burger && nav) {
            const openMenu = () => {
                burger.classList.add('open');
                nav.classList.add('open');
                overlay?.classList.add('show');
                burger.setAttribute('aria-expanded', 'true');
            };
            const closeMenu = () => {
                burger.classList.remove('open');
                nav.classList.remove('open');
                overlay?.classList.remove('show');
                burger.setAttribute('aria-expanded', 'false');
            };

            burger.addEventListener('click', () =>
                nav.classList.contains('open') ? closeMenu() : openMenu()
            );
            overlay?.addEventListener('click', closeMenu);
            nav.querySelectorAll('.nav-link').forEach(l =>
                l.addEventListener('click', closeMenu)
            );
        }
    });
}