// Project data - Easy to modify! Just add/remove projects here
const projects = [
  {
    title: "Docu Sense",
    description:
      "A document intelligence application that allows users to upload documents and interact with them through an AI-powered chatbot. The app processes and embeds documents, enabling users to ask questions and get contextual answers based on the uploaded content.",
    image: "images/docu_sense.png",
    technologies: ["Ruby on Rails", "Sidekiq", "Redis", "PostgreSQL", "OpenAI"],
    liveUrl: "#",
    githubUrl: "https://github.com/adrian-kinda-bot/docu_sense",
  },
];

// Carousel functionality
let currentIndex = 0;
const carouselTrack = document.getElementById("carouselTrack");
const carouselIndicators = document.getElementById("carouselIndicators");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

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
    <div class="project-card min-w-full ${
      index === 0 ? "active" : ""
    }" data-index="${index}">
      <div class="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-gray-800">
        <img src="${project.image}" alt="${
        project.title
      }" class="w-full h-full object-contain transition-transform duration-500" />
        <div class="project-overlay absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300">
          <div class="flex flex-col md:flex-row gap-4">
            ${
              project.liveUrl !== "#"
                ? `
              <a href="${project.liveUrl}" target="_blank" class="project-link bg-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-110 transition-transform duration-300 shadow-lg">
                <i class="fa-solid fa-external-link"></i> Live Demo
              </a>
            `
                : ""
            }
            ${
              project.githubUrl !== "#"
                ? `
              <a href="${project.githubUrl}" target="_blank" class="project-link bg-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-110 transition-transform duration-300 shadow-lg">
                <i class="fa-brands fa-github"></i> GitHub
              </a>
            `
                : ""
            }
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

// Event listeners
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

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

  // Stop carousel auto-play when modal opens
  stopAutoPlay();

  // Populate modal content
  modalContent.innerHTML = `
    <div class="space-y-6">
      <!-- Project Image -->
      <div class="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden">
        <img src="${project.image}" alt="${
    project.title
  }" class="w-full h-full object-cover" />
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
  startAutoPlay();

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
