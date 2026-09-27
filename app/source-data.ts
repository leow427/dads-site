import original from './original-content.json';
export type SourceBlock = { type: string; html?: string; text?: string; href?: string; source?: string; src?: string; alt?: string; dimensions?: string; urls?: string[] };
export type OriginalPage = { slug: string; blocks: SourceBlock[] };
export const sourcePages = original as OriginalPage[];
export const pageDetails: Record<string, {title: string;category: string;image: string;imageAlt: string;booking: string}> = {
  musicababy: { title: 'MúsicaBaby', category: 'Classes', image: '/images/little-listeners.jpg', imageAlt: 'A young child enjoying live music', booking: 'Register for MúsicaBaby' },
  'business-solutions': { title: 'Educational Workshops', category: 'Classes', image: '/images/creative-hands.jpg', imageAlt: 'Hands-on creative learning in a GoCreative workshop', booking: 'Book an educational workshop' },
  'being-bilingual-rocks': { title: 'Alina and Hamlet Duo', category: 'Music', image: '/images/hamlet-and-alina.jpg', imageAlt: 'Alina Celeste and Mi Amigo Hamlet with their guitars', booking: 'Book Being Bilingual Rocks!' },
  bbrband: { title: 'Full Band', category: 'Music', image: '', imageAlt: 'The BBR Band performing together', booking: 'Book the BBR Band' },
  'new-page-2': { title: 'Art Workshops', category: 'Art', image: '/images/creative-hands.jpg', imageAlt: 'Children exploring paper collage in a bilingual art workshop', booking: 'Book an art workshop' },
  collaborations: { title: 'Our Clients', category: 'GoCreative Programs', image: '', imageAlt: '', booking: 'Now booking for 2026 and 2027' },
  'about-us': { title: 'Electronic Press Kit', category: 'Press', image: '/images/meet-the-duo.jpg', imageAlt: 'Mi Amigo Hamlet and Alina Celeste', booking: 'Book us today' },
};
const logoNames: Record<string,string> = {
  'Starnet.png':'Illinois STARNET', 'WQPT-PBS.png':'WQPT PBS', 'MiamiChildrensMuseum.png':'Miami Children’s Museum', 'Alvin+Sherman+Library.png':'Alvin Sherman Library', 'chicagopubliclibrary.png':'Chicago Public Library', 'logo-text.png':'Illinois Library Association', 'High+Point.png':'High Point Public Library', 'cps-logo.png':'Chicago Public Schools', 'West-Town-Logos-05.png':'West Town Chicago', 'Screenshot+2023-12-06+at+7.49.56%E2%80%AFPM.png':'Dual Language Education of New Mexico', 'HarknessHouse.png':'Harkness House', 'KentDistrictLibrary.png':'Kent District Library', 'logo.png':'The Children’s Music Network', 'aab0e6_46fa3e5755cf4a36b37b3d83802f30e9.gif':'Paridad', 'Cervantes.gif':'Instituto Cervantes'
};
export const logoAlt = (block: SourceBlock) => logoNames[block.source?.split('/').pop() ?? ''] ?? 'GoCreative Programs client';
export const homeLogos = sourcePages.find(page=>page.slug==='new-page')!.blocks.filter(block=>block.type==='image');
