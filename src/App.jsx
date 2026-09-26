import React, { useEffect, useState } from 'react';
import './style.css';

const DMG = 'https://github.com/duggal1/quantum/releases/download/v0.3.0/Quantum.dmg';
const REPO = 'https://github.com/duggal1/quantum';
const VIDEO = 'https://streamable.com/e/6oaunu?autoplay=1&nocontrols=1&muted=1';

function Mark({ size = 24 }) {
  return <img src="/quantum.svg" width={size * 2 / 3} height={size} alt="" />;
}
function Apple({ size = 17 }) {
  return <img src="/apple.svg" width={size} height={size} alt="" />;
}
function Arrow({ size = 17 }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"/></svg>;
}
function MenuIcon({ close = false }) {
  return close
    ? <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.55" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>
    : <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.55" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>;
}
function Chevron({ size = 20 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>;
}
function GitHubIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"/></svg>;
}

const features = [
  { id: 'web', title: <>WebKit.<br />Nothing bundled.</>, icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16.6364 4H9V9.05263H16.6364C17.3364 9.05263 17.9091 9.62105 17.9091 10.3158V28H23V10.3158C23 6.82947 20.1491 4 16.6364 4Z" fill="currentColor"/></svg> },
  { id: 'tabs', title: <>Tabs, your<br />way.</>, icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M9.05263 21.6842C9.05263 20.9895 9.65895 20.6484 10.3158 20.4211C13.1705 19.4484 18.8295 17.6295 21.6842 16.6316C24.9811 15.4821 28 13.8021 28 10.3158C28 6.82947 25.1705 4 21.6842 4H5.26316V9.05263H21.6842C22.3789 9.05263 22.9474 9.62105 22.9474 10.3158C22.9474 11.0105 22.3411 11.3516 21.6842 11.5789C18.8926 12.5263 13.2716 14.3579 10.3158 15.3684C7.01895 16.4926 4 18.1979 4 21.6842C4 25.1705 6.82947 28 10.3158 28H28V22.9474H10.3158C9.62105 22.9474 9.05263 22.3789 9.05263 21.6842Z" fill="currentColor"/></svg> },
  { id: 'weight', title: <>150 KB.<br />The whole DMG.</>, icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M20.3912 13.4787H20.1026L26.075 8.47393C26.6271 8.00632 26.991 7.31122 26.991 6.52765C26.991 5.13744 25.8617 4 24.4815 4H4.39355V9.05529H17.5304L11.5705 14.0474C11.0059 14.515 10.642 15.2101 10.642 15.9937C10.642 17.3839 11.7713 18.5213 13.1515 18.5213H20.3661C21.5831 18.5213 22.5618 19.5071 22.5618 20.733C22.5618 21.9589 21.5831 22.9447 20.3661 22.9447H4.39355V28H20.3912C24.3812 28 27.6058 24.752 27.6058 20.733C27.6058 16.7141 24.3812 13.466 20.3912 13.466V13.4787Z" fill="currentColor"/></svg> },
];

const faqs = [
  ['How small is Quantum?', 'The v0.3.0 DMG is approximately 150 KB. The executable is 217,168 bytes.'],
  ['Does Quantum bundle a web engine?', 'No. Quantum uses the WebKit already installed on macOS.'],
  ['Can I use vertical tabs?', 'Yes. Switch between standard tabs and a vertical sidebar.'],
  ['Does Quantum remember websites?', 'WebKit keeps website data and HTTP cache. Quantum also stores pins and browsing history locally.'],
  ['Which Macs are supported?', 'Apple Silicon, running macOS 15 or later.'],
  ['What if macOS blocks the first launch?', 'Open System Settings → Privacy & Security → Open Anyway after the first launch attempt.'],
];

function DownloadButton({ className = '', children = 'Get Quantum' }) {
  return <a className={`button primary ${className}`} href={DMG} aria-label="Download Quantum v0.3.0 for Apple Silicon, approximately 150 KB"><Apple />{children}<Arrow size={17}/></a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [desktopExpanded, setDesktopExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return <>
    <header className="nav-wrap">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}><Mark /> quantum</a>
        <div className={`nav-desktop-shell ${scrolled ? 'compact' : ''} ${desktopExpanded ? 'expanded' : ''}`}>
          <button className="nav-collapse" type="button" aria-label="Expand navigation" aria-expanded={desktopExpanded} onClick={() => setDesktopExpanded(!desktopExpanded)}><MenuIcon /></button>
          <div className="nav-links"><a href="#video">Demo</a><a href="#features">Features</a><a href="#faq">FAQ</a></div>
          <a className="nav-cta" href={DMG}><Apple size={16}/>Get Quantum<Arrow size={16}/></a>
        </div>
        <div className="nav-mobile-actions"><a className="nav-cta" href={DMG}><Apple size={16}/>Get Quantum<Arrow size={16}/></a><button className="nav-menu" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MenuIcon close={menuOpen}/></button></div>
      </nav>
      <div className={`nav-mobile-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-overlay-inner"><div className="mobile-overlay-top"><Mark /><button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><MenuIcon close/></button></div><div className="mobile-overlay-links"><a href="#video" onClick={() => setMenuOpen(false)}>Demo</a><a href="#features" onClick={() => setMenuOpen(false)}>Features</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a><a href={DMG} onClick={() => setMenuOpen(false)}>Get Quantum <Arrow size={16}/></a></div></div>
      </div>
    </header>
    <main id="top">
      <section className="hero content" aria-labelledby="hero-title">
        <div className="hero-top"><h1 id="hero-title">Less browser.<br/><em>More web.</em></h1><p>A tiny macOS browser built around the WebKit already on your Mac.</p></div>
        <div className="hero-actions"><DownloadButton/><span className="size-note">SIZE - 150 KB DMG</span></div>
      </section>
      <section className="showcase" id="video" aria-label="Quantum browser demo">
        <div className="content"><div className="video-frame"><iframe title="Quantum browser demo" src={VIDEO} allow="fullscreen;autoplay" allowFullScreen loading="eager" referrerPolicy="strict-origin-when-cross-origin" /></div></div>
      </section>
      <section className="feature-cards" id="features"><div className="content"><div className="section-top"><h2>Less, but better.</h2></div><div className="feature-cards__grid">{features.map(item => <article key={item.id} className="feature-card"><div className="feature-card__icon">{item.icon}</div><div className="feature-card__icon-spacer" aria-hidden="true"/><h3 className="feature-card__heading">{item.title}</h3></article>)}</div></div></section>
      <section className="faq home-faq" id="faq"><div className="content"><div className="section-top"><h2>Simple answers.</h2></div><div className="faq-items">{faqs.map(([question, answer], i) => <div className="faq-item" key={question}><button type="button" aria-expanded={expanded === i} aria-controls={`faq-${i}`} onClick={() => setExpanded(expanded === i ? null : i)}>{question}<span className={expanded === i ? 'turned' : ''}><Chevron/></span></button>{expanded === i && <p id={`faq-${i}`}>{answer}</p>}</div>)}</div></div></section>
      <section className="download" id="download"><div className="content"><h2>Get Quantum.</h2><div className="download-option"><Apple size={20}/><span>macOS · Apple Silicon</span><span className="download-tag">150 KB DMG</span><DownloadButton className="download-final" children="Download"/></div><div className="install-card"><Apple size={16}/><span>macOS 15+ · First launch: System Settings → Privacy & Security → Open Anyway.</span></div></div></section>
    </main>
    <footer className="footer"><div className="content"><a className="brand" href="#top"><Mark size={20}/> quantum</a><a href={REPO} target="_blank" rel="noopener noreferrer"><GitHubIcon size={16}/>GitHub</a></div></footer>
  </>;
}