// =====================================================
// BULLWORTH — MAIN JS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const currentPath = window.location.pathname;

    const isPrivilegesPage =
        currentPath === "/privilegios" ||
        currentPath.startsWith("/privilegios/");

    const isGangRoute =
        currentPath === "/camarilhas" ||
        currentPath.startsWith("/camarilhas/");

    // =================================================
    // PAGE GLITCH TRANSITION
    // =================================================

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
                return;
            }

            // Não aplica transição em âncoras internas.
            if (href.startsWith("#")) {
                return;
            }

            event.preventDefault();

            document.body.classList.add("page-glitch");

            setTimeout(() => {
                window.location.href = href;
            }, 350);

        });

    });

    // =================================================
    // TITLE GLITCH ON HOVER
    // =================================================

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

                        if (letter === "\n" || letter === " ") {
                            return letter;
                        }

                        if (index < iteration) {
                            return original[index];
                        }

                        return letters[
                            Math.floor(Math.random() * letters.length)
                        ];

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

    // =================================================
    // SUBTITLE ROTATION
    // =================================================

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

            subtitle.style.opacity = "0";

            setTimeout(() => {

                subtitleIndex++;

                if (subtitleIndex >= subtitles.length) {
                    subtitleIndex = 0;
                }

                subtitle.innerText = subtitles[subtitleIndex];
                subtitle.style.opacity = "1";

            }, 300);

        }, 4200);

    }

    // =================================================
    // SUBTLE PARALLAX
    // =================================================

    const rightPanel = document.querySelector(".right-panel");

    if (rightPanel) {

        window.addEventListener("mousemove", (event) => {

            const x =
                (window.innerWidth / 2 - event.clientX) / 120;

            const y =
                (window.innerHeight / 2 - event.clientY) / 120;

            rightPanel.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }

    // =================================================
    // NOISE OVERLAY
    // =================================================

    if (!document.querySelector(".noise-overlay")) {

        const noise = document.createElement("div");

        noise.classList.add("noise-overlay");

        document.body.appendChild(noise);

    }

    // =================================================
    // REPORT TRANSITION
    // =================================================

    const nivelamentoBtn = document.querySelector(".next-page");
    const reportLink = document.querySelector(".report-link");
    const reportTransition =
        document.getElementById("report-transition");

    if (nivelamentoBtn && reportTransition) {

        nivelamentoBtn.addEventListener("click", (event) => {

            event.preventDefault();

            const destino = nivelamentoBtn.href;

            reportTransition.classList.add("active");

            setTimeout(() => {
                window.location.href = destino;
            }, 1800);

        });

    }

    if (
        reportLink &&
        reportTransition &&
        reportLink !== nivelamentoBtn
    ) {

        reportLink.addEventListener("click", (event) => {

            event.preventDefault();

            reportTransition.classList.add("active");

            setTimeout(() => {
                window.location.href = reportLink.href;
            }, 1800);

        });

    }

    // =================================================
    // NAVEGAÇÃO INTERNA COM ROLAGEM SUAVE
    // =================================================

    const internalLinks =
        document.querySelectorAll(".gang-file-nav a[href^='#']");

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

    // =================================================
    // GANG NAV ACTIVE ON SCROLL
    // =================================================

    const gangSections = document.querySelectorAll(
        ".gang-section, .privilegio-personagem"
    );

    if (internalLinks.length && gangSections.length) {

        function updateActiveSection() {

            let current = "";

            gangSections.forEach((section) => {

                const sectionTop = section.offsetTop - 200;

                if (window.scrollY >= sectionTop) {
                    current = section.id;
                }

            });

            internalLinks.forEach((link) => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }

            });

        }

        window.addEventListener("scroll", updateActiveSection);

        updateActiveSection();

    }

    // =================================================
    // MÚSICA DAS CAMARILHAS / PRIVILÉGIOS
    // =================================================

    const gangToggle =
        document.getElementById("gang-music-toggle");

    const gangDisplay =
        document.querySelector(".gang-music-display");

    const gangStrong =
        gangDisplay?.querySelector("strong");

    const gangStatus =
        document.getElementById("gang-music-status");

    // Aceita os dois IDs usados no projeto.
    const gangAudio =
        document.getElementById("gang-music") ||
        document.getElementById("gang-theme");

    if (gangToggle && gangAudio) {

        gangAudio.volume = 0.25;

        let originalThemeName = "THEME";

        if (gangStrong) {

            originalThemeName = gangStrong.textContent
                .replace(/\s*:\s*PAUSED/gi, "")
                .replace(/\s*:\s*PLAYING/gi, "")
                .trim();

        }

        function updateGangDisplay() {

            const isPlaying = !gangAudio.paused;

            gangToggle.classList.toggle(
                "playing",
                isPlaying
            );

            if (gangStatus) {

                gangStatus.textContent =
                    isPlaying ? "PLAYING" : "PAUSED";

            } else if (gangStrong) {

                gangStrong.textContent =
                    `${originalThemeName} : ${
                        isPlaying ? "PLAYING" : "PAUSED"
                    }`;

            }

            // Só altera o texto do botão quando ele não usa
            // ícones internos feitos em HTML/CSS.
            if (
                !gangToggle.querySelector(
                    ".music-play-icon, .music-pause-icon"
                )
            ) {

                gangToggle.textContent =
                    isPlaying ? "❚❚" : "▶";

            }

        }

        gangToggle.addEventListener("click", async (event) => {

            event.preventDefault();
            event.stopPropagation();

            try {

                if (gangAudio.paused) {
                    await gangAudio.play();
                } else {
                    gangAudio.pause();
                }

            } catch (error) {

                console.warn(
                    "O navegador bloqueou a música:",
                    error
                );

            }

            updateGangDisplay();

        });

        gangAudio.addEventListener(
            "play",
            updateGangDisplay
        );

        gangAudio.addEventListener(
            "pause",
            updateGangDisplay
        );

        /*
        Tenta iniciar automaticamente a música da
        camarilha ou do privilégio.

        Caso o navegador bloqueie, ela começará quando
        o usuário apertar o botão.
        */

        gangAudio
            .play()
            .then(updateGangDisplay)
            .catch(updateGangDisplay);

        updateGangDisplay();

    }

    // =================================================
    // MÚSICA PRINCIPAL DE BULLWORTH
    // =================================================

    const mainTheme =
        document.getElementById("main-theme");

    /*
    A música principal NÃO pode tocar:

    - dentro de /camarilhas
    - dentro de qualquer página de camarilha
    - dentro de /privilegios
    - dentro de qualquer página de privilégio
    */

    const blockMainTheme =
        isGangRoute || isPrivilegesPage;

    if (mainTheme) {

        mainTheme.volume = 0.25;

        if (blockMainTheme) {

            mainTheme.pause();
            mainTheme.currentTime = 0;

            localStorage.removeItem("mainThemeTime");

        } else {

            const savedTime =
                localStorage.getItem("mainThemeTime");

            if (savedTime) {

                const parsedTime =
                    Number.parseFloat(savedTime);

                if (Number.isFinite(parsedTime)) {
                    mainTheme.currentTime = parsedTime;
                }

            }

            function playMainTheme() {

                // Proteção adicional.
                if (blockMainTheme) {
                    return;
                }

                mainTheme.play().catch(() => {});

            }

            playMainTheme();

            document.addEventListener(
                "click",
                playMainTheme,
                { once: true }
            );

            setInterval(() => {

                if (!mainTheme.paused) {

                    localStorage.setItem(
                        "mainThemeTime",
                        String(mainTheme.currentTime)
                    );

                }

            }, 500);

        }

    }

    // =================================================
    // GAMEPAD MENU
    // =================================================

    const menuItems = document.querySelectorAll(
        [
            ".pause-options a",
            ".camarilhas-bully-list a",
            ".camarilhas-menu-list a",
            ".camarilhas-grid a",
            ".gang-file-nav a",
            ".gang-return a"
        ].join(", ")
    );

    if (menuItems.length) {

        let selected = 0;
        let gamepadIndex = null;

        let lastUp = false;
        let lastDown = false;
        let lastConfirm = false;
        let lastBack = false;

        function updateSelection() {

            menuItems.forEach((item) => {
                item.classList.remove("selected");
            });

            menuItems[selected].classList.add("selected");

        }

        updateSelection();

        window.addEventListener(
            "gamepadconnected",
            (event) => {

                gamepadIndex = event.gamepad.index;

                updateSelection();

            }
        );

        function gamepadLoop() {

            if (gamepadIndex !== null) {

                const pad =
                    navigator.getGamepads()[gamepadIndex];

                if (pad) {

                    const up =
                        pad.buttons[12]?.pressed ||
                        pad.axes[1] < -0.6;

                    const down =
                        pad.buttons[13]?.pressed ||
                        pad.axes[1] > 0.6;

                    const confirm =
                        pad.buttons[0]?.pressed;

                    const back =
                        pad.buttons[1]?.pressed;

                    if (up && !lastUp) {

                        selected--;

                        if (selected < 0) {
                            selected = menuItems.length - 1;
                        }

                        updateSelection();

                    }

                    if (down && !lastDown) {

                        selected++;

                        if (selected >= menuItems.length) {
                            selected = 0;
                        }

                        updateSelection();

                    }

                    if (confirm && !lastConfirm) {
                        menuItems[selected].click();
                    }

                    if (back && !lastBack) {

                        if (isPrivilegesPage) {
                            window.location.href = "/privilegios";
                        } else {
                            window.location.href = "/camarilhas";
                        }

                    }

                    lastUp = up;
                    lastDown = down;
                    lastConfirm = confirm;
                    lastBack = back;

                }

            }

            requestAnimationFrame(gamepadLoop);

        }

        gamepadLoop();

    }

    // =================================================
    // EXTRA CSS FROM JS
    // =================================================

    if (!document.getElementById("bullworth-js-style")) {

        const style = document.createElement("style");

        style.id = "bullworth-js-style";

        style.innerHTML = `
            .page-glitch {
                animation: pageGlitch .35s;
            }

            @keyframes pageGlitch {
                0% {
                    transform: translate(0);
                    filter: hue-rotate(0deg) contrast(1);
                }

                20% {
                    transform: translate(-6px, 2px);
                    filter: hue-rotate(25deg) contrast(1.2);
                }

                40% {
                    transform: translate(6px, -2px);
                }

                60% {
                    transform: translate(-3px, 1px);
                    filter: hue-rotate(70deg) contrast(1.15);
                }

                80% {
                    transform: translate(3px, -1px);
                }

                100% {
                    transform: translate(0);
                    filter: hue-rotate(0deg) contrast(1);
                }
            }

            .home-subtitle {
                transition: opacity .3s ease;
            }

            .noise-overlay {
                position: fixed;
                inset: 0;
                pointer-events: none;
                opacity: .025;
                z-index: 99999;
                background-image:
                    url("https://media.tenor.com/ayT1t4X5o0kAAAAC/static.gif");
                mix-blend-mode: screen;
            }
        `;

        document.head.appendChild(style);

    }

});