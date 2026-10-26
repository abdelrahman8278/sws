import { AgencyService } from '../core/models/service.model';

export const AGENCY_SERVICES: readonly AgencyService[] = [
  {
    id: 'brand-strategy',
    discipline: '01 / DISCIPLINE',
    title: 'Brand Strategy',
    description: 'Positioning, institutional brand governance, narrative frameworks, and enduring identity systems.',
    footerTag: 'Enterprise & Sovereign',
    icon: 'compass',
  },
  {
    id: 'digital-marketing',
    discipline: '02 / DISCIPLINE',
    title: 'Digital Marketing',
    description: 'High-impact multi-channel campaigns, performance architecture, and audience intelligence.',
    footerTag: 'Audience & Architecture',
    icon: 'chart',
  },
  {
    id: 'creative-campaigns',
    discipline: '03 / DISCIPLINE',
    title: 'Creative Campaigns',
    description: 'Nationally resonant concepts, multimedia storytelling, and culturally grounded creative execution.',
    footerTag: 'National Resonance',
    icon: 'sparkle',
  },
  {
    id: 'social-media',
    discipline: '04 / DISCIPLINE',
    title: 'Social Media',
    description: 'Executive narrative management, cultural dialogue, and bespoke community engagement strategies.',
    footerTag: 'Executive Dialogue',
    icon: 'chat',
  },
  {
    id: 'content-production',
    discipline: '05 / DISCIPLINE',
    title: 'Content Production',
    description: 'Cinema-grade film, immersive assets, institutional editorial publications, and digital archives.',
    footerTag: 'Broadcast & Archive',
    icon: 'film',
  },
  {
    id: 'event-marketing',
    discipline: '06 / DISCIPLINE',
    title: 'Event Marketing',
    description: 'Immersive physical environments, state-level summit activation, and VIP ceremonial experiences.',
    footerTag: 'Summit & Ceremonial',
    icon: 'stage',
  },
];
