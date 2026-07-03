import { t } from '../i18n.js';

/**
 * Formats step detail text, wrapping tips or warnings (marked with ⚠️) in alert blocks.
 * @param {string} detail - The raw detail string.
 * @returns {string} The formatted HTML string.
 */
function formatDetail(detail) {
    if (!detail) return '';
    
    if (detail.includes('⚠️')) {
        const parts = detail.split('⚠️');
        const mainText = parts[0].trim();
        const warningText = parts.slice(1).join('⚠️').trim();
        
        return `
            ${mainText ? `<p class="text-stone-600 text-sm leading-relaxed mb-3">${mainText}</p>` : ''}
            <div class="p-4 bg-amber-50/65 border border-amber-100/80 rounded-xl text-xs text-stone-700 leading-relaxed flex items-start gap-3">
                <span class="text-sm flex-shrink-0 leading-none">⚠️</span>
                <div>${warningText}</div>
            </div>
        `;
    }
    
    return `<p class="text-stone-600 text-sm leading-relaxed">${detail}</p>`;
}

/**
 * Renders the day view including header and itinerary sequence.
 * @param {Object} data - The day's data object from tripData (single-source with {en, ru} fields).
 * @param {string} lang - The active language code ('en' or 'ru').
 */
export function renderDayView(data, lang = 'en') {
    if (!data) return;

    // Render day header
    const headerEl = document.getElementById('day-header');
    if (headerEl) {
        headerEl.className = "bg-white p-5 sm:p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4";
        headerEl.innerHTML = `
            <div class="flex-1 text-left pr-0 sm:pr-4">
                <span class="text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1 block">${t(data.date, lang)}</span>
                <h3 class="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">${t(data.title, lang)}</h3>
                ${t(data.summary, lang) ? `<p class="text-stone-500 text-sm leading-relaxed max-w-2xl">${t(data.summary, lang)}</p>` : ''}
            </div>
            <div class="bg-stone-50 px-5 py-2 rounded-xl border border-stone-100 flex-shrink-0 mt-2 sm:mt-0">
                <span class="text-xs font-bold text-stone-500 uppercase">${lang === 'ru' ? 'День' : 'Day'} ${data.day} ${lang === 'ru' ? 'путешествия' : 'Journey'}</span>
            </div>
        `;
    }

    // Render sequence
    const container = document.getElementById('sequence-container');
    if (!container) return;

    const localizedDiff = {
        en: { 'Easy': 'Easy', 'Moderate': 'Moderate', 'Difficult': 'Difficult' },
        ru: { 'Easy': 'Легкий', 'Moderate': 'Средний', 'Difficult': 'Сложный' }
    };

    container.innerHTML = data.sequence.map((step, idx) => {
        let cardContent = '';
        
        if (step.type === 'drive') {
            const mapUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(step.from)}&daddr=${encodeURIComponent(step.to)}&output=embed`;
            const gLink = `https://www.google.com/maps/dir/${encodeURIComponent(step.from)}/${encodeURIComponent(step.to)}`;
            const resolvedDetail = t(step.detail, lang);
            cardContent = `
                <div class="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                    <div class="flex-1 min-w-0 w-full">
                        <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md mb-2 inline-block">${lang === 'ru' ? '🚗 Переезд' : '🚗 Drive Segment'}</span>
                        <h4 class="font-bold text-xl sm:text-2xl text-stone-900 leading-tight break-words">${t(step.label, lang)}</h4>
                        <div class="flex items-center gap-2 mt-2 text-stone-500 text-sm flex-wrap">
                            <span class="font-semibold text-stone-700">${step.from}</span>
                            <svg class="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                            <span class="font-semibold text-stone-700">${step.to}</span>
                        </div>
                        ${resolvedDetail ? `<div class="mt-4">${formatDetail(resolvedDetail)}</div>` : ''}
                    </div>
                    <div class="text-left sm:text-right flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0 mt-1 sm:mt-0">
                        <div class="text-xl sm:text-2xl font-bold text-stone-800">${step.dist} km</div>
                        <div class="px-2.5 py-1 bg-stone-900 text-white text-[10px] font-bold rounded-lg sm:mt-2 inline-block tracking-wider uppercase">${t(step.time, lang)}</div>
                    </div>
                </div>
                <div class="map-wrapper mb-6"><iframe src="${mapUrl}"></iframe></div>
                <a href="${gLink}" target="_blank" class="block w-full text-center py-3 bg-stone-100 text-stone-700 text-sm font-bold rounded-xl hover:bg-stone-200 transition">${lang === 'ru' ? 'Открыть весь маршрут на Google Maps' : 'View Full Route in Google Maps'}</a>
            `;
        } else if (step.type === 'options') {
            const hikeCards = step.hikes.map(h => {
                const diffLabel = (localizedDiff[lang] && localizedDiff[lang][h.diff]) ? localizedDiff[lang][h.diff] : h.diff;
                
                const hasKomoot = h.link && h.link !== 'TBD';
                const hasAllTrails = h.alltrails && h.alltrails !== 'TBD';
                let buttonsHtml = '';
                
                if (hasKomoot && hasAllTrails) {
                    buttonsHtml = `
                        <div class="mt-auto grid grid-cols-2 gap-2 w-full">
                            <a href="${h.link}" target="_blank" class="block text-center py-2.5 bg-stone-900 text-white text-[11px] font-bold rounded-lg hover:bg-stone-800 transition">${lang === 'ru' ? 'Komoot' : 'Komoot'}</a>
                            <a href="${h.alltrails}" target="_blank" class="block text-center py-2.5 bg-stone-100 text-stone-700 text-[11px] font-bold rounded-lg hover:bg-stone-200 transition border border-stone-200">${lang === 'ru' ? 'AllTrails' : 'AllTrails'}</a>
                        </div>
                    `;
                } else if (hasKomoot) {
                    buttonsHtml = `
                        <a href="${h.link}" target="_blank" class="mt-auto block w-full text-center py-2.5 bg-stone-900 text-white text-[11px] font-bold rounded-lg hover:bg-stone-800 transition">${lang === 'ru' ? 'Открыть в Komoot' : 'Go to Komoot'}</a>
                    `;
                } else if (hasAllTrails) {
                    buttonsHtml = `
                        <a href="${h.alltrails}" target="_blank" class="mt-auto block w-full text-center py-2.5 bg-stone-100 text-stone-700 text-[11px] font-bold rounded-lg hover:bg-stone-200 transition border border-stone-200">${lang === 'ru' ? 'Открыть в AllTrails' : 'Go to AllTrails'}</a>
                    `;
                } else {
                    buttonsHtml = `
                        <div class="mt-auto block w-full text-center py-2.5 bg-stone-100 text-stone-400 text-[11px] font-bold rounded-lg border border-stone-200 border-dashed select-none">${lang === 'ru' ? 'Маршрут TBD' : 'Route TBD'}</div>
                    `;
                }

                return `
                    <div class="hike-tile bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                        <div class="hike-hero" style="background-image: url('${h.image}')"></div>
                        <div class="p-5 flex-1 flex flex-col">
                            <div class="flex justify-between items-start mb-2">
                                <h5 class="font-bold text-stone-800 text-sm leading-tight pr-3">${t(h.name, lang)}</h5>
                                <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-500 uppercase tracking-tighter">${diffLabel}</span>
                            </div>
                            <div class="text-[10px] text-stone-400 font-bold mb-3">📏 ${t(h.dist, lang)} • ⏱️ ${t(h.time, lang)}</div>
                            <p class="text-xs text-stone-600 mb-5 leading-relaxed flex-1">${t(h.summary, lang)}</p>
                            ${buttonsHtml}
                        </div>
                    </div>
                `;
            }).join('');

            cardContent = `
                <div class="mb-2">
                    <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-md mb-2 inline-block">${lang === 'ru' ? '⛰️ Варианты походов' : '⛰️ Explore Options'}</span>
                    <h4 class="font-bold text-xl sm:text-2xl text-stone-900 mb-1.5 break-words">${t(step.label, lang)}</h4>
                    <p class="text-stone-500 text-sm mb-6">${t(step.detail, lang)}</p>
                    <div class="flex gap-4 sm:gap-6 overflow-x-auto pb-6 custom-scrollbar">
                        ${hikeCards}
                    </div>
                </div>
            `;
        } else if (step.type === 'activity') {
            cardContent = `
                <div class="flex items-start gap-4 sm:gap-6">
                    <div class="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">${step.icon}</div>
                    <div class="flex-1 min-w-0">
                        <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">${lang === 'ru' ? 'Активность' : 'Activity'}</span>
                        <h4 class="font-bold text-xl sm:text-2xl text-stone-900 mb-2 break-words">${t(step.label, lang)}</h4>
                        ${formatDetail(t(step.detail, lang))}
                    </div>
                </div>
            `;
        } else if (step.type === 'stay') {
            const hasImage = step.image;
            cardContent = `
                <div class="flex flex-col md:flex-row justify-between gap-6">
                    <div class="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">${step.icon}</div>
                        <div class="flex-1 min-w-0">
                            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1 block">${lang === 'ru' ? 'Место отдыха' : 'Rest Point'}</span>
                            <h4 class="font-bold text-xl sm:text-2xl text-stone-900 mb-1 break-words">${t(step.label, lang)}</h4>
                            ${formatDetail(t(step.detail, lang))}
                        </div>
                    </div>
                    ${hasImage ? `
                    <div class="w-full md:w-64 h-40 rounded-2xl overflow-hidden border border-stone-100 flex-shrink-0 shadow-sm mt-3 md:mt-0">
                        <div class="w-full h-full bg-cover bg-center" style="background-image: url('${step.image}')"></div>
                    </div>
                    ` : ''}
                </div>
            `;
        } else if (step.type === 'travel') {
            cardContent = `
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div class="flex items-start gap-4 sm:gap-6 flex-1 min-w-0 w-full">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">${step.icon}</div>
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 block">${lang === 'ru' ? 'Переезд/Перелет' : 'Global Transit'}</span>
                                    <h4 class="font-bold text-xl sm:text-2xl text-stone-900 mb-2 break-words">${t(step.label, lang)}</h4>
                                </div>
                                <div class="self-start sm:self-center flex-shrink-0 mt-1 sm:mt-0">
                                    <span class="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-100 rounded-lg inline-block">${t(step.time, lang)}</span>
                                </div>
                            </div>
                            ${formatDetail(t(step.detail, lang))}
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="step-container relative fade-in" style="animation-delay: ${idx * 0.15}s">
                <div class="step-connector"></div>
                <div class="relative z-10 bg-white p-5 sm:p-8 md:p-10 rounded-[2rem] border border-stone-100 shadow-sm">
                    ${cardContent}
                </div>
            </div>
        `;
    }).join('');
}
