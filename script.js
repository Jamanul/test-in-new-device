const sliderContent = document.querySelector(".slider-content");
const sliderTrack = document.querySelector(".slider-track");
const sliderHandle = document.querySelector(".slider-handle");

let isDragging = false;
let startY;
let startHandleTop;

const maxScroll = sliderContent.clientHeight - sliderContent.parentElement.clientHeight;
const maxHandlePosition = sliderTrack.clientHeight - sliderHandle.clientHeight;

// Function to update content position based on the handle position
function updateContentPosition(handleTop) {
  const scrollPercentage = handleTop / maxHandlePosition;
  const contentScroll = maxScroll * scrollPercentage;
  sliderContent.style.transform = `translateY(-${contentScroll}px)`;
}

function onDragStart(event) {
  isDragging = true;
  startY = event.clientY;
  startHandleTop = sliderHandle.offsetTop;
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);
}

function onDragMove(event) {
  if (!isDragging) return;

  const deltaY = event.clientY - startY;
  let newHandleTop = startHandleTop + deltaY;

  // Clamp the handle's position within the track
  newHandleTop = Math.max(0, Math.min(newHandleTop, maxHandlePosition));
  sliderHandle.style.top = `${newHandleTop}px`;

  updateContentPosition(newHandleTop);
}

function onDragEnd() {
  isDragging = false;
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("mouseup", onDragEnd);
}

// Scroll event handler to move the slider on scroll
function onScroll(event) {
  // Adjust handle position based on scroll direction and speed
  let handleTop = sliderHandle.offsetTop + event.deltaY * 0.1;
  handleTop = Math.max(0, Math.min(handleTop, maxHandlePosition));
  
  // Update handle position and content position
  sliderHandle.style.top = `${handleTop}px`;
  updateContentPosition(handleTop);
}

// Event listeners for drag and scroll
sliderHandle.addEventListener("mousedown", onDragStart);
sliderContent.parentElement.addEventListener("wheel", onScroll);
