import { useState } from 'react';
import './style.css';

const REPO = 'https://github.com/duggal1/quantum-landing';
const DMG = import.meta.env.VITE_QUANTUM_DMG_URL || '';
const iconPaths = {
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M4 17v4h16v-4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  back: <path d="m15 5-7 7 7 7" />,
  forward: <path d="m9 5 7 7-7 7" />,
  reload: <><path d="M20 11a8 8 0 1 0-2.5 6" /><path d="M20 4v7h-7" /></>,
  columns: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};
function Icon({ name, size = 17 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}
function Mark({ size = 25 }) { return <img src="/quantum.svg" width={size * 2 / 3} height={size} alt="" />; }
function Apple({ size = 18 }) { return <img src="/apple.svg" width={size} height={size} alt="" />; }

const pages = [
  { name: 'Quantum', url: 'quantum.app', icon: 'Q', heading: 'Less browser. More web.', meta: 'Everything you need. Nothing you don’t.' },
  { name: 'WebKit', url: 'webkit.org', icon: 'W', heading: 'The web, without the weight.', meta: 'The engine is already on your Mac.' },
  { name: 'Notes', url: 'notes.local', icon: 'N', heading: 'A little more room to think.', meta: 'Just your tabs and the page.' },
];

function BrowserPreview() {
  const [vertical, setVertical] = useState(false);
  const [selected, setSelected] = useState(0);
  const open = [0, 1, 2];
  const [history, setHistory] = useState(false);
  const current = pages[selected] || pages[0];
  const tabs = open.map(i => <button key={i} className={`preview-tab ${selected === i ? 'active' : ''}`} onClick={() => setSelected(i)} aria-pressed={selected === i}><span className="preview-favicon">{pages[i].icon}</span><span>{pages[i].name}</span></button>);
  const addTab = () => setSelected((selected + 1) % 3);
  return <div className="preview" aria-label="Interactive Quantum interface preview">
    <div className="preview-chrome"><div className="traffic" aria-hidden="true"><i /><i /><i /></div><div className="preview-controls"><button onClick={() => setVertical(!vertical)} aria-label={vertical ? 'Use standard tabs' : 'Use vertical tabs'} title="Switch tab layout"><Icon name="columns" size={16} /></button><button onClick={() => setHistory(!history)} aria-label="Toggle history" title="History"><Icon name="menu" size={16} /></button></div></div>
    {!vertical && <div className="preview-tabs">{tabs}<button className="preview-icon-button" onClick={addTab} aria-label="New tab"><Icon name="plus" size={16} /></button></div>}
    <div className="preview-toolbar"><div className="preview-nav"><button aria-label="Back" onClick={() => setSelected(open[Math.max(0, open.indexOf(selected) - 1)])}><Icon name="back" /></button><button aria-label="Forward" onClick={() => setSelected(open[Math.min(open.length - 1, open.indexOf(selected) + 1)])}><Icon name="forward" /></button><button aria-label="Reload preview" onClick={() => setHistory(false)}><Icon name="reload" size={16} /></button></div><div className="preview-address"><span className="preview-lock" aria-hidden="true">⌁</span>{current.url}</div><div className="preview-toolbar-mark"><Mark size={18} /></div></div>
    <div className="preview-workspace">{vertical && <aside className="preview-sidebar"><div className="preview-sidebar-heading">Tabs <button onClick={addTab} aria-label="New tab"><Icon name="plus" size={15} /></button></div>{tabs}</aside>}<div className="preview-webpage">{history ? <><span className="preview-kicker">QUANTUM / HISTORY</span><h3>Recent pages.</h3><div className="preview-history">{open.map(i => <button key={i} onClick={() => { setSelected(i); setHistory(false); }}><span className="preview-favicon">{pages[i].icon}</span>{pages[i].name}<Icon name="arrow" size={14} /></button>)}</div></> : <><span className="preview-kicker">QUANTUM / MACOS</span><div className="preview-message"><Mark size={42} /><h3>{current.heading}</h3><p>{current.meta}</p></div></>}</div></div>
  </div>;
}

const features = [
  { title: <>WebKit.<br />Not another engine.</>, icon: <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M16.6364 4H9V9.05263H16.6364C17.3364 9.05263 17.9091 9.62105 17.9091 10.3158V28H23V10.3158C23 6.82947 20.1491 4 16.6364 4Z" fill="currentColor"/></svg> },
  { title: <>Tabs, however<br />you like.</>, icon: <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M9.05263 21.6842C9.05263 20.9895 9.65895 20.6484 10.3158 20.4211C13.1705 19.4484 18.8295 17.6295 21.6842 16.6316C24.9811 15.4821 28 13.8021 28 10.3158C28 6.82947 25.1705 4 21.6842 4H5.26316V9.05263H21.6842C22.3789 9.05263 22.9474 9.62105 22.9474 10.3158C22.9474 11.0105 22.3411 11.3516 21.6842 11.5789C18.8926 12.5263 13.2716 14.3579 10.3158 15.3684C7.01895 16.4926 4 18.1979 4 21.6842C4 25.1705 6.82947 28 10.3158 28H28V22.9474H10.3158C9.62105 22.9474 9.05263 22.3789 9.05263 21.6842Z" fill="currentColor"/></svg> },
  { title: <>Nothing extra.<br />Everything essential.</>, icon: <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M20.3912 13.4787H20.1026L26.075 8.47393C26.6271 8.00632 26.991 7.31122 26.991 6.52765C26.991 5.13744 25.8617 4 24.4815 4H4.39355V9.05529H17.5304L11.5705 14.0474C11.0059 14.515 10.642 15.2101 10.642 15.9937C10.642 17.3839 11.7713 18.5213 13.1515 18.5213H20.3661C21.5831 18.5213 22.5618 19.5071 22.5618 20.733C22.5618 21.9589 21.5831 22.9447 20.3661 22.9447H4.39355V28H20.3912C24.3812 28 27.6058 24.752 27.6058 20.733C27.6058 16.7141 24.3812 13.466 20.3912 13.466V13.4787Z" fill="currentColor"/></svg> },
];

const faq = [
  ['Is Quantum a 10 KB app?', '10 KB is a compressed-source target, not a verified size for the compiled macOS application.'],
  ['Does it ship a browser engine?', 'No. Quantum uses the WebKit framework already provided by macOS.'],
  ['When is the macOS download available?', 'The DMG download will appear here when a verified release is ready.'],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  return <>
    <header className="nav-wrap"><nav className="navbar" aria-label="Main navigation"><a className="brand" href="#top" onClick={() => setMenuOpen(false)}><Mark size={23} /> quantum</a><div className={`nav-links ${menuOpen ? 'open' : ''}`}><a href="#preview" onClick={() => setMenuOpen(false)}>Browser</a><a href="#features" onClick={() => setMenuOpen(false)}>Features</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></div><a className="nav-cta" href="#download">Get Quantum <Icon name="arrow" size={15}/></a><button className="nav-menu" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button></nav></header>
    <main id="top"><section className="hero content"><h1>Less browser.<br/><em>More web.</em></h1><p>A lightweight macOS browser that uses the WebKit already on your Mac.</p><div className="hero-actions"><a className="button primary" href="#download"><Apple/> Get Quantum <Icon name="arrow" size={15}/></a><a className="text-button" href="#preview">Explore <Icon name="arrow" size={15}/></a></div></section>
      <section className="showcase" id="preview"><div className="content"><div className="section-top"><h2>Just the web.</h2></div><BrowserPreview/></div></section>
      <section className="features" id="features"><div className="content"><div className="section-top"><h2>Less, but better.</h2></div><div className="feature-grid">{features.map((item, i) => <article className="feature-card" key={i}><div className="feature-icon">{item.icon}</div><h3>{item.title}</h3></article>)}</div></div></section>
      <section className="faq" id="faq"><div className="content"><div className="section-top"><h2>Simple answers.</h2></div><div className="faq-items">{faq.map(([q,a],i)=><div className="faq-item" key={q}><button aria-expanded={expanded === i} aria-controls={`faq-${i}`} onClick={() => setExpanded(expanded === i ? null : i)}>{q}<span className={expanded === i ? 'turned' : ''}><Icon name="chevron" size={19}/></span></button>{expanded === i && <p id={`faq-${i}`}>{a}</p>}</div>)}</div></div></section>
      <section className="download" id="download"><div className="content"><h2>Get Quantum.</h2><div className="download-option"><Apple size={20}/><span>macOS</span><span className="download-tag">DMG</span>{DMG ? <a className="button secondary" href={DMG} rel="noopener noreferrer"><Icon name="download" size={16}/> Download</a> : <span className="coming">Coming soon</span>}</div></div></section>
    </main><footer className="footer"><div className="content"><a className="brand" href="#top"><Mark size={20}/> quantum</a><a href={REPO} target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow" size={14}/></a></div></footer>
  </>;
}