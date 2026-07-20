/**
 * Built-in seed content for the Leo Club of REC website.
 *
 * This is REAL club data. It is used:
 *   1. As the demo content when Supabase is not yet configured, and
 *   2. As the exact rows inserted by supabase/schema.sql, so the live
 *      database starts pre-loaded with everything below.
 *
 * All images use clean placeholders (photo_url / poster_url = null) so
 * real photos can be dropped in later from the admin dashboard without
 * any redesign.
 */

export const CLUB = {
  name: 'Leo Club of Rajalakshmi Engineering College',
  shortName: 'Leo Club of REC',
  parent: 'Leo Clubs of Lions Clubs International',
  district: 'District 324 M',
  college: 'Rajalakshmi Engineering College',
  collegeShort: 'REC',
  location: 'Chennai, Tamil Nadu',
  tagline: "We're better together",
  mottos: [
    'We Leos always work together as a pride of lions',
    'We inspire and empower to make a difference',
  ],
  instagram: 'https://www.instagram.com/leoclubrec',
  instagramHandle: '@leoclubrec',
  linkedin: '', // slot — add when available
  email: 'leoclub@rajalakshmi.edu.in',
}

export const TENURES = [
  { id: '2026-27', label: '2026 – 27', is_current: true, sort_order: 1 },
  { id: '2025-26', label: '2025 – 26', is_current: false, sort_order: 2 },
]

/** category: office_bearer | senior | board | faculty | general */
export const MEMBERS = [
  // ── 2026-27 — Office Bearers ──────────────────────────────
  { name: 'Leo Aditi', role: 'President', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 1 },
  { name: 'Leo Anvitha', role: 'Vice President', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 2 },
  { name: 'Leo Shamruti', role: 'Secretary', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 3 },
  { name: 'Leo Tarun', role: 'Treasurer', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 4 },
  { name: 'Leo Christina Morenas', role: 'HR', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 5 },
  { name: 'Leo Akash', role: 'Project Manager', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 6 },
  { name: 'Leo Ajay', role: 'Project Secretary', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 7 },
  { name: 'Leo Siva Prakasam', role: 'Project Secretary', category: 'office_bearer', tenure: '2026-27', photo_url: null, sort_order: 8 },

  // ── 2026-27 — Seniors (advising the current tenure) ───────
  { name: 'Sabarish Raja', role: 'Chairperson', category: 'senior', tenure: '2026-27', photo_url: null, sort_order: 1 },
  { name: 'Indira Yazhini MS', role: 'Senior Coordinator', category: 'senior', tenure: '2026-27', photo_url: null, sort_order: 2 },
  { name: 'Ragu Chanthar', role: 'Senior Coordinator', category: 'senior', tenure: '2026-27', photo_url: null, sort_order: 3 },
  { name: 'Haritha S', role: 'Senior Coordinator', category: 'senior', tenure: '2026-27', photo_url: null, sort_order: 4 },
  { name: 'Jeyashree Triloka', role: 'Senior Coordinator', category: 'senior', tenure: '2026-27', photo_url: null, sort_order: 5 },

  // ── 2026-27 — Board of Directors ──────────────────────────
  { name: 'Roshan', role: 'Event Administrator', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 1 },
  { name: 'Chandhresh', role: 'Director of Finance', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 2 },
  { name: 'Hisham', role: 'Director of Membership', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 3 },
  { name: 'Harish', role: 'Club Safety Officer', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 4 },
  { name: 'Oviya', role: 'Club Safety Officer', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 5 },
  { name: 'Shailender', role: 'Director of Marketing', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 6 },
  { name: 'Durgaprasad', role: 'Director of Technical', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 7 },
  { name: 'Vigneshwar', role: 'Director of Technical', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 8 },
  { name: 'Ashwanth', role: 'Director of Service', category: 'board', tenure: '2026-27', photo_url: null, sort_order: 9 },

  // ── Faculty Coordinators (shown for both tenures) ─────────
  { name: 'D Gururaj', role: 'Faculty Coordinator', category: 'faculty', tenure: '2026-27', photo_url: null, sort_order: 1 },
  { name: 'Sushma Jagatap', role: 'Faculty Coordinator', category: 'faculty', tenure: '2026-27', photo_url: null, sort_order: 2 },

  // ── 2025-26 — Office Bearers (ran the events below) ───────
  { name: 'Leo Sabarish', role: 'President', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 1 },
  { name: 'Leo Akshaya', role: 'Vice President', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 2 },
  { name: 'Leo Indirayazhini', role: 'Secretary', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 3 },
  { name: 'Leo Raguchanthar', role: 'Treasurer', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 4 },
  { name: 'Leo Haritha', role: 'HR', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 5 },
  { name: 'Leo Shaun Machado', role: 'Project Manager', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 6 },
  { name: 'Leo Jeyashree', role: 'Project Secretary', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 7 },
  { name: 'Leo Sriwanth', role: 'Project Secretary', category: 'office_bearer', tenure: '2025-26', photo_url: null, sort_order: 8 },

  // ── Faculty Coordinators (2025-26) ────────────────────────
  { name: 'D Gururaj', role: 'Faculty Coordinator', category: 'faculty', tenure: '2025-26', photo_url: null, sort_order: 1 },
  { name: 'Sushma Jagatap', role: 'Faculty Coordinator', category: 'faculty', tenure: '2025-26', photo_url: null, sort_order: 2 },
]

