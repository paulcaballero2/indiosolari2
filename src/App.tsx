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

export default function App() {
  useEffect(() => {
    initTrivia();

    // Parallax hero bg
    const heroBg = document.querySelector('.hero-bg') as HTMLElement;
    const onScroll = () => {
      if (heroBg) heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Close lightbox on backdrop click
    const lb = document.getElementById('lightbox');
    lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

    // Close modal on backdrop click
    const modal = document.getElementById('share-modal');
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeShareModal(); });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <span className="nav-logo">El Indio</span>
        <ul className="nav-links">
          <li><a href="#biografia">Biografía</a></li>
          <li><a href="#discografia">Discografía</a></li>
          <li><a href="#spotify">Playlist</a></li>
          <li><a href="#trivia">Trivia</a></li>
          <li><a href="#pogo-section">El Pogo</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Homenaje eterno · 1949 – 2025</p>
          <h1 className="hero-title">
            <span>Indio</span><br />Solari
          </h1>
          <p className="hero-dates">17 ENERO 1949 — 2025</p>
          <p className="hero-tagline">
            El poeta del rock nacional. El hombre que convirtió el pogo en religión
            y la canción en bandera. Patricio Rey nunca muere.
          </p>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <div className="divider" />

      {/* ── BIOGRAFIA ── */}
      <section id="biografia">
        <div className="section-header">
          <p className="section-label">Historia</p>
          <h2 className="section-title">La Vida del Indio</h2>
        </div>

        <div className="bio-grid">
          <div className="bio-image-wrap">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Carlos_Indio_Solari.jpg/800px-Carlos_Indio_Solari.jpg"
              alt="Indio Solari"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600';
              }}
            />
          </div>

          <div className="bio-text">
            <p>
              Carlos Alberto Solari, conocido mundialmente como <strong>El Indio Solari</strong>,
              nació el 17 de enero de 1949 en Paraná, Entre Ríos. Artista plástico de formación,
              cantante de instinto y poeta de vocación, Solari construyó una de las carreras más
              influyentes en la historia del rock iberoamericano.
            </p>

            <div className="bio-quote">
              "El rock and roll es la única música que tiene la capacidad de transformar la vida de
              la gente que la escucha. No es entretenimiento, es algo más profundo."
            </div>

            <p>
              En 1976, de regreso de una estadía en Europa donde se empapó de la contracultura
              beatnik y psicodélica, formó en La Plata junto a <strong>Skay Beilinson</strong>
              la banda que llevaría el nombre ficticio de Patricio Rey y sus Redonditos de Ricota.
              Su carácter hermético, sus letras cargadas de surrealismo y su rechazo total a los
              medios masivos los convirtieron en un fenómeno de culto antes de ser masivos.
            </p>

            <p>
              A lo largo de 8 álbumes de estudio entre 1985 y 2000, los Redondos construyeron un
              universo lírico y sonoro inigualable. Canciones como <em>Jijiji</em>, <em>Zona de
              Promesas</em>, <em>La Bestia Pop</em> y <em>Luzbelito</em> se convirtieron en
              himnos generacionales que trascienden el tiempo.
            </p>

            <div className="bio-quote">
              "Nunca creí que esto iba a ser tan grande. Solo queríamos tocar para la gente
              que necesitaba escuchar esto."
            </div>

            <p>
              Tras la disolución de los Redondos en 2001, el Indio continuó su carrera solista
              con tres álbumes que ratificaron su estatura artística. Sus shows masivos —
              incluyendo el legendario recital de Olavarría de 2017 con más de 250.000 personas —
              demostraron que el vínculo con sus seguidores, los <strong>Ricoteros</strong>,
              era indestructible.
            </p>

            <p>
              Aquejado por el Párkinson en sus últimos años, el Indio se retiró progresivamente
              de la vida pública, viviendo rodeado de afecto y manteniendo su integridad artística
              hasta el final. Su muerte en 2025 dejó un vacío irreemplazable en la cultura
              popular argentina.
            </p>

            <div className="bio-timeline">
              {[
                { year: "1949", title: "Nacimiento en Paraná", desc: "Nace Carlos Alberto Solari el 17 de enero en Paraná, Entre Ríos." },
                { year: "1976", title: "Fundación de los Redondos", desc: "Forma Patricio Rey y sus Redonditos de Ricota en La Plata junto a Skay Beilinson." },
                { year: "1985", title: "Debut discográfico: Gulp!", desc: "El primer disco oficial marca el inicio de una era en el rock nacional." },
                { year: "1996", title: "Luzbelito", desc: "Considerado por muchos su obra maestra, consolida a los Redondos como la banda más grande del país." },
                { year: "2001", title: "Fin de los Redondos", desc: "La separación de la banda sacude al rock nacional. El Indio anuncia su carrera solista." },
                { year: "2004", title: "Debut solista", desc: "El Perfume del Indio marca su primera aparición sin los Redondos. Aclamado por la crítica y los fans." },
                { year: "2017", title: "El megashow de Olavarría", desc: "Más de 250.000 personas en un recital que se convierte en tragedia y en leyenda simultáneamente." },
                { year: "2025", title: "Su partida", desc: "El Indio Solari muere dejando un legado inmortal. Patricio Rey nunca muere." },
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
        </div>

        {/* Gallery */}
        <div className="section-header" style={{ marginTop: '5rem' }}>
          <p className="section-label">Galería</p>
          <h2 className="section-title">Imágenes del Mito</h2>
        </div>
        <div className="gallery-grid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              className="gallery-item"
              key={i}
              onClick={() => openLightbox(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/${[167636, 210922, 325521, 144428, 1699161, 2399097, 1763075, 3756766][i % 8]}/pexels-photo-${[167636, 210922, 325521, 144428, 1699161, 2399097, 1763075, 3756766][i % 8]}.jpeg?auto=compress&cs=tinysrgb&w=600`;
                }}
              />
              <div className="overlay"><span>{photo.caption}</span></div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── DISCOGRAFIA ── */}
      <section id="discografia">
        <div className="section-header">
          <p className="section-label">Discografía completa</p>
          <h2 className="section-title">Tapas y Canciones</h2>
        </div>
        <p style={{ color: 'var(--white-dim)', marginBottom: '3rem', fontSize: '0.9rem' }}>
          Hacé clic en cada tapa para ver el tracklist completo.
        </p>

        <div className="albums-grid">
          {ALBUMS.map(album => (
            <div
              className="album-card"
              key={album.id}
              data-album={album.id}
              onClick={() => toggleAlbum(album.id)}
            >
              <div className="album-cover">
                <img
                  src={album.cover}
                  alt={album.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = album.coverFallback;
                  }}
                />
                <div className="play-icon">▶</div>
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
      </section>

      <div className="divider" />

      {/* ── SPOTIFY ── */}
      <div id="spotify">
        <div className="spotify-inner">
          <div className="spotify-grid">
            <div className="spotify-embed">
              <iframe
                style={{ borderRadius: 0 }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1YrDwh?utm_source=generator&theme=0"
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Playlist Indio Solari"
              />
            </div>
            <div className="spotify-text">
              <div className="section-label" style={{ marginBottom: '1rem' }}>Escuchá ahora</div>
              <h3>Lo mejor del Indio en Spotify</h3>
              <p>
                Desde los clásicos de los Redondos hasta su obra solista, esta selección
                recorre las canciones que definen el universo poético y musical del
                Indio Solari. Subí el volumen y que el rock & roll venga a vos.
              </p>
              <a
                className="btn-spotify"
                href="https://open.spotify.com/artist/4Z7oOwBSXzMbzBqTFfXWP7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Abrir en Spotify
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── TRIVIA ── */}
      <section id="trivia">
        <div className="section-header">
          <p className="section-label">Ponete a prueba</p>
          <h2 className="section-title">¿Qué tan Fan del Indio Sos?</h2>
        </div>
        <p style={{ color: 'var(--white-dim)', marginBottom: '3rem', fontSize: '0.9rem' }}>
          {TRIVIA_QUESTIONS.length} preguntas sobre su vida, canciones, letras y leyendas. Sin red, sin ayuda. Solo vos y el Indio.
        </p>

        <div className="trivia-container">
          {/* Quiz body */}
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

          {/* Result */}
          <div id="trivia-result" className="trivia-result">
            <div className="result-badge" id="result-badge">0/50</div>
            <div className="result-score" id="result-score">0% DE ACIERTOS</div>
            <div className="result-title" id="result-title">Turista del Rock</div>
            <div className="result-desc" id="result-desc" />
            <div style={{ marginTop: '2rem' }}>
              <button className="btn-share" onClick={openShareModal}>
                Compartirlo en las redes
              </button>
              <button className="btn-retry" onClick={retryTrivia}>
                Volver a jugar
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── POGO SECTION ── */}
      <div id="pogo-section">
        <div className="pogo-inner">
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            ⚡ Zona de alto voltaje
          </div>
          <h2>Activa el Pogo<br />Más Grande del Mundo</h2>
          <p>
            Apretá el botón y que se arme el desmadre total. Todos los elementos de la página
            se van al pogo durante 20 segundos. Puro rock & roll digital.
          </p>
          <button
            className="btn-pogo"
            id="pogo-btn"
            onClick={activatePogo}
          >
            ACTIVA EL POGO MÁS GRANDE DEL MUNDO
          </button>
          <div className="pogo-countdown" id="pogo-countdown">¡POGO! 20s</div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo">Indio Solari</div>
        <p className="footer-tagline">Patricio Rey Nunca Muere · 1949 – 2025</p>
        <ul className="footer-links">
          <li><a href="#biografia">Biografía</a></li>
          <li><a href="#discografia">Discografía</a></li>
          <li><a href="#spotify">Playlist</a></li>
          <li><a href="#trivia">Trivia</a></li>
        </ul>
        <p className="footer-copy">
          Sitio homenaje · No oficial · Con amor para los Ricoteros del mundo
        </p>
      </footer>

      {/* ── LIGHTBOX ── */}
      <div id="lightbox" className="lightbox">
        <button className="lightbox-close" onClick={closeLightbox}>×</button>
        <img src="" alt="Galería" />
      </div>

      {/* ── SHARE MODAL ── */}
      <div id="share-modal" className="modal-overlay">
        <div className="modal-box">
          <h3>Compartí tu resultado</h3>
          <p>Ingresá tu nombre para generar tu tarjeta ricotero y compartirla en las redes.</p>
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
          <div className="modal-actions" style={{ marginTop: '1rem' }}>
            <button className="btn-gen" onClick={generateCard}>Generar tarjeta</button>
            <button className="btn-cancel" onClick={closeShareModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
}
