const form = document.getElementById('energyForm');
const list = document.getElementById('energyList');
const totalUsage = document.getElementById('totalUsage');
const clearBtn = document.getElementById('clearData');
const latestReading = document.getElementById('latestReading');

// Load entries from localStorage
let entries = JSON.parse(localStorage.getItem('energyEntries')) || [];

function showTip(usage) {
  const tips = [
    "Turn off lights when not in use.",
    "Use energy-efficient appliances.",
    "Unplug chargers when not charging.",
    "Use natural light during the day.",
    "Avoid using standby mode."
  ];

  if (usage > 5) {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    
    // Show alert
    alert("⚠️ High Usage Detected!\nTip: " + tip);

    // Try showing notification
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("⚠️ High Energy Usage", {
          body: tip
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("⚠️ High Energy Usage", {
              body: tip
            });
          }
        });
      }
    }
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
