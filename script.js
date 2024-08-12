function getMoonPhase(date) {
    const J2000 = 2451545.0; // Julian date for January 1, 2000 at 12:00 TT
    const synodicMonth = 29.530588853; // Synodic month in days
    const k = 0.000000436; // Correction factor for the synodic month
  
    // Convert date to Julian date
    const julianDate = date.getTime() / (1000 * 60 * 60 * 24) + J2000;
  
    // Calculate the phase angle
    const phaseAngle = (julianDate - J2000) / synodicMonth;
    const phase = (phaseAngle - Math.floor(phaseAngle)) * 100;
  
    return phase;
  }
  
  function getIndiaTime() {
      const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date().toLocaleString('en-US', options);
  }
  
  function updateMoonInfo() {
      const now = new Date();
      // Get the time in India
      const indiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const phase = getMoonPhase(indiaTime); // Calculate phase based on India time
      const moonPhaseElement = document.getElementById('moon-phase');
      const moonInfoElement = document.getElementById('moon-info');
  
      let moonEmoji, phaseName;
  
      if (phase < 1 || phase >= 99) {
          moonEmoji = '🌑';
          phaseName = 'New Moon';
      } else if (phase < 25) {
          moonEmoji = '🌒';
          phaseName = 'Waxing Crescent';
      } else if (phase < 49) {
          moonEmoji = '🌓';
          phaseName = 'First Quarter';
      } else if (phase < 51) {
          moonEmoji = '🌔';
          phaseName = 'Waxing Gibbous';
      } else if (phase < 75) {
          moonEmoji = '🌕';
          phaseName = 'Full Moon';
      } else if (phase < 99) {
          moonEmoji = '🌖';
          phaseName = 'Waning Gibbous';
      }
  
      moonPhaseElement.textContent = moonEmoji;
      moonInfoElement.innerHTML = `
          <p>Current Moon Phase: ${phaseName}</p>
          <p>Phase Percentage: ${phase.toFixed(2)}%</p>
          <p>Current Date and Time in India: ${getIndiaTime()}</p>
      `;
  }
  
  
  function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      
      // Update meta theme-color for mobile browser header
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (document.body.classList.contains('dark-mode')) {
          metaThemeColor.setAttribute("content", "#1a1a1a");
          darkModeToggle.textContent = 'Normal Mode'; // Change button text to "Normal Mode"
      } else {
          metaThemeColor.setAttribute("content", "#e0e0e0");
          darkModeToggle.textContent = 'Dark Mode'; // Change button text back to "Dark Mode"
      }
  }
  
  updateMoonInfo();
  setInterval(updateMoonInfo, 1000); // Update every second
  
  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('change', toggleDarkMode);
  
  // Check for user's preferred color scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkModeToggle.checked = true;
      toggleDarkMode();
  }
  