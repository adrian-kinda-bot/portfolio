// Project data - Easy to modify! Just add/remove projects here
const projects = [
  {
    title: "Docu Sense",
    description:
      "A document intelligence application that allows users to upload documents and interact with them through an AI-powered chatbot. The app processes and embeds documents, enabling users to ask questions and get contextual answers based on the uploaded content.",
    image: "images/docu_sense.png",
    images: ["images/docu_sense.png", "images/docu_sends_sidekiq.png"],
    technologies: ["Ruby on Rails", "Sidekiq", "Redis", "PostgreSQL", "OpenAI"],
    liveUrl: "#",
    githubUrl: "https://github.com/adrian-kinda-bot/docu_sense",
  },
];

// Carousel functionality
let currentIndex = 0;
const carouselTrack = document.getElementById("carouselTrack");
const carouselIndicators = document.getElementById("carouselIndicators");

// Initialize carousel
function initCarousel() {
  if (projects.length === 0) {
    carouselTrack.innerHTML =
      '<div class="w-full bg-dark rounded-2xl p-8 text-center"><p class="text-gray-300">No projects to display. Add projects in script.js</p></div>';
    return;
  }

  // Create project cards with Tailwind classes
  carouselTrack.innerHTML = projects
    .map(
      (project, index) => `
    <div class="project-card min-w-full cursor-pointer ${
      index === 0 ? "active" : ""
    }" data-index="${index}">
      <div class="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-gray-800">
        <img src="${project.image}" alt="${
        project.title
      }" class="w-full h-full object-contain transition-transform duration-500" />
        <div class="project-overlay absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300">
          <div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full px-4">
            ${
              project.liveUrl !== "#"
                ? `
              <a href="${project.liveUrl}" target="_blank" class="project-link bg-primary text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-110 transition-transform duration-300 shadow-lg w-full md:w-auto">
                <i class="fa-solid fa-external-link"></i> Live Demo
              </a>
            `
                : ""
            }
            <button
              class="project-link bg-primary text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-110 transition-transform duration-300 shadow-lg view-project-btn w-full md:w-auto"
              data-index="${index}"
            >
              <i class="fa-solid fa-eye"></i> See More
            </button>
          </div>
        </div>
      </div>
      <div class="bg-dark rounded-b-2xl p-6 lg:p-8">
        <h3 class="text-2xl lg:text-3xl font-bold text-white mb-4">${
          project.title
        }</h3>
        <p class="text-gray-300 text-base lg:text-lg leading-relaxed mb-6">${
          project.description
        }</p>
        <div class="flex flex-wrap gap-3">
          ${project.technologies
            .map(
              (tech) => `
            <span class="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">${tech}</span>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Create indicators with Tailwind classes
  carouselIndicators.innerHTML = projects
    .map(
      (_, index) => `
    <button
      class="indicator w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
        index === 0 ? "active bg-primary" : "bg-white/30 hover:bg-primary/60"
      }"
      data-index="${index}"
      aria-label="Go to project ${index + 1}"
    ></button>
  `
    )
    .join("");

  // Add event listeners to indicators
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Add click event listeners to project cards to open modal
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't open modal if clicking on links or buttons
      if (e.target.closest("a") || e.target.closest("button")) {
        return;
      }
      const projectIndex = parseInt(card.getAttribute("data-index"));
      openModal(projectIndex);
    });
  });

  // Add click event listeners to "See More" buttons
  document.querySelectorAll(".view-project-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent card click event
      const projectIndex = parseInt(btn.getAttribute("data-index"));
      openModal(projectIndex);
    });
  });

  // Update carousel width
  updateCarouselWidth();
}

function updateCarouselWidth() {
  const cardWidth = carouselTrack.querySelector(".project-card").offsetWidth;
  carouselTrack.style.width = `${projects.length * cardWidth}px`;
}

