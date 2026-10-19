/* =========================================================
   main.js  —  UI control + section rendering + assistant wiring
   ========================================================= */

(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  /* ---------- 1) Page load par content bharo ---------- */
  function fillStaticContent() {
    if (typeof CONTENT === "undefined") return;
    document.title = CONTENT.name + " — 3D Portfolio";
    $("brand-name").textContent = CONTENT.name;
    $("brand-role").textContent = CONTENT.role;
    $("intro-title").textContent = CONTENT.introTitle || ("Welcome, " + CONTENT.name);
    $("intro-sub").textContent = CONTENT.tagline || "";
  }

  /* ---------- 2) 3D scene start karo ---------- */
  function bootScene() {
    try {
      const container = $("scene-container");
      const ok = typeof Scene3D !== "undefined" && Scene3D.init(container);
      if (typeof Scene3D !== "undefined" && Scene3D.setTransitionCallback) {
        Scene3D.setTransitionCallback(flashGlitch);
      }
      if (!ok) revealIntro();
    } catch (err) {
      console.warn("3D scene start nahi hui:", err);
      revealIntro();   // 3D fail ho to bhi UI chalta rahe
    }
  }

  /* glitch flash overlay (world switch par) */
  function flashGlitch() {
    const fx = $("fx-glitch");
    if (!fx) return;
    fx.classList.remove("active");
    void fx.offsetWidth;   // animation restart
    fx.classList.add("active");
  }


  function revealIntro() { $("intro-card").classList.remove("hidden"); }

  /* ---------- 3) Intro flow ---------- */
  function enterPortfolio() {
    $("intro-card").classList.add("hidden");
    if (typeof Scene3D !== "undefined" && Scene3D.startSequence) {
      Scene3D.startSequence(showSpeechBubble);
    } else {
      setTimeout(showSpeechBubble, 600);
    }
  }
  function showSpeechBubble() { $("speech-bubble").classList.remove("hidden"); }

  /* ---------- 4) Sections ---------- */
  /* Option click: glitch flash ke saath HACKING WORLD me jao,
     phir content modal dikhao. */
  function enterHack(section) {
    if (typeof Scene3D !== "undefined" && Scene3D.goHack) Scene3D.goHack();
    // glitch flash ke beech content thoda delay se aaye (maza)
    setTimeout(() => openModal(section), 320);
  }

  function openModal(section) {
    const modal = $("section-modal");
    const body = $("modal-body");
    body.innerHTML = "";

    // section ke hisaab se content banao
    renderSection(section, body);

    // hacker-terminal style me dikhao (world switch ke baad)
    modal.classList.add("hack-mode");
    modal.classList.remove("hidden");
    if (typeof Scene3D !== "undefined" && Scene3D.focusTopic) Scene3D.focusTopic();
  }
  function closeModal() {
    const modal = $("section-modal");
    modal.classList.remove("hack-mode");
    modal.classList.add("hidden");
    // content band -> wapas lobby me (person reception par khada hai)
    if (typeof Scene3D !== "undefined" && Scene3D.goLobby) Scene3D.goLobby();
  }

  /* ---------- 4b) section content renderer ---------- */
  function renderSection(section, body) {
    const title = $("modal-title");

    if (section === "about") {
      title.textContent = "About Me";
      CONTENT.about.forEach((p) => {
        const el = document.createElement("p");
        el.textContent = p;
        el.style.marginBottom = "10px";
        el.style.color = "var(--text-dim)";
        body.appendChild(el);
      });
    }
    else if (section === "skills") {
      title.textContent = "Skills";
      CONTENT.skills.forEach((s) => {
        const wrap = document.createElement("div");
        wrap.className = "skill";
        wrap.innerHTML =
          '<div class="skill-top"><span>' + s.name + '</span><span>' + s.level + '%</span></div>' +
          '<div class="skill-bar"><div class="skill-fill"></div></div>';
        body.appendChild(wrap);
        setTimeout(() => { wrap.querySelector(".skill-fill").style.width = s.level + "%"; }, 60);
      });
    }
    else if (section === "se") {
      title.textContent = "Software Engineering Concepts";
      const intro = document.createElement("p");
      intro.textContent = "Yahan Software Engineering ke important concepts hain (SDLC, models, requirements analysis):";
      intro.style.color = "var(--text-dim)";
      intro.style.marginBottom = "14px";
      body.appendChild(intro);

      CONTENT.seTopics.forEach((topic) => {
        const card = document.createElement("div");
        card.className = "project";
        const pts = topic.points.map((p) => "• " + p).join("\n");
        card.innerHTML =
          "<h3>" + topic.title + "</h3>" +
          '<p style="white-space:pre-line;">' + pts + "</p>";
        body.appendChild(card);
      });
    }
    else if (section === "projects") {
      title.textContent = "Projects";
      CONTENT.projects.forEach((p) => {
        const card = document.createElement("div");
        card.className = "project";
        const tags = (p.tags || []).map((t) => '<span class="tag">' + t + "</span>").join("");
        card.innerHTML =
          "<h3>" + p.title + "</h3><p>" + p.desc + "</p>" +
          '<div class="tags">' + tags + "</div>" +
          (p.link && p.link !== "#" ? '<a class="link-btn" href="' + p.link + '" target="_blank" rel="noopener">Open ↗</a>' : "");
        body.appendChild(card);
      });
    }
    else if (section === "contact") {
      title.textContent = "Contact";
      const c = CONTENT.contact;
      const list = document.createElement("ul");
      list.className = "contact-list";
      const items = [
        ["📧 Email", "mailto:" + c.email, c.email],
        ["🐙 GitHub", c.github, c.github.replace("https://", "")],
        ["💼 LinkedIn", c.linkedin, "LinkedIn profile"],
        ["📸 Instagram", c.Instagram || c.instagram || "#", "Instagram profile"]
      ].filter((it) => it[1] && it[1] !== "#");
      items.forEach((it) => {
        const li = document.createElement("li");
        li.innerHTML = it[0] + ': <a href="' + it[1] + '" target="_blank" rel="noopener">' + it[2] + "</a>";
        list.appendChild(li);
      });
      body.appendChild(list);
    }
  }
  function openAssistant() {
    const a = $("assistant");
    a.classList.remove("hidden");
    if (!a.dataset.greeted) {
      a.dataset.greeted = "1";
      Assistant.addMsg("Namaste! 👋 Main aapka assistant hoon. Mujhse skills, projects, ya kisi bhi tool ke install command ke baare me pooch sakte ho.", "bot");
    }
    $("chat-input").focus();
  }
  function closeAssistant() { $("assistant").classList.add("hidden"); }

  /* ---------- 6) Event wiring ---------- */
  function wire() {
    $("skip-intro").addEventListener("click", enterPortfolio);

    // Top nav buttons -> hacking world me jao + content dikhao
    document.querySelectorAll("[data-section]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sec = btn.getAttribute("data-section");
        enterHack(sec);
      });
    });

    // Speech bubble ke topic buttons -> hacking world me jao + content dikhao
    document.querySelectorAll(".topic-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const topic = btn.getAttribute("data-topic");
        $("speech-bubble").classList.add("hidden");
        enterHack(topic);
      });
    });

    $("modal-close").addEventListener("click", closeModal);
    $("back-lobby").addEventListener("click", closeModal);
    $("section-modal").addEventListener("click", (e) => { if (e.target.id === "section-modal") closeModal(); });

    $("open-assistant").addEventListener("click", openAssistant);
    $("assistant-close").addEventListener("click", closeAssistant);

    $("chat-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const val = $("chat-input").value;
      $("chat-input").value = "";
      Assistant.send(val);
    });

    document.querySelectorAll(".quick-btn").forEach((btn) => {
      btn.addEventListener("click", () => Assistant.send(btn.getAttribute("data-q")));
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeModal(); closeAssistant(); }
    });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    fillStaticContent();
    bootScene();
    wire();
  });
})();

