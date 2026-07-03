/**
 * Internationalization (i18n) utilities and static UI translation dictionary.
 * English-only implementation.
 */

/**
 * Resolves a translatable value.
 * @param {string|Object} value - A plain string or an {en} translation object.
 * @param {string} lang - The active language code (always 'en').
 * @returns {string} The resolved string.
 */
export function t(value, lang) {
    if (value && typeof value === 'object' && !Array.isArray(value) && value.en !== undefined) {
        return value.en;
    }
    return value ?? '';
}

/**
 * Static UI translation dictionary for elements marked with data-i18n attributes.
 */
export const dictionary = {
    en: {
        nav_itinerary: "Interactive Itinerary",
        nav_logistics: "Logistics & Analytics",
        header_badge: "Expedition Hub • Mission Control",
        header_title: "Norway Road Trip Planner",
        header_desc: "Your interactive command center for the 2026 Norway journey. This dashboard maps out your arrival in Bergen, the scenic drive to Flåten (Olden) through the fjords, and the return drive.",
        itinerary_title: "Interactive Journey Flow",
        itinerary_desc: "Select a day from the journey track on the left to explore the vertical sequence of events. Each day contains specific transit times, ferry crossings, and route details.",
        timeline_title: "The Timeline",
        timeline_date_range: "July 23 – July 26, 2026",
        logistics_title: "Logistics & Analytics",
        logistics_desc: "Track your pre-trip preparation tasks and visualize the driving load.",
        checklist_title: "Planning Checklist",
        driving_intensity_title: "Driving Intensity & Analytics",
        driving_intensity_subtitle: "Total Daily Kilometers",
        stats_total_dist: "Total Distance",
        stats_total_time: "Total Time",
        stats_fuel_estimate: "Estimated Fuel",
        footer_text: "© 2026 Norway Trip Command • Bergen - Lavik - Olden • Developed for Fjord Explorer"
    }
};
