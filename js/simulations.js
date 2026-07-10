export function initLabs(root) {
  root.innerHTML = `
    <div class="card"><h2>Interactive Labs</h2><p class="summary">Play with the core mechanics—continuity, Bernoulli intuition, boundary layers, and separation.</p></div>
    <div class="sim-grid">
      <div class="card sim-card" id="lab-venturi"></div>
      <div class="card sim-card" id="lab-stream"></div>
      <div class="card sim-card" id="lab-bl"></div>
      <div class="card sim-card" id="lab-sep"></div>
    </div>`;
  mountVenturi(document.getElementById('lab-venturi'));
  mountStreamlines(document.getElementById('lab-stream'));
  mountBoundaryLayer(document.getElementById('lab-bl'));
  mountSeparation(document.getElementById('lab-sep'));
}

function mountVenturi(el) {
  el.innerHTML = `<h3>Venturi (continuity)</h3><p>Narrow throat → faster flow (color = speed).</p><canvas class="sim-canvas" width="640" height="220"></canvas>
    <div class="controls"><label>Throat width <input type="range" id="venturi-w" min="30" max="120" value="55"></label></div>`;
  const c = el.querySelector('canvas');
  const ctx = c.getContext('2d');
  const slider = el.querySelector('#venturi-w');
  function draw() {
    const w = +slider.value;
    ctx.clearRect(0,0,c.width,c.height);
    const cy = c.height/2;
    ctx.fillStyle = '#161d28';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 40);
    ctx.lineTo(220, 40);
    ctx.quadraticCurveTo(280, 40, 300, cy - w/2);
    ctx.lineTo(340, cy - w/2);
    ctx.quadraticCurveTo(360, cy - w/2, 380, 40);
    ctx.lineTo(600, 40);
    ctx.moveTo(40, c.height-40);
    ctx.lineTo(220, c.height-40);
    ctx.quadraticCurveTo(280, c.height-40, 300, cy + w/2);
    ctx.lineTo(340, cy + w/2);
    ctx.quadraticCurveTo(360, cy + w/2, 380, c.height-40);
    ctx.lineTo(600, c.height-40);
    ctx.stroke();
    const throat = w;
    const base = 120;
    const speedAt = (x) => {
      if (x < 280 || x > 360) return 1;
      return base / throat;
    };
    for (let i = 0; i < 40; i++) {
      const x = 50 + ((Date.now()/15 + i*18) % 520);
      const sp = speedAt(x);
      const hue = 180 - Math.min(120, sp * 40);
      ctx.fillStyle = `hsla(${hue},80%,55%,0.85)`;
      ctx.beginPath();
      ctx.arc(x, cy + Math.sin(i*0.7)* (throat*0.35), 3, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.fillStyle = '#8b9cb3';
    ctx.font = '12px system-ui';
    ctx.fillText(`v_throat / v_inlet ≈ ${(base/throat).toFixed(2)}`, 20, 20);
  }
  slider.addEventListener('input', draw);
  setInterval(draw, 40);
  draw();
}

function mountStreamlines(el) {
  el.innerHTML = `<h3>Streamlines past a body</h3><p>Laminar-style flow lines; watch stagnation and wake.</p><canvas class="sim-canvas" width="640" height="220"></canvas>
    <div class="controls"><label>Free-stream speed <input type="range" id="stream-v" min="1" max="10" value="5"></label></div>`;
  const c = el.querySelector('canvas');
  const ctx = c.getContext('2d');
  const slider = el.querySelector('#stream-v');
  const cx = 280, cy = 110, R = 42;
  function draw() {
    const U = +slider.value;
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = '#080c10';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = '#2a3544';
    ctx.beginPath();
    ctx.ellipse(cx, cy, R*1.6, R*0.55, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#3ddea8';
    ctx.stroke();
    for (let s = 0; s < 14; s++) {
      const y0 = 25 + s * 13;
      ctx.strokeStyle = `hsla(${160 + s*3},70%,55%,0.7)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      let started = false;
      for (let x = 20; x < 620; x += 4) {
        const dx = x - cx, dy = y0 - cy;
        const r2 = dx*dx + dy*dy;
        let vy = 0;
        if (r2 < (R*1.7)**2) {
          const deflect = (R*1.7)**2 / Math.max(r2, 400);
          vy = (dy / Math.sqrt(r2+1)) * deflect * 0.15 * U;
        }
        const y = y0 + vy * Math.sin(x*0.02 + s);
        if (!started) { ctx.moveTo(x,y); started=true; } else ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = '#8b9cb3';
    ctx.font = '12px system-ui';
    ctx.fillText('Stagnation: lines pile up on the nose', 20, 18);
  }
  slider.addEventListener('input', draw);
  draw();
}

function mountBoundaryLayer(el) {
  el.innerHTML = `<h3>Boundary layer profile</h3><p>Velocity grows from 0 at the wall to free stream U.</p><canvas class="sim-canvas" width="640" height="220"></canvas>
    <div class="controls"><label>Re (turbulent ↔ laminar shape) <input type="range" id="bl-re" min="0" max="100" value="70"></label></div>`;
  const c = el.querySelector('canvas');
  const ctx = c.getContext('2d');
  const slider = el.querySelector('#bl-re');
  function draw() {
    const t = +slider.value / 100;
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = '#080c10';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = '#3ddea8';
    ctx.fillRect(40, 170, 560, 8);
    ctx.fillStyle = '#8b9cb3';
    ctx.fillText('Wall (no-slip: u=0)', 40, 200);
    const U = 1;
    ctx.beginPath();
    for (let n = 0; n <= 100; n++) {
      const eta = n / 100;
      const y = 170 - eta * 130;
      const uL = Math.sqrt(eta);
      const uT = Math.pow(eta, 1/7);
      const u = U * (uL * (1-t) + uT * t);
      const x = 80 + u * 480;
      if (n===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.strokeStyle = '#c77dff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#8b9cb3';
    ctx.font = '12px system-ui';
    ctx.fillText(`Blend: laminar √ profile ↔ turbulent 1/7 power law (slider)`, 40, 24);
  }
  slider.addEventListener('input', draw);
  draw();
}

function mountSeparation(el) {
  el.innerHTML = `<h3>Separation & adverse gradient</h3><p>Increase ramp angle until the boundary layer cannot stay attached.</p><canvas class="sim-canvas" width="640" height="220"></canvas>
    <div class="controls"><label>Ramp angle <input type="range" id="sep-a" min="0" max="28" value="8"></label></div>`;
  const c = el.querySelector('canvas');
  const ctx = c.getContext('2d');
  const slider = el.querySelector('#sep-a');
  function draw() {
    const deg = +slider.value;
    const rad = deg * Math.PI/180;
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = '#080c10';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, 150);
    ctx.lineTo(320, 150);
    ctx.lineTo(320 + Math.cos(rad)*120, 150 - Math.sin(rad)*120);
    ctx.stroke();
    const separated = deg > 16;
    ctx.strokeStyle = separated ? '#ff6b6b' : '#3ddea8';
    ctx.beginPath();
    ctx.moveTo(40, 130);
    for (let x = 40; x < 320; x+=5) {
      const y = 130 - 15*Math.sin((x-40)/40);
      ctx.lineTo(x,y);
    }
    if (separated) {
      ctx.lineTo(400, 60);
      ctx.quadraticCurveTo(480, 100, 560, 80);
    } else {
      ctx.lineTo(440, 130 - Math.sin(rad)*30);
    }
    ctx.stroke();
    ctx.fillStyle = '#8b9cb3';
    ctx.font = '12px system-ui';
    ctx.fillText(separated ? 'Separated: wake + pressure drag' : 'Attached flow', 40, 24);
  }
  slider.addEventListener('input', draw);
  draw();
}
