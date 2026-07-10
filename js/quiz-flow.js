import { initLabs } from './simulations.js';
import { sections } from './lessons.js';
const PROGRESS_KEY='airflow-academy-sections';
const quizData = [
  { q: 'When flow speed increases along a streamline (inviscid), static pressure…', a: ['Increases','Decreases','Stays constant','Becomes zero'], correct: 1 },
  { q: 'Flow separation is mainly driven by…', a: ['Adverse pressure gradient','Higher inlet humidity','Lower car mass','Pitot tube offset'], correct: 0 },
  { q: 'Cp is defined as…', a: ['p/ρV','(p-p∞)/(½ρV²)','½ρV²/p','V/c'], correct: 1 },
  { q: 'Most pressure drag on a bluff car rear is from…', a: ['Skin friction only','Wake and separation','Gravity','Rolling resistance'], correct: 1 },
  { q: 'Reynolds number measures…', a: ['Ratio of inertia to viscosity','Fuel octane','Wing angle only','Tire pressure'], correct: 0 },
  { q: 'A rolling road in a wind tunnel helps because…', a: ['It removes ground boundary layer mismatch','It increases humidity','It eliminates drag','It replaces CFD'], correct: 0 },
  { q: 'Downforce improves…', a: ['Top speed always','Tire normal load and cornering grip','Brake cooling only','Cd automatically'], correct: 1 },
  { q: 'Bernoulli applies best along a streamline when…', a: ['Flow is steady and inviscid (idealized)','Flow is always turbulent','Mach > 5','No continuity'], correct: 0 },
  { q: 'CFD mesh quality matters because…', a: ['It changes paint color','It resolves gradients and surface curvature','It replaces laws of physics','It removes turbulence'], correct: 1 },
  { q: 'Turbulent boundary layers often delay separation because…', a: ['They mix momentum toward the wall','They eliminate viscosity','They reduce Re to zero','They remove adverse gradients'], correct: 0 }
 ,{"q":"Continuity in a narrowing duct implies speed…","a":["decreases","increases","is zero","ignores area"],"correct":1},{"q":"Induced drag on a wing is linked to…","a":["tip vortices","only tire friction","gravity","stagnation only"],"correct":0},{"q":"Moving ground in a tunnel models…","a":["underbody relative flow","inviscid flow only","zero drag","no turbulence"],"correct":0},{"q":"A diffuser stall happens when…","a":["flow separates on too-steep expansion","gravity increases","Cp is always +1","Re is zero"],"correct":0},{"q":"RANS CFD means…","a":["time-averaged NS with turbulence model","no viscosity","analytic solution only","no mesh"],"correct":0}];

function mountNav() {
  const nav = document.getElementById('nav');
  let lastGroup = '';
  sections.forEach((s, i) => {
    if (s.group !== lastGroup) {
      const g = document.createElement('div');
      g.className = 'nav-group';
      g.textContent = s.group;
      nav.appendChild(g);
      lastGroup = s.group;
    }
    const b = document.createElement('button');
    const done=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}'); b.textContent=(done[s.id]?'✓ ':'')+s.title;
    b.dataset.id = s.id;
    if (i === 0) b.classList.add('active');
    b.onclick = () => show(s.id);
    nav.appendChild(b);
  });
}

