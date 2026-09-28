// ============================================================
// COLORIDO 2K26 — Schedule Data
// Stored as JS objects for easy Phase 2 backend connection.
//
// type:    cultural | sports | ceremony | break
// eventId: links the row to an event in data/events.js (opens
//          its details popup); omit for non-competition rows.
// ============================================================

export const schedule = {
  day1: {
    label: 'Day 01',
    date: '15 OCT 2026',
    isoDate: '2026-10-15',
    items: [
      { time: '08:30 AM', activity: 'Registration & Check-in', venue: 'Main Gate', type: 'ceremony' },
      { time: '09:00 AM', activity: 'Opening Ceremony', venue: 'Main Auditorium', type: 'ceremony' },
      { time: '10:00 AM', activity: 'Fine Arts Competition', venue: 'Art Block', type: 'cultural', eventId: 'fine-arts' },
      { time: '10:00 AM', activity: 'Basketball (Boys)', venue: 'Sports Ground', type: 'sports', eventId: 'basketball-boys' },
      { time: '10:00 AM', activity: 'Tekraft Events', venue: 'Computer Lab', type: 'cultural', eventId: 'tekraft-events' },
      { time: '10:00 AM', activity: 'Throwball (Girls)', venue: 'Sports Ground', type: 'sports', eventId: 'throwball-girls' },
      { time: '11:00 AM', activity: 'Music — Solo', venue: 'Main Auditorium', type: 'cultural', eventId: 'music-solo' },
      { time: '01:00 PM', activity: 'Lunch Break', venue: 'Cafeteria', type: 'break' },
      { time: '02:00 PM', activity: 'Dramatics', venue: 'Seminar Hall', type: 'cultural', eventId: 'dramatics' },
      { time: '04:00 PM', activity: 'Results — Day 1 Events', venue: 'Main Auditorium', type: 'ceremony' },
    ],
  },
  day2: {
    label: 'Day 02',
    date: '16 OCT 2026',
    isoDate: '2026-10-16',
    items: [
      { time: '09:00 AM', activity: 'Reporting & Warm-up', venue: 'Sports Ground', type: 'ceremony' },
      { time: '10:00 AM', activity: 'Music — Group', venue: 'Main Auditorium', type: 'cultural', eventId: 'music-group' },
      { time: '10:00 AM', activity: 'Volleyball (Boys)', venue: 'Sports Ground', type: 'sports', eventId: 'volleyball-boys' },
      { time: '10:00 AM', activity: 'Literary Events', venue: 'Library Seminar Room', type: 'cultural', eventId: 'literary' },
      { time: '10:00 AM', activity: 'TenniKoit (Girls)', venue: 'Indoor Sports Hall', type: 'sports', eventId: 'tennikoit-girls' },
      { time: '11:00 AM', activity: 'Dance — Solo', venue: 'Open-Air Stage', type: 'cultural', eventId: 'dance-solo' },
      { time: '01:00 PM', activity: 'Lunch Break', venue: 'Cafeteria', type: 'break' },
      { time: '02:00 PM', activity: 'Dramatics Finals', venue: 'Seminar Hall', type: 'cultural', eventId: 'dramatics' },
      { time: '04:00 PM', activity: 'Cultural Night', venue: 'Open-Air Stage', type: 'ceremony' },
    ],
  },
  day3: {
    label: 'Day 03',
    date: '17 OCT 2026',
    isoDate: '2026-10-17',
    items: [
      { time: '09:00 AM', activity: 'Reporting & Warm-up', venue: 'Sports Ground', type: 'ceremony' },
      { time: '10:00 AM', activity: 'Dance — Group', venue: 'Open-Air Stage', type: 'cultural', eventId: 'dance-group' },
      { time: '10:00 AM', activity: 'Table Tennis (Boys)', venue: 'Indoor Sports Hall', type: 'sports', eventId: 'table-tennis-boys' },
      { time: '10:00 AM', activity: 'Table Tennis (Girls)', venue: 'Indoor Sports Hall', type: 'sports', eventId: 'table-tennis-girls' },
      { time: '02:00 PM', activity: 'Choreoday', venue: 'Main Auditorium', type: 'cultural', eventId: 'choreoday' },
      { time: '04:00 PM', activity: 'Fashion Show', venue: 'Open-Air Stage', type: 'cultural', eventId: 'fashion-show' },
      { time: '06:00 PM', activity: 'Closing Ceremony & Prize Distribution', venue: 'Main Auditorium', type: 'ceremony' },
    ],
  },
};

export const scheduleDays = ['day1', 'day2', 'day3'];
