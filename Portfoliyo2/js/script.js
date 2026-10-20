/* ============================================================
   PORTFOLIO SCRIPT — data rendering + animations
   ============================================================ */
(function () {
  "use strict";
  const D = window.PORTFOLIO_DATA || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const setHTML = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };
  const initials = (name) =>
    (name || "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "ME";
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
    setHTML("#heroSocials", socialHTML);
    setHTML("#contactSocials", socialHTML);
    setHTML("#aboutParagraphs", (a.paragraphs || []).map((t) => `<p>${t}</p>`).join(""));
    setHTML("#aboutQuick", (a.quick || [])
      .map((q) => `<div class="aq"><i class="${q.icon}"></i><span>${q.text}</span></div>`)
      .join(""));
    setHTML("#aboutStats", (a.stats || [])
      .map(
        (s) => `<div class="stat" data-reveal><div class="stat__num" data-count="${s.value}" data-suffix="${s.suffix || ""}">0</div><div class="stat__label">${s.label}</div></div>`
      )
      .join(""));
    setHTML("#skillsContainer", (D.skills || [])
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
      .join(""));
    renderAchievements();
    renderServices();
    const items = [];
    if (c.email)
      items.push(
        `<div class="ci"><div class="ci__icon"><i class="fa-solid fa-envelope"></i></div><div><div class="ci__label">Email</div><div class="ci__value"><a href="mailto:${c.email}">${c.email}</a></div></div></div>`
      );
    if (c.phone)
      items.push(
        `<div class="ci"><div class="ci__icon"><i class="fa-solid fa-phone"></i></div><div><div class="ci__label">Phone</div><div class="ci__value"><a href="tel:${c.phone.replace(/[^+\d]/g, "")}">${c.phone}</a></div></div></div>`
      );
    if (c.location)
      items.push(
        `<div class="ci"><div class="ci__icon"><i class="fa-solid fa-location-dot"></i></div><div><div class="ci__label">Location</div><div class="ci__value">${c.location}</div></div></div>`
      );
    setHTML("#contactItems", items.join(""));
  }
  function renderAchievements() {
    const ach = (D.achievements || []).map((a) => `
      <div class="achievement-card" data-reveal>
        <div class="ach__icon">${a.icon && a.icon.indexOf("fa-") === 0 ? `<i class="${a.icon}"></i>` : `<span class="ach__emoji">${a.icon || "🏆"}</span>`}</div>
        <div class="ach__body">
          <h3>${a.title}</h3>
          <p>${a.description}</p>
        </div>
      </div>
    `).join("");
    const container = $("#achievementsContainer");
    if (container) container.innerHTML = ach;
  }
  function typeWriter() {
    const roles = (D.personal && D.personal.roles) || [];
    const el = $("#heroType");
    if (!el || roles.length === 0) return;
    let i = 0;
    let j = 0;
    let forward = true;
    const type = () => {
      const current = roles[i];
      if (forward) {
        el.textContent = current.slice(0, j);
        j++;
        if (j > current.length) {
          forward = false;
          setTimeout(type, 1500);
          return;
        }
      } else {
        el.textContent = current.slice(0, j);
        j--;
        if (j < 0) {
          forward = true;
          i = (i + 1) % roles.length;
          j = 0;
        }
      }
      setTimeout(type, forward ? 70 : 40);
    };
    type();
  }
  function initParticles() {
    const canvas = $("#particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    const particles = [];
    const particleCount = 60;
    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(0, 229, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 - dist / 800})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$("[data-reveal]").forEach((el) => observer.observe(el));
  }
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
    const backTop = $("#backTop");
    if (backTop)
      backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
  function initCursor() {
    const glow = $("#cursorGlow");
    if (!glow) return;
    if (window.matchMedia("(pointer: coarse)").matches) { glow.style.display = "none"; return; }
    window.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }
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
    renderFiltered("all");
    initReveal();
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
  function renderServices() {
    const el = $("#servicesContainer");
    if (!el) return;
    el.innerHTML = (D.services || [])
      .map(
        (s) => `<article class="service-card" data-reveal>
        <div class="service-card__head"><i class="${s.icon}"></i><h3>${s.title}</h3></div>
        <p>${s.description}</p>
      </article>`
      )
      .join("");
  }
  function initSkillBars() {
    $$(".skill__fill").forEach((fill) => {
      const level = Number(fill.dataset.level) || 0;
      requestAnimationFrame(() => {
        fill.style.width = level + "%";
      });
    });
  }
  function initCounters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const el = entry.target;
          const target = Number(el.dataset.count) || 0;
          const suffix = el.dataset.suffix || "";
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    nums.forEach((n) => observer.observe(n));
  }
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
  function initPreloader() {
    const pre = $("#preloader");
    if (!pre) return;
    let hidden = false;
    const hide = () => {
      if (hidden) return;
      hidden = true;
      pre.classList.add("hide");
      setTimeout(() => {
        if (pre.parentNode) pre.parentNode.removeChild(pre);
      }, 700);
    };
    window.addEventListener("error", hide);
    const minDelay = new Promise((resolve) => setTimeout(resolve, 400));
    const pageLoad = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });
    Promise.all([minDelay, pageLoad]).then(hide);
    setTimeout(hide, 3000); // failsafe — preloader never gets stuck
  }
  function initAll() {
    initPreloader();
    renderData();
    typeWriter();
    initParticles();
    initReveal();
    initNav();
    initCursor();
    initFilters();
    initTilt();
    initSkillBars();
    initCounters();
    initScrollProgress();
    initForm();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
