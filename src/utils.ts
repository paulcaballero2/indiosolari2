import { TRIVIA_QUESTIONS, RESULT_LEVELS } from './data';

// ── TRIVIA ENGINE ──────────────────────────────────────────────────────────────

let currentQ = 0;
let score = 0;
let answered = false;
let finalScore = 0;
let finalLevel: typeof RESULT_LEVELS[0] | null = null;

export function initTrivia() {
  currentQ = 0;
  score = 0;
  answered = false;
  renderQuestion();
}

function renderQuestion() {
  const q = TRIVIA_QUESTIONS[currentQ];
  const progressFill = document.getElementById('trivia-progress-fill') as HTMLDivElement;
  const progressText = document.getElementById('trivia-progress-text') as HTMLSpanElement;
  const questionEl = document.getElementById('trivia-question') as HTMLDivElement;
  const optionsEl = document.getElementById('trivia-options') as HTMLDivElement;
  const feedbackEl = document.getElementById('trivia-feedback') as HTMLDivElement;
  const nextBtn = document.getElementById('trivia-next') as HTMLButtonElement;

  if (!progressFill || !questionEl || !optionsEl) return;

  const pct = ((currentQ) / TRIVIA_QUESTIONS.length) * 100;
  progressFill.style.width = pct + '%';
  progressText.textContent = `${currentQ + 1} / ${TRIVIA_QUESTIONS.length}`;
  questionEl.textContent = q.q;
  feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  answered = false;

  optionsEl.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'trivia-opt-compact';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i));
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(idx: number) {
  if (answered) return;
  answered = true;
  const q = TRIVIA_QUESTIONS[currentQ];
  const opts = document.querySelectorAll('.trivia-opt-compact') as NodeListOf<HTMLButtonElement>;
  const feedbackEl = document.getElementById('trivia-feedback') as HTMLDivElement;
  const nextBtn = document.getElementById('trivia-next') as HTMLButtonElement;

  opts.forEach(btn => (btn.disabled = true));

  if (idx === q.answer) {
    opts[idx].classList.add('correct');
    score++;
    feedbackEl.textContent = `✓ Correcto! ${q.fact}`;
    feedbackEl.style.color = '#2ecc71';
  } else {
    opts[idx].classList.add('wrong');
    opts[q.answer].classList.add('correct');
    feedbackEl.textContent = `✗ Incorrecto. ${q.fact}`;
    feedbackEl.style.color = 'var(--red-bright)';
  }

  nextBtn.style.display = 'inline-block';
}

