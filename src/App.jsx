import { useEffect, useRef, useState } from 'react';

const DOWNLOAD_URL = 'https://drive.google.com/file/d/1wUu9lInMeJbx7sy9bdXzlC-V6Kib6JvB/view?usp=drivesdk';
const REPO_URL = 'https://github.com/duggal1/quantum-landing';

function Logo({ height = 24 }) {
  return <img src="/quantum.svg" width={height * (2 / 3)} height={height} alt="" />;
}

function Apple({ size = 19 }) {
  return <img src="/apple.svg" width={size} height={size} alt="" aria-hidden="true" />;
}

function Glyph({ name, size = 17 }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M4 17v4h16v-4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    play: <path d="m9 6 10 6-10 6V6Z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

// These three feature icons are taken from the design reference supplied for Quantum.
const cards = [
  {
    id: 'webkit',
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16.6364 4H9V9.05263H16.6364C17.3364 9.05263 17.9091 9.62105 17.9091 10.3158V28H23V10.3158C23 6.82947 20.1491 4 16.6364 4Z" fill="#252324" /></svg>,
    title: <>The engine’s<br />already there.</>,
    description: 'Uses the WebKit already on your Mac. No second browser engine to download or bundle.',
    titleWidth: '12ch',
    descriptionWidth: '20rem',
  },
  {
    id: 'tabs',
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M9.05263 21.6842C9.05263 20.9895 9.65895 20.6484 10.3158 20.4211C13.1705 19.4484 18.8295 17.6295 21.6842 16.6316C24.9811 15.4821 28 13.8021 28 10.3158C28 6.82947 25.1705 4 21.6842 4H5.26316V9.05263H21.6842C22.3789 9.05263 22.9474 9.62105 22.9474 10.3158C22.9474 11.0105 22.3411 11.3516 21.6842 11.5789C18.8926 12.5263 13.2716 14.3579 10.3158 15.3684C7.01895 16.4926 4 18.1979 4 21.6842C4 25.1705 6.82947 28 10.3158 28H28V22.9474H10.3158C9.62105 22.9474 9.05263 22.3789 9.05263 21.6842Z" fill="#252324" /></svg>,
    title: <>Tabs, your<br />way.</>,
    description: 'Standard tabs when you want them. A vertical sidebar when you want more room.',
    titleWidth: '12ch',
    descriptionWidth: '30ch',
  },
  {
    id: 'local',
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M20.3912 13.4787H20.1026L26.075 8.47393C26.6271 8.00632 26.991 7.31122 26.991 6.52765C26.991 5.13744 25.8617 4 24.4815 4H4.39355V9.05529H17.5304L11.5705 14.0474C11.0059 14.515 10.642 15.2101 10.642 15.9937C10.642 17.3839 11.7713 18.5213 13.1515 18.5213H20.3661C21.5831 18.5213 22.5618 19.5071 22.5618 20.733C22.5618 21.9589 21.5831 22.9447 20.3661 22.9447H4.39355V28H20.3912C24.3812 28 27.6058 24.752 27.6058 20.733C27.6058 16.7141 24.3812 13.466 20.3912 13.466V13.4787Z" fill="#252324" /></svg>,
    title: <>Only the<br />essentials.</>,
    description: 'Lightweight history and bookmarks, with WebKit handling website storage and caching.',
    titleWidth: '12ch',
    descriptionWidth: '18rem',
  },
];

const questions = [
  ['Is Quantum actually a 10 KB browser?', '10 KB is the target for the compressed source package, not a verified installed macOS app size. The downloadable source prototype ZIP is 8,660 bytes; a compiled executable and app bundle will be larger.'],
  ['Does Quantum include a browser engine?', 'It relies on the WebKit already installed with macOS, rather than bundling another copy of an engine.'],
  ['Is the download a ready-to-install app?', 'Not yet. It is a source prototype ZIP, not a signed or notarized installer. Build it with Apple’s command-line developer tools.'],
  ['Where do websites and browsing data go?', 'WebKit can manage website data and cache. History and bookmarks are lightweight local app data; no SQL server is needed.'],
];

function Header({ onDownload }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    if (!menuOpen) return;
    function escape(event) { if (event.key === 'Escape') closeMenu(); }
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [menuOpen]);

  return <header className="site-header">
    <div className="site-header__inner">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Quantum home"><Logo height={26} /><span>quantum</span></a>
      <nav className={menuOpen ? 'navigation navigation--open' : 'navigation'} aria-label="Primary">
        <a href="#film" onClick={closeMenu}>The browser</a>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <button className="navigation__mobile-download" onClick={() => { closeMenu(); onDownload(); }}>Get Quantum <Glyph name="arrow" size={15} /></button>
      </nav>
      <button className="header-download" onClick={onDownload}>Get Quantum <Glyph name="arrow" size={15} /></button>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><Glyph name={menuOpen ? 'close' : 'menu'} size={20} /></button>
    </div>
  </header>;
}