/**
 * Events. `slug` is a stable id used to group gallery images.
 * upcoming/past is derived from the date at render time.
 */
export const EVENTS = [
  {
    slug: 'leo-nova-25',
    name: "Leo Nova '25",
    date: '2025-09-24',
    venue: 'REC Campus',
    lead: '',
    tenure: '2025-26',
    description:
      'Installation of the new Leo Council 2025-26 — a ceremonial evening welcoming the incoming team and setting the vision for the year ahead.',
    highlights: [
      'Chief Guest: Lion Rajkumar Victor (District Chairperson)',
      'Formal installation of the 2025-26 Council',
      'Vision & pledge for the year of service',
    ],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'akshar-25',
    name: "Akshar '25",
    date: '2025-09-28',
    venue: 'Tambaram, Chennai',
    lead: 'Tarun V',
    tenure: '2025-26',
    description:
      'An orphanage visit focused on learning and life-skills for children — combining civic awareness with fun, interactive sessions.',
    highlights: ['Civic sense session', 'Quiz for the children', 'Career guidance'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'giving-grace',
    name: 'Giving Grace',
    date: '2025-10-02',
    venue: 'Tambaram, Chennai',
    lead: 'Shivani G',
    tenure: '2025-26',
    description:
      'A joyful day of creativity and safety awareness for children, blending craft, performance and play.',
    highlights: [
      'Bracelet-making workshop',
      'Good touch / bad touch mime',
      'Talent show for the children',
    ],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'shrestha-25',
    name: "Shrestha '25 (5.0)",
    date: '2025-10-15',
    end_date: '2025-10-17',
    venue: 'REC Campus',
    lead: 'Ajay G & Shamruti S',
    tenure: '2025-26',
    description:
      "Our signature Diwali donation drive, in its 5th consecutive year. Donation stalls across campus collected everyday essentials that were then given to orphanages — turning the festival of lights into a festival of giving.",
    highlights: [
      '5th consecutive edition (SHRESTHA 5.0)',
      'Campus-wide donation stalls',
      'Essentials collected & distributed to orphanages',
      'A three-day Diwali celebration of service',
    ],
    poster_url: null,
    featured: true,
  },
  {
    slug: 'karunya',
    name: 'Karunya',
    date: '2025-10-19',
    venue: 'Shree Sharadha Sakthi Peetam',
    lead: 'Ajay G & Shamruti S',
    tenure: '2025-26',
    description:
      'An orphanage outreach tied to Shrestha — carrying the collected donations to the children alongside a day of stories, craft and games.',
    highlights: ['Distribution of essentials', 'Storytelling', 'Bracelet making', 'Games'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'aaharam',
    name: 'Aaharam',
    date: '2025-12-20',
    venue: 'Marina Beach, Chennai',
    lead: 'Nainika',
    tenure: '2025-26',
    description:
      'A food donation drive serving fresh, warm meals to the workers who keep Marina Beach running.',
    highlights: ['Fresh meals prepared & served', 'Support for beach workers'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'umanita',
    name: 'Umanita',
    date: '2026-01-04',
    venue: 'Megha Foundation (Saranalaya), Kovur',
    lead: 'Divya Lakshmi D',
    tenure: '2025-26',
    description:
      'A caring visit combining practical health awareness with plenty of play for the children.',
    highlights: [
      'First-aid demonstration',
      'Stationery & biscuits donated',
      'Games & hand-painting',
    ],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'empathia',
    name: 'Empathia',
    date: '2026-01-18',
    venue: 'Online',
    lead: 'Saran DP',
    tenure: '2025-26',
    description:
      'A virtual session building awareness and empathy around disability, made engaging with an interactive puzzle game.',
    highlights: ['Disability awareness session', 'Interactive puzzle game'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'golden-chapters',
    name: 'Golden Chapters',
    date: '2026-02-01',
    venue: 'Nanganallur, Chennai',
    lead: 'Aditi G S',
    tenure: '2025-26',
    description:
      'An afternoon of warmth at an old age home — listening, singing and capturing memories with the elders.',
    highlights: ['Stories & conversation', 'Games and songs', 'Polaroid portraits'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'hidaya',
    name: 'Hidaya',
    date: '2026-02-08',
    venue: 'Sri Varasithi Vinayagar Temple',
    lead: 'Roshan',
    tenure: '2025-26',
    description: 'A temple cleaning drive giving back to a community space of peace and worship.',
    highlights: ['Temple cleaning drive', 'Community service in action'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'audacia',
    name: 'Audacia',
    date: '2026-03-08',
    venue: 'Tower Park, Anna Nagar',
    lead: '',
    tenure: '2025-26',
    description:
      "A Women's Day celebration spreading encouragement to women in the community.",
    highlights: ['Affirmation cards', 'Chocolates for women in the community', "Women's Day special"],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'invicta',
    name: 'Invicta',
    date: '2026-03-09',
    venue: 'REC Campus',
    lead: '',
    tenure: '2025-26',
    description:
      "A Women's Day appreciation for the housekeeping and sanitary staff who care for our campus every day.",
    highlights: ['Appreciation for housekeeping & sanitary staff', 'Cupcakes & coin purses'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'karam',
    name: 'Karam',
    date: '2026-03-19',
    venue: 'Big Street Masjid',
    lead: 'Mohammad Hisham M F',
    tenure: '2025-26',
    description: 'A Ramzan donation drive sharing food and drinks at iftar with the community.',
    highlights: ['Ramzan iftar donation', 'Food & drinks shared'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'vitarana',
    name: 'Vitarana',
    date: '2026-04-13',
    venue: 'Pondy Bazaar',
    lead: 'Shamruti',
    tenure: '2025-26',
    description:
      'A summer service offering cool relief to the vendors and workers of a busy marketplace.',
    highlights: ['Buttermilk distribution', 'Caps for vendors & workers', 'Summer relief'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'harmonia',
    name: 'Harmonia',
    date: '2026-04-26',
    venue: "Jeeva Jothi Children's Home",
    lead: 'Christina Morenas',
    tenure: '2025-26',
    description:
      'An orphanage visit in collaboration with the Artistry Club — a harmony of music and craft with the children.',
    highlights: ['Collaboration with the Artistry Club', 'Sing-along', 'Bookmark making'],
    poster_url: null,
    featured: false,
  },
  {
    slug: 'ignition',
    name: 'Ignition',
    date: '2026-07-06',
    venue: 'Padikuppam Government High School',
    lead: 'Anvitha A',
    tenure: '2025-26',
    description:
      'A sports-focused day donating equipment and playing games with government-school students.',
    highlights: ['Sports goods donation', 'Games with students'],
    poster_url: null,
    featured: false,
  },

  // ── Upcoming placeholders for the 2026-27 tenure ──────────
  {
    slug: 'shrestha-6',
    name: 'Shrestha 6.0',
    date: '2026-10-20',
    venue: 'REC Campus',
    lead: '',
    tenure: '2026-27',
    description:
      'The 6th edition of our signature Diwali donation drive returns. Details will be announced soon — watch this space to be part of the biggest service event of the year.',
    highlights: ['6th consecutive year', 'Campus donation drive', 'Diwali of giving'],
    poster_url: null,
    featured: true,
  },
]

/** value + label stat strip; icons are inline SVG keys used in the UI. */
export const STATS = [
  { key: 'years', value: '5+', label: 'Years Active' },
  { key: 'events', value: '16+', label: 'Events Conducted' },
  { key: 'served', value: '1000+', label: 'People Served' },
  { key: 'members', value: '30+', label: 'Active Leos' },
]

export const ACHIEVEMENTS = [
  {
    title: '5 Years of SHRESTHA',
    description:
      'Our signature Diwali donation drive has run for five consecutive years, growing into the club’s flagship service tradition.',
    value: '5.0',
    sort_order: 1,
  },
  {
    title: 'Orphanages & Homes Reached',
    description:
      'Visits and outreach across multiple orphanages, children’s homes and old age homes throughout Chennai.',
    value: '8+',
    sort_order: 2,
  },
  {
    title: 'Communities Served',
    description:
      'From beach workers and street vendors to housekeeping staff and temple communities — service across the city.',
    value: '12+',
    sort_order: 3,
  },
  {
    title: 'Club Collaborations',
    description:
      'Joint initiatives such as Harmonia with the Artistry Club, expanding our reach and impact together.',
    value: 'Artistry Club',
    sort_order: 4,
  },
]

export const ANNOUNCEMENTS = [
  {
    title: 'Council & Board Recruitment is Open',
    body: 'We are looking for passionate students to join the Leo Club of REC. Reach out via Instagram @leoclubrec or email to be part of the pride.',
    date: '2026-07-15',
    active: true,
  },
  {
    title: 'Shrestha 6.0 — Coming this Diwali',
    body: 'Our signature donation drive returns for its 6th year. Stay tuned for dates, stalls and how you can contribute.',
    date: '2026-07-10',
    active: true,
  },
]

/** Gallery images are empty by design — admins upload real photos.
 *  Each row references an event slug (group) and a year. */
export const GALLERY = []
