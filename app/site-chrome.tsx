'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUp, ArrowUpRight, Camera, Headphones, Mail, Menu, Pause, Phone, Play, SquarePlay, X } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Classes', children: [{ label: 'MúsicaBaby', href: '/musicababy' }, { label: 'Educational Workshops', href: '/business-solutions' }] },
  { label: 'Music', children: [{ label: 'Alina and Hamlet Duo', href: '/being-bilingual-rocks' }, { label: 'Full Band', href: '/bbrband' }] },
  { label: 'Art', children: [{ label: 'Art Workshops', href: '/new-page-2' }] },
  { label: 'Our Clients', href: '/collaborations' },
  { label: 'Press', href: '/about-us' },
];
export function Brand() {
  return <a href="/" className="brand" aria-label="GoCreative Programs home"><span className="brand-flower" aria-hidden="true">✳</span><span>go<span className="brand-creative">creative</span><small>PROGRAMS</small></span></a>;
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, []);
  return <><a className="skip-link" href="#main-content">Skip to content</a><div className="hello-bar">Bilingual music & arts programs <span aria-hidden="true">✳</span> Chicago & nationwide</div><header className="site-header wrap"><Brand/><NavigationMenu viewport={false} className="full-navigation" aria-label="Main navigation"><NavigationMenuList>{navigation.map(item => <NavigationMenuItem key={item.label}>{item.children ? <><NavigationMenuTrigger>{item.label}</NavigationMenuTrigger><NavigationMenuContent className="nav-dropdown">{item.children.map(child => <NavigationMenuLink href={child.href} key={child.href}>{child.label}<ArrowRight size={15}/></NavigationMenuLink>)}</NavigationMenuContent></> : <NavigationMenuLink href={item.href} className="nav-direct">{item.label}</NavigationMenuLink>}</NavigationMenuItem>)}</NavigationMenuList></NavigationMenu><div className="header-actions"><a href="mailto:info@gocreativeprograms.com?bcc=hamlet%40gocreativeprograms.com" className="button button-green header-cta">Book a program <ArrowRight size={16}/></a><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => item.children ? <div className="mobile-nav-group" key={item.label}><span>{item.label}</span>{item.children.map(child => <a href={child.href} key={child.href}>{child.label}<ArrowRight size={16}/></a>)}</div> : <a href={item.href} key={item.label}>{item.label}<ArrowRight size={16}/></a>)}<a className="mobile-booking" href="mailto:info@gocreativeprograms.com">Book a program<Mail size={16}/></a></nav>}</header></>;
}
export function SiteFooter({ motionPaused, onMotionChange }: { motionPaused: boolean; onMotionChange: () => void }) {
  return <footer className="site-footer wrap"><div className="footer-top"><div><Brand/><p className="footer-location">Chicago, Illinois · Programs nationwide</p></div><div className="footer-links"><a href="/musicababy">MúsicaBaby</a><a href="/business-solutions">Educational Workshops</a><a href="/being-bilingual-rocks">Alina and Hamlet Duo</a><a href="/bbrband">Full Band</a><a href="/new-page-2">Art Workshops</a><a href="/collaborations">Our Clients</a><a href="/about-us">Press & photos</a><a href="/#music">Listen to the music</a></div><div className="footer-contact"><a href="tel:+17737156999"><Phone size={15}/>773-715-6999</a><a href="mailto:info@gocreativeprograms.com"><Mail size={15}/>Email us</a><div className="social-links"><a href="https://www.instagram.com/miamigohamlet/" target="_blank" rel="noreferrer" aria-label="Mi Amigo Hamlet on Instagram"><Camera size={19}/></a><a href="https://www.youtube.com/user/AlinaCelesteMusic" target="_blank" rel="noreferrer" aria-label="Alina Celeste on YouTube"><SquarePlay size={21}/></a><a href="https://open.spotify.com/artist/6O5HpUvcbfhu4RRDsQB4XQ" target="_blank" rel="noreferrer" aria-label="Mi Amigo Hamlet on Spotify"><Headphones size={19}/></a><a href="https://music.apple.com/us/artist/alina-celeste/542029458" target="_blank" rel="noreferrer" aria-label="Alina Celeste on Apple Music"><ArrowUpRight size={19}/></a></div></div></div><div className="footer-bottom"><div><p>© {new Date().getFullYear()} GoCreative Programs, LLC. All rights reserved.</p><address>2013 West Superior Street, Chicago, IL 60612, United States</address></div><button onClick={onMotionChange} className="motion-control">{motionPaused ? <Play size={12}/> : <Pause size={12}/>} {motionPaused ? 'Enable animations' : 'Pause animations'}</button><a className="back-top" href="#top">Back to top <ArrowUp size={15}/></a></div></footer>;
}
export function SiteFrame({ children }: { children: ReactNode }) {
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => { setMotionPaused(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  return <div id="top" className={`site source-page ${motionPaused ? 'motion-paused' : ''}`}><SiteHeader/>{children}<SiteFooter motionPaused={motionPaused} onMotionChange={() => setMotionPaused(!motionPaused)}/></div>;
}
