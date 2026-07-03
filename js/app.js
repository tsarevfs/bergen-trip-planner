import { tripData, todos } from './data.js';
import { t, dictionary } from './i18n.js';
import { initTimeline, setActiveTimelineItem } from './components/timeline.js';
import { renderDayView } from './components/day-view.js';
import { initTodoList } from './components/todo-list.js';
import { initDrivingChart } from './components/driving-chart.js';

let currentLang = 'en';
let todoListHandle = null;

/**
 * Returns the currently active day ID parsed from the URL hash.
 * Defaults to Day 1.
 * @returns {number}
 */
function getActiveDayId() {
    const hash = window.location.hash;
    const match = hash.match(/^#day-(\d+)$/);
    if (match) {
        const dayId = parseInt(match[1], 10);
        if (tripData.some(d => d.day === dayId)) {
            return dayId;
        }
    }
    return 1;
}

/**
 * Propagates the UI state.
 * @param {string} lang 
 */
function updateLanguage(lang = 'en') {
    currentLang = lang;

    // 1. Update static translatable text elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[lang] && dictionary[lang][key]) {
            el.innerHTML = dictionary[lang][key];
        }
    });

    // 2. Redraw sidebar timeline
    initTimeline(tripData, currentLang, (dayId) => {
        window.location.hash = `day-${dayId}`;
    });

    // 3. Update the active day details sequence
    const activeDayId = getActiveDayId();
    const dayData = tripData.find(d => d.day === activeDayId);
    if (dayData) {
        renderDayView(dayData, currentLang);
        setActiveTimelineItem(activeDayId);
    }

    // 4. Update checklist language state
    if (todoListHandle) {
        todoListHandle.updateLanguage(currentLang);
    }

    // 5. Destroy and recreate the driving intensity chart
    initDrivingChart(tripData, currentLang);
}

/**
 * Handles URL hash changes and renders the corresponding day.
 */
function handleHashChange() {
    const activeDayId = getActiveDayId();
    const dayData = tripData.find(d => d.day === activeDayId);
    if (dayData) {
        renderDayView(dayData, currentLang);
        setActiveTimelineItem(activeDayId);
    }
}

// Initialise the application modules once the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    currentLang = 'en';

    // Initialize todo checklist
    todoListHandle = initTodoList(todos, currentLang);

    // Propagate the initial UI setup
    updateLanguage(currentLang);
    
    // Listen to hash changes for routing and back/forward navigation
    window.addEventListener('hashchange', handleHashChange);
});
