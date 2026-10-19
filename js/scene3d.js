/* =========================================================
   scene3d.js  —  Three.js 3D scene (DO DUNIYA)
   ---------------------------------------------------------
   1) OFFICE LOBBY : realistic daylight lobby. Person darwaze
      se walk karke RECEPTION tak jaata hai aur WAHIN ruk jaata
      hai (wapas nahi aata), phir camera ki taraf muh karke
      khada rehta hai.
   2) HACKING WORLD: option click par camera office ke andar ek
      neon "hacking duniya" me jaata hai — matrix rain, code
      screens (hacking/coding), neon grid, glowing pillars.
   Camera CINEMATIC fixed hai (koi 360 drag nahi).
   ========================================================= */

const Scene3D = (() => {
  let renderer, scene, camera, clock;
  let lobbyGroup, hackGroup;
  let person;
  let bobG, hipsG, torsoG;
  let legL, legR, armL, armR;
  let dust;
  let hackScreens = [];
  let personState = "idle";   // idle | walking | talking
  let started = false;
  let onTransitionCb = null;  // main.js ise set karta hai (glitch flash)
  const HIP_Y = 0.95;
  const state = { world: "lobby" };   // "lobby" | "hack"

  /* ---------- cinematic camera keyframes ---------- */
  const VIEWS = {
    intro:     { pos: [5.5, 3.0, 11],  look: [0, 1.2, 2] },
    reception: { pos: [0, 2.5, 8.5],   look: [0, 1.25, -1] },
    hack:      { pos: [0, 3.0, 8.0],   look: [0, 2.2, -3] },
    hackTopic: { pos: [0, 2.7, 6.0],   look: [0, 2.1, -3] }
  };
  const cam = {
    pos:  new THREE.Vector3(),
    look: new THREE.Vector3(),
    tPos: new THREE.Vector3(),
    tLook:new THREE.Vector3()
  };

  function setView(name) {
    const v = VIEWS[name] || VIEWS.reception;
    cam.tPos.set(v.pos[0], v.pos[1], v.pos[2]);
    cam.tLook.set(v.look[0], v.look[1], v.look[2]);
  }

  /* ---------- init ---------- */
  function init(container) {
    if (typeof THREE === "undefined") {
      console.warn("Three.js load nahi hui — 3D band, UI chalega.");
      return false;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdfe7ef);
    scene.fog = new THREE.Fog(0xdfe7ef, 26, 68);

    camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 300);
    cam.pos.set(VIEWS.intro.pos[0], VIEWS.intro.pos[1], VIEWS.intro.pos[2]);
    cam.look.set(VIEWS.intro.look[0], VIEWS.intro.look[1], VIEWS.intro.look[2]);
    setView("intro");

    clock = new THREE.Clock();

    lobbyGroup = new THREE.Group();
    hackGroup  = new THREE.Group();
    hackGroup.visible = false;
    scene.add(lobbyGroup, hackGroup);

    buildLobby();
    buildHackWorld();

    window.addEventListener("resize", onResize);
    animate();
    return true;
  }

  function onResize() {
    if (!renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function updateCamera(t) {
    cam.pos.lerp(cam.tPos, 0.045);
    cam.look.lerp(cam.tLook, 0.05);
    const swayX = Math.sin(t * 0.25) * 0.25;
    const swayY = Math.sin(t * 0.19) * 0.12;
    camera.position.set(cam.pos.x + swayX, cam.pos.y + swayY, cam.pos.z);
    camera.lookAt(cam.look);
  }


  /* =========================================================
     LOBBY (daylight office)
     ========================================================= */
  function buildLobby() {
    buildLobbyLights();
    buildRoom();
    buildWindows();
    buildReception();
    person = buildPerson();
    buildDecor();
    buildDust();
  }

  function buildLobbyLights() {
    lobbyGroup.add(new THREE.AmbientLight(0xffffff, 0.55));
    lobbyGroup.add(new THREE.HemisphereLight(0xfff4e6, 0xb0a08c, 0.6));
    const key = new THREE.DirectionalLight(0xfff0dd, 0.95);
    key.position.set(6, 14, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -22; key.shadow.camera.right = 22;
    key.shadow.camera.top = 22;   key.shadow.camera.bottom = -22;
    key.shadow.camera.far = 70;   key.shadow.bias = -0.0005;
    lobbyGroup.add(key);
    const fill = new THREE.DirectionalLight(0xffe6c4, 0.3);
    fill.position.set(-8, 8, 6);
    lobbyGroup.add(fill);
  }

  function buildRoom() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0xb98a5a, roughness: 0.55, metalness: 0.05 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    lobbyGroup.add(floor);

    const rug = new THREE.Mesh(
      new THREE.CircleGeometry(6, 40),
      new THREE.MeshStandardMaterial({ color: 0xe6ded0, roughness: 0.95 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.02, -1);
    rug.receiveShadow = true;
    lobbyGroup.add(rug);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2ece1, roughness: 0.9 });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), wallMat);
    back.position.set(0, 6, -12); back.receiveShadow = true; lobbyGroup.add(back);
    const left = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), wallMat);
    left.rotation.y = Math.PI / 2; left.position.set(-14, 6, 0); lobbyGroup.add(left);
    const right = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), wallMat);
    right.rotation.y = -Math.PI / 2; right.position.set(14, 6, 0); lobbyGroup.add(right);
  }

  function buildWindows() {
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xdfe3e8, roughness: 0.4, metalness: 0.4 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xbfe0f0, roughness: 0.05, metalness: 0.1,
      transparent: true, opacity: 0.32, emissive: 0x88bbdd, emissiveIntensity: 0.25
    });
    for (let i = 0; i < 3; i++) {
      const z = -2 + i * 5;
      const gL = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 5), glassMat);
      gL.position.set(-13.8, 3.2, z); gL.rotation.y = Math.PI / 2; lobbyGroup.add(gL);
      const fL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.4, 4.0), frameMat);
      fL.position.set(-13.9, 3.2, z); lobbyGroup.add(fL);
      const gR = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 5), glassMat);
      gR.position.set(13.8, 3.2, z); gR.rotation.y = -Math.PI / 2; lobbyGroup.add(gR);
      const fR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.4, 4.0), frameMat);
      fR.position.set(13.9, 3.2, z); lobbyGroup.add(fR);
    }
  }

  function buildReception() {
    const group = new THREE.Group();
    group.position.set(0, 0, -4);
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 0.22, 1.7),
      new THREE.MeshStandardMaterial({ color: 0xd9b483, roughness: 0.4, metalness: 0.1 })
    );
    top.position.y = 1.05; top.castShadow = true; top.receiveShadow = true; group.add(top);
    const front = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 1.0, 1.5),
      new THREE.MeshStandardMaterial({ color: 0xf5f2ec, roughness: 0.6 })
    );
    front.position.y = 0.5; front.castShadow = true; front.receiveShadow = true; group.add(front);
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.5, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xe07a5f, roughness: 0.5 })
    );
    sign.position.set(0, 2.4, 0.7); sign.castShadow = true; group.add(sign);
    const mon = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.85, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x22262b, roughness: 0.4, metalness: 0.3 })
    );
    mon.position.set(1.9, 1.6, -0.2); mon.castShadow = true; group.add(mon);
    lobbyGroup.add(group);
  }

  /* ---------- Low-poly person (realistic proportions) ---------- */
  function buildPerson() {
    const g = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.65 });
    const shirt = new THREE.MeshStandardMaterial({ color: 0xe07a5f, roughness: 0.55, metalness: 0.05 });
    const pants = new THREE.MeshStandardMaterial({ color: 0x35424e, roughness: 0.75 });
    const shoe = new THREE.MeshStandardMaterial({ color: 0x22262b, roughness: 0.6 });

    bobG = new THREE.Group();
    g.add(bobG);

    hipsG = new THREE.Group();
    hipsG.position.y = HIP_Y;
    bobG.add(hipsG);
    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.22, 0.28), pants);
    hips.castShadow = true;
    hipsG.add(hips);

    torsoG = new THREE.Group();
    torsoG.position.y = 0.11;
    hipsG.add(torsoG);
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.3), shirt);
    torso.position.y = 0.3;
    torso.castShadow = true;
    torsoG.add(torso);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.1), skin);
    neck.position.y = 0.64;
    torsoG.add(neck);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), skin);
    head.position.y = 0.85;
    head.castShadow = true;
    torsoG.add(head);
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.205, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
      new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.8 })
    );
    hair.position.y = 0.86;
    torsoG.add(hair);

    armL = makeArm(shirt, skin); armL.shoulder.position.set(-0.32, 0.55, 0); torsoG.add(armL.shoulder);
    armR = makeArm(shirt, skin); armR.shoulder.position.set(0.32, 0.55, 0); torsoG.add(armR.shoulder);

    legL = makeLeg(pants, shoe); legL.hip.position.set(-0.13, -0.05, 0); hipsG.add(legL.hip);
    legR = makeLeg(pants, shoe); legR.hip.position.set(0.13, -0.05, 0); hipsG.add(legR.hip);

    // door se shuru (side se) — taaki walk achha dikhe
    g.position.set(6, 0, 10);
    g.rotation.y = Math.PI;
    lobbyGroup.add(g);
    return g;
  }

  function limbMesh(w, h, d, mat) {
    const geo = new THREE.BoxGeometry(w, h, d);
    geo.translate(0, -h / 2, 0);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    return mesh;
  }

  function makeArm(shirtMat, skinMat) {
    const shoulder = new THREE.Group();
    shoulder.add(limbMesh(0.11, 0.32, 0.11, shirtMat));
    const elbow = new THREE.Group();
    elbow.position.y = -0.32;
    shoulder.add(elbow);
    elbow.add(limbMesh(0.1, 0.3, 0.1, skinMat));
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), skinMat);
    hand.position.y = -0.32; hand.castShadow = true; elbow.add(hand);
    return { shoulder, elbow };
  }

  function makeLeg(pantsMat, shoeMat) {
    const hip = new THREE.Group();
    hip.add(limbMesh(0.15, 0.42, 0.15, pantsMat));
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    hip.add(knee);
    knee.add(limbMesh(0.13, 0.42, 0.13, pantsMat));
    const foot = new THREE.Group();
    foot.position.y = -0.42;
    knee.add(foot);
    const shoeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.26), shoeMat);
    shoeMesh.position.set(0, -0.04, 0.05); shoeMesh.castShadow = true; foot.add(shoeMesh);
    return { hip, knee, foot };
  }


  /* ---------- Decor: plants, sofa, coffee table, ceiling lights ---------- */
  function buildDecor() {
    makePlant(-9, 6, 1.2); makePlant(9, 6, 1.0);
    makePlant(-8, -8, 1.1); makePlant(8, -8, 1.3);
    makeSofa(-8, 1);

    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.12, 1.0),
      new THREE.MeshStandardMaterial({ color: 0xd9b483, roughness: 0.4 })
    );
    tableTop.position.set(-8, 0.5, 3); tableTop.castShadow = true; tableTop.receiveShadow = true;
    lobbyGroup.add(tableTop);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x8a7a68 });
    [[-8.7, 3.3], [-7.3, 3.3], [-8.7, 2.7], [-7.3, 2.7]].forEach(([lx, lz]) => {
      const lg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), legMat);
      lg.position.set(lx, 0.25, lz); lobbyGroup.add(lg);
    });

    const panelMat = new THREE.MeshBasicMaterial({ color: 0xfff6e6 });
    for (let i = -1; i <= 1; i++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 1.2), panelMat);
      panel.position.set(i * 6, 5.6, 0); lobbyGroup.add(panel);
    }
  }

  function makePlant(x, z, s) {
    const g = new THREE.Group();
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.28, 0.55, 16),
      new THREE.MeshStandardMaterial({ color: 0xcdbba4, roughness: 0.8 })
    );
    pot.position.y = 0.275; pot.castShadow = true; pot.receiveShadow = true; g.add(pot);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x4a7c59, roughness: 0.7 });
    const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x3f6b4c, roughness: 0.7 });
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), i % 2 ? leafMat : leafMat2);
      leaf.scale.set(1, 0.6, 1);
      const a = (i / 7) * Math.PI * 2;
      const r = 0.15 + (i % 3) * 0.1;
      leaf.position.set(Math.cos(a) * r, 0.7 + (i % 3) * 0.22, Math.sin(a) * r);
      leaf.castShadow = true; g.add(leaf);
    }
    g.position.set(x, 0, z); g.scale.setScalar(s);
    lobbyGroup.add(g);
  }

  function makeSofa(x, z) {
    const g = new THREE.Group();
    const fabric = new THREE.MeshStandardMaterial({ color: 0x5b7c99, roughness: 0.9 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.45, 1.0), fabric);
    seat.position.y = 0.45; seat.castShadow = true; seat.receiveShadow = true; g.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.9, 0.25), fabric);
    back.position.set(0, 0.75, -0.4); back.castShadow = true; g.add(back);
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.6, 1.0), fabric);
    armL.position.set(-1.2, 0.6, 0); g.add(armL);
    const armR = armL.clone(); armR.position.set(1.2, 0.6, 0); g.add(armR);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x8a7a68 });
    [[-1.15, 0.4], [1.15, 0.4], [-1.15, -0.4], [1.15, -0.4]].forEach(([lx, lz]) => {
      const lg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.25, 0.1), legMat);
      lg.position.set(lx, 0.125, lz); g.add(lg);
    });
    g.position.set(x, 0, z); g.rotation.y = Math.PI / 2;
    lobbyGroup.add(g);
  }

  function buildDust() {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 26;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dust = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xfff2d0, size: 0.06, transparent: true, opacity: 0.5, depthWrite: false
    }));
    lobbyGroup.add(dust);
  }


  /* =========================================================
     HACKING WORLD (neon "garib"/cyber duniya)
     ========================================================= */
  function buildHackWorld() {
    // background + fog neon dark
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x07030f, roughness: 0.35, metalness: 0.7 })
    );
    floor.rotation.x = -Math.PI / 2;
    hackGroup.add(floor);

    // neon grid
    const grid = new THREE.GridHelper(60, 60, 0x39ff14, 0x1a0b2e);
    grid.material.transparent = true;
    grid.material.opacity = 0.55;
    grid.position.y = 0.02;
    hackGroup.add(grid);

    // neon lights
    hackGroup.add(new THREE.AmbientLight(0x2a0a3a, 0.6));
    hackGroup.add(new THREE.HemisphereLight(0x00ffcc, 0x1a0033, 0.5));
    const cyan = new THREE.PointLight(0x00fff2, 1.4, 40);
    cyan.position.set(-6, 5, 4); hackGroup.add(cyan);
    const magenta = new THREE.PointLight(0xff2bd6, 1.4, 40);
    magenta.position.set(6, 5, 4); hackGroup.add(magenta);
    const lime = new THREE.PointLight(0x9dff00, 1.0, 40);
    lime.position.set(0, 5, -8); hackGroup.add(lime);

    // back wall (bada matrix-rain screen)
    const rainWall = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 12),
      new THREE.MeshBasicMaterial({ map: makeMatrixTexture(), transparent: true, opacity: 0.9 })
    );
    rainWall.position.set(0, 5, -14);
    hackGroup.add(rainWall);

    // floor par bade glowing rings (portal vibe)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(2 + i * 1.5, 2.1 + i * 1.5, 60),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0x00fff2 : 0xff2bd6, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, 0.05, -4);
      ring.userData.spin = 0.2 + i * 0.15;
      hackGroup.add(ring);
    }

    // glowing pillars (side)
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 9, 12),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0x39ff14 : 0x00fff2 })
      );
      pillar.position.set(i * 7, 4.5, -6);
      hackGroup.add(pillar);
    }

    // code / hacking screens (topic ke hisaab se)
    buildHackScreens();

    // floating code particles
    buildCodeParticles();
  }

  /* matrix-rain wali canvas texture (ek baar banayi) */
  let _matrixTex = null;
  function makeMatrixTexture() {
    if (_matrixTex) return _matrixTex;
    const c = document.createElement("canvas");
    c.width = 512; c.height = 512;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#04020a";
    ctx.fillRect(0, 0, 512, 512);
    const chars = "アイウエオカキクケコ01<>{}[]#$%&*/\\ HackCode10";
    ctx.font = "18px monospace";
    for (let x = 0; x < 512; x += 16) {
      for (let y = 0; y < 512; y += 18) {
        const bright = Math.random() > 0.85;
        ctx.fillStyle = bright ? "#bfffb0" : (Math.random() > 0.5 ? "#39ff14" : "#0a7a08");
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
      }
    }
    _matrixTex = new THREE.CanvasTexture(c);
    return _matrixTex;
  }


  /* code screen = canvas texture wala floating panel (title + code lines) */
  function makeCodeTexture(title, color, lines) {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 320;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#05030c";
    ctx.fillRect(0, 0, 512, 320);
    // title bar
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 512, 46);
    ctx.fillStyle = "#05030c";
    ctx.font = "bold 24px monospace";
    ctx.fillText(title, 16, 33);
    // window dots
    ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((d, i) => {
      ctx.fillStyle = d;
      ctx.beginPath(); ctx.arc(480 - i * 26, 23, 8, 0, Math.PI * 2); ctx.fill();
    });
    // code lines
    ctx.font = "18px monospace";
    lines.forEach((ln, i) => {
      ctx.fillStyle = i % 2 ? color : "#8affc1";
      ctx.fillText(ln, 16, 78 + i * 26);
    });
    // scanline overlay
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    for (let y = 0; y < 320; y += 4) ctx.fillRect(0, y, 512, 2);
    return new THREE.CanvasTexture(c);
  }

  function makeScreen(w, h, title, color, lines, pos, rotY) {
    const tex = makeCodeTexture(title, color, lines);
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.2, h + 0.2, 0.1),
      new THREE.MeshBasicMaterial({ color: color })
    );
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: tex })
    );
    screen.position.z = 0.06;
    const g = new THREE.Group();
    g.add(frame, screen);
    g.position.set(pos[0], pos[1], pos[2]);
    g.rotation.y = rotY || 0;
    hackGroup.add(g);
    hackScreens.push(g);
    return g;
  }

  function buildHackScreens() {
    // left screen — hacking
    makeScreen(5, 3.1, "HACKING…", "#39ff14", [
      "> nmap -sS target.host",
      "> scanning ports ...",
      "[+] 22/open  80/open",
      "[+] exploiting CVE-2024",
      "[*] payload sent ✓",
      "root@kali:~# access_granted"
    ], [-7, 3.2, -6], 0.5);

    // right screen — coding
    makeScreen(5, 3.1, "CODING…", "#00fff2", [
      "const build = () => {",
      "  return dreams.map(d",
      "    => code(d, love));",
      "  );",
      "};",
      "// ship it 🚀"
    ], [7, 3.2, -6], -0.5);

    // center low screen — SQL / data
    makeScreen(4.4, 2.7, "DATABASE", "#ff2bd6", [
      "SELECT skill, level",
      "FROM skills",
      "WHERE level > 80",
      "ORDER BY level DESC;",
      "-- 8 rows returned"
    ], [0, 3.4, -9], 0);
  }

  function buildCodeParticles() {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0x9dff00, size: 0.08, transparent: true, opacity: 0.7, depthWrite: false
    }));
    pts.userData.isCodeParticles = true;
    hackGroup.add(pts);
  }


  /* =========================================================
     ANIMATION
     ========================================================= */
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    updateCamera(t);

    // lobby dust
    if (dust && lobbyGroup.visible) {
      dust.rotation.y += 0.0004;
      dust.position.y = Math.sin(t * 0.2) * 0.3;
    }

    // hacking world: rings ghumao + code particles upar jao
    if (hackGroup.visible) {
      hackGroup.traverse((o) => {
        if (o.userData && o.userData.spin) o.rotation.z += o.userData.spin * 0.01;
        if (o.userData && o.userData.isCodeParticles) {
          o.position.y = Math.sin(t * 0.3) * 0.5;
          o.rotation.y += 0.0006;
        }
      });
    }

    animatePerson(t);
    renderer.render(scene, camera);
  }

  /* ---------- Smooth realistic walk cycle ---------- */
  function animatePerson(t) {
    if (!person) return;
    const moving = personState === "walking";
    const p = t * 7;

    if (moving) {
      const swing  = Math.sin(p);
      const swing2 = Math.sin(p + Math.PI);
      legL.hip.rotation.x = swing * 0.7;
      legR.hip.rotation.x = swing2 * 0.7;
      legL.knee.rotation.x = -Math.max(0, Math.sin(p - 0.7)) * 0.9;
      legR.knee.rotation.x = -Math.max(0, Math.sin(p + Math.PI - 0.7)) * 0.9;
      legL.foot.rotation.x = -legL.hip.rotation.x * 0.35;
      legR.foot.rotation.x = -legR.hip.rotation.x * 0.35;
      armL.shoulder.rotation.x = swing2 * 0.6;
      armR.shoulder.rotation.x = swing * 0.6;
      armL.elbow.rotation.x = -0.35 - Math.abs(swing2) * 0.35;
      armR.elbow.rotation.x = -0.35 - Math.abs(swing) * 0.35;
      bobG.position.y = Math.abs(Math.cos(p)) * 0.05 - 0.05;
      torsoG.rotation.y = swing * 0.12;
      hipsG.rotation.y = swing2 * 0.1;
      person.rotation.z = swing * 0.03;
    } else {
      // khada hua / talking: saans + natural relax
      const breathe = Math.sin(t * 2);
      legL.hip.rotation.x = legR.hip.rotation.x = 0;
      legL.knee.rotation.x = legR.knee.rotation.x = 0;
      legL.foot.rotation.x = legR.foot.rotation.x = 0;
      armL.shoulder.rotation.x = breathe * 0.05;
      armR.shoulder.rotation.x = -breathe * 0.05;
      armL.elbow.rotation.x = -0.15;
      armR.elbow.rotation.x = -0.15;
      bobG.position.y = breathe * 0.012;
      torsoG.rotation.y = breathe * 0.03;
      hipsG.rotation.y = -breathe * 0.02;
      person.rotation.z = 0;
    }
  }

  /* ---------- person ko ek point tak walk karao ---------- */
  function moveTo(target, dur, onDone) {
    if (!person) { onDone && onDone(); return; }
    personState = "walking";
    const from = person.position.clone();
    const startRot = person.rotation.y;
    const dx = target.x - from.x;
    const dz = target.z - from.z;
    const targetRot = Math.atan2(dx, dz);
    const t0 = performance.now();

    function step(now) {
      const k = Math.min(1, (now - t0) / (dur * 1000));
      const e = k < 0.5 ? 2 * k * k : -1 + (4 - 2 * k) * k;
      person.position.x = from.x + dx * e;
      person.position.z = from.z + dz * e;
      person.rotation.y = startRot + (targetRot - startRot) * Math.min(1, k * 3);
      if (k < 1) requestAnimationFrame(step);
      else { personState = "talking"; onDone && onDone(); }
    }
    requestAnimationFrame(step);
  }

  /* ---------- person ko camera ki taraf mudo ---------- */
  function faceCamera(dur, onDone) {
    if (!person) { onDone && onDone(); return; }
    const startRot = person.rotation.y;
    // camera roughly +Z ki taraf hai, to person +Z dekhe
    let targetRot = 0;
    const t0 = performance.now();
    function step(now) {
      const k = Math.min(1, (now - t0) / (dur * 1000));
      person.rotation.y = startRot + (targetRot - startRot) * k;
      if (k < 1) requestAnimationFrame(step);
      else onDone && onDone();
    }
    requestAnimationFrame(step);
  }


  /* =========================================================
     PUBLIC API
     ========================================================= */

  // Intro: person darwaze se walk karke RECEPTION tak jaaye,
  // wahin ruke, phir camera ki taraf muh kar ke khada ho jaaye.
  function startSequence(onReachVisitor) {
    if (!person || started) return;
    started = true;
    // reception ke aage (desk se thoda aage) khada ho
    moveTo(new THREE.Vector3(0, 0, -1.6), 3.6, () => {
      faceCamera(0.6, () => {
        setView("reception");
        onReachVisitor && onReachVisitor();
      });
    });
  }

  // glitch flash ke liye callback (main.js set karega)
  function setTransitionCallback(cb) { onTransitionCb = cb; }

  // Option click: office ke andar HACKING WORLD me jao
  function goHack() {
    if (state.world === "hack") return;
    state.world = "hack";
    if (onTransitionCb) onTransitionCb();
    lobbyGroup.visible = false;
    hackGroup.visible = true;
    scene.background = new THREE.Color(0x05030f);
    scene.fog = new THREE.Fog(0x05030f, 18, 55);
    setView("hack");
  }

  // Topic ke hisaab se camera thoda aage (screens par focus)
  function focusTopic() {
    if (state.world === "hack") setView("hackTopic");
  }

  // Wapas lobby / reception me jao (person wahin khada hai)
  function goLobby() {
    if (state.world === "lobby") return;
    state.world = "lobby";
    if (onTransitionCb) onTransitionCb();
    hackGroup.visible = false;
    lobbyGroup.visible = true;
    scene.background = new THREE.Color(0xdfe7ef);
    scene.fog = new THREE.Fog(0xdfe7ef, 26, 68);
    setView("reception");
  }

  function getWorld() { return state.world; }

  return {
    init,
    startSequence,
    goHack,
    goLobby,
    focusTopic,
    setTransitionCallback,
    getWorld
  };
})();

