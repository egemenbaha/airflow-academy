export const sections = [
  { id: 'home', group: 'Start', title: 'Overview', render: () => `
    <h1>Airflow Academy</h1>
    <p class="lead">Learn airflow mechanics from first principles through CFD, wind tunnels, and modern supercar aerodynamics.</p>
    <div class="card"><strong>How to use this app</strong><ol>
      <li>Read modules in order (Fundamentals → Forces → Vehicles).</li>
      <li>Use the <em>Flow Lab</em> to see streamlines and pressure around a body.</li>
      <li>Finish with quizzes to lock in concepts.</li>
    </ol></div>
    <div class="card"><strong>What you will master</strong><ul>
      <li>Continuity, Bernoulli, boundary layers, separation</li>
      <li>Drag, downforce, pressure vs friction</li>
      <li>Reynolds number, turbulence, CFD workflow</li>
      <li>How Ferrari, Lamborghini, McLaren, Bugatti engineer aero</li>
    </ul></div>
  `},
  { id: 'fluids', group: 'Fundamentals', title: 'Air as a fluid', render: () => `
    <h1>Air as a fluid</h1>
    <p class="lead">Aerodynamics is fluid mechanics at road speeds. Air is a compressible gas, but near cars we often treat it as incompressible up to ~120 mph.</p>
    <h2>Continuity</h2>
    <p>Mass is conserved. In a steady duct, narrowing the area speeds the flow.</p>
    <div class="formula">A₁V₁ = A₂V₂ &nbsp; (incompressible, steady)</div>
    <p>Faster flow in a constriction is not magic—it is continuity balancing mass flow.</p>
    <h2>Streamlines & pathlines</h2>
    <p>A <strong>streamline</strong> is tangent to the velocity field at an instant. A <strong>pathline</strong> is the actual trajectory of a fluid particle. In steady flow they match.</p>
    <div class="card">CFD and wind-tunnel smoke show pathlines. Your Flow Lab animates particles along the local velocity field.</div>
  `},
  { id: 'bernoulli', group: 'Fundamentals', title: 'Bernoulli & pressure', render: () => `
    <h1>Bernoulli & static pressure</h1>
    <p class="lead">Along a streamline (inviscid, steady, incompressible), trading speed for pressure explains lift, suction on curved roofs, and pitot tubes.</p>
    <div class="formula">p + ½ρV² + ρgh = constant</div>
    <p>At the same height: <strong>where speed rises, static pressure falls</strong> (and vice versa).</p>
    <h2>Pressure coefficient Cp</h2>
    <div class="formula">Cp = (p - p∞) / (½ρV∞²)</div>
    <p>Engineers plot Cp on car bodies. Blue (low Cp) is suction; red (high Cp) is stagnation pressure on the nose.</p>
    <div class="card highlight">Supercar CFD images color the body by Cp or velocity—exactly what you visualized on the McLaren P1 simulation.</div>
  `},
  { id: 'boundary', group: 'Fundamentals', title: 'Boundary layer', render: () => `
    <h1>Boundary layer & viscosity</h1>
    <p class="lead">Real air sticks at the surface (no-slip). A thin boundary layer grows from zero velocity at the paint to free-stream speed.</p>
    <h2>Laminar vs turbulent</h2>
    <ul>
      <li><strong>Laminar:</strong> smooth layers, lower skin friction initially, fragile to adverse pressure gradients.</li>
      <li><strong>Turbulent:</strong> mixes momentum, thicker layer, higher skin friction, resists separation longer.</li>
    </ul>
    <h2>Flow separation</h2>
    <p>When the pressure rises too quickly downstream (adverse gradient), the boundary layer detaches. A wake forms → pressure drag spikes. Rear diffusers and wings manage this on supercars.</p>
    <div class="formula">Re = ρVL/μ &nbsp; (Reynolds number)</div>
    <p>Large Re ⇒ inertia dominates viscosity; small scales behave differently than full car in tunnel.</p>
  `},
  { id: 'forces', group: 'Forces', title: 'Drag & downforce', render: () => `
    <h1>Drag & downforce</h1>
    <p class="lead">Drag opposes motion. Downforce pushes the car into the track for grip—paid for with drag and often cooling trade-offs.</p>
    <h2>Drag components</h2>
    <table class="data"><tr><th>Type</th><th>Cause</th></tr>
    <tr><td>Pressure (form)</td><td>Wake, separation, blunt rear</td></tr>
    <tr><td>Skin friction</td><td>Shear in boundary layer</td></tr>
    <tr><td>Induced</td><td>Lift/downforce creating vortices (wings)</td></tr></table>
    <div class="formula">D = ½ρV² S Cd &nbsp;&nbsp;|&nbsp;&nbsp; L = ½ρV² S Cl</div>
    <p><strong>Cd</strong> and <strong>Cl</strong> are non-dimensional; they let teams compare shapes independent of speed.</p>
    <h2>Aero balance</h2>
    <p>Front vs rear downforce affects understeer/oversteer. Tunnels and CFD iterate splitters, floors, diffusers, and wings for balance at 200+ mph.</p>
  `},
  { id: 'cfd', group: 'Engineering', title: 'CFD & wind tunnel', render: () => `
    <h1>CFD & wind tunnels</h1>
    <p class="lead">Modern supercars are shaped by simulation plus physical validation.</p>
    <h2>CFD pipeline</h2>
    <ol>
      <li>CAD surface → watertight mesh (often millions of cells)</li>
      <li>Choose turbulence model (RANS, DES, LES for detail)</li>
      <li>Boundary conditions: inlet velocity, outlet pressure, moving ground</li>
      <li>Solve Navier–Stokes; extract forces, Cp, streamlines</li>
    </ol>
    <div class="formula">ρ(∂v/∂t + v·∇v) = -∇p + μ∇²v + f (Navier–Stokes)</div>
    <h2>Wind tunnel</h2>
    <p>Scale models or full cars on rolling roads with smoke, pressure taps, and force balances. McLaren reported 350+ tunnel hours and thousands of CFD runs for the W1 program; Bugatti refines the Tourbillon with CFD then tunnel models.</p>
    <div class="card">Your animated McLaren P1 clip is the <em>communication layer</em> on top of this engineering stack.</div>
  `},
  { id: 'reading', group: 'Engineering', title: 'Reading CFD', render: () => `<h1>Reading CFD visuals</h1><p class="lead">Streamline bundles = higher speed; nose pile-up = stagnation; rear swirls = vortices; detached wake = separation.</p><div class="card highlight">Matches your McLaren P1 airflow animation vocabulary.</div>`},
  { id: 'supercars', group: 'Case studies', title: 'Supercar aero', render: () => `
    <h1>Supercar aerodynamics</h1>
    <p class="lead">Each brand optimizes downforce, cooling, drag, and stability differently.</p>
    <table class="data"><tr><th>Car</th><th>Aero focus</th></tr>
    <tr><td>Ferrari SF90 Stradale</td><td>Hybrid cooling, active aero, rear diffuser management</td></tr>
    <tr><td>Lamborghini Revuelto</td><td>Sharp surfacing, splitter/load on front axle, high downforce modes</td></tr>
    <tr><td>McLaren P1 / W1</td><td>Active rear wing, long-tail concepts, extreme Cl with drag control (DRS-style)</td></tr>
    <tr><td>Bugatti Chiron SS</td><td>Low drag at 400+ km/h, stability, cooling at extreme Reynolds numbers</td></tr></table>
    <p>Common tools: underbody tunnels, diffusers accelerating air to reduce pressure under the floor, vortex generators where separation is a risk.</p>
  `},
  { id: 'navier', group: 'Fundamentals', title: 'Navier-Stokes', render: () => `<h1>Navier-Stokes</h1><p class="lead">CFD solves Reynolds-averaged Navier-Stokes on a mesh.</p><div class="formula">rho(dv/dt + v grad v) = -grad p + mu laplacian v</div><p>Vorticity concentrates in wheel and wing-tip wakes.</p>`},
  { id: 'lab', group: 'Lab', title: 'Flow Lab', render: () => `
    <h1>Interactive Flow Lab</h1>
    <p class="lead">2D potential-flow past a cylinder (classic textbook solution). The silhouette is drawn as a supercar-like ellipse for context—physics is idealized inviscid flow.</p>
    <div id="flow-lab-root"></div>
    <div class="card"><strong>Observe:</strong> stagnation at the nose (high pressure), suction on curved sides (low Cp), closed streamlines in the near wake in inviscid theory. Real cars separate at the rear—turbulent wake and higher drag.</div>
  `},
  { id: 'sims', group: 'Lab', title: 'Mechanics labs', render: () => `<h1>Mechanics labs</h1><p class="lead">Venturi, streamlines, boundary layer, separation.</p><div id="mechanics-labs-root"></div>`},
  { id: 'glossary', group: 'Assess', title: 'Glossary', render: () => `<h1>Glossary</h1><p>Bernoulli, BL, Cp, CFD, downforce, induced drag, Re, separation, streamline.</p>`},
  { id: 'quiz', group: 'Assess', title: 'Quiz', render: () => `
    <h1>Knowledge check</h1>
    <p class="lead">10 questions across fundamentals and vehicle aero.</p>
    <div id="quiz-root"></div>
  `}
];
