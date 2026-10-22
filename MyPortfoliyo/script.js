/* =====================================================
   PORTFOLIO — MAIN SCRIPT
   Three.js · GSAP · Typed.js · Interactions
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 600);
  });
  // Safety: hide preloader even if load event already fired/slow
  setTimeout(() => preloader.classList.add("hidden"), 3500);

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");
  const isTouch = window.matchMedia("(hover: none), (max-width: 900px)").matches;

  if (!isTouch) {
    let mx = -100, my = -100, cx = -100, cy = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.left = mx + "px";
      cursorDot.style.top = my + "px";
    });

    const animateCursor = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const hoverables = document.querySelectorAll(
      "a, button, input, textarea, [data-hover]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
    });
  }

  /* ---------- THREE.JS PARTICLE NETWORK ---------- */
  const initThree = () => {
    if (typeof THREE === "undefined") return;

    const canvas = document.getElementById("bg-canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    // --- Particles ---
    const COUNT = window.innerWidth < 768 ? 1400 : 3200;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color(0x8b5cf6), // purple
      new THREE.Color(0x06b6d4), // cyan
      new THREE.Color(0xec4899), // pink
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse parallax ---
    let targetX = 0, targetY = 0;
    document.addEventListener("mousemove", (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // --- Scroll parallax ---
    let scrollY = 0;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    }, { passive: true });

    // --- Animation loop ---
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();

      points.rotation.y = t * 0.05 + targetX * 0.35;
      points.rotation.x = t * 0.02 + targetY * 0.25;

      camera.position.x += (targetX * 6 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 5 - camera.position.y) * 0.04;
      camera.position.z = 60 + Math.min(scrollY * 0.01, 25);
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // --- Resize ---
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };
  initThree();

  /* ---------- TYPED.JS ---------- */
  if (typeof Typed !== "undefined") {
    new Typed("#typed", {
      strings: [
        "B.Sc Computer Science Student",
        "C++ & Java Developer",
        "Python Programmer",
        "Problem Solver",
        "Aspiring Software Engineer",
      ],
      typeSpeed: 65,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ---------- GSAP SCROLL ANIMATIONS ---------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance (immediate)
    gsap.to(".hero .reveal", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.7,
    });

    // Section reveals on scroll
    gsap.utils.toArray(".section .reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // Parallax on section titles
    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.fromTo(
        title,
        { letterSpacing: "6px", opacity: 0.4 },
        {
          letterSpacing: "-1px",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 92%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
    });

    // Skill bars fill
    document.querySelectorAll(".skill-fill").forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: "top 92%",
        once: true,
        onEnter: () => {
          bar.style.width = bar.dataset.width + "%";
        },
      });
    });

    // Counter animation for facts (skip non-numeric facts like ∞)
    document.querySelectorAll(".fact-num[data-count]").forEach((num) => {
      const target = +num.dataset.count;
      ScrollTrigger.create({
        trigger: num,
        start: "top 92%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              num.textContent = Math.round(obj.val);
            },
          });
        },
      });
    });
  } else {
    // Fallback if GSAP failed to load: show everything
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    document.querySelectorAll(".skill-fill").forEach((bar) => {
      bar.style.width = bar.dataset.width + "%";
    });
    document.querySelectorAll(".fact-num[data-count]").forEach((num) => {
      num.textContent = num.dataset.count;
    });
  }

  /* ---------- NAVBAR ---------- */
  const navbar = document.getElementById("navbar");
  const backTop = document.getElementById("backTop");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    backTop.classList.toggle("show", y > 500);

    // Active link highlight
    let current = "";
    sections.forEach((sec) => {
      if (y >= sec.offsetTop - 160) current = sec.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- HAMBURGER / MOBILE MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
    document.body.style.overflow = navMenu.classList.contains("open")
      ? "hidden"
      : "";
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    })
  );

  /* ---------- 3D TILT + SPOTLIGHT EFFECT ---------- */
  if (!isTouch) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        // Spotlight glow follows the cursor
        card.style.setProperty("--mx", ((px + 0.5) * 100).toFixed(2) + "%");
        card.style.setProperty("--my", ((py + 0.5) * 100).toFixed(2) + "%");
        card.style.transform = `perspective(900px) rotateY(${
          px * 12
        }deg) rotateX(${-py * 12}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        // Reveal-complete state me wapas set karo (CSS .reveal se ladne se bacho)
        card.style.transform = "none";
      });
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Sending...";

    // Simulated send (backend nahi hai) — success message dikhata hai
    setTimeout(() => {
      status.textContent =
        "✅ Message sent! I'll get back to you soon. (Demo — connect a backend/Formspree for real sends)";
      btn.disabled = false;
      btn.textContent = "Send Message 🚀";
      form.reset();
    }, 1200);
  });

  /* ---------- SMOOTH ANCHOR OFFSET ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});
