import { t } from '../i18n.js';

/**
 * Initializes and manages the timeline sidebar.
 * @param {Array} tripData - The trip details array (single-source with {en, ru} fields).
 * @param {string} lang - The active language code ('en' or 'ru').
 * @param {Function} onDaySelect - Callback when a day is clicked.
 */
export function initTimeline(tripData, lang, onDaySelect) {
    const list = document.getElementById('timeline-list');
    if (!list) return;

    list.innerHTML = tripData.map(item => `
        <div class="timeline-item p-4 lg:p-6 cursor-pointer border-b-2 lg:border-b lg:border-stone-100 lg:border-l-4 border-stone-100 lg:border-l-transparent hover:bg-stone-50 transition group flex-shrink-0 w-max min-w-[150px] lg:min-w-0 lg:w-auto" data-day="${item.day}">
            <div class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">${t(item.date, lang)}</div>
            <div class="font-bold text-stone-800 text-sm group-hover:text-stone-950 truncate">${t(item.title, lang)}</div>
        </div>
    `).join('');

    if (!list.dataset.listenerAdded) {
        list.addEventListener('click', (e) => {
            const item = e.target.closest('.timeline-item');
            if (item) {
                const dayId = parseInt(item.dataset.day, 10);
                onDaySelect(dayId);
            }
        });
        list.dataset.listenerAdded = 'true';
    }
}

/**
 * Updates the active styling of the timeline items.
 * @param {number} dayId - The active day ID.
 */
export function setActiveTimelineItem(dayId) {
    document.querySelectorAll('.timeline-item').forEach((el) => {
        if (parseInt(el.dataset.day, 10) === dayId) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            el.classList.remove('active');
        }
    });
}
