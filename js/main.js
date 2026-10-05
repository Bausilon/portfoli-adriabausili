/**
 * Portfoli — shared interactions
 * - Small tilt on #conjunt from the pointer
 * - Hover lifts the folder sheet; the link box stays put
 * - Cursor tag with project type
 */

(function () {
  initBarmoodPage();
  initEspecimenPage();

  const conjunt = document.getElementById("conjunt");
  const cursorTag = document.getElementById("cursor-tag");
  if (!conjunt) return;

  const cards = Array.from(conjunt.querySelectorAll(".project-card"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let hoveringCard = null;
  let raf = 0;
  let targetRX = 0;
  let targetRY = 0;
  let targetTX = 0;
  let targetTY = 0;
  let currentRX = 0;
  let currentRY = 0;
  let currentTX = 0;
  let currentTY = 0;

  function applyTransform() {
    conjunt.style.transform =
      `translate3d(${currentTX.toFixed(2)}px, ${currentTY.toFixed(2)}px, 0) ` +
      `rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg)`;
  }

  function onPointerMove(event) {
    if (reduceMotion) return;

    const rect = conjunt.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (event.clientX - cx) / (rect.width / 2);
    const ny = (event.clientY - cy) / (rect.height / 2);
    const clampedX = Math.max(-1, Math.min(1, nx));
    const clampedY = Math.max(-1, Math.min(1, ny));

    targetRY = clampedX * 7;
    targetRX = clampedY * -4;
    targetTX = clampedX * 12;
    targetTY = clampedY * 10;

    if (cursorTag && hoveringCard) {
      cursorTag.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, calc(-100% - 14px))`;
    }

    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick() {
    raf = 0;
    const ease = 0.12;
    currentRX += (targetRX - currentRX) * ease;
    currentRY += (targetRY - currentRY) * ease;
    currentTX += (targetTX - currentTX) * ease;
    currentTY += (targetTY - currentTY) * ease;

    applyTransform();

    if (
      Math.abs(targetRX - currentRX) > 0.01 ||
      Math.abs(targetRY - currentRY) > 0.01 ||
      Math.abs(targetTX - currentTX) > 0.01 ||
      Math.abs(targetTY - currentTY) > 0.01
    ) {
      raf = requestAnimationFrame(tick);
    }
  }

  function resetTilt() {
    targetRX = 0;
    targetRY = 0;
    targetTX = 0;
    targetTY = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function showTag(label, event) {
    if (!cursorTag) return;
    cursorTag.textContent = label;
    cursorTag.classList.add("is-visible");
    document.body.classList.add("is-card-hover");
    if (event) {
      cursorTag.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, calc(-100% - 14px))`;
    }
  }

  function hideTag() {
    if (!cursorTag) return;
    cursorTag.classList.remove("is-visible");
    cursorTag.textContent = "";
    document.body.classList.remove("is-card-hover");
  }

  function pointerHitsCard(card, x, y) {
    const el = document.elementFromPoint(x, y);
    return !!(el && card.contains(el));
  }

  cards.forEach((card) => {
    card.addEventListener("pointerenter", (event) => {
      hoveringCard = card;
      cards.forEach((c) => c.classList.toggle("is-lifted", c === card));
      showTag(card.dataset.tag || "", event);
    });

    card.addEventListener("pointerleave", (event) => {
      if (hoveringCard !== card) return;
      if (event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return;
      const x = event.clientX;
      const y = event.clientY;
      requestAnimationFrame(() => {
        if (hoveringCard !== card) return;
        if (pointerHitsCard(card, x, y)) return;
        hoveringCard = null;
        card.classList.remove("is-lifted");
        hideTag();
      });
    });

    card.addEventListener("pointermove", (event) => {
      if (cursorTag && hoveringCard === card) {
        cursorTag.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, calc(-100% - 14px))`;
      }
    });
  });

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", resetTilt);

  function initBarmoodPage() {
    const page = document.querySelector(".case-barmood");
    if (!page) return;

    const tapas = [
      { name: "croquetes", src: "assets/barmood-croquetes.svg" },
      { name: "pa amb tomàquet", src: "assets/barmood-pa.svg" },
      { name: "pop", src: "assets/barmood-pop.svg" },
    ];

    const cartaBtn = document.getElementById("bm-carta");
    const instructions = document.getElementById("bm-instructions");
    const cobrateBtn = document.getElementById("bm-cobrate");
    const reading = document.getElementById("bm-reading");
    const readingCards = document.getElementById("bm-reading-cards");
    const readingStatus = document.getElementById("bm-reading-status");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (cartaBtn && instructions) {
      cartaBtn.addEventListener("click", function () {
        const willOpen = instructions.hasAttribute("hidden");
        if (willOpen) instructions.removeAttribute("hidden");
        else instructions.setAttribute("hidden", "");
        cartaBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        if (willOpen) {
          instructions.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
        }
      });
    }

    function tapaCard(tapa) {
      const img = document.createElement("img");
      img.src = tapa.src;
      img.alt = tapa.name;
      img.width = 364;
      img.height = 577;
      return img;
    }

    if (cobrateBtn && reading && readingCards) {
      cobrateBtn.addEventListener("click", function () {
        const hand = [0, 1, 2].map(function () {
          return tapas[Math.floor(Math.random() * tapas.length)];
        });
        readingCards.replaceChildren();
        hand.forEach(function (tapa) {
          readingCards.appendChild(tapaCard(tapa));
        });
        if (readingStatus) {
          readingStatus.textContent = hand.map(function (tapa) { return tapa.name; }).join(", ");
        }
        reading.removeAttribute("hidden");
        reading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
      });
    }
  }

  function initEspecimenPage() {
    const page = document.querySelector(".case-especimen");
    if (!page) return;

    const glypho = document.getElementById("sp-glypho");
    page.querySelectorAll(".sp-cell").forEach(function (cell) {
      cell.addEventListener("click", function () {
        if (glypho) glypho.textContent = cell.textContent;
      });
    });

    const sample = document.getElementById("sp-axes-line");
    const meta = document.getElementById("sp-axes-meta");
    const inputs = page.querySelectorAll(".sp-slider input");

    function applyAxes() {
      const values = { wght: 200, wdth: 100, opsz: 14 };
      inputs.forEach(function (input) {
        values[input.dataset.axis] = Number(input.value);
      });
      if (sample) {
        sample.style.fontWeight = String(values.wght);
        sample.style.fontVariationSettings =
          '"opsz" ' + values.opsz + ', "wdth" ' + values.wdth + ', "wght" ' + values.wght;
      }
      if (meta) {
        meta.textContent =
          '"WGHT": ' + values.wght + ' "WDTH": ' + values.wdth + ' "OPSZ" ' + values.opsz;
      }
    }

    inputs.forEach(function (input) {
      input.addEventListener("input", applyAxes);
    });
    applyAxes();
  }
})();
