// NOTE: initial theme/font application lives inline in <head> (see
// _layouts/default.html) so it runs before first paint. Doing it here caused
// a visible flash on every page load. Classes live on <html>, not <body>.

const root = document.documentElement;

document.addEventListener('DOMContentLoaded', () => {
  // Enable transitions only AFTER the first paint, so page loads render
  // instantly and only user-initiated toggles animate. Without the rAF the
  // class can land in the same frame as the initial styles and still animate.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.classList.add('transitions-ready'));
  });

  const toggleThemeButton = document.querySelector('.toggle-theme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      root.classList.toggle('theme-dark');
      root.classList.toggle('theme-light');
      localStorage.setItem('theme', root.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light');
    });
  }

  const toggleFontButton = document.querySelector('.toggle-font');
  if (toggleFontButton) {
    toggleFontButton.addEventListener('click', () => {
      root.classList.toggle('font-roboto');
      root.classList.toggle('font-calibri');
      localStorage.setItem('font', root.classList.contains('font-roboto') ? 'font-roboto' : 'font-calibri');
    });
  }
});
