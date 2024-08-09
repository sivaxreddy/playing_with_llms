function getMoonPhase(date) {
    const synodic = 29.53058867; // Synodic month (new Moon to new Moon)
    const base = new Date("2000-01-06").getTime(); // Known new moon date
    const diff = date.getTime() - base;
    const days = diff / (1000 * 60 * 60 * 24);
    const phase = ((days % synodic) / synodic) * 100;
    return phase;
}

function getIndiaTime() {
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date().toLocaleString('en-US', options);
}

function updateMoonInfo() {
    const now = new Date();
    const phase = getMoonPhase(now);
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

updateMoonInfo();
setInterval(updateMoonInfo, 60000); // Update every minute
