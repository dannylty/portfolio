(function() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'theme-dark' : 'theme-light');
  const savedFont = localStorage.getItem('font') || 'font-roboto';
  document.body.classList.add(savedTheme, savedFont);
})();

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
