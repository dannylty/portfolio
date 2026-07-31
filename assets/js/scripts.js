// NOTE: initial theme/font application lives inline at the top of <body>
// (see _layouts/default.html) so it runs before first paint. Doing it here
// instead caused a white flash for dark-mode users on every page load.

document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeButton = document.querySelector('.toggle-theme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light');
      localStorage.setItem('theme', document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light');
    });
  }

  const toggleFontButton = document.querySelector('.toggle-font');
  if (toggleFontButton) {
    toggleFontButton.addEventListener('click', () => {
      document.body.classList.toggle('font-roboto');
      document.body.classList.toggle('font-calibri');
      localStorage.setItem('font', document.body.classList.contains('font-roboto') ? 'font-roboto' : 'font-calibri');
    });
  }
});
