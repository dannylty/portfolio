// Immediately-invoked function to set the theme and font as soon as possible
(function() {
  const savedTheme = localStorage.getItem('theme') || 'theme-light'; // Default to dark theme
  const savedFont = localStorage.getItem('font') || 'font-roboto'; // Default to Roboto font
  document.body.classList.add(savedTheme, savedFont);
})();

// The rest of your code can remain inside the DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle button
  const toggleThemeButton = document.querySelector('.toggle-theme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      let currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
      
      // Toggle the theme
      document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light');
      currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
      
      // Save the current theme to localStorage
      localStorage.setItem('theme', currentTheme);
    });
  }

  // Font toggle button
  const toggleFontButton = document.querySelector('.toggle-font');
  if (toggleFontButton) {
    toggleFontButton.addEventListener('click', () => {
      let currentFont = document.body.classList.contains('font-roboto') ? 'font-roboto' : 'font-calibri';
      
      // Toggle the font
      document.body.classList.toggle('font-roboto');
      document.body.classList.toggle('font-calibri');
      currentFont = document.body.classList.contains('font-roboto') ? 'font-roboto' : 'font-calibri';
      
      // Save the current font to localStorage
      localStorage.setItem('font', currentFont);
    });
  }
});
