'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Award, BookOpen, Heart, Headphones, LoaderCircle, Music2, Pause, Play, SkipBack, SkipForward, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { SiteHeader, SiteFooter } from './site-chrome';
import TrustedBy from './trusted-by';
import tracks from './tracks.json';


const email = 'mailto:info@gocreativeprograms.com';
const spotify = 'https://open.spotify.com/artist/6O5HpUvcbfhu4RRDsQB4XQ';
const timeLabel = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
export default function Home() {
  const [motionPaused, setMotionPaused] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.7);
  const [audioError, setAudioError] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const track = tracks[trackIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionPaused(reducedMotion.matches);
    const updateMotion = () => setMotionPaused(reducedMotion.matches);
    reducedMotion.addEventListener('change', updateMotion);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
    return () => { observer.disconnect(); reducedMotion.removeEventListener('change', updateMotion); };
  }, []);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
  const stopPlayback = () => { playRequest.current += 1; audioRef.current?.pause(); setIsPlaying(false); setIsLoading(false); };
  const playTrack = async (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    setAudioError(''); setIsLoading(true); setHasStarted(true);
    if (audio.src !== tracks[index].src) {
      audio.pause(); audio.src = tracks[index].src; audio.load(); setCurrentTime(0); setDuration(30);
    } else if (audio.ended) audio.currentTime = 0;
    setTrackIndex(index);
    audio.volume = volume;
    try { await audio.play(); if (playRequest.current === request) { setIsPlaying(true); setIsLoading(false); } }
    catch (error) {
      if (playRequest.current === request && !(error instanceof DOMException && error.name === 'AbortError')) {
        setAudioError('This preview couldn’t load. Try again, or listen on Apple Music.'); setIsPlaying(false); setIsLoading(false);
      }
    }
  };
  const toggleTrack = () => { if (isPlaying || isLoading) stopPlayback(); else void playTrack(trackIndex); };
  const selectTrack = (index: number) => { if (index === trackIndex && (isPlaying || isLoading)) stopPlayback(); else void playTrack(index); };
  const seek = (values: number[]) => { const value = values[0]; if (audioRef.current && Number.isFinite(audioRef.current.duration)) { audioRef.current.currentTime = value; setCurrentTime(value); } };
  const previousTrack = () => {
    if (audioRef.current && currentTime > 3) { audioRef.current.currentTime = 0; setCurrentTime(0); }
    else void playTrack((trackIndex - 1 + tracks.length) % tracks.length);
  };
  const listenFromHero = () => { void playTrack(trackIndex); document.getElementById('music')?.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' }); };
  const PlayIcon = isLoading ? LoaderCircle : isPlaying ? Pause : Play;
  const playLabel = isLoading ? 'Cancel loading' : isPlaying ? 'Pause song' : `Play ${track.title}`;

  return <div id="top" className={motionPaused ? 'site motion-paused' : 'site'}>
    <SiteHeader/>
    <main id="main-content">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow"><span className="mini-spark" aria-hidden="true">✳</span> GOCREATIVE PROGRAMS</span>
          <h1 id="hero-title">Bilingual education<br/>through <span className="hero-emphasis">music, art</span><br/>& creative learning.</h1>
          <p>For over 25 years, GoCreative Programs has helped children, families, schools, libraries, and communities learn through bilingual music, art, movement, storytelling, and hands-on creative experiences.</p>
          <div className="hero-actions"><a href="#programs" className="button button-green">Our programs <ArrowRight size={18}/></a><button className="listen-link" onClick={listenFromHero}><span><Play size={14} fill="currentColor"/></span>Listen to the music</button></div>
          <div className="hero-footnote"><Heart size={16}/><span>Chicago, Illinois · Programs nationwide</span></div>
        </div>
        <div className="hero-collage">
          <div className="hello-sticker" aria-hidden="true">¡Hola,<br/><em>hello!</em></div>
          <Music2 className="floating-note note-one" size={47} strokeWidth={1.6} aria-hidden="true"/>
          <figure className="hero-photo"><span className="photo-tape" aria-hidden="true"/><img src="/images/hamlet-and-alina.jpg" alt="Alina Celeste and Mi Amigo Hamlet sharing a laugh with their guitars" width="750" height="500" fetchPriority="high"/><figcaption>Mi Amigo Hamlet & Alina Celeste <Heart size={19}/></figcaption></figure>
          <div className="years-sticker"><strong>25+</strong><span>YEARS OF<br/>BILINGUAL PROGRAMS</span></div>
          <Sparkles className="floating-note note-two" size={43} strokeWidth={1.4} aria-hidden="true"/>
        </div>
      </section>
      <div className="joy-ribbon" aria-label="Learn. Sing. Create."><div className="ribbon-track" aria-hidden="true">{[0,1].map(i => <div className="ribbon-copy" key={i}>Learn. <span>✳</span> Sing. <span>♫</span> Create. <span>✳</span> Learn. <span>♫</span> Sing. <span>✳</span> Create. <span>♫</span></div>)}</div><button className="ribbon-pause" onClick={() => setMotionPaused(!motionPaused)} aria-label={motionPaused ? 'Enable animations' : 'Pause animations'} title={motionPaused ? 'Enable animations' : 'Pause animations'}>{motionPaused ? <Play size={13}/> : <Pause size={13}/>}</button></div>

      <TrustedBy/>
      <section id="programs" className="programs-section wrap" aria-labelledby="programs-title">
        <div data-reveal><span className="eyebrow">CLASSES · MUSIC · ART</span><h2 id="programs-title">Our programs</h2><p className="section-description">We create engaging English-Spanish programs that inspire language development, creativity, confidence, cultural connection, and joyful learning.</p></div>
        <div className="program-grid">
          <article className="program-card concert-card" data-reveal><div className="program-image"><img src="/images/live-concert.jpg" alt="Families gathered in a park for a bilingual concert" width="750" height="462" loading="lazy"/><span className="program-pill">CONCERTS & PERFORMANCES</span></div><div className="program-copy"><span className="program-number">01 / MUSIC</span><h3>Being Bilingual<br/>Rocks!</h3><p>Concerts and creative bilingual experiences nationwide for libraries, preschools, school districts, festivals, park districts, and more.</p><a href="/being-bilingual-rocks" className="card-link">Alina and Hamlet Duo <ArrowUpRight size={20}/></a></div></article>
          <article className="program-card baby-card" data-reveal><div className="program-image"><img src="/images/little-listeners.jpg" alt="A toddler discovering music at a family performance" width="750" height="420" loading="lazy"/><span className="program-pill">AGES 1–3 · CAREGIVER + CHILD</span></div><div className="program-copy"><span className="program-number">02 / CLASSES</span><h3>MúsicaBaby</h3><p>Live bilingual music, movement, repetition, literacy, and purposeful play for children and their caregivers.</p><a href="/musicababy" className="card-link">Classes & registration <ArrowUpRight size={20}/></a></div></article>
          <article className="program-card art-card" data-reveal><div className="program-image"><img src="/images/creative-hands.jpg" alt="Young artists making colorful paper collages" width="750" height="422" loading="lazy"/><span className="program-pill">BILINGUAL ART WORKSHOPS</span></div><div className="program-copy"><span className="program-number">03 / ART</span><h3>Art Workshops</h3><p>Family art, musical story hours, Arts Español videos, and paper mosaics. Learn and practice Spanish while creating together.</p><a href="/new-page-2" className="card-link">View art workshops <ArrowUpRight size={20}/></a></div></article>
        </div>
        <div className="educators-banner" data-reveal><div className="educator-icon"><BookOpen size={29} strokeWidth={1.4}/></div><div><h3>Educational Workshops</h3><p>Professional development, music and Spanish curricula, and bilingual resources for educators.</p></div><a href="/business-solutions" className="text-link">View workshops <ArrowRight size={18}/></a></div>
      </section>

      <section id="music" className="music-section" aria-labelledby="music-title">
        <div className="wrap">
          <div className="music-heading" data-reveal><div><span className="eyebrow"><Headphones size={16}/> BILINGUAL MUSIC FOR CHILDREN & FAMILIES</span><h2 id="music-title">Music by<br/><em>Mi Amigo Hamlet.</em></h2></div><a href="/about-us#discography" className="music-discography-link">View discography <ArrowUpRight size={18}/></a></div>
          <div className={`music-player ${isPlaying ? 'is-playing' : ''}`} data-reveal>
            <div className="player-topline"><span><Music2 size={16}/> LISTEN TO THE MUSIC</span><span>MI AMIGO HAMLET & ALINA CELESTE</span></div>
            <div className="player-grid">
              <div className="now-playing">
                <div className="album-wrap"><img key={track.cover} className="album-cover" src={track.cover} alt={`${track.album} album artwork`} width="750" height="750" loading="lazy"/><span className="album-sticker"><Heart size={16}/> MI AMIGO HAMLET</span></div>
                <div className="current-track"><span className="now-playing-label">{isPlaying ? 'NOW PLAYING' : isLoading ? 'LOADING PREVIEW' : 'SELECTED TRACK'}</span><h3>{track.title}</h3><p>{track.artist}</p></div>
                <div className="seek-row"><span>{timeLabel(currentTime)}</span><Slider ref={element => { element?.querySelector('[role="slider"]')?.setAttribute('aria-label', 'Song position'); }} className="song-slider" aria-label="Song position" min={0} max={duration || 30} step={0.1} value={[currentTime]} onValueChange={seek} disabled={!hasStarted || !!audioError}/><span>{timeLabel(duration)}</span></div>
                <div className="playback-controls"><button aria-label="Previous song" onClick={previousTrack} className="icon-button"><SkipBack size={20} fill="currentColor"/></button><button className="main-play" onClick={toggleTrack} aria-label={playLabel}><PlayIcon className={isLoading ? 'loading-spinner' : ''} size={25} fill={isLoading ? 'none' : 'currentColor'}/></button><button aria-label="Next song" onClick={() => void playTrack((trackIndex + 1) % tracks.length)} className="icon-button"><SkipForward size={20} fill="currentColor"/></button></div>
              </div>
              <div className="playlist-panel"><div className="playlist-intro"><span className="eyebrow">SONG PREVIEWS</span><p>Selected recordings</p></div><ol className="playlist">{tracks.map((song, index) => <li key={song.src}><button className={`track-row ${index === trackIndex ? 'selected' : ''}`} aria-label={`${index === trackIndex && isPlaying ? 'Pause' : 'Play'} ${song.title} preview`} aria-pressed={index === trackIndex && isPlaying} onClick={() => selectTrack(index)}><span className="track-number">{index === trackIndex && isPlaying ? <span className="equalizer" aria-hidden="true"><i/><i/><i/></span> : String(index + 1).padStart(2, '0')}</span><span className="track-info"><strong>{song.title}</strong><small>{index === 1 ? 'Bilingual version · feat. Alina Celeste' : song.album}</small></span><span className="track-play">{index === trackIndex && isPlaying ? <Pause size={17}/> : <Play size={17}/>}</span></button></li>)}</ol><div className="playlist-bottom"><div className="volume-control"><button className="icon-button" aria-label={volume === 0 ? 'Unmute music' : 'Mute music'} onClick={() => setVolume(volume === 0 ? 0.7 : 0)}>{volume === 0 ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button><Slider ref={element => { element?.querySelector('[role="slider"]')?.setAttribute('aria-label', 'Volume'); }} aria-label="Volume" className="volume-slider" min={0} max={1} step={0.05} value={[volume]} onValueChange={v => setVolume(v[0])}/></div><span>SONG PREVIEWS</span></div><p className="preview-credit">Music previews courtesy of Apple Music.<br/><a href={track.appleUrl} target="_blank" rel="noreferrer">Hear the full song <ArrowUpRight size={13}/></a></p></div>
            </div>
            <div className="player-message" aria-live="polite">{audioError && <p role="alert">{audioError} <button onClick={() => void playTrack(trackIndex)}>Try again</button></p>}</div>
          </div>
          <div className="streaming-links"><span>Also available on</span><a href={spotify} target="_blank" rel="noreferrer">Spotify <ArrowUpRight size={15}/></a><a href="https://music.apple.com/us/artist/mi-amigo-hamlet/1411115393" target="_blank" rel="noreferrer">Apple Music <ArrowUpRight size={15}/></a><a href="https://www.youtube.com/user/AlinaCelesteMusic" target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={15}/></a></div>
        </div>
        <audio ref={audioRef} src={tracks[0].src} preload="none" onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={e => { if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration); }} onPlaying={() => { setIsPlaying(true); setIsLoading(false); }} onPause={() => setIsPlaying(false)} onWaiting={e => { if (!e.currentTarget.paused) setIsLoading(true); }} onEnded={() => { if (trackIndex < tracks.length - 1) void playTrack(trackIndex + 1); else { setIsPlaying(false); setIsLoading(false); } }} onError={() => { if (hasStarted) { setAudioError('This preview couldn’t load. Try again, or listen on Apple Music.'); setIsLoading(false); setIsPlaying(false); } }}/>
      </section>

      <section id="about" className="about-section wrap" aria-labelledby="about-title">
        <div className="about-photo-area" data-reveal><figure className="about-photo"><img src="/images/meet-the-duo.jpg" alt="Mi Amigo Hamlet and Alina Celeste smiling together with their guitars" width="750" height="500" loading="lazy"/><figcaption>Mi Amigo Hamlet & Alina Celeste</figcaption></figure><div className="award-badge"><Award size={25}/><span>PARENTS’ CHOICE<br/><strong>Gold Award Winners</strong></span></div><span className="about-spark" aria-hidden="true">✳</span></div>
        <div className="about-copy" data-reveal><span className="eyebrow">ABOUT US</span><h2 id="about-title">Alina Celeste &<br/><em>Mi Amigo Hamlet.</em></h2><p className="about-intro">Parents’ Choice Gold Award winners for bilingual music for kids and families.</p><p>Guatemalan-born multimedia artist Hamlet has provided bilingual arts and music programs in the Chicagoland area since 2001. Cuban-American Alina Celeste has taught early childhood music and arts classes and toured internationally since 2009.</p><p>Together, they tour nationwide with Being Bilingual Rocks! concerts, professional development workshops for educators and librarians, and art workshops for families.</p><a href="/about-us" className="text-link">Bios, music & press photos <ArrowRight size={18}/></a></div>
      </section>

      <section className="mission-section" aria-labelledby="mission-title"><div className="wrap mission-original"><div><span className="eyebrow">GOCREATIVE PROGRAMS</span><h2 id="mission-title">Our mission</h2><p>GoCreative Programs’ mission is to foster community through bilingualism and the arts, in collaboration with artists, educators, parents, businesses and organizations that share our mission.</p></div><div><h2>Our vision</h2><p>Our vision is to be the leading organization trusted by libraries, school districts, festivals, artists, nonprofits, businesses, and communities nationwide for delivering exceptional bilingual programs through art and music.</p><p>We look forward to working with you and making our bilingual world a better one everywhere we go!</p></div></div></section>
      <section className="programs-for wrap"><h2>Programs for</h2><ul><li>Schools & Early Childhood Centers</li><li>Libraries & Museums</li><li>Park Districts & Community Events</li><li>Family Programs & Concerts</li><li>Professional Development Workshops</li></ul></section>
      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="wrap contact-inner" data-reveal><Music2 className="contact-note left" size={60} strokeWidth={1.1} aria-hidden="true"/><span className="eyebrow">GOCREATIVE PROGRAMS</span><h2 id="contact-title">Book a <em>program.</em></h2><p>Contact us for classes, concerts, art workshops,<br className="desktop-break"/> and professional development.</p><a className="button button-green contact-button" href={`${email}?subject=GoCreative%20program%20inquiry`}>Email us <ArrowRight size={19}/></a><a className="contact-email" href={email}>info@gocreativeprograms.com</a><a className="contact-phone" href="tel:+17737156999">773-715-6999</a><Sparkles className="contact-note right" size={64} strokeWidth={1.1} aria-hidden="true"/></div></section>
    </main>

    <SiteFooter motionPaused={motionPaused} onMotionChange={() => setMotionPaused(!motionPaused)}/>
  </div>;
}