function VideoSection() {
  const [available, setAvailable] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/quantum-demo.mp4', { method: 'HEAD', signal: controller.signal })
      .then(res => { if (!controller.signal.aborted) setAvailable(res.ok && (res.headers.get('content-type') || '').startsWith('video/')); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return <section className="film-section" id="film"><div className="content-container">
    <div className="section-heading"><div className="section-label"><span className="label-square" /> The browser</div><p>One quiet window for the web.</p></div>
    <div className="film-frame">
      {available && !failed ? <video className="film-video" controls playsInline preload="metadata" aria-label="Quantum browser demonstration" onError={() => setFailed(true)}><source src="/quantum-demo.mp4" type="video/mp4" />Your browser cannot play this video.</video> : <div className="film-placeholder">
        <div className="film-placeholder__corner"><Logo height={22} /><span>quantum</span></div>
        <div className="film-placeholder__center"><div className="film-placeholder__play"><Glyph name="play" size={24} /></div><h2>A little less.<br /><em>A lot more room.</em></h2><p>Browser film coming soon.</p></div>
        <div className="film-placeholder__bottom"><span>01 / PRODUCT FILM</span><span>MADE FOR MACOS</span></div>
      </div>}
    </div>
    <p className="film-caption">Your video goes here. Add <code>public/quantum-demo.mp4</code> to replace this placeholder automatically.</p>
  </div></section>;
}

function FeatureCards() {
  return <section id="features" className="feature-cards"><div className="feature-cards__padding"><div className="feature-cards__container">
    <div className="section-heading"><div className="section-label"><span className="label-square" /> What matters</div><h2>Small in size.<br /><span>Not in purpose.</span></h2></div>
    <div className="feature-cards__grid">{cards.map(card => <article className="feature-card" key={card.id}>
      <div className="feature-card__icon">{card.icon}</div>
      <div className="feature-card__icon-spacer" aria-hidden="true" />
      <div className="feature-card__content"><h3 className="feature-card__heading" style={{ maxWidth: card.titleWidth }}>{card.title}</h3><div className="feature-card__decoration-space" aria-hidden="true" /><p className="feature-card__description" style={{ maxWidth: card.descriptionWidth }}>{card.description}</p></div>
    </article>)}</div>
  </div></div></section>;
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return <section id="faq" className="home-faq"><div className="home-faq-container">
    <div className="home-faq-heading-grid"><div className="home-faq-category"><span className="home-faq-category-square" /> Frequently asked</div><div className="home-faq-heading-wrapper"><h2 className="home-faq-heading">Little browser.<br />Straight answers.</h2></div></div>
    <div className="home-faq-divider" />
    <div className="home-faq-content-grid"><div className="home-faq-accordion-wrapper"><div className="faq-accordion">
      {questions.map(([question, answer], index) => <div className={openIndex === index ? 'faq-accordion-item is-open' : 'faq-accordion-item'} key={question}>
        <h3 className="faq-question-heading"><button className="faq-accordion-trigger" aria-expanded={openIndex === index} aria-controls={'faq-panel-' + index} onClick={() => setOpenIndex(openIndex === index ? null : index)}><span className="faq-accordion-question">{question}</span><span className="faq-accordion-chevron"><Glyph name="chevron" size={20} /></span></button></h3>
        {openIndex === index && <div id={'faq-panel-' + index} className="faq-accordion-panel"><div className="faq-accordion-panel-inner"><p className="faq-accordion-answer">{answer}</p></div></div>}
      </div>)}
    </div></div></div>
  </div></section>;
}

function DownloadDialog({ onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    function onKey(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusable = [...ref.current.querySelectorAll('button, a[href]')];
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKey); previousFocus?.focus?.(); };
  }, [onClose]);
  return <div className="auth-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="download-title" tabIndex={-1} ref={ref}>
      <button className="auth-dialog-close" aria-label="Close download dialog" onClick={onClose}><Glyph name="close" size={17} /></button>
      <Logo height={29} />
      <div className="auth-dialog-head"><h2 id="download-title">Get Quantum.</h2><p>A smaller way to browse.</p></div>
      <div className="auth-dialog-body"><a className="auth-google-button" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"><Apple size={19} /> Download source ZIP <Glyph name="arrow" size={15} /></a><p className="dialog-detail">macOS · 8,660-byte compressed source prototype</p></div>
      <div className="auth-dialog-foot"><Glyph name="download" size={17} /><span>This is source code, not a compiled or notarized macOS app. Build it with Apple’s command-line developer tools.</span></div>
    </div>
  </div>;
}

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const onClose = () => setDownloadOpen(false);
  return <>
    <Header onDownload={() => setDownloadOpen(true)} />
    <main id="top">
      <section className="hero"><div className="content-container">
        <div className="hero-eyebrow"><span className="label-square" /> QUANTUM FOR MACOS</div>
        <div className="hero-grid"><div><h1>Less browser.<br /><em>More web.</em></h1><p className="hero-description">A tiny browser that gets out of your way. Built around the WebKit already on your Mac.</p><div className="hero-actions"><button className="primary-button" onClick={() => setDownloadOpen(true)}><Apple size={18} /> Get Quantum <Glyph name="arrow" size={16} /></button><a className="text-link" href="#film">See the browser <Glyph name="arrow" size={16} /></a></div><p className="hero-footnote">macOS only · Source prototype available</p></div><div className="hero-aside"><Logo height={65} /><p>The browser should never be bigger than what you’re browsing.</p></div></div>
      </div></section>
      <VideoSection />
      <FeatureCards />
      <FAQ />
      <section className="download-section" id="download"><div className="download-container"><div className="download-heading"><div className="section-label"><span className="label-square" /> For macOS</div><h2>Take up less space.</h2><p>Start with the lightweight Quantum source prototype.</p></div><div className="download-card"><div className="download-platform"><Apple size={19} /><span>macOS</span></div><a className="download-file" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"><span className="download-file__left"><Apple size={18} /><strong>Quantum source</strong><small>.ZIP</small></span><Glyph name="download" size={17} /></a><p className="download-note">8,660 bytes compressed. Requires local compilation. Not a prebuilt app.</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="content-container footer-inner"><a className="brand" href="#top"><Logo height={24} /><span>quantum</span></a><p>Less browser. More web.</p><a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub <Glyph name="arrow" size={14} /></a></div></footer>
    {downloadOpen && <DownloadDialog onClose={onClose} />}
  </>;
}
