/* ============================================================
   PORTFOLIO DATA — EDIT YOUR DETAILS BELOW ⬇️
   (You can change anything here. Save and refresh the browser —
    the whole portfolio will update automatically.)
   ============================================================ */

window.PORTFOLIO_DATA = {
  /* ---- BASIC INFO ---- */
  personal: {
    name: "Nikhil Arya Prajapati",              // Your full name
    roles: [                                    // Roles that type out in the hero section
      "Java Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Software Engineer",
    ],
    tagline:
      "Aspiring Full Stack Java Developer building scalable backend systems and command-line tools.",
    photo: "assets/me.png",                                  // Your photo path
    resumeUrl: "resume.html",                          // Your resume page link
  },

  /* ---- ABOUT ---- */
  about: {
    paragraphs: [
      "I am a passionate Java Developer focused on backend development and scalable systems. I love writing clean code and efficient software design.",
      "My expertise lies in Java, Spring Boot, Python, C++, and modern backend technologies. I am always eager to learn new things and improve myself.",
    ],
    quick: [                                    // Short facts / highlights
      { icon: "fa-solid fa-location-dot", text: "India" },
      { icon: "fa-solid fa-graduation-cap", text: "Computer Science Student" },
      { icon: "fa-solid fa-briefcase", text: "Open to Opportunities" },
      { icon: "fa-solid fa-language", text: "English" },
    ],
    stats: [                                    // Animated counters (value as number, suffix "+", "%", "K" etc.)
      { value: 5, suffix: "+", label: "Projects Built" },
      { value: 10, suffix: "+", label: "Technologies" },
      { value: 1, suffix: "+", label: "Year Learning" },
      { value: 100, suffix: "%", label: "Dedication" },
    ],
  },

  /* ---- SKILLS (level = 0 to 100) ---- */
  skills: [
    {
      category: "Java & Backend",
      icon: "fa-solid fa-code",
      items: [
        { name: "Java", level: 85 },
        { name: "Spring Boot", level: 75 },
        { name: "Python", level: 70 },
        { name: "C++", level: 65 },
        { name: "Node.js", level: 60 },
      ],
    },
    {
      category: "Frontend",
      icon: "fa-solid fa-laptop-code",
      items: [
        { name: "HTML5", level: 85 },
        { name: "CSS3", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "React", level: 60 },
      ],
    },
    {
      category: "Database & Tools",
      icon: "fa-solid fa-database",
      items: [
        { name: "MySQL", level: 70 },
        { name: "PostgreSQL", level: 60 },
        { name: "Git & GitHub", level: 80 },
        { name: "VS Code", level: 90 },
        { name: "IntelliJ IDEA", level: 75 },
      ],
    },
    {
      category: "Other Skills",
      icon: "fa-solid fa-brain",
      items: [
        { name: "Software Engineering", level: 75 },
        { name: "Problem Solving", level: 80 },
        { name: "Data Structures & Algorithms", level: 70 },
        { name: "Basic Machine Learning", level: 50 },
      ],
    },
  ],

  /* ---- PROJECTS ---- */
  projects: [
    {
      title: "Portfolio Website",
      description:
        "Your personal portfolio — dark theme, glassmorphism, neon lights and smooth animations. A Java developer's showcase platform.",
      emoji: "⚡",
      tags: ["HTML", "CSS", "JavaScript"],
      liveUrl: "#",
      codeUrl: "#",
      featured: true,
    },
    {
      title: "Java Games Collection",
      description:
        "Multiple mini games built with Java and JavaScript — including Tic-Tac-Toe, Snake, and Puzzle games with smooth gameplay and score tracking.",
      emoji: "🎮",
      tags: ["Java", "JavaScript", "Game Development"],
      liveUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Student Management System",
      description:
        "Java-based desktop application to add, update, delete, and search student records. Data stored in MySQL with MVC architecture.",
      emoji: "🎓",
      tags: ["Java", "MySQL", "Swing", "MVC"],
      liveUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "E-Commerce Backend API",
      description:
        "RESTful API built with Spring Boot and Java. Includes product catalog, order management, user authentication, and MySQL integration.",
      emoji: "🛒",
      tags: ["Java", "Spring Boot", "REST API", "MySQL"],
      liveUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Weather Dashboard",
      description:
        "Live weather app fetching real-time data from OpenWeatherMap API, displaying current temperature, forecast, and location-based results.",
      emoji: "🌦️",
      tags: ["JavaScript", "API", "HTML", "CSS"],
      liveUrl: "#",
      codeUrl: "#",
      featured: false,
    },
  ],

  /* ---- SERVICES ---- */
  services: [
    {
      icon: "fa-solid fa-laptop-code",
      title: "Java Backend Development",
      description:
        "Scalable backend systems using Java, Spring Boot, and REST APIs — fast, secure, and production-ready.",
    },
    {
      icon: "fa-solid fa-server",
      title: "Server-Side Programming",
      description:
        "Server-side logic and command-line systems using Java, Python, and C++.",
    },
    {
      icon: "fa-solid fa-database",
      title: "Database Design & Integration",
      description:
        "Designing MySQL and PostgreSQL databases and connecting them to Java applications.",
    },
    {
      icon: "fa-solid fa-code",
      title: "Full Stack Web Development",
      description:
        "Complete development of frontend (HTML, CSS, JavaScript, React) and backend (Java, Spring Boot).",
    },
  ],

  /* ---- CONTACT ---- */
  contact: {
    email: "nikhilaryaprajapati122@gmail.com",   // Your email
    phone: "+91 9084169757",                     // Your phone
    location: "Saharanpur, Uttar Pradesh, India",            // Your city / country
    socials: [                                   // Social links (icon = Font Awesome class)
      { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/nikhilaryaprajapati122" },
      { name: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com/in/nikhil-arya-prajapati-45a154433/" },
      { name: "Instagram", icon: "fa-brands fa-instagram", url: "https://instagram.com/__computer__world" },
    ],
  },

  /* ---- ACHIEVEMENTS ---- */
  achievements: [
    {
      title: "Kabaddi - State Level Bronze",
      description: "Won Bronze medal at State Level Kabaddi Championship.",
      icon: "fa-solid fa-trophy",
    },
    {
      title: "Boxing - State & National Bronze",
      description: "Won Bronze medal at State and National Level Boxing Championship.",
      icon: "fa-solid fa-glove",
    },
    {
      title: "Yoga - Open National Participant",
      description: "Participated in Open National Level Yoga Championship.",
      icon: "fa-solid fa-person-praying",
    },
  ],
};
