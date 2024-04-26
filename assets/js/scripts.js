// Immediately-invoked function to set the theme as soon as possible
(function() {
  const savedTheme = localStorage.getItem('theme') || 'theme-dark'; // Default to dark theme
  document.body.classList = savedTheme;
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
});
