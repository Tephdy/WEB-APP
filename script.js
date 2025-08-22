const properties = {
  "ECO (888)": {
    name: "ECO (888)",
    type: "Studio Unit",
    location: "69 Matahimik Street Riverside 2 Subdivision Brgy. Sto. Domingo Cainta, Rizal.",
    contracts: [
      "5,399 PER MONTH 1 YEAR CONTRACT.<br> 1 MONTH ADVANCE 2 MONTHS DEPOSIT.",
      "5,899 PER MONTH 6 MONTHS CONTRACT.<br> 1 MONTH ADVANCE 2 MONTHS DEPOSIT.",
      "6,298 PER MONTH 3 MONTHS CONTRACT (3000) UTILITY DEPOSIT.",
      "6,888 PER MONTH MONTHL CONTRACT 1 MONTH ADVANCE.",
    ],
    landmark:"Boundary of Pasig and Cainta. Walking distance to Ortigas Extension & Robinson's (Big R) Cainta Junction. Near the business district of Ortigas, Makati, Eastwood and Cubao.",
  },
  // ... keep all properties here ...
};

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

let debounceTimer;

function triggerSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    search(searchInput.value.trim().toLowerCase());
  }, 300);
}

searchInput.addEventListener("input", triggerSearch);
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") triggerSearch();
});

function highlightKeywords(text, keyword) {
  if (!text || !keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<strong class='text-lime-600'>$1</strong>");
}

function search(keyword) {
  if (!keyword) {
    results.innerHTML = "";
    return;
  }

  let resultTables = "";
  let matchFound = false;

  for (const [_, data] of Object.entries(properties)) {
    const textToSearch = [
      data.name,
      data.type,
      data.location,
      data.landmark || "",
      ...data.contracts
    ].join(" ").toLowerCase();

    if (textToSearch.includes(keyword)) {
      matchFound = true;

      const table = document.createElement("table");
      table.className =
        "min-w-full bg-white text-sm text-left text-gray-600 shadow rounded overflow-hidden mb-8";

      const thead = `
        <thead class="bg-lime-500 text-white">
          <tr>
            <th class="px-4 py-3 text-center">Property</th>
            <th class="px-4 py-3 text-center">Type</th>
            <th class="px-4 py-3 text-center">Location</th>
            <th class="px-4 py-3 text-center">Details</th>
            <th class="px-4 py-3 text-center">Landmark</th>
          </tr>
        </thead>
      `;

      const tbody = data.contracts
        .map(contract => `
          <tr class="border-b hover:bg-gray-50">
            <td class="px-4 py-2 font-bold">${highlightKeywords(data.name, keyword)}</td>
            <td class="px-4 py-2">${highlightKeywords(data.type, keyword)}</td>
            <td class="px-4 py-2">${highlightKeywords(data.location, keyword)}</td>
            <td class="px-4 py-2">${highlightKeywords(contract, keyword)}</td>
            <td class="px-4 py-2">${highlightKeywords(data.landmark || "", keyword)}</td>
          </tr>
        `)
        .join("");

      table.innerHTML = thead + `<tbody>${tbody}</tbody>`;
      resultTables += table.outerHTML;
    }
  }

  results.innerHTML = matchFound
    ? resultTables
    : '<div class="text-center text-gray-500 mt-4">No matching properties found.</div>';
}
