import { t } from '../i18n.js';

let chartInstance = null;

/**
 * Initializes the driving intensity chart using Chart.js.
 * @param {Array} tripData - The trip details array (single-source with {en, ru} fields).
 * @param {string} lang - The active language code ('en' or 'ru').
 */
export function initDrivingChart(tripData, lang) {
    const canvas = document.getElementById('drivingChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const drives = tripData.map(d => {
        let sum = 0;
        d.sequence.forEach(s => { if (s.dist) sum += s.dist; });
        return sum;
    });
    
    // Extract date labels. In EN: "Wed, Aug 19" -> "Aug 19". In RU: "Ср, 19 авг" -> "19 авг".
    const labels = tripData.map(d => {
        const dateStr = t(d.date, lang);
        const parts = dateStr.split(',');
        return parts.length > 1 ? parts[1].trim() : dateStr;
    });

    // Ensure Chart.js library is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded.');
        return;
    }

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: drives,
                backgroundColor: '#556b2f',
                borderRadius: 12,
                hoverBackgroundColor: '#2d3436'
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true, 
                    grid: { color: '#f5f5f5', drawBorder: false }, 
                    ticks: { font: { size: 10, weight: 'bold' }, color: '#a8a29e' } 
                },
                x: { 
                    grid: { display: false }, 
                    ticks: { font: { size: 9, weight: 'bold' }, color: '#a8a29e' } 
                }
            }
        }
    });

    updateDrivingStats(tripData, lang);

    return chartInstance;
}

/**
 * Calculates and updates driving summary statistics (distance, time, SUV fuel consumption).
 * @param {Array} tripData 
 * @param {string} lang 
 */
function updateDrivingStats(tripData, lang) {
    let totalKm = 0;
    let totalMinutes = 0;

    tripData.forEach(d => {
        d.sequence.forEach(s => {
            if (s.type === 'drive') {
                if (s.dist) totalKm += s.dist;
                if (s.time && s.time.en) {
                    const timeStr = s.time.en;
                    const hMatch = timeStr.match(/(\d+)\s*h/);
                    const mMatch = timeStr.match(/(\d+)\s*m/);
                    const hours = hMatch ? parseInt(hMatch[1], 10) : 0;
                    const minutes = mMatch ? parseInt(mMatch[1], 10) : 0;
                    totalMinutes += (hours * 60) + minutes;
                }
            }
        });
    });

    const totalMiles = Math.round(totalKm * 0.621371);
    const totalGallons = Math.round(totalMiles / 25);
    const totalLiters = Math.round((totalKm * 9.4) / 100);
    const totalCostNok = Math.round(totalLiters * 21);
    const totalCostEur = Math.round(totalCostNok / 11.2);

    const distEl = document.getElementById('stats-distance');
    const timeEl = document.getElementById('stats-time');
    const fuelEl = document.getElementById('stats-fuel');

    if (distEl) {
        distEl.innerHTML = `${totalKm.toLocaleString()} km <span class="text-[11px] font-normal text-stone-500">(${totalMiles.toLocaleString()} mi)</span>`;
    }

    if (timeEl) {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        timeEl.innerHTML = `${hours}h ${mins}m`;
    }

    if (fuelEl) {
        fuelEl.innerHTML = `~${totalLiters} L <span class="text-xs font-normal text-stone-500">(~${totalGallons} gal)</span><div class="text-[11px] text-stone-500 font-normal mt-1">est. ${totalCostEur} EUR (${totalCostNok.toLocaleString()} NOK)</div>`;
    }
}
