import { useEffect, useState } from 'react';
import { ALBUMS, GALLERY_PHOTOS, TRIVIA_QUESTIONS } from './data';
import {
  initTrivia,
  nextQuestion,
  retryTrivia,
  openShareModal,
  closeShareModal,
  generateCard,
  downloadCard,
  activatePogo,
  openLightbox,
  closeLightbox,
} from './utils';

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'Los fans despiden al Indio en Olavarría',
    date: 'Junio 2025',
    excerpt: 'Miles de ricoteros se reunieron en el lugar del recital más grande.',
    img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Una multitud silenciosa colocó velas y banderas. El Indio ya es leyenda.'
  },
  {
    id: 2,
    title: 'Se reedita Luzbelito en vinilo de lujo',
    date: 'Mayo 2025',
    excerpt: 'La obra maestra de 1996 vuelve en edición remasterizada.',
    img: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Tres discos de vinilo y libro de arte. Edición de coleccionista.'
  },
  {
    id: 3,
    title: 'El archivo gráfico del Indio será museo',
    date: 'Abril 2025',
    excerpt: 'Tapas y afiches al Museo de Bellas Artes de La Plata.',
    img: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Iconografía donada como patrimonio artístico nacional.'
  },
  {
    id: 4,
    title: 'Las cartas del Indio a Skay serán publicadas',
    date: 'Marzo 2025',
    excerpt: 'Documentos de 18 años de amistad y creación.',
    img: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Más de 200 cartas revelan la génesis de los himnos.'
  },
  {
    id: 5,
    title: 'Documental del show de Mar del Plata 1998',
    date: 'Febrero 2025',
    excerpt: 'Material inédito en restauración 4K.',
    img: 'https://images.pexels.com/photos/2399097/pexels-photo-2399097.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Cámaras caseras y audio de consola se unen en un documental mítico.'
  },
  {
    id: 6,
    title: 'Escuela de música popular llevará su nombre',
    date: 'Enero 2025',
    excerpt: 'Primera escuela pública de rock en La Plata.',
    img: 'https://images.pexels.com/photos/144428/pexels-photo-144428.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Formación gratuita para jóvenes. "Que sepan que se puede".'
  }
];

