/**
 * Initializes and manages the planning checklist.
 * @param {Array} todos - The checklist items array.
 * @param {string} lang - The active language code.
 * @returns {Object} Interface to update language dynamically.
 */
export function initTodoList(todos, lang = 'en') {
    const container = document.getElementById('todo-container');
    if (!container) return;

    let currentLang = lang;

    function render() {
        container.innerHTML = todos.map(todo => `
            <div class="todo-item flex items-center gap-4 p-5 bg-stone-50 rounded-2xl cursor-pointer hover:bg-stone-100 transition border border-stone-100" data-id="${todo.id}">
                <div class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition ${todo.done ? 'bg-stone-800 border-stone-800' : 'border-stone-300 bg-white'}">
                    ${todo.done ? '<span class="text-white text-[10px]">✔</span>' : ''}
                </div>
                <span class="text-sm flex-1 ${todo.done ? 'line-through text-stone-400' : 'text-stone-700 font-bold'}">${todo.text[currentLang] || todo.text}</span>
            </div>
        `).join('');
    }

    container.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (item) {
            const id = parseInt(item.dataset.id, 10);
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.done = !todo.done;
                render();
            }
        }
    });

    render();

    return {
        updateLanguage(newLang) {
            currentLang = newLang;
            render();
        }
    };
}
