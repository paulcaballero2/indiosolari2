import { useEffect } from 'react';
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
  toggleAlbum,
  openLightbox,
  closeLightbox,
} from './utils';

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'Los fans despiden al Indio en Olavarría',
    date: 'Junio 2025',
    excerpt: 'Miles de ricoteros se reunieron silenciosamente en el lugar donde se dio el recital más grande de su carrera solista.',
    img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Una multitud silenciosa colocó velas, banderas y cantó a capella los clásicos de los Redondos. La ciudad se tiñó de rojo y negro como homenaje eterno. El Indio ya es leyenda, pero esta noche su pueblo demostró que vive en cada corazón.'
  },
  {
    id: 2,
    title: 'Se reedita Luzbelito en vinilo de lujo',
    date: 'Mayo 2025',
    excerpt: 'La obra maestra de 1996 vuelve a los tornamesas en una edición remasterizada con material inédito.',
    img: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Tres discos de vinilo, un libro arte de 40 páginas con dibujos de Rocambole y versiones alternativas de Pura Suerte y Divina Gloria. Una edición de coleccionista para los ricoteros que vivieron el mito de cerca.'
  },
  {
    id: 3,
    title: 'El archivo gráfico del Indio será museo',
    date: 'Abril 2025',
    excerpt: 'El archivo de tapas, afiches y obra visual de la banda se donará al Museo de Bellas Artes de La Plata.',
    img: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Rocambole y el Indio anunciaron que toda la iconografía será conservada como patrimonio artístico nacional. Las tapas originales, los afiches raros de los shows en Obras y los dibujos inéditos formarán parte de una muestra itinerante.'
  },
  {
    id: 4,
    title: 'Las cartas del Indio a Skay serán publicadas',
    date: 'Marzo 2025',
    excerpt: 'Documentos de 18 años de amistad revelan la génesis de los himnos redondos.',
    img: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Más de 200 cartas donde el Indio le contaba a Skay borradores de Jijiji, Luzbelito y Zona de Promesas. Una ventana íntima a la relación artística más importante del rock nacional. Se publicarán con prólogo de Pappo.'
  },
  {
    id: 5,
    title: 'Un documental cubre los shows de Mar del Plata 1998',
    date: 'Febrero 2025',
    excerpt: 'Material inédito del recital que reunió a 100.000 almas ahora en restauración 4K.',
    img: 'https://images.pexels.com/photos/2399097/pexels-photo-2399097.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Cámaras caseras, archivos de noticieros y el audio de la consola de sonido se unen en un documental sobre aquella noche mítica. Testimonios del Indio, Skay y fans que estuvieron ahí se entrelazan con imágenes nunca vistas.'
  },
  {
    id: 6,
    title: 'Escuela de música popular llevará su nombre',
    date: 'Enero 2025',
    excerpt: 'La primera escuela pública de rock de La Plata se llamará "Carlos Solari".',
    img: 'https://images.pexels.com/photos/144428/pexels-photo-144428.jpeg?auto=compress&cs=tinysrgb&w=400',
    body: 'Un proyecto municipal convertirá un antiguo galpón en un espacio de formación gratuita para jóvenes que quieran hacer rock. El Indio aprobó la iniciativa antes de su muerte: "Que sepan que se puede hacer sin pedir permiso".'
  }
];

