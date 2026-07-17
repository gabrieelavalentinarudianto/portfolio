// Highlight dot navigation sesuai section yang sedang aktif saat scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, header.hero");
  const dots = document.querySelectorAll(".dot-nav .dot");

  if (!sections.length || !dots.length) return;

  const setActive = (id) => {
    dots.forEach((dot) => {
      dot.classList.toggle("active", dot.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    if (section.id) observer.observe(section);
  });
});

// ===== Carousel / slider untuk galeri gambar proyek =====
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector(".car-prev");
    const nextBtn = carousel.querySelector(".car-next");
    const dotsWrap = carousel.querySelector(".carousel-dots");
    let index = 0;

    if (slides.length <= 1) {
      // Tidak perlu kontrol kalau cuma 1 gambar
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    // Buat dot indikator sesuai jumlah slide
    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "car-dot";
      dot.setAttribute("aria-label", `Ke gambar ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));

    // Swipe untuk layar sentuh
    let startX = 0;
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(index - 1) : goTo(index + 1);
      }
    });

    update();
  });
});
