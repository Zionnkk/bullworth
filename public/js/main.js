// =========================
// PAGE GLITCH TRANSITION
// =========================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        document.body.classList.add("page-glitch");

        setTimeout(() => {
            window.location.href = href;
        }, 350);
    });
});

// =========================
// TITLE GLITCH ON HOVER
// =========================

const title = document.querySelector(".home-title");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let titleInterval = null;

if (title) {
    title.addEventListener("mouseenter", () => {
        let iteration = 0;

        clearInterval(titleInterval);

        const original = title.dataset.value || title.innerText;
        title.dataset.value = original;

        titleInterval = setInterval(() => {
            title.innerText = original
                .split("")
                .map((letter, index) => {
                    if (letter === "\n" || letter === " ") return letter;
                    if (index < iteration) return original[index];

                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if (iteration >= original.length) {
                clearInterval(titleInterval);
                title.innerText = original;
            }

            iteration += 0.7;
        }, 35);
    });
}

// =========================
// SUBTITLE ROTATION
// =========================

const subtitles = [
    "BULLWORTH ACADEMY • EST. 2006",
    "CRABBLESNITCH SABE • ACESSO RESTRITO",
    "SRA DANVERS OBSERVA • NO COLO DO DIRETOR",
    "CAMARILHAS DOMINAM • CUECAS SÃO PROIBIDAS",
    "BULLWORTH NUNCA TE ESQUECE"
];

const subtitle = document.querySelector(".home-subtitle");
let subtitleIndex = 0;

if (subtitle) {
    setInterval(() => {
        subtitle.style.opacity = 0;

        setTimeout(() => {
            subtitleIndex++;

            if (subtitleIndex >= subtitles.length) {
                subtitleIndex = 0;
            }

            subtitle.innerText = subtitles[subtitleIndex];
            subtitle.style.opacity = 1;
        }, 300);
    }, 4200);
}

// =========================
// SUBTLE PARALLAX
// =========================

const rightPanel = document.querySelector(".right-panel");

if (rightPanel) {
    window.addEventListener("mousemove", e => {
        const x = (window.innerWidth / 2 - e.clientX) / 120;
        const y = (window.innerHeight / 2 - e.clientY) / 120;

        rightPanel.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// =========================
// NOISE OVERLAY
// =========================

const noise = document.createElement("div");
noise.classList.add("noise-overlay");
document.body.appendChild(noise);

// =========================
// REPORT TRANSITION
// =========================

const nivelamentoBtn = document.querySelector(".next-page");
const reportLink = document.querySelector(".report-link");
const reportTransition = document.getElementById("report-transition");

if (nivelamentoBtn && reportTransition) {
    nivelamentoBtn.addEventListener("click", e => {
        e.preventDefault();

        const destino = nivelamentoBtn.href;

        reportTransition.classList.add("active");

        setTimeout(() => {
            window.location.href = destino;
        }, 1800);
    });
}

if (reportLink && reportTransition) {
    reportLink.addEventListener("click", e => {
        e.preventDefault();

        reportTransition.classList.add("active");

        setTimeout(() => {
            window.location.href = reportLink.href;
        }, 1800);
    });
}

// =========================
// GANG MUSIC
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const gangMusic = document.querySelector("#gang-music");

    if (gangMusic) {
        gangMusic.volume = 0.25;

        gangMusic.play().catch(() => {
            document.addEventListener("click", () => {
                gangMusic.play();
            }, { once: true });
        });
    }
});

// =========================
// MAIN THEME
// =========================

const isGangPage = document.querySelector(".gang-menu-page");

if (!isGangPage) {
    const mainTheme = document.getElementById("main-theme");

    if (mainTheme) {
        mainTheme.volume = 0.25;

        const savedTime = localStorage.getItem("mainThemeTime");

        if (savedTime) {
            mainTheme.currentTime = parseFloat(savedTime);
        }

        function playMainTheme() {
            mainTheme.play().catch(() => {});
        }

        window.addEventListener("load", playMainTheme);

        document.addEventListener("click", playMainTheme, {
            once: true
        });

        setInterval(() => {
            localStorage.setItem("mainThemeTime", mainTheme.currentTime);
        }, 500);
    }
}

// =========================
// EXTRA CSS FROM JS
// =========================

const style = document.createElement("style");

style.innerHTML = `
.page-glitch{
    animation:pageGlitch .35s;
}

@keyframes pageGlitch{
    0%{
        transform:translate(0);
        filter:hue-rotate(0deg) contrast(1);
    }

    20%{
        transform:translate(-6px, 2px);
        filter:hue-rotate(25deg) contrast(1.2);
    }

    40%{
        transform:translate(6px, -2px);
    }

    60%{
        transform:translate(-3px, 1px);
        filter:hue-rotate(70deg) contrast(1.15);
    }

    80%{
        transform:translate(3px, -1px);
    }

    100%{
        transform:translate(0);
        filter:hue-rotate(0deg) contrast(1);
    }
}

.home-subtitle{
    transition:opacity .3s ease;
}

.noise-overlay{
    position:fixed;
    inset:0;
    pointer-events:none;
    opacity:.025;
    z-index:99999;
    background-image:url("https://media.tenor.com/ayT1t4X5o0kAAAAC/static.gif");
    mix-blend-mode:screen;
}
`;

document.head.appendChild(style);