function goToSlide(index) {
  currentIndex = index;
  const cardWidth = carouselTrack.querySelector(".project-card").offsetWidth;
  const offset = -currentIndex * cardWidth;
  carouselTrack.style.transform = `translateX(${offset}px)`;

  // Update active states
  document.querySelectorAll(".project-card").forEach((card, i) => {
    const isActive = i === currentIndex;
    card.classList.toggle("active", isActive);

    // Update image transform
    const img = card.querySelector("img");
    if (img) {
      img.style.transform = isActive ? "scale(1.05)" : "scale(1)";
    }

    // Update overlay opacity
    const overlay = card.querySelector(".project-overlay");
    if (overlay) {
      overlay.style.opacity = isActive ? "1" : "0";
    }
  });

  // Update indicators
  document.querySelectorAll(".indicator").forEach((indicator, i) => {
    const isActive = i === currentIndex;
    if (isActive) {
      indicator.classList.remove("bg-white/30");
      indicator.classList.add("bg-primary", "scale-125");
    } else {
      indicator.classList.remove("bg-primary", "scale-125");
      indicator.classList.add("bg-white/30");
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % projects.length;
  goToSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  goToSlide(currentIndex);
}

// Auto-play carousel (optional - can be disabled)
let autoPlayInterval;
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Pause on hover
const carouselWrapper = document.querySelector(
  ".carousel-container"
).parentElement;
if (carouselWrapper) {
  carouselWrapper.addEventListener("mouseenter", stopAutoPlay);
  carouselWrapper.addEventListener("mouseleave", startAutoPlay);
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Modal functionality
const projectModal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");

function openModal(projectIndex) {
  const project = projects[projectIndex];
  if (!project) return;

  // Store current project index for modal carousel
  currentModalProjectIndex = projectIndex;

  // Stop carousel auto-play when modal opens
  stopAutoPlay();

  // Get images array or use single image
  const projectImages = project.images || [project.image];

  // Populate modal content
  modalContent.innerHTML = `
    <div class="space-y-6">
      <!-- Project Images Carousel -->
      <div class="relative">
        <div class="modal-carousel-container overflow-hidden rounded-xl bg-gray-900 border border-gray-700" id="modalCarouselContainer">
          <div class="flex transition-transform duration-500 ease-in-out" id="modalCarouselTrack" style="transform: translateX(0px);">
            ${projectImages
              .map(
                (img, idx) => `
              <div class="min-w-full flex items-center justify-center p-4 lg:p-8">
                <img src="${img}" alt="${project.title} - Image ${
                  idx + 1
                }" class="max-w-full max-h-[500px] lg:max-h-[600px] object-contain rounded-lg shadow-2xl" />
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        ${
          projectImages.length > 1
            ? `
          <button class="modal-carousel-btn absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10" id="modalPrevBtn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="modal-carousel-btn absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10" id="modalNextBtn">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <div class="flex justify-center gap-2 mt-4" id="modalIndicators">
            ${projectImages
              .map(
                (_, idx) => `
              <button class="modal-indicator w-2 h-2 rounded-full ${
                idx === 0 ? "bg-primary" : "bg-gray-500"
              }" data-index="${idx}"></button>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>

      <!-- Project Title -->
      <h2 class="text-3xl lg:text-4xl font-bold text-white">${
        project.title
      }</h2>

      <!-- Project Description -->
      <div class="prose prose-invert max-w-none">
        <p class="text-gray-300 text-lg leading-relaxed">${
          project.description
        }</p>
      </div>

      <!-- Technologies -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-4">Technologies Used</h3>
        <div class="flex flex-wrap gap-3">
          ${project.technologies
            .map(
              (tech) => `
            <span class="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">${tech}</span>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 pt-4">
        ${
          project.liveUrl !== "#"
            ? `
          <a
            href="${project.liveUrl}"
            target="_blank"
            class="flex-1 bg-primary text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-lg"
          >
            <i class="fa-solid fa-external-link"></i> View Live Demo
          </a>
        `
            : ""
        }
        ${
          project.githubUrl !== "#"
            ? `
          <a
            href="${project.githubUrl}"
            target="_blank"
            class="flex-1 bg-gray text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray/80 transition-all duration-300 border-2 border-gray"
          >
            <i class="fa-brands fa-github"></i> View on GitHub
          </a>
        `
            : ""
        }
      </div>
    </div>
  `;

  // Show modal
  projectModal.classList.remove("hidden");
  projectModal.classList.add("flex");
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Initialize modal carousel if multiple images
  if (projectImages.length > 1) {
    // Small delay to ensure DOM is rendered
    setTimeout(() => {
      initModalCarousel();
    }, 100);
  }
}

// Modal carousel functionality
let modalImageIndex = 0;
let currentModalProjectIndex = 0;

function initModalCarousel() {
  const modalCarouselTrack = document.getElementById("modalCarouselTrack");
  const modalPrevBtn = document.getElementById("modalPrevBtn");
  const modalNextBtn = document.getElementById("modalNextBtn");
  const modalIndicators = document.querySelectorAll(".modal-indicator");

  if (!modalCarouselTrack) return;

  const project = projects[currentModalProjectIndex];
  const projectImages = project?.images || [project?.image] || [];

  function updateModalCarousel() {
    const imageWidth = modalCarouselTrack.querySelector("div").offsetWidth;
    modalCarouselTrack.style.width = `${projectImages.length * imageWidth}px`;
    const offset = -modalImageIndex * imageWidth;
    modalCarouselTrack.style.transform = `translateX(${offset}px)`;

    // Update indicators
    modalIndicators.forEach((indicator, i) => {
      if (i === modalImageIndex) {
        indicator.classList.remove("bg-gray-500");
        indicator.classList.add("bg-primary");
      } else {
        indicator.classList.remove("bg-primary");
        indicator.classList.add("bg-gray-500");
      }
    });
  }

  if (modalPrevBtn) {
    // Remove old listeners by cloning
    const newPrevBtn = modalPrevBtn.cloneNode(true);
    modalPrevBtn.parentNode.replaceChild(newPrevBtn, modalPrevBtn);
    newPrevBtn.addEventListener("click", () => {
      modalImageIndex =
        (modalImageIndex - 1 + projectImages.length) % projectImages.length;
      updateModalCarousel();
    });
  }

  if (modalNextBtn) {
    // Remove old listeners by cloning
    const newNextBtn = modalNextBtn.cloneNode(true);
    modalNextBtn.parentNode.replaceChild(newNextBtn, modalNextBtn);
    newNextBtn.addEventListener("click", () => {
      modalImageIndex = (modalImageIndex + 1) % projectImages.length;
      updateModalCarousel();
    });
  }

  // Indicator clicks
  modalIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      modalImageIndex = index;
      updateModalCarousel();
    });
  });

  // Reset to first image when modal opens
  modalImageIndex = 0;
  updateModalCarousel();
}

function closeModal() {
  projectModal.classList.add("hidden");
  projectModal.classList.remove("flex");
  document.body.style.overflow = ""; // Restore scrolling
  startAutoPlay(); // Resume carousel auto-play
}

// Event listeners for modal
closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) {
    closeModal();
  }
});

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !projectModal.classList.contains("hidden")) {
    closeModal();
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  // Auto-play disabled since cards are now clickable

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarouselWidth();
      goToSlide(currentIndex);
    }, 250);
  });
});
