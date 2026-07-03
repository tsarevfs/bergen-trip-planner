export const tripData = [
    {
        day: 1,
        date: { en: 'Thu, Jul 23' },
        title: { en: 'Arrival in Bergen' },
        summary: { en: 'Arrive in Bergen, settle into your accommodation, and explore the historic Bryggen wharf and harbor.' },
        sequence: [
            { type: 'travel', label: { en: 'Arrive in Bergen' }, detail: { en: 'Arrival at Bergen Airport (BGO) or train station. Transfer to the city center and check in.' }, time: { en: 'Varies' }, icon: '✈️' },
            { type: 'activity', label: { en: 'Explore Bryggen & Fish Market' }, detail: { en: 'Stroll along the historic wooden houses of Bryggen, a UNESCO World Heritage site, and visit the lively local fish market.' }, icon: '🏘️' },
            { type: 'stay', label: { en: 'Bergen Accommodation' }, detail: { en: 'Spend your first night relaxing in Bergen city center.' }, icon: '🏨' }
        ]
    },
    {
        day: 2,
        date: { en: 'Fri, Jul 24' },
        title: { en: 'Scenic Drive to Olden' },
        summary: { en: 'Drive north from Bergen on E39, crossing the majestic Sognefjord by ferry from Oppedal to Lavik, and continue to your cabin in Olden.' },
        sequence: [
            {
                type: 'drive',
                label: { en: 'Bergen to Oppedal Ferry' },
                from: 'Bergen, Norway',
                to: 'Oppedal, Gulen, Norway',
                dist: 110,
                time: { en: '1h 45m' },
                detail: { en: 'Drive north on E39 through tunnels and green hills to the Sognefjord ferry terminal. 💡 <b>Timing Tip:</b> Depart Bergen in the morning (before 11:00 AM) to cross before the Friday afternoon weekend commuter traffic heading north starts to build up.' },
                icon: '🚗'
            },
            { type: 'travel', label: { en: 'Oppedal – Lavik Ferry Crossing' }, detail: { en: 'Take the scenic 20-minute car ferry crossing over the outer Sognefjord, Norway\'s longest and deepest fjord.' }, time: { en: '20m' }, icon: '⛴️' },
            {
                type: 'drive',
                label: { en: 'Lavik to Flåten, Olden' },
                from: 'Lavik, Norway',
                to: 'Flåten, 6788 Olden, Norway',
                dist: 170,
                time: { en: '3h 15m' },
                detail: { en: 'Continue north on E39 through Førde and Byrkjelo, then take Rv60 to your cabin in Olden. ⚠️ <b>Caution:</b> Watch for narrow mountain tunnels and occasional camper vans.' },
                icon: '🚗'
            },
            { type: 'stay', label: { en: 'Flåten Cabin', ru: 'Коттедж во Флотен' }, detail: { en: 'Check into your cozy cabin in Olden.' }, image: 'cabin.avif', icon: '🏨' }
        ]
    },
    {
        day: 3,
        date: { en: 'Sat, Jul 25' },
        title: { en: 'Olden Exploration' },
        summary: { en: 'A flexible day to relax, enjoy the panoramic views from your cabin, and explore the beautiful Nordfjord and Olden valley surroundings.' },
        sequence: [
            { type: 'activity', label: { en: 'Sightseeing in Olden Valley' }, detail: { en: 'Spend the day exploring the dramatic valley, glacial lakes, or relaxing by the fjord. Hikes can be added here once data is available.' }, icon: '🏔️' },
            { type: 'stay', label: { en: 'Flåten Cabin' }, detail: { en: 'Enjoy a peaceful evening and a second night at your cabin in Flåten, Olden.' }, image: 'cabin.avif', icon: '🏨' }
        ]
    },
    {
        day: 4,
        date: { en: 'Sun, Jul 26' },
        title: { en: 'Return Drive to Bergen' },
        summary: { en: 'Drive south from Olden back to Bergen, taking the E39 route with the Lavik-Oppedal ferry crossing, concluding your Norwegian fjord escape.' },
        sequence: [
            {
                type: 'drive',
                label: { en: 'Olden to Lavik' },
                from: 'Flåten, 6788 Olden, Norway',
                to: 'Lavik, Norway',
                dist: 170,
                time: { en: '3h 15m' },
                detail: { en: 'Drive south through the breathtaking mountain passes and lakeside roads to the Lavik ferry terminal. 💡 <b>Timing Tip:</b> Start your drive from Olden in the morning (before 10:00 AM) to cross the Sognefjord before the peak Sunday afternoon return traffic builds up at Lavik (typically 3:00 PM – 7:00 PM).' },
                icon: '🚗'
            },
            { type: 'travel', label: { en: 'Lavik – Oppedal Ferry Crossing' }, detail: { en: 'Cross the Sognefjord one last time.' }, time: { en: '20m' }, icon: '⛴️' },
            {
                type: 'drive',
                label: { en: 'Oppedal to Bergen' },
                from: 'Oppedal, Gulen, Norway',
                to: 'Bergen, Norway',
                dist: 110,
                time: { en: '1h 45m' },
                detail: { en: 'Final drive leg back to Bergen. Return rental car and prepare for departure.' },
                icon: '🚗'
            },
            { type: 'travel', label: { en: 'Departure from Bergen (BGO)' }, detail: { en: 'Transfer to Bergen Airport (BGO) for your departure flight.' }, time: { en: 'Varies' }, icon: '✈️' }
        ]
    }
];

export const todos = [
    {
        id: 1,
        text: { en: 'Confirm automatic toll/ferry payment with the rental counter at Bergen Airport (BGO). <i>Note: Most Norwegian rental cars come pre-equipped with an AutoPASS tag, so you do not need to register on <a href="https://www.ferrypay.no" target="_blank" class="underline text-emerald-700 hover:text-emerald-950 font-semibold">FerryPay</a> or <a href="https://www.autopass.no" target="_blank" class="underline text-emerald-700 hover:text-emerald-950 font-semibold">AutoPASS</a> yourself.</i>' },
        done: false
    },
    {
        id: 2,
        text: { en: 'Book Bergen city center accommodation (July 23-24)' },
        done: false
    },
    {
        id: 3,
        text: { en: 'Confirm car rental pickup at Bergen Airport (BGO)' },
        done: false
    }
];
