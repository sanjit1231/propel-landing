// Physics Simulator with Three.js
// Interactive simulations for AP Physics concepts

let simulationScene = null;
let simulationCamera = null;
let simulationRenderer = null;
let currentSimulation = 'magneticForce';
let animationId = null;

const simulationConfigs = {
  magneticForce: {
    name: 'Magnetic Force on Moving Charge',
    description: 'Visualize the Lorentz force on a charged particle in a magnetic field',
    controls: [
      { name: 'Velocity (m/s)', min: 1e6, max: 5e6, step: 0.5e6, default: 3e6, unit: '×10⁶' },
      { name: 'Magnetic Field (T)', min: 0.1, max: 1, step: 0.1, default: 0.5, unit: 'T' },
      { name: 'Charge (μC)', min: 0.5, max: 5, step: 0.5, default: 1, unit: 'μC' }
    ]
  },
  harmonicMotion: {
    name: 'Simple Harmonic Motion',
    description: 'A mass on a spring oscillating back and forth',
    controls: [
      { name: 'Amplitude (cm)', min: 5, max: 20, step: 1, default: 10, unit: 'cm' },
      { name: 'Spring Constant (N/m)', min: 10, max: 100, step: 10, default: 50, unit: 'N/m' },
      { name: 'Mass (kg)', min: 0.1, max: 2, step: 0.1, default: 1, unit: 'kg' }
    ]
  },
  waveInterference: {
    name: 'Wave Interference',
    description: 'Two waves creating constructive and destructive interference patterns',
    controls: [
      { name: 'Frequency 1 (Hz)', min: 1, max: 5, step: 0.5, default: 2, unit: 'Hz' },
      { name: 'Frequency 2 (Hz)', min: 1, max: 5, step: 0.5, default: 2.2, unit: 'Hz' },
      { name: 'Amplitude (m)', min: 0.5, max: 3, step: 0.25, default: 1, unit: 'm' }
    ]
  },
  projectileMotion: {
    name: 'Projectile Motion',
    description: 'Launch a projectile at different angles and initial velocities',
    controls: [
      { name: 'Launch Angle (°)', min: 0, max: 90, step: 5, default: 45, unit: '°' },
      { name: 'Initial Velocity (m/s)', min: 5, max: 50, step: 5, default: 20, unit: 'm/s' },
      { name: 'Gravity (m/s²)', min: 1, max: 20, step: 1, default: 9.8, unit: 'm/s²' }
    ]
  },
  orbitalMotion: {
    name: 'Orbital Mechanics',
    description: 'Planet orbiting a star under gravitational force',
    controls: [
      { name: 'Orbital Velocity (km/s)', min: 10, max: 50, step: 5, default: 30, unit: 'km/s' },
      { name: 'Mass of Star (×10³⁰ kg)', min: 0.5, max: 3, step: 0.5, default: 2, unit: '×10³⁰' },
      { name: 'Initial Distance (AU)', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'AU' }
    ]
  }
};

