// script.js
(() => {
  const properties = {
    "ECO (888)": {
      name: "ECO (888)",
      type: "Studio Unit",
      location: "69 Matahimik Street Riverside 2 Subdivision Brgy. Sto. Domingo Cainta, Rizal.",
      contracts: [
        "5,399 PER MONTH 1 YEAR CONTRACT.<br> 1 MONTH ADVANCE 2 MONTHS DEPOSIT.",
        "5,899 PER MONTH 6 MONTHS CONTRACT.<br> 1 MONTH ADVANCE 2 MONTHS DEPOSIT.",
        "6,298 PER MONTH 3 MONTHS CONTRACT (3000) UTILITY DEPOSIT.",
        "6,888 PER MONTH MONTHLY CONTRACT 1 MONTH ADVANCE.",
      ],
      landmark:
        "Boundary of Pasig and Cainta. Walking distance to Ortigas Extension & Robinson's (Big R) Cainta Junction. Near the business district of Ortigas, Makati, Eastwood and Cubao.",
    },
    // ... put the rest of your properties here ...
  };

  // Get elements AFTER DOM is ready (or load this file with `defer`)
  const searchInput = document.getElementById("searchInput");
  const results = document.getElementById("results");

  if (!searchInput || !results) {
    console.error("Missing #searchInput or #results in the DOM.");
    return;
  }

  let debounceTimer;

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  function highlightKeywords(text, tokens) {
    if (!text || !tokens.length) return text;
    const pattern = tokens.map(escapeRegExp).join("|");
    if (!pattern) return text;
    const regex = new RegExp(`(${pattern})`, "gi");
    return text.replace(regex, "<strong class='text-lime-600'>$1</strong>");
  }

  function search(raw) {
    const keyword = (raw || "").trim().toLowerCase();
    if (!keyword) {
      results.innerHTML = "";
      return;
    }

    const tokens = keyword.split(/\s+/).filter(Boolean); // multi-word AND search
    let html = "";
    let found = false;

    for (const data of Object.values(properties)) {
      const haystack = [
        data.name,
        data.type,
        data.location,
        data.landmark || "",
        ...(data.contracts || []),
      ]
        .join(" ")
        .toLowerCase();

      // Match if ALL tokens exist in the combined text
      const matches = tokens.every((t) => haystack.includes(t));
      if (!matches) continue;

      found = true;

      const rows = (data.contracts || [])
        .map(
          (contract) => `
        <tr class="border-b hover:bg-gray-50">
          <td class="px-4 py-2 font-bold">${highlightKeywords(data.name, tokens)}</td>
          <td class="px-4 py-2">${highlightKeywords(data.type, tokens)}</td>
          <td class="px-4 py-2">${highlightKeywords(data.location, tokens)}</td>
          <td class="px-4 py-2">${highlightKeywords(contract, tokens)}</td>
          <td class="px-4 py-2">${highlightKeywords(data.landmark || "", tokens)}</td>
        </tr>`
        )
        .join("");

      html += `
        <table class="min-w-full bg-white text-sm text-left text-gray-600 shadow rounded overflow-hidden mb-8">
          <thead class="bg-lime-500 text-white">
            <tr>
              <th class="px-4 py-3 text-center">Property</th>
              <th class="px-4 py-3 text-center">Type</th>
              <th class="px-4 py-3 text-center">Location</th>
              <th class="px-4 py-3 text-center">Details</th>
              <th class="px-4 py-3 text-center">Landmark</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>`;
    }

    results.innerHTML = found
      ? html
      : '<div class="text-center text-gray-500 mt-4">No matching properties found.</div>';
  }

  function triggerSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => search(searchInput.value), 250);
  }

  searchInput.addEventListener("input", triggerSearch);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") search(searchInput.value);
  });
})();
