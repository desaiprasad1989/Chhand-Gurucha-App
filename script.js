let bhajans = [];

fetch("data/index.json")
  .then(res => res.json())
  .then(data => {
    bhajans = data;
    display(bhajans);
  });

function display(data) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (data.length === 0) {
    results.innerHTML = "<p>No bhajans found</p>";
    return;
  }

  // Group by category
  const grouped = {};

  data.forEach(b => {
    if (!grouped[b.category]) {
      grouped[b.category] = [];
    }
    grouped[b.category].push(b);
  });

  // Render categories
  for (let category in grouped) {
    results.innerHTML += `
      <h2 class="category-title">${capitalize(category)}</h2>
    `;

    grouped[category].forEach(b => {
      results.innerHTML += `
        <div class="card" onclick="openBhajan('${b.slug}')">
          <h3>${b.title}</h3>
        </div>
      `;
    });
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function openBhajan(slug) {
  window.location.href = `bhajan.html?slug=${slug}`;
}

document.getElementById("searchBox").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (!query) {
    display(bhajans);
    return;
  }

  const filtered = bhajans.filter(b =>
    b.title.toLowerCase().includes(query) ||
    b.preview.toLowerCase().includes(query) ||
    b.searchText.toLowerCase().includes(query)
  );

  display(filtered);
});

const order = ["aarti", "panchapadi", "bhajan"];

order.forEach(category => {
  if (grouped[category]) {
    results.innerHTML += `<h2 class="category-title">${capitalize(category)}</h2>`;

    grouped[category].forEach(b => {
      results.innerHTML += `
        <div class="card" onclick="openBhajan('${b.slug}')">
          <h3>${b.title}</h3>
          <p>${b.preview}</p>
        </div>
      `;
    });
  }
});