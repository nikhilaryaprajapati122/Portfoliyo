/* =========================================================
   assistant.js  —  AI Assistant (chatbot) logic
   Hindi + English dono samajhta hai. Tools/install commands
   batata hai + copy button deta hai.
   NOTE: Browser security ki wajah se ye khud kuch install
   nahi kar sakta — wo command dikhata hai + copy karvata hai.
   ========================================================= */

const Assistant = (() => {

  const logEl   = () => document.getElementById("chat-log");
  const lower   = (s) => (s || "").toLowerCase().trim();

  /* ---------- chat me message dikhana ---------- */
  function addMsg(text, who = "bot", opts = {}) {
    const log = logEl();
    if (!log) return;

    const bubble = document.createElement("div");
    bubble.className = "msg " + who;

    const span = document.createElement("span");
    span.textContent = text;
    bubble.appendChild(span);

    // agar command diya hai to code block + copy button
    if (opts.cmd) {
      const code = document.createElement("code");
      code.textContent = opts.cmd;
      bubble.appendChild(code);

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.textContent = "📋 Copy command";
      copyBtn.addEventListener("click", () => copyText(opts.cmd, copyBtn));
      bubble.appendChild(copyBtn);
    }

    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  function copyText(text, btn) {
    const done = () => {
      const old = btn.textContent;
      btn.textContent = "✅ Copied!";
      setTimeout(() => (btn.textContent = old), 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------- typing delay (jaan-boojh kar) ---------- */
  function botSay(text, opts = {}, delay = 450) {
    const log = logEl();
    if (log) {
      const typing = document.createElement("div");
      typing.className = "msg bot";
      typing.textContent = "…";
      log.appendChild(typing);
      log.scrollTop = log.scrollHeight;
      setTimeout(() => { typing.remove(); addMsg(text, "bot", opts); }, delay);
    }
  }

  /* ---------- main brain ---------- */
  function respond(raw) {
    const q = lower(raw);
    const info = (typeof CONTENT !== "undefined" && CONTENT.info) ? CONTENT.info : {};

    // 0) "kaise ho / how are you" (install check se PEHLE, warna 'kaise' install trigger kar deta hai)
    if (/(kaise ho|kaisi ho|how are you|kya haal|kaise hain|whats up|what is up|sup)\b/.test(q)) {
      return botSay("Main bilkul badhiya hoon, shukriya! 😄 Aur aap? Bataiye, main aapki kya madad kar sakta hoon — skills, projects, ya kisi tool ke baare me?");
    }

    // 1) greeting
    if (/^(hi|hello|hey|namaste|namaskar|salaam|hola|good (morning|evening|afternoon))\b/.test(q)) {
      return botSay(`Hello! 👋 Main aapka portfolio assistant hoon. Aap mujhse skills, projects, ya kisi bhi tool ke baare me pooch sakte ho.`);
    }

    // 2) boss kaun / naam
    if (/(boss|malik|owner|aapka boss|tumhara boss|head)\b/.test(q)) {
      return botSay(`Mere boss ka naam "${info.boss || "—"}" hai. 😎 Unhi ke under main kaam karta hoon.`);
    }

    // 3) kis under / company / kaha kaam karte ho
    if (/(company|kis under|kaha kaam|kaha kam|kis company|office|job|naukri|where do you work|kiske liye|kaam karte|kaam karta)\b/.test(q)) {
      return botSay(`Main "${info.company || "—"}" ke under kaam karta hoon. ${info.availability ? info.availability : ""}`.trim());
    }

    // 4) tumhara naam / aap kaun
    if (/(tumhara naam|aapka naam|your name|who are you|tum kaun|aap kaun|naam kya|naam batao)\b/.test(q)) {
      return botSay(`Main is portfolio ka assistant hoon, aur mera boss "${CONTENT.name}" hai — ek ${CONTENT.role}. 😊`);
    }

    // 5) experience / kitna time
    if (/(experience|kitna|kitne saal|kitne sal|how long|kab se)\b/.test(q)) {
      return botSay(`Mere boss (${CONTENT.name}) ke paas ${info.experience || "kaafi"} ka experience hai in fields me.`);
    }

    // 6) location / kaha se
    if (/(kaha se|kahan se|location|city|rehte|where from|kaha reh)\b/.test(q)) {
      return botSay(`Hum "${info.location || "—"}" se hain. 📍`);
    }

    // 7) availability / hire / kaam karvao
    if (/(hire|available|freelance|kaam karva|kaam karwana|project dila|collaborate)\b/.test(q)) {
      return botSay(`${info.availability || "Main projects ke liye available hoon."} Mujhe yahan se contact kar sakte ho:\n📧 ${CONTENT.contact.email}`);
    }

    // 7b) Skills ke baare me detail (html/python/css/java/sql/git/c++/se)
    //     "install" wale sawaal yahan na ruken — wo neeche tools me jaate hain.
    if (typeof CONTENT !== "undefined" && Array.isArray(CONTENT.skillInfo) && !/(install|setup|download|command)/.test(q)) {
      const hit = CONTENT.skillInfo.find((s) => s.match.some((m) => q.includes(lower(m))));
      if (hit) return botSay(hit.answer + "\n\n(Aur detail ke liye 'Skills' section bhi dekho.)");
    }

    // 8) tools / install (knowledge-base match)
    if (CONTENT && Array.isArray(CONTENT.tools)) {
      for (const t of CONTENT.tools) {
        if (t.match.some((m) => q.includes(lower(m)))) {
          botSay(t.answer, { cmd: t.cmd }, 300);
          if (t.note) setTimeout(() => addMsg("ℹ️ " + t.note, "bot"), 900);
          return;
        }
      }
    }

    // 8) Software Engineering concepts (SDLC, models, requirements...)
    if (typeof CONTENT !== "undefined" && Array.isArray(CONTENT.seTopics)) {
      const seHit = CONTENT.seTopics.find((t) =>
        Array.isArray(t.match) && t.match.some((m) => q.includes(lower(m)))
      );
      if (seHit) {
        const pts = seHit.points.map((p) => "• " + p).join("\n");
        return botSay("📘 " + seHit.title + ":\n" + pts + "\n\n(Poori list ke liye 'SE Concepts' section dekho.)");
      }
    }

    // 9) languages / skills
    if (/(lang|language|skill|kya aati|kaun si|what can you|tech)\b/.test(q)) {
      const list = CONTENT.skills.map((s) => `${s.name} (${s.level}%)`).join(", ");
      return botSay("Main in languages/tools me kaam karta hoon: " + list);
    }

    // 10) projects
    if (/(project|kaam|work|banaya)\b/.test(q)) {
      const names = CONTENT.projects.map((p) => "• " + p.title).join("\n");
      return botSay("Mere kuch projects:\n" + names + "\n\nDetail ke liye 'Projects' section dekho.");
    }

    // 11) about
    if (/(about|who|kaun|tum|yourself|intro)\b/.test(q)) {
      return botSay(CONTENT.about[0] || "Main ek developer hoon.");
    }

    // 12) contact
    if (/(contact|email|reach|github|linkedin|instagram)\b/.test(q)) {
      return botSay(`Aap mujhe yahan se contact kar sakte ho:\n📧 ${CONTENT.contact.email}\n🐙 ${CONTENT.contact.github}`);
    }

    // 13) how to install kuch bhi
    if (/(install|kaise|how to|setup|download)\b/.test(q)) {
      return botSay(
        "Batayein aap kaun sa tool install karna chahte ho? Jaise: Node, Python, Git, VS Code, React, Three.js. Main command de dunga jise aap copy karke chala sakte ho. (Browser security ki wajah se main khud install nahi kar sakta, par command ready hai 👍)",
        {}
      );
    }

    // 14) thank you
    if (/(thank|thanks|shukriya|dhanyavad|thx|ty)\b/.test(q)) {
      return botSay("Aapka swagat hai! 😊 Aur kuch poochna ho to main yahin hoon.");
    }

    // 15) bye
    if (/(bye|alvida|good night|goodnight|chalta|milte|see you|tata)\b/.test(q)) {
      return botSay("Alvida! 👋 Phir milte hain. Aapka din shubh ho! ✨");
    }

    // 16) fallback
    return botSay(
      "Maaf kijiye, main ye theek se samajh nahi paaya. 🤔 Aap ye poochh sakte ho:\n• 'kaise ho'\n• 'boss ka naam'\n• 'kis company me kaam karte ho'\n• 'kaun si languages aati hain'\n• 'node kaise install karu'\n• 'projects dikhao'"
    );
  }

  /* ---------- typing indicator for user send ---------- */
  function send(raw) {
    const text = (raw || "").trim();
    if (!text) return;
    addMsg(text, "user");
    setTimeout(() => respond(text), 250);
  }

  return { send, addMsg, botSay };
})();
