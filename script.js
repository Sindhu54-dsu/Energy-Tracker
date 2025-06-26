const form = document.getElementById('energyForm');
const list = document.getElementById('energyList');
const totalUsage = document.getElementById('totalUsage');
const clearBtn = document.getElementById('clearData');
const latestReading = document.getElementById('latestReading');

// Load entries from localStorage
let entries = JSON.parse(localStorage.getItem('energyEntries')) || [];

function showTip(usage) {
  const tips = [
    "Turn off fans/lights when leaving a room.",
    "Use LED bulbs instead of CFLs.",
    "Unplug idle chargers and electronics.",
    "Use appliances during off-peak hours.",
    "Limit use of high-energy devices like geysers."
  ];

  if (usage > 5) {
    alert("⚠️ High Usage Warning: You consumed " + usage + " kWh!\n💡 Tip: " + tips[Math.floor(Math.random() * tips.length)]);
  }
}

function renderEntries() {
  list.innerHTML = '';
  let total = 0;

  entries.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.date} — ${entry.usage} kWh`;
    list.appendChild(li);
    total += parseFloat(entry.usage);
  });

  totalUsage.textContent = total.toFixed(2);
  if (entries.length > 0) {
    latestReading.textContent = entries[entries.length - 1].usage;
  } else {
    latestReading.textContent = '0';
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const usage = parseFloat(document.getElementById('usage').value);

  if (date && usage >= 0) {
    const newEntry = { date, usage };
    entries.push(newEntry);
    localStorage.setItem('energyEntries', JSON.stringify(entries));
    renderEntries();
    showTip(usage);
    form.reset();
  }
});

clearBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear all data?")) {
    entries = [];
    localStorage.removeItem('energyEntries');
    renderEntries();
  }
});

// Initial render
renderEntries();
