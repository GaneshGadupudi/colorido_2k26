// ============================================================
// COLORIDO 2K26 — Announcements & Results Data
// Stored as JS arrays for easy Phase 2 backend connection.
// ============================================================

export const announcements = [
  {
    id: 1,
    title: 'Registration Opens',
    date: '25 September 2026',
    description: 'Registration for COLORIDO 2K26 is now open. Register early to secure your spot in your favorite events.',
    badge: 'New',
  },
  {
    id: 2,
    title: 'Event Schedule Released',
    date: '27 September 2026',
    description: 'The full 3-day event schedule is now available on the Schedule page. Plan your COLORIDO experience.',
    badge: 'Info',
  },
  {
    id: 3,
    title: 'Last Date for Registration',
    date: '05 October 2026',
    description: 'All registrations must be submitted by 5 October 2026, 11:59 PM. No extensions will be granted.',
    badge: 'Urgent',
  },
  {
    id: 4,
    title: 'Choreoday Theme Announced',
    date: '10 October 2026',
    description: 'The theme for Choreoday 2K26 is "Roots & Wings" — celebrating where we come from and where we are going.',
    badge: 'New',
  },
  {
    id: 5,
    title: 'Accommodation Details',
    date: '12 October 2026',
    description: 'Outstation participants can avail hostel accommodation. Contact the helpdesk for booking details.',
    badge: 'Info',
  },
];

export const tickerText = 'Registration for COLORIDO 2K26 is now open  •  Last date: 05 October 2026  •  Download the event schedule from the Schedule page  •  Follow us on Instagram @colorido2k26';

// ── RESULTS (Dummy data for Phase 1) ──────────────────────
export const results = {
  cultural: [
    {
      eventName: 'Fine Arts',
      winner: 'ABC College, Vijayawada',
      runnerUp: 'XYZ College, Guntur',
    },
    {
      eventName: 'Music — Solo',
      winner: 'PQR College, Hyderabad',
      runnerUp: 'LMN College, Visakhapatnam',
    },
    {
      eventName: 'Music — Group',
      winner: 'DEF College, Chennai',
      runnerUp: 'ABC College, Vijayawada',
    },
    {
      eventName: 'Dance — Solo',
      winner: 'GHI College, Bangalore',
      runnerUp: 'PQR College, Hyderabad',
    },
    {
      eventName: 'Dance — Group',
      winner: 'JKL College, Guntur',
      runnerUp: 'DEF College, Chennai',
    },
    {
      eventName: 'Choreoday',
      winner: 'MNO College, Tirupati',
      runnerUp: 'GHI College, Bangalore',
    },
    {
      eventName: 'Dramatics',
      winner: 'PQR College, Hyderabad',
      runnerUp: 'ABC College, Vijayawada',
    },
    {
      eventName: 'Fashion Show',
      winner: 'DEF College, Chennai',
      runnerUp: 'JKL College, Guntur',
    },
  ],
  sports: [
    {
      eventName: 'Basketball (Boys)',
      winner: 'ABC College, Vijayawada',
      runnerUp: 'XYZ College, Guntur',
    },
    {
      eventName: 'Volleyball (Boys)',
      winner: 'PQR College, Hyderabad',
      runnerUp: 'LMN College, Visakhapatnam',
    },
    {
      eventName: 'Table Tennis (Boys)',
      winner: 'GHI College, Bangalore',
      runnerUp: 'MNO College, Tirupati',
    },
    {
      eventName: 'Throwball (Girls)',
      winner: 'DEF College, Chennai',
      runnerUp: 'JKL College, Guntur',
    },
    {
      eventName: 'TenniKoit (Girls)',
      winner: 'ABC College, Vijayawada',
      runnerUp: 'PQR College, Hyderabad',
    },
    {
      eventName: 'Table Tennis (Girls)',
      winner: 'LMN College, Visakhapatnam',
      runnerUp: 'GHI College, Bangalore',
    },
  ],
};

// ── SPONSORS (Dummy data for Phase 1) ─────────────────────
export const sponsors = [
  { name: 'TechCorp India', tier: 'Title Sponsor', logo: 'TC' },
  { name: 'City Bank', tier: 'Gold Sponsor', logo: 'CB' },
  { name: 'Fresh Foods', tier: 'Gold Sponsor', logo: 'FF' },
  { name: 'Green Energy', tier: 'Silver Sponsor', logo: 'GE' },
  { name: 'Build Mart', tier: 'Silver Sponsor', logo: 'BM' },
  { name: 'CloudNet', tier: 'Silver Sponsor', logo: 'CN' },
  { name: 'Local FM', tier: 'Partner', logo: 'LF' },
  { name: 'Sports Hub', tier: 'Partner', logo: 'SH' },
  { name: 'Print Works', tier: 'Partner', logo: 'PW' },
];

// ── GALLERY IMAGES ────────────────────────────────────────
export const galleryImages = [
  { url: 'https://images.pexels.com/photos/39722189/pexels-photo-39722189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Traditional dance performance on colorful stage', size: 'large' },
  { url: 'https://images.pexels.com/photos/11211233/pexels-photo-11211233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Basketball game action', size: 'medium' },
  { url: 'https://images.pexels.com/photos/1613240/pexels-photo-1613240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Live band performance on stage', size: 'medium' },
  { url: 'https://images.pexels.com/photos/1396116/pexels-photo-1396116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Fashion show model on runway', size: 'medium' },
  { url: 'https://images.pexels.com/photos/6896323/pexels-photo-6896323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Theatrical drama performance', size: 'large' },
  { url: 'https://images.pexels.com/photos/2559741/pexels-photo-2559741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Colorful art gallery exhibition', size: 'medium' },
  { url: 'https://images.pexels.com/photos/38481634/pexels-photo-38481634.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Cultural festival celebration', size: 'medium' },
  { url: 'https://images.pexels.com/photos/6203529/pexels-photo-6203529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Indoor volleyball match', size: 'medium' },
  { url: 'https://images.pexels.com/photos/13073249/pexels-photo-13073249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Concert with colorful stage lights', size: 'medium' },
  { url: 'https://images.pexels.com/photos/1526685/pexels-photo-1526685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Abstract colorful painting', size: 'medium' },
  { url: 'https://images.pexels.com/photos/28587831/pexels-photo-28587831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Fashion show with dazzling lights', size: 'medium' },
  { url: 'https://images.pexels.com/photos/35244385/pexels-photo-35244385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Traditional dancers in vibrant costumes', size: 'medium' },
];
