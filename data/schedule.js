// ============================================================
// COLORIDO 2K26 — Schedule Data
// Stored as JS objects for easy Phase 2 backend connection.
// ============================================================

export const schedule = {
  day1: {
    label: 'Day 01',
    date: '15 OCT 2026',
    items: [
      { time: '08:30 AM', activity: 'Registration & Check-in', venue: 'Main Gate' },
      { time: '09:00 AM', activity: 'Opening Ceremony', venue: 'Main Auditorium' },
      { time: '10:00 AM', activity: 'Fine Arts Competition', venue: 'Art Block' },
      { time: '10:00 AM', activity: 'Basketball (Boys)', venue: 'Sports Ground' },
      { time: '10:00 AM', activity: 'Tekraft Events', venue: 'Computer Lab' },
      { time: '10:00 AM', activity: 'Throwball (Girls)', venue: 'Sports Ground' },
      { time: '11:00 AM', activity: 'Music — Solo', venue: 'Main Auditorium' },
      { time: '01:00 PM', activity: 'Lunch Break', venue: 'Cafeteria' },
      { time: '02:00 PM', activity: 'Dramatics', venue: 'Seminar Hall' },
      { time: '04:00 PM', activity: 'Results — Day 1 Events', venue: 'Main Auditorium' },
    ],
  },
  day2: {
    label: 'Day 02',
    date: '16 OCT 2026',
    items: [
      { time: '09:00 AM', activity: 'Reporting & Warm-up', venue: 'Sports Ground' },
      { time: '10:00 AM', activity: 'Music — Group', venue: 'Main Auditorium' },
      { time: '10:00 AM', activity: 'Volleyball (Boys)', venue: 'Sports Ground' },
      { time: '10:00 AM', activity: 'Literary Events', venue: 'Library Seminar Room' },
      { time: '10:00 AM', activity: 'TenniKoit (Girls)', venue: 'Indoor Sports Hall' },
      { time: '11:00 AM', activity: 'Dance — Solo', venue: 'Open-Air Stage' },
      { time: '01:00 PM', activity: 'Lunch Break', venue: 'Cafeteria' },
      { time: '02:00 PM', activity: 'Dramatics Finals', venue: 'Seminar Hall' },
      { time: '04:00 PM', activity: 'Cultural Night', venue: 'Open-Air Stage' },
    ],
  },
  day3: {
    label: 'Day 03',
    date: '17 OCT 2026',
    items: [
      { time: '09:00 AM', activity: 'Reporting & Warm-up', venue: 'Sports Ground' },
      { time: '10:00 AM', activity: 'Dance — Group', venue: 'Open-Air Stage' },
      { time: '10:00 AM', activity: 'Table Tennis (Boys)', venue: 'Indoor Sports Hall' },
      { time: '10:00 AM', activity: 'Table Tennis (Girls)', venue: 'Indoor Sports Hall' },
      { time: '02:00 PM', activity: 'Choreoday', venue: 'Main Auditorium' },
      { time: '04:00 PM', activity: 'Fashion Show', venue: 'Open-Air Stage' },
      { time: '06:00 PM', activity: 'Closing Ceremony & Prize Distribution', venue: 'Main Auditorium' },
    ],
  },
};

export const scheduleDays = ['day1', 'day2', 'day3'];
