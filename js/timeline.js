/* ============================================
   ECHOES OF WWII — Timeline Interactivity
   ============================================ */

// --- Assign alternating left/right classes ---
const timelineEvents = document.querySelectorAll('.timeline-event');
timelineEvents.forEach((event, i) => {
  event.classList.add(i % 2 === 0 ? 'timeline-left' : 'timeline-right');
});

// --- Scroll-triggered reveal for timeline events ---

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
});

timelineEvents.forEach((event, i) => {
  event.style.transitionDelay = `${(i % 3) * 0.1}s`;
  timelineObserver.observe(event);
});

// --- Animated line progress based on scroll ---
const timelineWrapper = document.querySelector('.timeline-wrapper');
const timelineLine = document.querySelector('.timeline-line');

if (timelineWrapper && timelineLine) {
  window.addEventListener('scroll', () => {
    const rect = timelineWrapper.getBoundingClientRect();
    const wrapperTop = rect.top + window.scrollY;
    const wrapperHeight = rect.height;
    const scrollPos = window.scrollY + window.innerHeight;

    // Calculate how far we've scrolled through the timeline
    const progress = Math.max(0, Math.min(1,
      (scrollPos - wrapperTop) / (wrapperHeight + window.innerHeight * 0.5)
    ));

    // Scale the line height
    timelineLine.style.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
  });
}
