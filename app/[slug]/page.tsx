import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Headphones, Mail, Phone } from 'lucide-react';
import Home from '../page';
import { SiteFrame } from '../site-chrome';
import { sourcePages, pageDetails, logoAlt, type SourceBlock } from '../source-data';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return [...Object.keys(pageDetails), 'new-page'].map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${pageDetails[slug]?.title ?? 'Bilingual Music, Art & Creative Learning'} | GoCreative Programs` };
}
function RichText({ block }: { block: SourceBlock }) {
  // Content was imported with a tag/attribute allowlist; no scripts or inline handlers are retained.
  const html = (block.html ?? '').replace(/<h1>/g, '<h2>').replace(/<\/h1>/g, '</h2>');
  return <div className="source-copy" dangerouslySetInnerHTML={{ __html: html }}/>;
}
const albums = [
  { title: 'Today Is a Good Day', cover: '/images/today-is-a-good-day.jpg', link: 'https://open.spotify.com/album/30icxuMNCLvvxGzqopTjLd?si=gqR6k3NNSEe13IaUelz-tA' },
  { title: 'Hoy Es un Buen Día', cover: '/images/hoy-es-un-buen-dia.jpg', link: 'https://open.spotify.com/album/3HHMvCvimSdIG5WAUtmo93?si=p2_pQUqpQAmuywbsfLKVQQ' },
  { title: 'Happy Land Is Tierra Feliz', cover: '/images/happy-land.jpg', link: 'https://open.spotify.com/album/5U9epD6w4kviIUgbjKkEB9?si=LKUCsQZkRtqsdi7dAr1yrA' },
  { title: 'Love Is Te Quiero', cover: '/images/love-is-te-quiero.jpg', link: 'https://open.spotify.com/artist/7F6tC1pdqBhUCi7AbfNxz6?si=o6jCJheURwKhvKy1NaoBjg' },
];
export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  if (slug === 'new-page') return <Home/>;
  const info = pageDetails[slug];
  const original = sourcePages.find(page => page.slug === slug);
  if (!info || !original) notFound();
  const texts = original.blocks.filter(block => block.type === 'text');
  const pictures = original.blocks.filter(block => block.type === 'image');
  const videos = original.blocks.filter(block => block.type === 'video');
  const booking = original.blocks.find(block => block.type === 'button' && block.href?.startsWith('mailto:'))?.href ?? 'mailto:info@gocreativeprograms.com';
  const image = info.image || pictures[0]?.src;
  const isClients = slug === 'collaborations';
  const isPress = slug === 'about-us';
  const gallery = isPress ? pictures.slice(4) : pictures;

  return <SiteFrame><main id="main-content">
    <section className={`subpage-heading wrap ${isClients ? 'clients-heading' : ''}`}><a className="breadcrumb" href="/">Home <span>/</span> {info.category}</a><span className="eyebrow">{info.category}</span><h1>{info.title}</h1>{slug === 'being-bilingual-rocks' && <p className="subpage-subtitle">Being Bilingual Rocks! with Alina Celeste & Mi Amigo Hamlet</p>}{slug === 'bbrband' && <p className="subpage-subtitle">Being Bilingual Rocks! — The BBR Band</p>}{slug === 'musicababy' && <p className="subpage-subtitle">Music · Movement · Language · Literacy</p>}{isClients && <a className="button button-green" href={booking}>{info.booking}<ArrowRight size={17}/></a>}</section>

    {isClients ? <section className="clients-body wrap"><RichText block={texts[0]}/><div className="client-logo-grid">{pictures.map(pic => <div key={pic.src}><img src={pic.src} alt={logoAlt(pic)} width="200" height="100" loading="lazy"/></div>)}</div></section> : <>
      <div className="content-layout wrap"><article className="original-article">{isPress ? <RichText block={texts.find(block=>block.text?.startsWith('BIOS'))!}/> : texts.map((block,index) => <RichText block={block} key={index}/>)}</article><aside className="program-sidebar"><div className="sidebar-sticky">{image && <figure><img src={image} alt={info.imageAlt} width="750" height="500"/>{slug === 'being-bilingual-rocks' || isPress ? <figcaption>Mi Amigo Hamlet & Alina Celeste</figcaption> : null}</figure>}<div className="booking-card"><span className="eyebrow">GOCREATIVE PROGRAMS</span><h2>{slug === 'musicababy' ? 'Class registration' : 'Booking & information'}</h2><a className="button button-green" href={booking}>{info.booking}<ArrowRight size={17}/></a><a href="mailto:info@gocreativeprograms.com"><Mail size={16}/>info@gocreativeprograms.com</a><a href="tel:+17737156999"><Phone size={16}/>773-715-6999</a></div><a href="/#music" className="sidebar-music"><Headphones size={21}/><span>Listen to the music</span><ArrowUpRight size={18}/></a></div></aside></div>
      {isPress && <><section id="discography" className="discography-section wrap"><span className="eyebrow">MI AMIGO HAMLET & ALINA CELESTE</span><h2>Discography</h2><div className="album-grid">{albums.map(album => <article key={album.title}><a href={album.link} target="_blank" rel="noreferrer"><img src={album.cover} alt={`${album.title} album cover`} width="500" height="500" loading="lazy"/><h3>{album.title}</h3><span className="text-link">Listen here <ArrowUpRight size={16}/></span></a></article>)}</div><div className="album-other-links"><a href="https://miamigohamlet.bandcamp.com" target="_blank" rel="noreferrer">Mi Amigo Hamlet on Bandcamp <ArrowUpRight size={15}/></a><a href="https://www.amazon.com/Hoy-Buen-D%C3%ADa-Amigo-Hamlet/dp/B09323R2TK/ref=sr_1_2?dchild=1&keywords=mi%20amigo%20hamlet&qid=1629670811&sr=8-2" target="_blank" rel="noreferrer">Hoy Es un Buen Día on Amazon <ArrowUpRight size={15}/></a></div></section><section className="videos-section wrap"><h2>Their YouTube channel links</h2><div className="video-grid">{videos.map((video,index) => <iframe key={index} src={video.urls?.[0]} title={`GoCreative Programs YouTube video ${index + 1}`} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>)}</div></section></>}
      {gallery.length > 0 && <section className={`gallery-section wrap ${isPress ? 'press-gallery' : ''}`}><div className="gallery-heading"><h2>{isPress ? 'Press quality photos' : `${info.title} photos`}</h2>{isPress && <p>Select a photo to open the original full-resolution image.</p>}</div><div className="original-gallery">{gallery.map((pic,index) => <a href={pic.source} key={pic.src} target="_blank" rel="noreferrer" aria-label={`Open ${isPress ? 'press photo' : info.title + ' photo'} ${index+1}`}><img src={pic.src} alt={`${isPress ? 'Mi Amigo Hamlet and Alina Celeste' : 'GoCreative ' + info.title} — photograph ${index+1}`} width="750" height="500" loading="lazy"/>{isPress && <span>Open original <ArrowUpRight size={15}/></span>}</a>)}</div></section>}
    </>}
    <section className="page-booking-section"><div className="wrap"><div><span className="eyebrow">GOCREATIVE PROGRAMS</span><h2>{slug === 'musicababy' ? 'Come learn, sing and create with us.' : 'Book us today'}</h2></div><a href={booking} className="button button-green">{info.booking}<ArrowRight size={18}/></a></div></section>
  </main></SiteFrame>;
}
