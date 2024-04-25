document.addEventListener('DOMContentLoaded', () => {
    // Check for saved user theme and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList = savedTheme;
    }
  
    // Theme toggle button
    const toggleThemeButton = document.querySelector('.toggle-theme');
    toggleThemeButton.addEventListener('click', () => {
      let currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
      
      // Toggle the theme
      if (currentTheme === 'theme-light') {
        document.body.classList.replace('theme-light', 'theme-dark');
        currentTheme = 'theme-dark';
      } else {
        document.body.classList.replace('theme-dark', 'theme-light');
        currentTheme = 'theme-light';
      }
      
      // Save the current theme to localStorage
      localStorage.setItem('theme', currentTheme);
    });
  });
  