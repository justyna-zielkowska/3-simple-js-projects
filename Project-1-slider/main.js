// https://www.youtube.com/watch?v=gBzsE0oieio

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

// getBoundingClientRect - ustawiam szerokość wszystkim zdjeciom
const slideWidth = slides[0].getBoundingClientRect().width;

//robię forEach - slajdy mają się ustawiac jeden obok drugiego
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

//robię przyciski

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current--slide");
  targetSlide.classList.add("current--slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current--slide");
  targetDot.classList.add("current--slide");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is--hidden");
    nextButton.classList.remove("is--hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is--hidden");
    nextButton.classList.add("is--hidden");
  } else {
    prevButton.classList.remove("is--hidden");
    nextButton.classList.remove("is--hidden");
  }
};
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current--slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current--slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  console.log("next click", nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current--slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current--slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current--slide");
  const currentDot = dotsNav.querySelector(".current--slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
