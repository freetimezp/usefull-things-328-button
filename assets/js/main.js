/* PARTICLES BACKGROUND */
particlesJS("particles-bg", {
    particles: {
        number: { value: 90 },
        color: { value: "#7df9ff" },
        opacity: { value: 0.15 },
        size: { value: 2 },
        move: { speed: 0.6 },
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" },
        },
    },
});

/* ENTRANCE */
gsap.from(".card", {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: "power4.out",
});

/* BUTTON HOVERS */
document.querySelectorAll(".card button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.08, boxShadow: "0 0 40px #7df9ff66", duration: 0.4 });
    });
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, boxShadow: "none", duration: 0.4 });
    });
});

//icons
let marqueeTween;
let marqueeActive = false;

function toggleMarquee() {
    const marquee = document.querySelector(".marquee");
    const track = document.querySelector(".marquee-track");

    marqueeActive = !marqueeActive;

    if (marqueeActive) {
        marquee.style.pointerEvents = "auto";

        gsap.set(track, { x: "50%" }); // 🔥 reset position
        gsap.to(marquee, { opacity: 1, duration: 0.6 });

        marqueeTween = gsap.to(track, {
            x: "-50%",
            duration: 25,
            repeat: -1,
            ease: "linear",
        });
    } else {
        marqueeTween?.kill();
        gsap.to(marquee, { opacity: 0, duration: 0.4 });
    }
}

//particles
let particlesVisible = true;

function toggleParticles() {
    particlesVisible = !particlesVisible;
    document.getElementById("particles-bg").classList.toggle("hidden");
}

//theme
let isAltTheme = false;

function toggleTheme() {
    isAltTheme = !isAltTheme;

    // BODY THEME
    document.body.classList.toggle("alt", isAltTheme);

    // CARD REVEAL (soft, fast)
    gsap.fromTo(
        ".card",
        { y: 12, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.45,
            ease: "power2.out",
        }
    );

    // THEME BUTTON FEEDBACK
    const btn = document.querySelector('[data-action="theme"]');
    if (btn) {
        btn.classList.toggle("active", isAltTheme);

        gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.35, ease: "power2.out" });
    }

    // ACCENT COLOR (✅ correct way)
    gsap.to(document.documentElement, {
        "--accent": isAltTheme ? "#ffb703" : "#7df9ff",
        duration: 0.8,
        ease: "power2.inOut",
    });
}

/* ACTIONS */
document.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    if (action === "modal") openModal();

    if (action === "social") toggleMarquee();

    if (action === "fx") toggleParticles();

    if (action === "theme") toggleTheme();
});

/* MODAL */
function openModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";

    gsap.fromTo(
        ".modal-box",
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
}

function closeModal() {
    const modal = document.querySelector(".modal");

    gsap.to(".modal-box", {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            modal.style.display = "none";
            modal.style.opacity = "1"; // 🔥 IMPORTANT RESET
        },
    });
}

document.querySelector(".close").onclick = closeModal;
