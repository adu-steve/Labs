// Image Data (URL for full-sized and thumbnail images, captions)
const images = [
  {
    fullSize: "images/chameleon.jpg",
    thumbnail: "images/chameleon.jpg",
    caption: "This is the first image caption.",
  },
  {
    fullSize: "images/shaking.jpg",
    thumbnail: "images/shaking.jpg",
    caption: "This is the second image caption.",
  },
  {
    fullSize: "images/camera2.jpeg",
    thumbnail: "images/camera2.jpeg",
    caption: "This is the third image caption.",
  },
  {
    fullSize: "images/free-nature-images.jpg",
    thumbnail: "images/free-nature-images.jpg",
    caption: "This is the fourth image caption.",
  },
  {
    fullSize: "images/grain.avif",
    thumbnail: "images/grain.avif",
    caption: "This is the fifth image caption.",
  },
  {
    fullSize: "images/sun.webp",
    thumbnail: "images/sun.webp",
    caption: "This is the six image caption.",
  },
  {
    fullSize: "images/shaking.jpg",
    thumbnail: "images/shaking.jpg",
    caption: "This is the seventh image caption.",
  },
  {
    fullSize: "images/camera2.jpeg",
    thumbnail: "images/camera2.jpeg",
    caption: "This is the eighth image caption.",
  },
  {
    fullSize: "images/tree-down.jpg",
    thumbnail: "images/tree-down.jpg",
    caption: "This is the nine-th image caption.",
  },
  {
    fullSize: "images/shaking.jpg",
    thumbnail: "images/shaking.jpg",
    caption: "This is the third image caption.",
  },
];

let currentImageIndex = -1;

const galleryContainer = document.getElementById("gallery-container");

images.forEach((image, index) => {
  const thumbnail = document.createElement("img");
  thumbnail.src = image.thumbnail;
  thumbnail.alt = image.caption;
  thumbnail.className = "thumbnail";
  thumbnail.addEventListener("click", () => openLightbox(index));
  thumbnail.style.display = "flex";
  thumbnail.style.alignItems = "center";

  galleryContainer.appendChild(thumbnail);
});

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");

  lightbox.style.display = "flex";
  lightboxImage.src = images[index].fullSize;
  lightboxCaption.textContent = images[index].caption;

  updateNavigationButtons();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

document.getElementById("close-btn").addEventListener("click", closeLightbox);

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = currentImageIndex === 0;

  nextBtn.disabled = currentImageIndex === images.length - 1;
}

function showPreviousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    openLightbox(currentImageIndex);
  }
}

function showNextImage() {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    openLightbox(currentImageIndex);
  }
}

document
  .getElementById("prev-btn")
  .addEventListener("click", showPreviousImage);
document.getElementById("next-btn").addEventListener("click", showNextImage);
