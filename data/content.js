/* =========================================================
   content.js  —  AAPKI SAARI INFORMATION YAHAN HAI
   ---------------------------------------------------------
   Bas neeche ki values apne hisaab se badal lo.
   Portfolio khud-ba-khud update ho jayega. ✅
   ========================================================= */

const CONTENT = {

  /* --- Aapka naam aur role --- */
  name: "Nikhil Kumar",                 // <-- apna naam likho
  role: "Full-Stack Developer",       // <-- apna role
  tagline: "I want to tell 3D web experiences .",
  introTitle: "Welcome to my 3D World",

  /* --- About section --- */
  about: [
   "Hi! I'm a passionate developer who builds modern, fast, and beautiful web experiences.",
"I love 3D, animations, and clean UIs. I enjoy learning new tools and using them to create something new.",
"You can see my skills and projects below. If you have any questions, ask the Assistant!"
  ],

  /* --- Skills (level = 0 se 100 ke beech) --- */
  skills: [
    { name: "HTML",        level: 95 },
    { name: "CSS",         level: 90 },
    { name: "Java",  level: 85 },
    { name: "SQL",       level: 80 },
    { name: "Software Engineering",     level: 75 },
    { name: "Python",      level: 70 },
    { name: "C++", level: 65 },
    { name: "Git & GitHub", level: 80 }
  ],

  /* --- Har skill ke baare me detail (Assistant isse batata hai) ---
     Jab koi "html kya hai", "python batao", "sql samjhao" etc pooche.
     match = keywords, answer = chhota sa clear explanation.        */
  skillInfo: [
    {
      match: ["html", "hypertext", "markup"],
      answer: "🧱 HTML (HyperText Markup Language) — web page ka dhaancha (skeleton). Headings, paragraphs, images, links, forms sab isi se bante hain. Yeh batati hai 'content kya hai', keem 'kaisa dikhe' wo CSS karti hai."
    },
    {
      match: ["css", "cascading", "styling", "style sheet"],
      answer: "🎨 CSS (Cascading Style Sheets) — website ko sundar banati hai: colors, fonts, spacing, layout (Flexbox/Grid), animations aur responsive design. HTML jismanni hai to CSS kapde/makeup hai. 😄"
    },
    {
      match: ["java"],
      answer: "☕ Java — ek powerful, object-oriented language. Android apps, backend systems, aur bade enterprise software me bharpur use hoti hai. Iska mantra: 'Write Once, Run Anywhere' (JVM ki wajah se)."
    },
    {
      match: ["sql", "database", "dbms", "query", "mysql"],
      answer: "🗄️ SQL (Structured Query Language) — database se baat karne ki bhasha. Data store, retrieve, update, delete karne ke liye. Common commands: SELECT, INSERT, UPDATE, DELETE, JOIN. Har app ko data rakhta hai — yahin SQL kaam aati hai."
    },
    {
      match: ["software engineering", "engineering"],
      answer: "📐 Software Engineering — sirf coding nahi, balki poora process: requirement, design, coding, testing, deployment, maintenance. SDLC, Agile, testing, version-control sab isme aate hain. Matlab: 'theek se, time par, team me software banana'."
    },
    {
      match: ["python"],
      answer: "🐍 Python — sabse aasan aur popular language. AI/ML, data science, automation, scripting aur web (Django/Flask) me top choice. Code chhota aur padhne me easy — beginners ke liye best."
    },
    {
      match: ["c++", "cpp", "c plus plus"],
      answer: "⚙️ C++ — fast, powerful language. Games, system software, competitive programming, aur jahan performance chahiye wahan. C ke upar bani hai + OOP (classes/objects) support karti hai."
    },
    {
      match: ["git", "github", "version control", "vcs"],
      answer: "🐙 Git — version control system (code ka 'undo history' + teamwork). GitHub — Git repos online rakhne ki jagah, jahan aap apna code dikhate ho aur log ke saath kaam karte ho. Commands: git add, commit, push."
    }
  ],


  /* --- Software Engineering Concepts (detail me) ---
     Ye "SE Concepts" section + Assistant dono me use hote hain.
     Har topic ke andar points hain. Aap easily add/edit kar sakte ho. */
  seTopics: [
    {
      match: ["sdlc", "life cycle", "lifecycle", "software development life"],
      title: "SDLC (Software Development Life Cycle)",
      points: [
        "SDLC ek structured process hai software banane aur maintain karne ka.",
        "Main phases: 1) Requirement Analysis  2) Design  3) Implementation (Coding)  4) Testing  5) Deployment  6) Maintenance.",
        "Faayda: clear planning, quality, cost control aur on-time delivery."
      ]
    },
    {
      match: ["requirement", "requirements", "srs", "requirement analysis", "zaroorat"],
      title: "Requirement Analysis",
      points: [
        "Isme client ki zarooratein samajhi jaati hain — 'software ko kya karna chahiye'.",
        "Do type: Functional (features/kam) aur Non-Functional (performance, security, speed).",
        "Output ek SRS document (Software Requirement Specification) hota hai.",
        "Tools: interviews, questionnaires, observation, use-cases."
      ]
    },
    {
      match: ["waterfall", "jal prvaah", "water fall"],
      title: "Waterfall Model",
      points: [
        "Sabse purana linear model — ek phase poora hone ke baad hi next shuru.",
        "Flow: Requirements → Design → Implementation → Testing → Deployment → Maintenance.",
        "Best jab requirements clear aur fixed hon. Documentation bahut strong hoti hai.",
        "Limitation: flexibility kam, peeche jaakar change karna mushkil."
      ]
    },
    {
      match: ["agile", "scrum", "sprint", "kanban"],
      title: "Agile Model",
      points: [
        "Iterative + flexible — kaam chote sprints (1-4 hafte) me hota hai.",
        "Har sprint ke baad client ko working software dikhaya jaata hai, feedback leta hai.",
        "Values: individuals, working software, collaboration, responding to change.",
        "Popular frameworks: Scrum, Kanban, XP."
      ]
    },
    {
      match: ["spiral", "risk model"],
      title: "Spiral Model",
      points: [
        "Risk-driven model — har loop me 4 kaam: Planning → Risk Analysis → Engineering → Evaluation.",
        "Bade, expensive aur high-risk projects ke liye best.",
        "Prototyping + waterfall ka combination jaisa. Baar-baar loop chalta hai."
      ]
    },
    {
      match: ["v-model", "v model", "verification and validation", "verification & validation"],
      title: "V-Model (Verification & Validation)",
      points: [
        "Waterfall ka extended version — development aur testing parallel chalti hai (V shape).",
        "Left side = development phase, Right side = uski matching testing phase.",
        "Jaise: Requirement ↔ Acceptance Testing, Design ↔ System Testing, Coding ↔ Unit Testing."
      ]
    },
    {
      match: ["prototype", "prototyping"],
      title: "Prototype Model",
      points: [
        "Pehle ek chhota working model (prototype) banta hai, client ko dikhaya jaata hai.",
        "Feedback ke basis par final software improve hota hai.",
        "Best jab requirement clear na ho. Faayda: galatfehmi kam, client khush."
      ]
    },
    {
      match: ["rad model", "rapid application development"],
      title: "RAD Model (Rapid Application Development)",
      points: [
        "Fast development — components reuse hote hain aur prototyping use hoti hai.",
        "Chote teams, quick feedback, jaldi delivery. 60-90 din me system ban sakta hai."
      ]
    },
    {
      match: ["incremental", "increment model"],
      title: "Incremental Model",
      points: [
        "Software chote increments (hisson) me deliver hota hai — pehla version basic, baad me features add.",
        "Har increment me design → code → test hota hai. Core functionality sabse pehle."
      ]
    },
    {
      match: ["verification", "validation", "verification vs validation"],
      title: "Verification vs Validation",
      points: [
        "Verification: 'Software sahi ban raha hai?' (process/documents check — bina chalaye).",
        "Validation: 'Sahi software ban gaya?' (actual product test — chala kar dekhna).",
        "Simple line: Verification = build it right, Validation = build the right thing."
      ]
    }
  ],


  /* --- Projects --- */
  projects: [
    {
      title: "3D Portfolio",
      desc: "This is the 3D office-lobby portfolio where a person walks in to the reception and talks to you.",
      tags: ["Python", "Java", "CSS"],
      link: ""
    },
    {
      title: "Project Two",
      desc: "Yahan apne doosre project ka chhota sa description likho.",
      tags: ["React", "Node"],
      link: "#"
    },
    {
      title: "Project Three",
      desc: "",
      tags: ["Python", "API"],
      link: "#"
    }
  ],

  /* --- Contact / social links --- */
  contact: {
    email:    "nikhilaryaprajapati122@gmail.com",                 // <-- apna email
    github:   "https://github.com/nikhilaryaprajapati122", // <-- apna GitHub
    linkedin: "https://www.linkedin.com/in/nikhil-arya-prajapati-45a154433/?utm_source=chatgpt.com",
    Instagram:  "https://instagram.com/remover12_34"
  },

  /* --- Extra info jo Assistant batata hai (aap easily badal sakte ho) --- */
  info: {
    boss:         "Nikhil (Owner)",             // boss ka naam
    company:      "Freelance / Self-employed",  // kis under / kaha kaam karte ho
    experience:   "2+ saal",                    // kitna experience
    location:     "India",                      // kaha se ho
    availability: "Freelance projects ke liye available hoon"
  },


  /* --- Tools / commands jo Assistant batayega ---
     Yeh ek knowledge-base hai. Assistant in keywords par
     kaam kar ke install command + copy button dega.
     Aap yahan aur tools bhi add kar sakte ho.        */
  tools: [
    {
      match: ["node", "nodejs", "node.js"],
      answer: "Node.js ek JavaScript runtime hai (server + tools ke liye zaroori). Install karne ke liye:",
      cmd: "winget install OpenJS.NodeJS.LTS",
      note: "Windows par. Baad me 'node -v' chala kar check kar lo."
    },
    {
      match: ["python"],
      answer: "Python ek popular programming language hai. Install:",
      cmd: "winget install Python.Python.3.12",
      note: "Baad me 'python --version' se check karo."
    },
    {
      match: ["git"],
      answer: "Git version-control tool hai (code save + GitHub par bhejne ke liye). Install:",
      cmd: "winget install Git.Git",
      note: "Install ke baad terminal band kar ke naya kholo."
    },
    {
      match: ["vscode", "vs code", "editor"],
      answer: "VS Code ek free code editor hai. Install:",
      cmd: "winget install Microsoft.VisualStudioCode",
      note: "Best editor for web dev."
    },
    {
      match: ["react", "npm create", "vite"],
      answer: "React project banane ke liye (Node install hone ke baad):",
      cmd: "npm create vite@latest my-app -- --template react",
      note: "Uske baad: cd my-app ; npm install ; npm run dev"
    },
    {
      match: ["three", "3d"],
      answer: "Three.js 3D library hai. Is portfolio me bhi yahi use hui hai! Naye project me:",
      cmd: "npm install three",
      note: "CDN se bhi use kar sakte ho (jaise yahan kiya)."
    }
  ]
};
