import { ArrowRight } from 'lucide-react';
import { homeLogos, logoAlt } from './source-data';
export default function TrustedBy(){
 return <section id="trusted-by" className="trusted-section wrap" aria-labelledby="trusted-title"><h2 id="trusted-title">Trusted by</h2><div className="trusted-logos">{homeLogos.map(logo=><div key={logo.src}><img src={logo.src} alt={logoAlt(logo)} width="170" height="75" loading="lazy"/>{logoAlt(logo)==='Chicago Public Schools' && <span>Vendor #45871</span>}</div>)}</div><a href="/collaborations" className="text-link">Our clients <ArrowRight size={16}/></a></section>;
}