export default function App() {
  useEffect(() => {
    initTrivia();

    // Close lightbox on backdrop click
    const lb = document.getElementById('lightbox');
    lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

    // Close modal on backdrop click
    const modal = document.getElementById('share-modal');
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeShareModal(); });
  }, []);

  const toggleNews = (id: number) => {
    const card = document.querySelector(`[data-news="${id}"]`);
    if (!card) return;
    const isActive = card.classList.contains('active');
    document.querySelectorAll('.news-card.active').forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  };

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
            <span>Scroll horizontal</span>
          </div>
        </section>

        {/* ── BIO PANEL ── */}
        <section id="bio-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Historia</p>
            <h2 className="section-title-gradient">La Vida del Indio</h2>
          </div>
          <div className="bio-scroll">
            <img
              className="bio-header-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Carlos_Indio_Solari.jpg/800px-Carlos_Indio_Solari.jpg"
              alt="Indio Solari"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600';
              }}
            />
            <div className="bio-text">
              <p>
                Carlos Alberto Solari, conocido mundialmente como <strong>El Indio Solari</strong>, nació el 17 de enero de 1949 en Paraná, Entre Ríos. Artista plástico de formación, cantante de instinto y poeta de vocación, construyó una de las carreras más influyentes del rock iberoamericano.
              </p>
              <div className="bio-quote">
                "El rock and roll es la única música que tiene la capacidad de transformar la vida de la gente que la escucha."
              </div>
              <p>
                En 1976 formó en La Plata junto a Skay Beilinson la banda que llevaría el nombre de Patricio Rey y sus Redonditos de Ricota. Su carácter hermético, sus letras surrealistas y su rechazo a los medios los convirtieron en fenómeno de culto.
              </p>
              <p>
                A lo largo de 8 álbumes entre 1985 y 2000, construyeron un universo lírico inigualable. tras la disolución en 2001, su carrera solista ratificó su estatura. Sus shows masivos — incluido Olavarría 2017 con 250.000 personas — demostraron un vínculo indestructible con los <strong>Ricoteros</strong>.
              </p>
            </div>
            <div className="bio-timeline">
              {[
                { year: "1949", title: "Nacimiento en Paraná", desc: "Nace el 17 de enero en Entre Ríos." },
                { year: "1976", title: "Fundación de los Redondos", desc: "Junto a Skay Beilinson en La Plata." },
                { year: "1985", title: "Debut: Gulp!", desc: "Primer disco oficial." },
                { year: "1996", title: "Luzbelito", desc: "Obra maestra que los consagra." },
                { year: "2001", title: "Fin de los Redondos", desc: "Separación de la banda." },
                { year: "2017", title: "Olavarría", desc: "250.000 personas en un show histórico." },
                { year: "2025", title: "Su partida", desc: "El Indio muere. Patricio Rey nunca muere." },
              ].map(item => (
                <div className="timeline-item" key={item.year}>
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DISCO PANEL ── */}
        <section id="disco-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Discografía</p>
            <h2 className="section-title-gradient">Tapas y Canciones</h2>
          </div>
          <div className="disco-scroll">
            <p style={{ color: 'var(--white-dim)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              Clic en cada tapa para ver el tracklist.
            </p>
            <div className="albums-horizontal">
              {ALBUMS.map(album => (
                <div
                  className="album-card"
                  key={album.id}
                  data-album={album.id}
                  onClick={() => toggleAlbum(album.id)}
                >
                  <div className="album-cover">
                    <img src={album.cover} alt={album.title} onError={(e) => {
                      (e.target as HTMLImageElement).src = album.coverFallback;
                    }} />
                  </div>
                  <div className="album-info">
                    <h3>{album.title}</h3>
                    <p>{album.year}</p>
                    <span className="album-badge">{album.band}</span>
                  </div>
                  <div className="tracklist">
                    <ol>
                      {album.tracks.map((track, i) => (
                        <li key={i}>
                          <span className="track-num">{String(i + 1).padStart(2, '0')}</span>
                          {track}
                        </li>
                      ))}
                    </ol>
                  </div>
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
          <div className="gallery-grid">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                className="gallery-item"
                key={i}
                onClick={() => openLightbox(photo.src)}
              >
                <img src={photo.src} alt={photo.caption} onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=600`;
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
            <h2 className="section-title-gradient">Noticias Recientes</h2>
          </div>
          <div className="news-scroll">
            <div className="news-list">
              {NEWS_ITEMS.map(news => (
                <div
                  className="news-card"
                  key={news.id}
                  data-news={news.id}
                  onClick={() => toggleNews(news.id)}
                >
                  <div className="news-header">
                    <img className="news-img" src={news.img} alt={news.title} onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }} />
                    <div className="news-meta">
                      <h3>{news.title}</h3>
                      <time>{news.date}</time>
                      <p className="news-excerpt">{news.excerpt}</p>
                    </div>
                    <div className="news-expand">+</div>
                  </div>
                  <div className="news-body">
                    <div className="news-body-inner">{news.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRIVIA PANEL ── */}
        <section id="trivia-panel" className="panel">
          <div className="section-header">
            <p className="section-label">Ponete a prueba</p>
            <h2 className="section-title-gradient">¿Qué Tan Fan Sos?</h2>
          </div>
          <div className="trivia-scroll">
            <p style={{ color: 'var(--white-dim)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              {TRIVIA_QUESTIONS.length} preguntas sobre su vida, canciones y leyendas.
            </p>
            <div className="trivia-container">
              <div id="trivia-body">
                <div className="trivia-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" id="trivia-progress-fill" style={{ width: '0%' }} />
                  </div>
                  <span className="progress-text" id="trivia-progress-text">1 / 50</span>
                </div>
                <div className="trivia-question" id="trivia-question" />
                <div className="trivia-options" id="trivia-options" />
                <div className="trivia-feedback" id="trivia-feedback" />
                <button className="trivia-next" id="trivia-next" onClick={nextQuestion}>
                  Siguiente →
                </button>
              </div>
              <div id="trivia-result" className="trivia-result">
                <div className="result-badge" id="result-badge">0/50</div>
                <div className="result-score" id="result-score">0% DE ACIERTOS</div>
                <div className="result-title" id="result-title">Turista del Rock</div>
                <div className="result-desc" id="result-desc" />
                <div style={{ marginTop: '1.5rem' }}>
                  <button className="btn-share" onClick={openShareModal}>
                    Compartirlo en las redes
                  </button>
                  <button className="btn-retry" onClick={retryTrivia}>
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
              "La vida es muy corta para leer explicaciones que no te interesan. Mejor escuchá un tema y dejan que la música hable."
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
          <p>Ingresá tu nombre para generar tu tarjeta y compartirla en redes.</p>
          <input
            id="share-name"
            className="modal-input"
            type="text"
            placeholder="Tu nombre (ej: El Gordo Villero)"
            maxLength={40}
          />
          <div id="canvas-wrap" style={{ display: 'none' }}>
            <canvas id="shareCard" />
          </div>
          <button id="dl-btn" className="btn-download" style={{ display: 'none' }} onClick={downloadCard}>
            Descargar imagen
          </button>
          <div className="modal-actions" style={{ marginTop: '0.8rem' }}>
            <button className="btn-gen" onClick={generateCard}>Generar tarjeta</button>
            <button className="btn-cancel" onClick={closeShareModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
}
