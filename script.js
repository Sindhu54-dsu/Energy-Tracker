const form = document.getElementById('energyForm');
const list = document.getElementById('energyList');
const totalUsage = document.getElementById('totalUsage');

// Load saved data from localStorage
let entries = JSON.parse(localStorage.getItem('energyEntries')) || [];

function renderEntries() {
  list.innerHTML = '';
  let total = 0;

  entries.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = ${entry.date} - ${entry.usage} kWh;
    list.appendChild(li);
    total += parseFloat(entry.usage);
  });

  totalUsage.textContent = total;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const usage = document.getElementById('usage').value;

  if (date && usage) {
    const newEntry = { date, usage };
    entries.push(newEntry);
    localStorage.setItem('energyEntries', JSON.stringify(entries));
    renderEntries();
    form.reset();
  }
});

// Initial render
renderEntries();