export function nextQuestion() {
  currentQ++;
  if (currentQ >= TRIVIA_QUESTIONS.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  const triviaBody = document.getElementById('trivia-body') as HTMLDivElement;
  const triviaResult = document.getElementById('trivia-result') as HTMLDivElement;
  const resultBadge = document.getElementById('result-badge') as HTMLDivElement;
  const resultScore = document.getElementById('result-score') as HTMLDivElement;
  const resultTitle = document.getElementById('result-title') as HTMLDivElement;
  const resultDesc = document.getElementById('result-desc') as HTMLDivElement;

  finalScore = score;
  finalLevel = RESULT_LEVELS.find(l => finalScore >= l.min && finalScore <= l.max) || RESULT_LEVELS[0];

  triviaBody.style.display = 'none';
  triviaResult.style.display = 'block';

  resultBadge.textContent = `${finalScore}/${TRIVIA_QUESTIONS.length}`;
  resultScore.textContent = `${Math.round((finalScore / TRIVIA_QUESTIONS.length) * 100)}% DE ACIERTOS`;
  resultTitle.textContent = finalLevel.title;
  resultDesc.textContent = finalLevel.desc;
}

export function retryTrivia() {
  const triviaBody = document.getElementById('trivia-body') as HTMLDivElement;
  const triviaResult = document.getElementById('trivia-result') as HTMLDivElement;
  triviaResult.style.display = 'none';
  triviaBody.style.display = 'block';
  initTrivia();
}

// ── SHARE CARD GENERATOR ────────────────────────────────────────────────────

export function openShareModal() {
  const modal = document.getElementById('share-modal') as HTMLDivElement;
  const canvasWrap = document.getElementById('canvas-wrap') as HTMLDivElement;
  canvasWrap.style.display = 'none';
  (document.getElementById('dl-btn') as HTMLButtonElement).style.display = 'none';
  (document.getElementById('share-name') as HTMLInputElement).value = '';
  modal.classList.add('active');
}

export function closeShareModal() {
  const modal = document.getElementById('share-modal') as HTMLDivElement;
  modal.classList.remove('active');
}

export function generateCard() {
  const nameInput = document.getElementById('share-name') as HTMLInputElement;
  const name = nameInput.value.trim() || 'Un Ricotero';
  const canvas = document.getElementById('shareCard') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const canvasWrap = document.getElementById('canvas-wrap') as HTMLDivElement;
  const dlBtn = document.getElementById('dl-btn') as HTMLButtonElement;

  canvas.width = 600;
  canvas.height = 340;

  // Background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 600, 340);

  // Red accent bar
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(0, 0, 600, 6);
  ctx.fillRect(0, 334, 600, 6);

  // Red left glow
  const grd = ctx.createRadialGradient(0, 170, 0, 0, 170, 300);
  grd.addColorStop(0, 'rgba(192,57,43,0.25)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 600, 340);

  // Title
  ctx.fillStyle = '#c0392b';
  ctx.font = 'bold 12px Oswald, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('TRIBUTO AL INDIO SOLARI', 30, 45);

  // Score
  ctx.fillStyle = '#f0ece4';
  ctx.font = 'bold 88px Bebas Neue, Impact, sans-serif';
  ctx.fillText(`${finalScore}/50`, 30, 160);

  // Level
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 28px Bebas Neue, Impact, sans-serif';
  ctx.fillText((finalLevel?.title || '').toUpperCase(), 30, 200);

  // Name
  ctx.fillStyle = '#a8a49c';
  ctx.font = '16px Inter, sans-serif';
  ctx.fillText(`${name}`, 30, 235);

  // Pct
  const pct = Math.round((finalScore / 50) * 100);
  ctx.fillStyle = '#f0ece4';
  ctx.font = 'bold 14px Oswald, sans-serif';
  ctx.fillText(`${pct}% de aciertos`, 30, 265);

  // Separator
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(30, 285);
  ctx.lineTo(570, 285);
  ctx.stroke();

  // Footer
  ctx.fillStyle = '#2a2a2a';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('PATRICIO REY Y SUS REDONDITOS DE RICOTA', 30, 315);

  canvasWrap.style.display = 'block';
  dlBtn.style.display = 'block';
}

export function downloadCard() {
  const canvas = document.getElementById('shareCard') as HTMLCanvasElement;
  const name = (document.getElementById('share-name') as HTMLInputElement).value.trim() || 'ricotero';
  const link = document.createElement('a');
  link.download = `indio-solari-trivia-${name.replace(/\s+/g, '-')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ── POGO PHYSICS ───────────────────────────────────────────────────────────────

interface PogoElement {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  originalStyle: {
    position: string;
    left: string;
    top: string;
    transform: string;
    zIndex: string;
    transition: string;
    margin: string;
  };
}

let pogoActive = false;
let pogoElements: PogoElement[] = [];
let pogoRAF = 0;
let pogoEndTime = 0;
let countdownInterval = 0;
let pogoAudioContext: AudioContext | null = null;
let pogoAudioNodes: { stop: () => void } | null = null;

function startPogoSound() {
  pogoAudioContext = new AudioContext();

  // Create noise for crowd roar
  const bufferSize = 2 * pogoAudioContext.sampleRate;
  const noiseBuffer = pogoAudioContext.createBuffer(1, bufferSize, pogoAudioContext.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noiseSource = pogoAudioContext.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  // Low-pass filter for crowd rumble
  const lowPass = pogoAudioContext.createBiquadFilter();
  lowPass.type = 'lowpass';
  lowPass.frequency.value = 800;
  lowPass.Q.value = 1;

  // High-pass to remove sub-bass
  const highPass = pogoAudioContext.createBiquadFilter();
  highPass.type = 'highpass';
  highPass.frequency.value = 100;

  // Gain for crowd
  const crowdGain = pogoAudioContext.createGain();
  crowdGain.gain.value = 0.35;

  noiseSource.connect(lowPass);
  lowPass.connect(highPass);
  highPass.connect(crowdGain);
  crowdGain.connect(pogoAudioContext.destination);
  noiseSource.start();

  // Create bass thump oscillators for pogo rhythm
  const bassOsc = pogoAudioContext.createOscillator();
  bassOsc.type = 'sine';
  bassOsc.frequency.value = 55;

  const bassGain = pogoAudioContext.createGain();
  bassGain.gain.value = 0.4;

  // LFO for pulsing effect
  const lfo = pogoAudioContext.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 2.5;

  const lfoGain = pogoAudioContext.createGain();
  lfoGain.gain.value = 0.35;

  lfo.connect(lfoGain);
  lfoGain.connect(bassGain.gain);

  bassOsc.connect(bassGain);
  bassGain.connect(pogoAudioContext.destination);
  bassOsc.start();
  lfo.start();

  // Add some mid-frequency energy for shouting effect
  const midNoise = pogoAudioContext.createBufferSource();
  const midBuffer = pogoAudioContext.createBuffer(1, bufferSize, pogoAudioContext.sampleRate);
  const midOutput = midBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    midOutput[i] = Math.random() * 2 - 1;
  }
  midNoise.buffer = midBuffer;
  midNoise.loop = true;

  const midFilter = pogoAudioContext.createBiquadFilter();
  midFilter.type = 'bandpass';
  midFilter.frequency.value = 1200;
  midFilter.Q.value = 0.5;

  const midGain = pogoAudioContext.createGain();
  midGain.gain.value = 0.15;

  // Random modulation for shouting
  const shoutLfo = pogoAudioContext.createOscillator();
  shoutLfo.type = 'sine';
  shoutLfo.frequency.value = 0.8;

  const shoutLfoGain = pogoAudioContext.createGain();
  shoutLfoGain.gain.value = 0.08;

  shoutLfo.connect(shoutLfoGain);
  shoutLfoGain.connect(midGain.gain);

  midNoise.connect(midFilter);
  midFilter.connect(midGain);
  midGain.connect(pogoAudioContext.destination);
  midNoise.start();
  shoutLfo.start();

  // Modulate crowd intensity over time
  let intensityRAF = 0;
  const startTime = Date.now();
  function modulateIntensity() {
    const elapsed = (Date.now() - startTime) / 1000;
    const intensity = 0.3 + Math.sin(elapsed * 0.5) * 0.1 + Math.random() * 0.05;
    crowdGain.gain.setValueAtTime(intensity, pogoAudioContext!.currentTime);
    if (pogoActive) {
      intensityRAF = requestAnimationFrame(modulateIntensity);
    }
  }
  modulateIntensity();

  pogoAudioNodes = {
    stop: () => {
      noiseSource.stop();
      bassOsc.stop();
      lfo.stop();
      midNoise.stop();
      shoutLfo.stop();
      cancelAnimationFrame(intensityRAF);
    }
  };
}

function stopPogoSound() {
  if (pogoAudioNodes) {
    pogoAudioNodes.stop();
    pogoAudioNodes = null;
  }
  if (pogoAudioContext) {
    pogoAudioContext.close();
    pogoAudioContext = null;
  }
}

export function activatePogo() {
  if (pogoActive) return;
  pogoActive = true;

  const countdown = document.getElementById('pogo-countdown') as HTMLDivElement;
  const btn = document.querySelector('.btn-pogo-fixed') as HTMLButtonElement;
  btn.disabled = true;
  btn.textContent = '¡POGO ACTIVO!';
  countdown.style.display = 'block';

  // Start crowd sound
  startPogoSound();

  // Grab elements to animate
  const selectors = [
    'nav',
    '.hero-content',
    '.bio-left',
    '.bio-right',
    '.disco-featured',
    '.disco-mosaic',
    '.gallery-item-compact',
    '.news-card-compact',
    '.trivia-question-area',
    '.trivia-answer-area',
    '.footer-content',
    '.section-header',
  ];

  pogoElements = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(node => {
      const el = node as HTMLElement;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const original = {
        position: el.style.position,
        left: el.style.left,
        top: el.style.top,
        transform: el.style.transform,
        zIndex: el.style.zIndex,
        transition: el.style.transition,
        margin: el.style.margin,
      };
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY;
      el.style.position = 'fixed';
      el.style.left = rect.left + 'px';
      el.style.top = rect.top + 'px';
      el.style.width = rect.width + 'px';
      el.style.transition = 'none';
      el.style.zIndex = '500';
      el.style.margin = '0';
      const vx = (Math.random() - 0.5) * 20;
      const vy = (Math.random() - 0.5) * 20;
      pogoElements.push({ el, x: rect.left, y: rect.top, vx, vy, w: rect.width, h: rect.height, originalStyle: original });
    });
  });

  pogoEndTime = Date.now() + 20000;
  let secondsLeft = 20;
  countdown.textContent = `¡POGO! ${secondsLeft}s`;

  countdownInterval = window.setInterval(() => {
    secondsLeft--;
    if (secondsLeft >= 0) {
      countdown.textContent = `¡POGO! ${secondsLeft}s`;
    }
  }, 1000);

  document.body.style.overflow = 'hidden';

  function pogoTick() {
    if (Date.now() >= pogoEndTime) {
      endPogo();
      return;
    }

    const W = window.innerWidth;
    const H = window.innerHeight;

    for (let i = 0; i < pogoElements.length; i++) {
      const p = pogoElements[i];

      // Gravity
      p.vy += 0.6;

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) * 0.85; }
      if (p.x + p.w > W) { p.x = W - p.w; p.vx = -Math.abs(p.vx) * 0.85; }
      if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) * 0.85; }
      if (p.y + p.h > H) { p.y = H - p.h; p.vy = -Math.abs(p.vy) * 0.75; p.vx *= 0.9; }

      // Spin
      const age = (20000 - (pogoEndTime - Date.now())) / 20000;
      const spin = Math.sin(Date.now() / 400 + i) * 12 * (1 - age * 0.5);

      p.el.style.left = p.x + 'px';
      p.el.style.top = p.y + 'px';
      p.el.style.transform = `rotate(${spin}deg)`;
    }

    pogoRAF = requestAnimationFrame(pogoTick);
  }

  pogoRAF = requestAnimationFrame(pogoTick);
}

function endPogo() {
  pogoActive = false;
  cancelAnimationFrame(pogoRAF);
  clearInterval(countdownInterval);

  // Stop sound
  stopPogoSound();

  const countdown = document.getElementById('pogo-countdown') as HTMLDivElement;
  const btn = document.querySelector('.btn-pogo-fixed') as HTMLButtonElement;

  countdown.style.display = 'none';
  btn.disabled = false;
  btn.textContent = 'ACTIVÁ EL POGO WEB MÁS GRANDE DEL MUNDO';
  document.body.style.overflow = 'x auto';

  // Restore elements
  pogoElements.forEach(p => {
    const { el, originalStyle: os } = p;
    el.style.position = os.position;
    el.style.left = os.left;
    el.style.top = os.top;
    el.style.transform = os.transform;
    el.style.zIndex = os.zIndex;
    el.style.transition = os.transition;
    el.style.margin = os.margin;
    el.style.width = '';
  });

  pogoElements = [];
}

// ── ALBUM EXPAND ───────────────────────────────────────────────────────────────

export function toggleAlbum(id: number) {
  const card = document.querySelector(`[data-album="${id}"]`);
  if (!card) return;
  const isActive = card.classList.contains('active');
  document.querySelectorAll('.album-card.active').forEach(c => c.classList.remove('active'));
  if (!isActive) card.classList.add('active');
}

// ── LIGHTBOX ───────────────────────────────────────────────────────────────────

export function openLightbox(src: string) {
  const lb = document.getElementById('lightbox') as HTMLDivElement;
  const img = lb.querySelector('img') as HTMLImageElement;
  img.src = src;
  lb.classList.add('active');
}

export function closeLightbox() {
  const lb = document.getElementById('lightbox') as HTMLDivElement;
  lb.classList.remove('active');
}