export default function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(ALBUMS[0]);
  const [activeNews, setActiveNews] = useState<number | null>(null);

  useEffect(() => {
    initTrivia();

    const lb = document.getElementById('lightbox');
    lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

    const modal = document.getElementById('share-modal');
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeShareModal(); });
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <span className="nav-logo">El Indio</span>
        <ul className="nav-links">
          <li><a href="#hero-panel">Inicio</a></li>
          <li><a href="#bio-panel">Biografía</a></li>
          <li><a href="#disco-panel">Discos</a></li>
          <li><a href="#gallery-panel">Fotos</a></li>
          <li><a href="#news-panel">Noticias</a></li>
          <li><a href="#trivia-panel">Trivia</a></li>
        </ul>
      </nav>

      {/* ── FIXED POGO BUTTON ── */}
      <div className="pogo-fixed-btn">
        <button className="btn-pogo-fixed" onClick={activatePogo}>
          ACTIVÁ EL POGO WEB MÁS GRANDE DEL MUNDO
        </button>
      </div>
      <div className="pogo-countdown-fixed" id="pogo-countdown">¡POGO! 20s</div>

      {/* ── HORIZONTAL SCROLL WRAPPER ── */}
      <div className="horizontal-wrapper">

        {/* ── HERO PANEL ── */}
        <section id="hero-panel" className="panel">
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Homenaje eterno · 1949 – 2025</p>
            <h1 className="hero-title">
              <span>Indio</span><br />Solari
            </h1>
            <p className="hero-dates">17 ENERO 1949 — 2025</p>
            <p className="hero-tagline">
              El poeta del rock nacional. El hombre que convirtió el pogo en religión y la canción en bandera.
            </p>
          </div>
          <div className="scroll-hint">
            <div className="scroll-arrow" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── BIO PANEL ── */}
        <section id="bio-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Historia</p>
            <h2 className="section-title-gradient">La Vida del Indio</h2>
          </div>
          <div className="bio-layout">
            <div className="bio-left">
              <img
                className="bio-img-small"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Carlos_Indio_Solari.jpg/800px-Carlos_Indio_Solari.jpg"
                alt="Indio Solari"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400';
                }}
              />
              <div className="bio-text-compact">
                <p>
                  Carlos Alberto Solari nació el 17 de enero de 1949 en Paraná, Entre Ríos. Artista plástico, cantante y poeta, construyó una de las carreras más influyentes del rock iberoamericano.
                </p>
                <div className="bio-quote-compact">
                  "El rock and roll es la única música que puede transformar la vida de quien la escucha."
                </div>
                <p>
                  En 1976 formó Patricio Rey y sus Redonditos de Ricota junto a Skay Beilinson. Su hermetismo y rechazo a los medios los convirtieron en fenómeno de culto.
                </p>
              </div>
            </div>
            <div className="bio-right">
              <div className="timeline-compact">
                {[
                  { year: "1949", title: "Nacimiento", desc: "Paraná, Entre Ríos" },
                  { year: "1976", title: "Fundación", desc: "Redondos en La Plata" },
                  { year: "1985", title: "Debut", desc: "Gulp! marca el inicio" },
                  { year: "1996", title: "Luzbelito", desc: "Obra ma absoluta" },
                  { year: "2001", title: "Separación", desc: "Fin de los Redondos" },
                  { year: "2004", title: "Solista", desc: "El Perfume del Indio" },
                  { year: "2017", title: "Olavarría", desc: "250.000 personas" },
                  { year: "2025", title: "Partida", desc: "Patricio Rey nunca muere" },
                ].map(item => (
                  <div className="timeline-item-compact" key={item.year}>
                    <span className="timeline-year-compact">{item.year}</span>
                    <div className="timeline-dot-compact" />
                    <div className="timeline-content-compact">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DISCO PANEL ── */}
        <section id="disco-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Discografía</p>
            <h2 className="section-title-gradient">Tapas y Canciones</h2>
          </div>
          <div className="disco-layout">
            <div className="disco-featured">
              <img
                className="disco-featured-cover"
                src={selectedAlbum.cover}
                alt={selectedAlbum.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedAlbum.coverFallback;
                }}
              />
              <div className="disco-featured-info">
                <h3>{selectedAlbum.title}</h3>
                <p className="disco-featured-meta">{selectedAlbum.year} · {selectedAlbum.band}</p>
                <p className="disco-featured-desc">{selectedAlbum.desc}</p>
              </div>
              <ol className="disco-featured-tracks">
                {selectedAlbum.tracks.map((track, i) => (
                  <li key={i}>
                    <span className="track-num">{String(i + 1).padStart(2, '0')}</span>
                    {track}
                  </li>
                ))}
              </ol>
            </div>
            <div className="disco-mosaic">
              {ALBUMS.map(album => (
                <div
                  className={`disco-mosaic-item ${album.id === selectedAlbum.id ? 'active' : ''}`}
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                >
                  <img src={album.cover} alt={album.title} onError={(e) => {
                    (e.target as HTMLImageElement).src = album.coverFallback;
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY PANEL ── */}
        <section id="gallery-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Galería</p>
            <h2 className="section-title-gradient">El Mito en Imágenes</h2>
          </div>
          <div className="gallery-compact">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                className="gallery-item-compact"
                key={i}
                onClick={() => openLightbox(photo.src)}
              >
                <img src={photo.src} alt={photo.caption} onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400';
                }} />
                <div className="overlay"><span>{photo.caption}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWS PANEL ── */}
        <section id="news-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Actualidad</p>
            <h2 className="section-title-gradient">Noticias</h2>
          </div>
          <div className="news-compact">
            {NEWS_ITEMS.map(news => (
              <div
                className={`news-card-compact ${activeNews === news.id ? 'active' : ''}`}
                key={news.id}
                onClick={() => setActiveNews(activeNews === news.id ? null : news.id)}
              >
                <img className="news-img-compact" src={news.img} alt={news.title} onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400';
                }} />
                <div className="news-body-compact">
                  <h3>{news.title}</h3>
                  <time>{news.date}</time>
                  <p>{activeNews === news.id ? news.body : news.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRIVIA PANEL ── */}
        <section id="trivia-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Ponete a prueba</p>
            <h2 className="section-title-gradient">¿Qué Tan Fan Sos?</h2>
          </div>
          <div className="trivia-layout">
            <div className="trivia-question-area">
              <div className="trivia-progress-compact">
                <div className="progress-bar-compact">
                  <div className="progress-fill-compact" id="trivia-progress-fill" style={{ width: '0%' }} />
                </div>
                <span className="progress-text-compact" id="trivia-progress-text">1 / 50</span>
              </div>
              <div className="trivia-question-text" id="trivia-question" />
              <div className="trivia-options-compact" id="trivia-options" />
            </div>
            <div className="trivia-answer-area">
              <div id="trivia-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="trivia-feedback-compact" id="trivia-feedback" />
                <button className="trivia-next-compact" id="trivia-next" onClick={nextQuestion}>
                  Siguiente →
                </button>
              </div>
              <div id="trivia-result" className="trivia-result-compact">
                <div className="result-badge-compact" id="result-badge">0/50</div>
                <div className="result-score-compact" id="result-score">0% ACIERTOS</div>
                <div className="result-title-compact" id="result-title">Turista del Rock</div>
                <div className="result-desc-compact" id="result-desc" />
                <div style={{ marginTop: '1rem' }}>
                  <button className="btn-share-compact" onClick={openShareModal}>
                    Compartirlo en redes
                  </button>
                  <button className="btn-retry-compact" onClick={retryTrivia}>
                    Volver a jugar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER PANEL ── */}
        <section id="footer-panel" className="panel">
          <div className="footer-content">
            <div className="footer-logo">Indio Solari</div>
            <p className="footer-tagline">Patricio Rey Nunca Muere · 1949 – 2025</p>
            <p className="footer-q">
              "La vida es muy corta para leer explicaciones. Mejor escuchá un tema y dejá que la música hable."
            </p>
          </div>
        </section>

      </div>

      {/* ── LIGHTBOX ── */}
      <div id="lightbox" className="lightbox">
        <button className="lightbox-close" onClick={closeLightbox}>×</button>
        <img src="" alt="Galería" />
      </div>

      {/* ── SHARE MODAL ── */}
      <div id="share-modal" className="modal-overlay">
        <div className="modal-box">
          <h3>Compartí tu resultado</h3>
          <p>Ingresá tu nombre para generar tu tarjeta.</p>
          <input
            id="share-name"
            className="modal-input"
            type="text"
            placeholder="Tu nombre"
            maxLength={40}
          />
          <div id="canvas-wrap" style={{ display: 'none' }}>
            <canvas id="shareCard" />
          </div>
          <button id="dl-btn" className="btn-download" style={{ display: 'none' }} onClick={downloadCard}>
            Descargar imagen
          </button>
          <div className="modal-actions" style={{ marginTop: '0.6rem' }}>
            <button className="btn-gen" onClick={generateCard}>Generar</button>
            <button className="btn-cancel" onClick={closeShareModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
}
