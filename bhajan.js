const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  document.getElementById("lyrics").innerText = "Bhajan not found";
}

fetch(`data/${slug}.json`)
  .then(res => res.json())
  .then(bhajan => {
    document.getElementById("title").innerText = bhajan.title;
    document.getElementById("lyrics").innerText = bhajan.lyrics;

    const metaContainer = document.getElementById("meta");

    const fields = [
      { key: "writer", label: "✍️ गीतरचना / Writer" },
      { key: "dialogs", label: "✍️ संकलन लेखन / Compilation Writing" },
      { key: "singer", label: "🎤 मुख्य स्वर / Singer" },
      { key: "album", label: "💿 ध्वनीमुद्रण / Album" },
      { key: "composer", label: "🎼 संगीत संयोजन / Composer" },
      { key: "guidance", label: "🙏 मार्गदर्शन / Guidance" },
      { key: "drum", label: "🥁 तबला / Tabla" },
      { key: "flute", label: "🎶 बासरी / Flute" },
      { key: "studio", label: "🎙️ रेकॉर्डिंग स्टुडिओ / Studio" }
    ];

    let html = "";

    fields.forEach(field => {
      if (bhajan[field.key] && bhajan[field.key].trim() !== "") {
        html += `
          <p><strong>${field.label}:</strong> ${bhajan[field.key]}</p>
        `;
      }
    });

    // YouTube link (special case)
    if (bhajan.ytlink) {
      html += `
        <p><strong>▶️ Watch:</strong> 
          <a href="${bhajan.ytlink}" target="_blank">YouTube</a>
        </p>
      `;
    }

    // Only show meta section if something exists
    if (html !== "") {
      metaContainer.innerHTML = html;
    } else {
      metaContainer.style.display = "none";
    }
  });

function goBack() {
  window.history.back();
}