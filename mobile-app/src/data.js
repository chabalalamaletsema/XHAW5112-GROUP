// ===== BUSINESS INFO =====
export const BUSINESS = {
  name: 'Next Level Gaming & Esports Arena',
  short: 'Next Level Gaming',
  tagline: 'Play. Compete. Connect.',
  phone: '+27 11 123 4567',
  email: 'info@nextlevelgaming.co.za',
  address: '123 Gaming Lane, Johannesburg, 2000',
  hours: 'Mon - Sun: 9:00 - 22:00',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=123+Gaming+Lane+Johannesburg+2000',
  socials: [
    { id: 'fb', label: 'Facebook', url: 'https://www.facebook.com' },
    { id: 'ig', label: 'Instagram', url: 'https://www.instagram.com' },
    { id: 'x', label: 'X', url: 'https://www.x.com' },
  ],
};

// ===== PACKAGES + INDIVIDUAL EXPERIENCES (array) =====
export const PACKAGES = [
  {
    id: '1', type: 'package', name: 'Ultimate Gaming Day', price: 1500, icon: '🎮',
    duration: '8 hours', rating: 4.8, reviews: 100,
    desc: 'Full day LAN, PC + Console, VR stations, Tournaments + Snacks.',
    features: ['Full-day access (8 hrs)', 'PC + Console + VR', 'Tournament entry', 'Snacks & drinks included'],
  },
  {
    id: '2', type: 'package', name: 'Family Game Night', price: 1500, icon: '👨‍👩‍👧',
    duration: '3 hours', rating: 4.7, reviews: 64,
    desc: 'Co-op + Board Games, up to 6 players, pizza included.',
    features: ['Up to 6 players', 'Co-op & board games', 'Pizza included', '3-hour session'],
  },
  {
    id: '3', type: 'package', name: 'VR Arena Adventure', price: 750, icon: '🥽',
    duration: '60 minutes', rating: 4.9, reviews: 88,
    desc: 'Immersive VR, multiplayer, 60-min session, all gear provided.',
    features: ['60-minute session', 'Multiplayer VR', 'All gear provided', 'Free-roam arena'],
  },
  {
    id: '4', type: 'package', name: 'E-Sports Tournament Entry', price: 600, icon: '🏆',
    duration: 'Tournament day', rating: 4.6, reviews: 52,
    desc: 'Competitive play, prize pool, teams and solo entries welcome.',
    features: ['Competitive brackets', 'Prize pool', 'Teams & solo entry', 'Live leaderboard'],
  },
  {
    id: '5', type: 'package', name: 'Streaming & Content Creation', price: 800, icon: '🎥',
    duration: '2 hours', rating: 4.5, reviews: 31,
    desc: 'Pro studio, overlay & mic, 2-hour streaming slot.',
    features: ['2-hour studio slot', 'Pro overlay & mic', 'Multi-cam setup', 'Recording included'],
  },
  {
    id: '6', type: 'individual', name: '1 Hour Gaming', price: 120, icon: '🕹️',
    duration: '1 hour', rating: 4.6, reviews: 120,
    desc: 'One hour on a high-end PC or console station.',
    features: ['PC or console station', 'Headset provided', 'Extend on the day'],
  },
  {
    id: '7', type: 'individual', name: 'VR Experience', price: 150, icon: '🕶️',
    duration: '30 minutes', rating: 4.8, reviews: 76,
    desc: 'A single VR session with a staff member to guide you.',
    features: ['30-minute session', 'All gear provided', 'Beginner friendly'],
  },
  {
    id: '8', type: 'individual', name: 'Racing Simulator', price: 100, icon: '🏎️',
    duration: '30 minutes', rating: 4.7, reviews: 59,
    desc: 'Full-motion racing rig with wheel and pedals.',
    features: ['Wheel + pedals', 'Multiple tracks', 'Lap-time board'],
  },
];

export const SERVICES = [
  { id: 's1', icon: '🎮', label: 'Gaming Arena' },
  { id: 's2', icon: '🏆', label: 'Tournaments' },
  { id: 's3', icon: '🎉', label: 'Events' },
  { id: 's4', icon: '🛋️', label: 'Lounge' },
];

export const TESTIMONIALS = [
  { id: 't1', name: 'Thabo', text: 'Amazing experience! Best gaming arena ever!' },
  { id: 't2', name: 'Lerato', text: 'Great setup and friendly staff.' },
  { id: 't3', name: 'Sipho', text: '100% recommend! Will be back soon.' },
];

export const LEADERS = [
  { id: 'l1', name: 'Jason Naidoo', role: 'Founder & CEO' },
  { id: 'l2', name: 'Jane Smith', role: 'Operations Manager' },
  { id: 'l3', name: 'David Mokoena', role: 'Technical Lead' },
];