function initPhysicsSimulator() {
  const content = document.getElementById('simulatorContent');

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1400px;">
      <!-- Left: Simulation Controls -->
      <div>
        <div style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2); border-radius: 16px; padding: 24px; position: sticky; top: 80px;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Simulations</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
            ${Object.entries(simulationConfigs).map(([key, config]) => `
              <button onclick="selectSimulation('${key}')" style="text-align: left; padding: 12px; border: 1px solid ${currentSimulation === key ? 'var(--violet)' : 'var(--border)'}; background: ${currentSimulation === key ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.02)'}; color: #fff; border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s;">
                <div style="font-weight: 600; font-size: 13px;">${config.name}</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${config.description}</div>
              </button>
            `).join('')}
          </div>

          <!-- Dynamic Controls -->
          <div id="controlsPanel" style="display: flex; flex-direction: column; gap: 16px;"></div>

          <!-- Play/Pause Controls -->
          <div style="display: flex; gap: 8px; margin-top: 24px;">
            <button onclick="toggleSimulation()" id="playPauseBtn" style="flex: 1; padding: 10px; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); color: var(--violet-light); border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif;">
              Play
            </button>
            <button onclick="resetSimulation()" style="flex: 1; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: #fff; border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif;">
              Reset
            </button>
          </div>

          <!-- Info Panel -->
          <div id="infoPanel" style="background: rgba(255,255,255,0.02); border-radius: 12px; padding: 16px; margin-top: 24px; font-size: 13px; line-height: 1.6; color: var(--text-muted);"></div>
        </div>
      </div>

      <!-- Right: Simulation Canvas -->
      <div style="display: flex; flex-direction: column;">
        <div id="simulationCanvas" style="flex: 1; background: linear-gradient(135deg, rgba(30,30,50,0.8), rgba(50,30,80,0.6)); border: 1px solid rgba(124,58,237,0.2); border-radius: 16px; min-height: 600px; position: relative;"></div>
        <div id="statsPanel" style="background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.2); border-radius: 12px; padding: 16px; margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; font-size: 13px;"></div>
      </div>
    </div>
  `;

  renderControls();
  initThreeJS();
  startSimulation();
}

function renderControls() {
  const config = simulationConfigs[currentSimulation];
  const controlsPanel = document.getElementById('controlsPanel');

  controlsPanel.innerHTML = config.controls.map((control, idx) => `
    <div>
      <label style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
        <span>${control.name}</span>
        <span id="value-${idx}" style="color: var(--accent);">${control.default} ${control.unit}</span>
      </label>
      <input type="range" min="${control.min}" max="${control.max}" step="${control.step}" value="${control.default}" onchange="updateSimulationParam(${idx}, this.value)" style="width: 100%; cursor: pointer;">
    </div>
  `).join('');
}

function updateSimulationParam(idx, value) {
  const config = simulationConfigs[currentSimulation];
  document.getElementById(`value-${idx}`).textContent = `${value} ${config.controls[idx].unit}`;
  updateSimulation();
}

function selectSimulation(key) {
  currentSimulation = key;
  if (animationId) cancelAnimationFrame(animationId);
  initPhysicsSimulator();
}

function initThreeJS() {
  const canvas = document.getElementById('simulationCanvas');
  canvas.innerHTML = ''; // Clear any existing canvas

  // Scene setup
  simulationScene = new THREE.Scene();
  simulationScene.background = new THREE.Color(0x1a1a2e);

  simulationCamera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  simulationCamera.position.z = 20;

  simulationRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  simulationRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  simulationRenderer.shadowMap.enabled = true;
  canvas.appendChild(simulationRenderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  simulationScene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.set(20, 20, 20);
  pointLight.castShadow = true;
  simulationScene.add(pointLight);

  // Load Three.js from CDN if not loaded
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    document.head.appendChild(script);
  }

  setupSimulationScene();
}

function setupSimulationScene() {
  // Clear previous objects
  simulationScene.children = simulationScene.children.filter(obj => obj instanceof THREE.Light);

  switch(currentSimulation) {
    case 'magneticForce':
      setupMagneticForce();
      break;
    case 'harmonicMotion':
      setupHarmonicMotion();
      break;
    case 'waveInterference':
      setupWaveInterference();
      break;
    case 'projectileMotion':
      setupProjectileMotion();
      break;
    case 'orbitalMotion':
      setupOrbitalMotion();
      break;
  }

  updateInfoPanel();
}

function setupMagneticForce() {
  // Field representation
  const fieldGeometry = new THREE.PlaneGeometry(30, 30);
  const fieldMaterial = new THREE.MeshBasicMaterial({
    color: 0x4f46e5,
    wireframe: true,
    transparent: true,
    opacity: 0.1
  });
  const fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
  fieldMesh.position.z = -5;
  simulationScene.add(fieldMesh);

  // Charge particle
  const chargeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const chargeMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
  const chargeMesh = new THREE.Mesh(chargeGeometry, chargeMaterial);
  chargeMesh.position.set(-10, 0, 0);
  simulationScene.add(chargeMesh);
  simulationScene.userData.chargeMesh = chargeMesh;

  // Velocity vector
  const arrowGeometry = new THREE.ConeGeometry(0.3, 2, 8);
  const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0x34d399 });
  const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
  arrow.position.set(-8, 0, 0);
  simulationScene.add(arrow);
  simulationScene.userData.velocityArrow = arrow;

  // Force vector
  const forceArrow = new THREE.Mesh(arrowGeometry, new THREE.MeshPhongMaterial({ color: 0xfbbf24 }));
  forceArrow.position.set(-10, 2, 0);
  simulationScene.add(forceArrow);
  simulationScene.userData.forceArrow = forceArrow;

  simulationScene.userData.time = 0;
}

function setupHarmonicMotion() {
  // Spring
  const springGeometry = new THREE.TubeGeometry(
    new THREE.LineCurve3(new THREE.Vector3(-8, 0, 0), new THREE.Vector3(0, 0, 0)),
    8, 0.15, 8
  );
  const springMaterial = new THREE.MeshPhongMaterial({ color: 0x60a5fa });
  const spring = new THREE.Mesh(springGeometry, springMaterial);
  simulationScene.add(spring);

  // Mass
  const massGeometry = new THREE.BoxGeometry(1, 1, 1);
  const massMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
  const mass = new THREE.Mesh(massGeometry, massMaterial);
  mass.position.x = 5;
  simulationScene.add(mass);
  simulationScene.userData.mass = mass;

  // Wall
  const wallGeometry = new THREE.BoxGeometry(0.5, 10, 0.5);
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.x = -8;
  simulationScene.add(wall);

  simulationScene.userData.time = 0;
}

function setupWaveInterference() {
  // Two wave sources
  const sourceGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const sourceMaterial = new THREE.MeshPhongMaterial({ color: 0x34d399 });

  const source1 = new THREE.Mesh(sourceGeometry, sourceMaterial);
  source1.position.set(-8, 3, 0);
  simulationScene.add(source1);

  const source2 = new THREE.Mesh(sourceGeometry.clone(), sourceMaterial.clone());
  source2.position.set(-8, -3, 0);
  simulationScene.add(source2);

  // Wave visualization with particles
  const particleGeometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  const color = new THREE.Color();

  for (let x = -5; x < 15; x += 0.5) {
    for (let y = -10; y < 10; y += 0.5) {
      positions.push(x, y, 0);
      colors.push(0.5, 0.5, 0.5);
    }
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

  const particleMaterial = new THREE.PointsMaterial({ size: 0.3, sizeAttenuation: true, vertexColors: true });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  simulationScene.add(particles);
  simulationScene.userData.particles = particles;

  simulationScene.userData.time = 0;
}

function setupProjectileMotion() {
  // Ground
  const groundGeometry = new THREE.PlaneGeometry(40, 1);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.y = -8;
  ground.rotation.x = -Math.PI / 2;
  simulationScene.add(ground);

  // Projectile
  const projectileGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const projectileMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
  const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
  projectile.position.set(-15, -7, 0);
  simulationScene.add(projectile);
  simulationScene.userData.projectile = projectile;

  // Trajectory line
  const lineGeometry = new THREE.BufferGeometry();
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 });
  const line = new THREE.Line(lineGeometry, lineMaterial);
  simulationScene.add(line);
  simulationScene.userData.trajectoryLine = line;

  simulationScene.userData.time = 0;
}

function setupOrbitalMotion() {
  // Star
  const starGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const starMaterial = new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24 });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  simulationScene.add(star);

  // Orbit path
  const orbitGeometry = new THREE.BufferGeometry();
  const orbitPoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    orbitPoints.push(Math.cos(angle) * 12, Math.sin(angle) * 12, 0);
  }
  orbitGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(orbitPoints), 3));
  const orbitLine = new THREE.Line(orbitGeometry, new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.4 }));
  simulationScene.add(orbitLine);

  // Planet
  const planetGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x60a5fa });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.position.set(12, 0, 0);
  simulationScene.add(planet);
  simulationScene.userData.planet = planet;

  simulationScene.userData.time = 0;
}

function updateSimulation() {
  const config = simulationConfigs[currentSimulation];
  const params = config.controls.map((_, idx) => parseFloat(document.getElementById(`value-${idx}`).textContent));

  switch(currentSimulation) {
    case 'magneticForce':
      updateMagneticForce(params);
      break;
    case 'harmonicMotion':
      updateHarmonicMotion(params);
      break;
    case 'waveInterference':
      updateWaveInterference(params);
      break;
    case 'projectileMotion':
      updateProjectileMotion(params);
      break;
    case 'orbitalMotion':
      updateOrbitalMotion(params);
      break;
  }
}

function updateMagneticForce(params) {
  const [v, B, q] = params;
  const chargeMesh = simulationScene.userData.chargeMesh;

  // Lorentz force: F = q * v * B
  const F = (q * 1e-6) * (v * 1e6) * B;
  const normalizedF = Math.min(F / 1e-13, 5); // Scale for visualization

  if (chargeMesh) {
    chargeMesh.position.y += normalizedF * 0.01;
    if (chargeMesh.position.y > 8) chargeMesh.position.y = -8;
  }

  updateInfoPanel();
}

function updateHarmonicMotion(params) {
  const [A, k, m] = params;
  const mass = simulationScene.userData.mass;

  if (mass) {
    // Angular frequency: ω = sqrt(k/m)
    const omega = Math.sqrt(k / m);
    const displacement = (A / 100) * Math.sin(simulationScene.userData.time * omega);
    mass.position.x = 5 + displacement;
  }

  updateInfoPanel();
}

function updateWaveInterference(params) {
  const [f1, f2, A] = params;
  const particles = simulationScene.userData.particles;

  if (particles && particles.geometry.attributes.position) {
    const positions = particles.geometry.attributes.position.array;
    const colors = particles.geometry.attributes.color.array;
    const t = simulationScene.userData.time;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const d1 = Math.sqrt((x + 8) ** 2 + (y - 3) ** 2);
      const d2 = Math.sqrt((x + 8) ** 2 + (y + 3) ** 2);

      const wave1 = A * Math.sin(2 * Math.PI * f1 * (t - d1 / 10));
      const wave2 = A * Math.sin(2 * Math.PI * f2 * (t - d2 / 10));
      const resultant = wave1 + wave2;

      const intensity = Math.abs(resultant) / (2 * A);
      colors[i] = intensity;
      colors[i + 1] = 0.3 + intensity * 0.4;
      colors[i + 2] = 1 - intensity * 0.5;
    }
    particles.geometry.attributes.color.needsUpdate = true;
  }

  updateInfoPanel();
}

function updateProjectileMotion(params) {
  const [angle, v0, g] = params;
  const projectile = simulationScene.userData.projectile;
  const trajectoryLine = simulationScene.userData.trajectoryLine;

  if (projectile) {
    const rad = (angle * Math.PI) / 180;
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad);
    const t = simulationScene.userData.time / 10;

    const x = -15 + vx * t;
    const y = -7 + vy * t - 0.5 * g * t * t;

    projectile.position.x = x;
    projectile.position.y = y;

    if (y <= -8 && projectile.position.x > -15) {
      simulationScene.userData.time = 0;
    }

    // Draw trajectory
    if (trajectoryLine) {
      const points = [];
      for (let i = 0; i <= 50; i++) {
        const ti = (i / 50) * 5;
        points.push(
          new THREE.Vector3(
            -15 + vx * ti,
            -7 + vy * ti - 0.5 * g * ti * ti,
            0
          )
        );
      }
      trajectoryLine.geometry = new THREE.BufferGeometry().setFromPoints(points);
    }
  }

  updateInfoPanel();
}

function updateOrbitalMotion(params) {
  const [v, Mstar, r] = params;
  const planet = simulationScene.userData.planet;

  if (planet) {
    // Orbital period: T = 2π * sqrt(r³ / (GM))
    const G = 6.674e-11;
    const M = Mstar * 1e30;
    const R = r * 1.496e11; // AU to meters
    const T = 2 * Math.PI * Math.sqrt((R ** 3) / (G * M));

    const angle = (simulationScene.userData.time / T) * Math.PI * 2;
    planet.position.x = Math.cos(angle) * (r * 3);
    planet.position.y = Math.sin(angle) * (r * 3);
  }

  updateInfoPanel();
}

function updateInfoPanel() {
  const config = simulationConfigs[currentSimulation];
  const infoPanel = document.getElementById('infoPanel');

  let content = `<strong>${config.name}</strong><br><br>`;

  switch(currentSimulation) {
    case 'magneticForce':
      const [v, B, q] = config.controls.map((_, idx) => parseFloat(document.getElementById(`value-${idx}`).textContent));
      const F = (q * 1e-6) * (v * 1e6) * B;
      content += `Lorentz Force: F = qvB<br>F = ${F.toExponential(2)} N<br><br>`;
      content += `The force is perpendicular to both velocity and magnetic field.`;
      break;
    case 'harmonicMotion':
      const [A, k, m] = config.controls.map((_, idx) => parseFloat(document.getElementById(`value-${idx}`).textContent));
      const omega = Math.sqrt(k / m);
      const period = 2 * Math.PI / omega;
      const freq = 1 / period;
      content += `Angular Frequency: ω = ${omega.toFixed(2)} rad/s<br>`;
      content += `Period: T = ${period.toFixed(2)} s<br>`;
      content += `Frequency: f = ${freq.toFixed(2)} Hz<br><br>`;
      content += `T = 2π√(m/k)`;
      break;
    case 'waveInterference':
      const [f1, f2, amp] = config.controls.map((_, idx) => parseFloat(document.getElementById(`value-${idx}`).textContent));
      const beatFreq = Math.abs(f1 - f2);
      content += `Wave 1: f₁ = ${f1} Hz<br>`;
      content += `Wave 2: f₂ = ${f2} Hz<br>`;
      content += `Beat Frequency: ${beatFreq.toFixed(1)} Hz<br><br>`;
      content += `Interference creates areas of constructive (bright) and destructive (dark) wave patterns.`;
      break;
    case 'projectileMotion':
      const [ang, vel, gravity] = config.controls.map((_, idx) => parseFloat(document.getElementById(`value-${idx}`).textContent));
      const rad = (ang * Math.PI) / 180;
      const maxHeight = (vel ** 2 * Math.sin(rad) ** 2) / (2 * gravity);
      const range = (vel ** 2 * Math.sin(2 * rad)) / gravity;
      content += `Max Height: ${maxHeight.toFixed(1)} m<br>`;
      content += `Range: ${range.toFixed(1)} m<br>`;
      content += `Time of Flight: ${(2 * vel * Math.sin(rad) / gravity).toFixed(2)} s<br><br>`;
      content += `y = x·tan(θ) - (g·x²)/(2v₀²·cos²(θ))`;
      break;
    case 'orbitalMotion':
      const [vorb, mstar, dist] = config.controls.map((_, idx) => parseFloat(document.getElementById(`value-${idx}`).textContent));
      const G = 6.674e-11;
      const M = mstar * 1e30;
      const R = dist * 1.496e11;
      const T = 2 * Math.PI * Math.sqrt((R ** 3) / (G * M));
      const dayInSeconds = 24 * 3600;
      const periodInDays = T / dayInSeconds;
      content += `Orbital Period: ${periodInDays.toFixed(1)} days<br>`;
      content += `Orbital Velocity: ${vorb} km/s<br>`;
      content += `Orbital Distance: ${dist} AU<br><br>`;
      content += `T² ∝ r³ (Kepler's Third Law)`;
      break;
  }

  infoPanel.innerHTML = content;
}

function toggleSimulation() {
  const btn = document.getElementById('playPauseBtn');
  if (btn.textContent.includes('Play')) {
    btn.textContent = 'Pause';
    simulationScene.userData.isRunning = true;
  } else {
    btn.textContent = 'Play';
    simulationScene.userData.isRunning = false;
  }
}

function resetSimulation() {
  simulationScene.userData.time = 0;
  setupSimulationScene();
}

let isRunning = true;

function startSimulation() {
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    if (simulationScene.userData.isRunning !== false) {
      simulationScene.userData.time += 0.016; // ~60 FPS
      updateSimulation();
    }

    simulationRenderer.render(simulationScene, simulationCamera);
  };

  animate();
}

// Handle window resize
window.addEventListener('resize', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (canvas && simulationRenderer && simulationCamera) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    simulationCamera.aspect = width / height;
    simulationCamera.updateProjectionMatrix();
    simulationRenderer.setSize(width, height);
  }
});

// Alias for app router compatibility
function initSimulator() {
  initPhysicsSimulator();
}