function markProgress(id){try{const d=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}');d[id]=true;localStorage.setItem(PROGRESS_KEY,JSON.stringify(d));}catch(e){}}
function show(id) {
  const s = sections.find(x => x.id === id);
  markProgress(id); document.getElementById('main').innerHTML = s.render();
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  if (id === 'lab') initFlowLab();
  if (id === 'sims') { const r=document.getElementById('mechanics-labs-root'); if(r) initLabs(r); }
  if (id === 'quiz') initQuiz();
  document.getElementById('sidebar')?.classList.remove('open');
}

class FlowLab {
  constructor(root) {
    this.U = 1.2;
    this.a = 42;
    this.cx = 0;
    this.cy = 0;
    this.showLines = true;
    this.showCp = true;
    root.innerHTML = '<div class="lab-panel"><div class="lab-toolbar"><label>Speed <input type="range" id="fl-u" min="0.4" max="2.5" step="0.1" value="1.2"></label><label><input type="checkbox" id="fl-lines" checked> Streamlines</label><label><input type="checkbox" id="fl-cp" checked> Pressure colors</label></div><div class="lab-canvas-wrap"><canvas id="fl-c" width="880" height="440"></canvas></div><div class="lab-legend">Cyan particles = flow direction · Stagnation = warm · Suction = cool</div></div>';
    this.canvas = root.querySelector('#fl-c');
    this.ctx = this.canvas.getContext('2d');
    this.particles = Array.from({length: 220}, () => this.spawn());
    root.querySelector('#fl-u').oninput = e => { this.U = +e.target.value; };
    root.querySelector('#fl-lines').onchange = e => { this.showLines = e.target.checked; };
    root.querySelector('#fl-cp').onchange = e => { this.showCp = e.target.checked; };
    this.cx = this.canvas.width * 0.42;
    this.cy = this.canvas.height * 0.52;
    this.loop();
  }
  spawn() {
    return { x: Math.random() * 80, y: 40 + Math.random() * (this.canvas?.height || 440) - 40, age: 0 };
  }
  vel(x, y) {
    const dx = x - this.cx, dy = y - this.cy;
    const r2 = dx*dx + dy*dy, a2 = this.a*this.a;
    if (r2 < a2 * 0.85) return { u: 0, v: 0, inside: true };
    const r4 = r2*r2;
    const u = this.U * (1 - a2 * (dx*dx - dy*dy) / r4);
    const v = -this.U * (2 * a2 * dx * dy / r4);
    return { u, v, inside: false };
  }
  cp(x, y) {
    const { u, v, inside } = this.vel(x, y);
    if (inside) return 1;
    const mag = Math.hypot(u, v) / this.U;
    return 1 - mag*mag;
  }
  drawBody() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.cx, this.cy);
    ctx.fillStyle = '#1a2230';
    ctx.strokeStyle = '#3d9eff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.a * 1.35, this.a * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (this.showCp) {
      const steps = 36;
      for (let i = 0; i < steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const px = Math.cos(t) * this.a * 1.35;
        const py = Math.sin(t) * this.a * 0.55;
        const c = this.cp(this.cx + px, this.cy + py);
        const hue = 200 - c * 120;
        ctx.strokeStyle = 'hsla(' + hue + ',90%,55%,0.85)';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI*2);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
  loop() {
    const ctx = this.ctx, w = this.canvas.width, h = this.canvas.height;
    ctx.fillStyle = 'rgba(6,8,12,0.22)';
    ctx.fillRect(0, 0, w, h);
    if (this.showLines) {
      ctx.strokeStyle = 'rgba(46,230,200,0.12)';
      for (let y = 30; y < h; y += 28) {
        ctx.beginPath();
        let px = 0, py = y;
        ctx.moveTo(px, py);
        for (let s = 0; s < 140; s++) {
          const { u, v, inside } = this.vel(px, py);
          if (inside) break;
          px += u * 2.2; py += v * 2.2;
          ctx.lineTo(px, py);
          if (px > w) break;
        }
        ctx.stroke();
      }
    }
    this.drawBody();
    for (const p of this.particles) {
      const { u, v, inside } = this.vel(p.x, p.y);
      if (inside || p.x > w + 10 || p.y < 0 || p.y > h) { Object.assign(p, this.spawn()); continue; }
      p.x += u * 2.8; p.y += v * 2.8; p.age++;
      ctx.fillStyle = 'rgba(61,158,255,0.75)';
      ctx.fillRect(p.x, p.y, 2, 2);
    }
    requestAnimationFrame(() => this.loop());
  }
}

function initFlowLab() {
  const root = document.getElementById('flow-lab-root');
  if (root) new FlowLab(root);
}

function initQuiz() {
  const root = document.getElementById('quiz-root');
  let score = 0, idx = 0, done = false;
  function render() {
    if (idx >= quizData.length) {
      root.innerHTML = '<p class="quiz-score">Score: ' + score + ' / ' + quizData.length + '</p><button id="retry">Retry</button>';
      root.querySelector('#retry').onclick = () => { score = 0; idx = 0; done = false; render(); };
      return;
    }
    const item = quizData[idx];
    root.innerHTML = '<div class="progress-bar"><span style="width:' + ((idx/quizData.length)*100) + '%"></span></div><div class="quiz-q"><strong>Q' + (idx+1) + '.</strong> ' + item.q + '</div><div class="quiz-options" id="opts"></div>';
    const opts = root.querySelector('#opts');
    item.a.forEach((text, i) => {
      const b = document.createElement('button');
      b.textContent = text;
      b.onclick = () => {
        if (done) return;
        done = true;
        if (i === item.correct) { b.classList.add('correct'); score++; }
        else { b.classList.add('wrong'); opts.children[item.correct].classList.add('correct'); }
        setTimeout(() => { idx++; done = false; render(); }, 700);
      };
      opts.appendChild(b);
    });
  }
  render();
}

mountNav();
show('home');
document.getElementById('sidebar')?.addEventListener('click', () => {});
const mt = document.getElementById('menuToggle');
if (mt) mt.onclick = () => document.getElementById('sidebar').classList.toggle('open');
