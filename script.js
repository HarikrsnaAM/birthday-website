// Typewriter effect for love letter
(function setupTypewriter() {
  const sourceEl = document.getElementById("letter-source");
  const targetEl = document.getElementById("letter-text");
  if (!sourceEl || !targetEl) return;

  const fullText = (sourceEl.textContent || "").trim();
  const chars = [...fullText];
  let index = 0;
  const typingDelay = 40;
  const initialDelay = 600;

  function typeNextChar() {
    if (index >= chars.length) return;
    targetEl.textContent += chars[index];
    index += 1;
    const delay = chars[index - 1] === "\n" ? typingDelay * 4 : typingDelay;
    setTimeout(typeNextChar, delay);
  }

  setTimeout(typeNextChar, initialDelay);
})();

// Memories: tap to enlarge in lightbox
(function setupMemories() {
  const cards = document.querySelectorAll(".memory-card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  if (!cards.length || !lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Memory photo";
    lightbox.classList.add("visible");
  }

  function closeLightbox() {
    lightbox.classList.remove("visible");
  }

  cards.forEach((card) => {
    const img = card.querySelector("img");
    if (!img) return;
    card.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  lightbox.addEventListener("click", (event) => {
    // Close when clicking outside the inner image container
    if (event.target === lightbox || event.target.classList.contains("lightbox-backdrop")) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
})();

// Scroll reveal with IntersectionObserver
(function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window) || !elements.length) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach((el) => observer.observe(el));
})();

// Final surprise reveal
(function setupFinalSurprise() {
  const button = document.getElementById("final-button");
  const surprise = document.getElementById("final-surprise");
  if (!button || !surprise) return;

  button.addEventListener("click", () => {
    const isVisible = surprise.classList.contains("visible");
    surprise.classList.toggle("visible", !isVisible);
    if (!isVisible) {
      button.textContent = "Read it again ❤️";
    } else {
      button.textContent = "One last thing ❤️";
    }
  });
})();

// Background music (starts only after explicit tap)
(function setupMusic() {
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  if (!audio || !toggleBtn) return;

  let isPlaying = false;

  function updateLabel() {
    toggleBtn.textContent = isPlaying ? "♫ Pause song" : "♫ Play song";
  }

  toggleBtn.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        await audio.play();
        isPlaying = true;
      } else {
        audio.pause();
        isPlaying = false;
      }
      updateLabel();
    } catch (err) {
      console.error("Music error:", err);
    }
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    updateLabel();
  });

  updateLabel();
})();

// Optional simple passcode gate (if enabled in HTML)
(function setupPasscodeGate() {
  const overlay = document.getElementById("passcode-overlay");
  if (!overlay) return;

  const input = document.getElementById("passcode-input");
  const submit = document.getElementById("passcode-submit");
  const errorEl = document.getElementById("passcode-error");

  const SECRET = "iloveyou";

  function checkPasscode() {
    const value = (input.value || "").trim().toLowerCase();
    if (!value) return;
    if (value === SECRET.toLowerCase()) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => {
        overlay.remove();
      }, 600);
    } else {
      errorEl.textContent = "Hmm, that doesn’t seem right. Try again?";
      input.value = "";
    }
  }

  submit.addEventListener("click", checkPasscode);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPasscode();
  });
})();
