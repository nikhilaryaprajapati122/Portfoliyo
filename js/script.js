/* ============================================================
   PORTFOLIO SCRIPT — data rendering + animations
   ============================================================ */
(function () {
  "use strict";
  const D = window.PORTFOLIO_DATA || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const initials = (name) =>
    (name || "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "ME";

  /* ---------- RENDER ALL DATA ---------- */
  function renderData() {
    const p = D.personal || {};
    const a = D.about || {};
    const c = D.contact || {};
    const name = p.name || "Your Name";

    document.title = name + " | Portfolio";
    const md = $("#metaDesc");
    if (md) md.setAttribute("content", p.tagline || "Personal portfolio.");

    $("#navLogoMark").textContent = initials(name);
    $("#navLogoText").textContent = name;
    $("#footerName").textContent = name;
    $("#year").textContent = new Date().getFullYear();

    $("#heroName").textContent = name;
    $("#heroInitials").textContent = initials(name);
    $("#heroTagline").textContent = p.tagline || "";
    if (p.photo) {
      const img = $("#heroPhoto");
      img.src = p.photo;
      img.hidden = false;
      $("#heroInitials").style.display = "none";
    }
    if (p.resumeUrl) $("#navResume").href = p.resumeUrl;

    const socials = c.socials || [];
    const socialHTML = socials
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><i class="${s.icon}"></i></a>`)
      .join("");
    $("#heroSocials").innerHTML = socialHTML;
    $("#contactSocials").innerHTML = socialHTML;

    $("#aboutParagraphs").innerHTML = (a.paragraphs || []).map((t) => `<p>${t}</p>`).join("");
    $("#aboutQuick").innerHTML = (a.quick || [])
      .map((q) => `<div class="aq"><i class="${q.icon}"></i><span>${q.text}</span></div>`)
      .join("");

    $("#aboutStats").innerHTML = (a.stats || [])
      .map(
        (s) => `<div class="stat" data-reveal><div class="stat__num" data-count="${s.value}" data-suffix="${
          s.suffix || ""
        }">0</div><div class="stat__label">${s.label}</div></div>`
      )
      .join("");

    $("#skillsContainer").innerHTML = (D.skills || [])
      .map(
        (cat) => `<div class="skill-card" data-reveal>
        <div class="skill-card__head"><i class="${cat.icon}"></i><h3>${cat.category}</h3></div>
        ${(cat.items || [])
          .map(
            (it) => `<div class="skill">
            <div class="skill__top"><span>${it.name}</span><span class="pct">${it.level}%</span></div>
            <div class="skill__bar"><div class="skill__fill" data-level="${it.level}"></div></div>
          </div>`
          )
          .join("")}
      </div>`
      )
      .join("");


    $("#servicesContainer").innerHTML = (D.services || [])
      .map(
        (s) => `<div class="service" data-reveal>
        <div class="service__icon"><i class="${s.icon}"></i></div>
        <h3>${s.title}</h3><p>${s.description}</p>
      </div>`
      )
      .join("");

    const items = [];
    if (c.email)
      items.push(
        `<div class="ci"><div class="ci__icon"><i class="fa-solid fa-envelope"></i></div><div><div class="ci__label">Email</div><div class="ci__value"><a href="mailto:${c.email}">${c.email}</a></div></div></div>`
      );
    if (c.phone)
      items.push(
        `<div class="ci"><div class="ci__icon"><i class="fa-solid fa-phone"></i></div><div><div class="ci__label">Phone</div><div class="ci__value"><a href="tel:${c.phone.replace(
          /[^+\d]/g,
          ""
        )}">${c.phone}</a></div></div></div>`
      );
    if (c.location)
      items.push(
        `<div class="ci"><div class="ci__icon"><i class="fa-solid fa-location-dot"></i></div><div><div class="ci__label">Location</div><div class="ci__value">${c.location}</div></div></div>`
      );
    $("#contactItems").innerHTML = items.join("");

    /* ---- ACHIEVEMENTS ---- */
    renderAchievements();
  }

  /* ---------- RENDER ACHIEVEMENTS ---------- */
  function renderAchievements() {
    const ach = (D.achievements || []).map((a) => `
      <div class="achievement-card" data-reveal>
        <div class="ach__icon"><i class="${a.icon}"></i></div>
        <div class="ach__body">
          <h3>${a.title}</h3>
          <p>${a.description}</p>
        </div>
      </div>
    `).join("");
    const container = $("#achievementsContainer");
    if (container) container.innerHTML = ach;
  }

  /* ---------- TYPEWRITER ---------- */
  function typeWriter() {
    const el = $("#heroType");
    const roles = (D.personal && D.personal.roles) || ["Developer"];
    let r = 0, i = 0, deleting = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.substring(0, i);
      if (!deleting && i < word.length) { i++; setTimeout(tick, 110); }
      else if (!deleting && i === word.length) { deleting = true; setTimeout(tick, 1500); }
      else if (deleting && i > 0) { i--; setTimeout(tick, 55); }
      else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 350); }
    })();
  }

  /* ---------- PARTICLE BACKGROUND ---------- */
  function initParticles() {
    const canvas = $("#particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["0,229,255", "168,85,247", "255,43,214"];
    let w = 0, h = 0, particles = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    function make() {
      const count = Math.min(90, Math.max(30, Math.floor(window.innerWidth / 15)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1, c: colors[Math.floor(Math.random() * colors.length)],
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.c + ",0.9)";
        ctx.shadowColor = "rgba(" + p.c + ",0.9)"; ctx.shadowBlur = 8; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(120,180,255," + (1 - d / 120) * 0.18 + ")";
            ctx.lineWidth = 1; ctx.shadowBlur = 0; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener("resize", () => { resize(); make(); });
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    resize(); make();
    if (!reduce) requestAnimationFrame(draw);
  }

  /* ---------- NUMBER COUNT UP ---------- */
  function countUp(el) {
    const target = parseInt(el.dataset.count || "0", 10) || 0;
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ---------- SCROLL REVEAL + trigger skill bars & counters ---------- */
  function initReveal() {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const sibs = Array.from(el.parentElement.children).filter((n) => n.hasAttribute("data-reveal"));
          el.style.transitionDelay = Math.min(sibs.indexOf(el) * 70, 350) + "ms";
          el.classList.add("revealed");
          $$(".skill__fill", el).forEach((b) => (b.style.width = b.dataset.level + "%"));
          const num = $("[data-count]", el);
          if (num) countUp(num);
          obs.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    $$("[data-reveal]").forEach((e) => io.observe(e));
  }

  /* ---------- PRELOADER ---------- */
  function initPreloader() {
    const pre = $("#preloader");
    const hide = () => pre && pre.classList.add("hide");
    window.addEventListener("load", () => setTimeout(hide, 400));
    setTimeout(hide, 3200); // safety fallback
  }

  /* ---------- NAVBAR (scroll state, active link, mobile menu) ---------- */
  function initNav() {
    const navbar = $("#navbar");
    const toggle = $("#navToggle");
    const menu = $("#navMenu");
    const links = $$(".nav__link");
    const sections = $$("main section[id]");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
      $("#backTop").classList.toggle("show", window.scrollY > 400);
      const pos = window.scrollY + 140;
      let current = sections.length ? sections[0].id : "";
      sections.forEach((s) => {
        if (s.offsetTop <= pos) current = s.id;
      });
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
    });

    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.classList.toggle("open");
    });
    $$("[data-nav]").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.classList.remove("open");
      })
    );
  }

  /* ---------- CURSOR GLOW ---------- */
  function initCursor() {
    const glow = $("#cursorGlow");
    if (!glow) return;
    if (window.matchMedia("(pointer: coarse)").matches) { glow.style.display = "none"; return; }
    window.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  /* ---------- 3D TILT ON PROJECT CARDS ---------- */
  function initTilt() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = "transform 0.1s ease";
        card.style.transform =
          "perspective(750px) rotateX(" + -y * 9 + "deg) rotateY(" + x * 9 + "deg) translateY(-5px)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.5s ease";
        card.style.transform = "";
      });
    });
  }

  /* ---------- CONTACT FORM (client-side validation + demo submit) ---------- */
  function initForm() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.className = "form__status";
      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const subject = $("#subject").value.trim();
      const message = $("#message").value.trim();
      if (!name || !email || !subject || !message) {
        status.textContent = "Please fill in all fields."; status.classList.add("err"); return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.textContent = "Please enter a valid email address."; status.classList.add("err"); return;
      }
      status.textContent = "Thanks, " + name + "! Your message has been recorded (demo). Connect Formspree to receive real emails.";
      status.classList.add("ok");
      form.reset();
    });
  }

  /* ---------- PROJECT FILTER ---------- */
  function initFilters() {
    const allProjects = D.projects || [];
    const container = $("#projectsContainer");
    const btns = $$(".filter-btn");

    function renderFiltered(filter) {
      const filtered = filter === "all"
        ? allProjects
        : allProjects.filter((p) => (p.tags || []).includes(filter));

      container.innerHTML = filtered
        .map(
          (pr) => `<article class="project" data-reveal data-tilt>
        <div class="project__media"><span>${pr.emoji || "🚀"}</span>${pr.featured ? '<span class="project__badge">Featured</span>' : ""}</div>
        <div class="project__body">
          <h3>${pr.title}</h3>
          <p>${pr.description}</p>
          <div class="project__tags">${(pr.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <div class="project__links">
            ${pr.liveUrl && pr.liveUrl !== "#" ? `<a href="${pr.liveUrl}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : ""}
            ${pr.codeUrl && pr.codeUrl !== "#" ? `<a href="${pr.codeUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>` : ""}
          </div>
        </div>
      </article>`
        )
        .join("");
    }

    // Initialize with "all" filter
    renderFiltered("all");
    initReveal();  // Re-observe new project elements for scroll reveal

    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderFiltered(btn.dataset.filter);
        initReveal();
        initTilt();
      })
    );
  }

  /* ---------- SCROLL PROGRESS ---------- */
  function initScrollProgress() {
    const progress = $("#scrollProgress");
    if (!progress) return;
    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height ? (winScroll / height) * 100 : 0;
      progress.style.width = scrolled + "%";
    });
  }

  /* ---------- BACK TO TOP ---------- */
  function initBackTop() {
    const btn = $("#backTop");
    if (btn) btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- INIT ---------- */
  function init() {
    renderData();
    typeWriter();
    initParticles();
    initReveal();
    initNav();
    initCursor();
    initTilt();
    initFilters();
    initScrollProgress();
    initForm();
    initBackTop();
    initPreloader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }



})();

