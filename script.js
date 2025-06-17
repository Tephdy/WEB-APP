const properties = {
  "ECO (888)": {
    name: "ECO (888)",
    type: "Studio Unit",
    location: "69 Matahimik Street Riverside 2 Subdivision Brgy. Sto. Domingo Cainta, Rizal.",
    contracts: [
      "5,399 PER MONTH--1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "5,899 PER MONTH - 6 MONTHS CONTRACT -1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "6,298 PER MONTH - 3 MONTHS CONTRACT - (3000) UTILITY DEPOSIT",
      "6,888 PER MONTH - MONTHLY CONTRACT - 1 MONTH ADVANCE",
    ]
  },
  "ADI 168": {
    name: "ADI 168",
    type: "Semi-furnished unit",
    location: "Imelda Ave., Karangalan Gate 2, Cainta, Rizal ",
    contracts: [
      "Trial - 3,999 - 1 MONTH - 1k utility DEPOSIT",
      "3,999 PER MONTH - 6 MONTH CONTRACT - 1 MONTH ADVANCE 1 MONTH DEPOSIT"
    ]
  },
  "THE DORM": {
    name: "THE DORM",
    type: "Bedspace unit",
    location: "74 Monaco St, Ciudad Grande 2, Pasig City, 1611 Metro Manila",
    contracts: [
      "TRIAL - 1,999 + 500 admin fee",
      "2,999 - MONTHLY CONTRACT",
      "2,799 - PER MONTH - 6 MONTHS CONTRACT - 1 MONTH ADVANCE 1 MONTH DEPOSIT",
      "2,499 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 1 MONTH DEPOSIT"
    ]
  },
  "DREAM": {
    name: "DREAM",
    type: "Studio Unit",
    location: "80 Monaco St. Cuidad Grande 2, Ortigas Extension Pasig City.",
    contracts: [
      "1 BEDROOM - 10,200 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "10,700 PER MONTH - 6 MONTHS CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "11,200 PER MONTH - MONTHLY CONTRACT - 3000 UTILITY DEPOSIT",
      "1,000 - DAILY RENTAL",
      "2 BEDROOMS - 12,400 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "12,900 PER MONTH - 6 MONTHS CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "13,400 - MONTHLY - 3K UTILITY DEPOSIT",
      "1,000 - DAILY",
      "STUDIO - 7900 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "8,400 PER MONTH - 6 MONTHS CONTACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "8,900 PER MONTH - MONTHLY CONTRACT - 3K UTILITY DEPOSIT",
      "Studio unit",
      "700 - DAILY"
    ]
  },
  "PLEASANT": {
    name: "PLEASANT",
    type: "Studio unit",
    location: "Mt. Plesant St. Brgy. Sta. Elena Marikina City",
    contracts: [
      "1A TO 1E - 4,999 PER MONTH - 1 YR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "5,400 PER MONTH - 6 MONTHS CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "5,999 - MONTHLY CONTRACT - 3K UTILITY DEPOSIT",
      "700 - DAILY",
      "UNIT 1F, 2L, 3R, AND 4X - 5099 PER MONTH - 1 YR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "5,599 PER MONTH - 6 MONTHS CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "6,099 - MONTHLY CONTRACT - 3K UTILITY DEPOSIT",
      "700 - DAILY"
    ]
  },
  "HOMEY": {
    name: "HOMEY",
    type: "Bedroom unit",
    location: "Lot 1 Block. 3 Kanlaon St., DM 5, Cainta, Rizal",
    contracts: [
      "1ST FLOOR FRONT STUDIO - 3,999 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "2ND FLOOR 1 BEDROOM - 6,000 PER MONTH - 1 YR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "3,4,5 - 5500 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "#2 - 6,000 PER MONTH - 1 YEAR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "6,7,8 - 6,000 PER MONTH – 1 YEAR CONTRACT W/ AC PROVISION - 1 MONTH ADVANCE 2 MONTHS DEPOSIT"
    ]
  },
  "KALAYAAN 888": {
    name: "KALAYAAN 888",
    type: "Studio unit",
    location: "Karangalan Gate 1 Kalayaan St. San Isidro Cainta, Rizal",
    contracts: [
      "4,999 PER MONTH - 1 MONTH ADVANCE 1 MONTH DEPOSIT"
    ]
  },
   "PENTHAUZ": {
    name: "PENTHAUZ",
    type: "Studio unit",
    location: "80 Monaco St. Pasig City",
    contracts: [
      "7,999 to 8,500/month"
    ]
  },
  "GREEN": {
    name: "GREEN",
    type: "Studio unit",
    location: "Malinis S. Brgy. Sto Domingo Cainta, 1900 Rizal",
    contracts: [
      "5,799 PER MONTH - UPPER UNIT - 1 YR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT",
      "5,399 PER MONTH - LOWER UNIT - 1 YR CONTRACT - 1 MONTH ADVANCE 2 MONTHS DEPOSIT"
    ]
  }
};

const input = document.getElementById("searchInput");
const results = document.getElementById("results");
let debounceTimer;

input.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    search(input.value.trim().toLowerCase());
  }, 500);
});

function search(keyword) {
  results.innerHTML = "";
  if (keyword === "") return;

  let matchFound = false;

  for (const [name, data] of Object.entries(properties)) {
    const nameMatch = data.name.toLowerCase().includes(keyword);
    const typeMatch = data.type.toLowerCase().includes(keyword);
    const locationMatch = data.location.toLowerCase().includes(keyword);
    const contentMatch = data.contracts.some(contract => contract.toLowerCase().includes(keyword));

    if (nameMatch || typeMatch || locationMatch || contentMatch) {
      matchFound = true;
      const table = document.createElement("table");
      table.className =
        "min-w-full bg-white text-sm text-left text-gray-600 shadow rounded overflow-hidden mb-8";

      const thead = `
        <thead class="bg-lime-500 text-white">
          <tr>
            <th class="px-4 py-3 text-center">Property</th>
            <th class="px-4 py-3 text-center">Details</th>
          </tr>
        </thead>
      `;

      let filteredContracts = [];

      if (nameMatch || locationMatch) {
        filteredContracts = data.contracts;
      } else if (typeMatch && !contentMatch) {
        filteredContracts = data.contracts;
      } else if (!typeMatch && contentMatch) {
        filteredContracts = data.contracts.filter(contract => contract.toLowerCase().includes(keyword));
      } else if (typeMatch && contentMatch) {
        filteredContracts = data.contracts;
      }

      const tbody = filteredContracts
        .map(
          detail => `
          <tr class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">
              ${data.name}
              <div class='text-xs text-gray-400'>${data.type}</div>
              <div class='text-xs text-gray-400'>${data.location}</div>
            </td>
            <td class="px-4 py-2">${detail}</td>
          </tr>`
        )
        .join("");

      table.innerHTML = thead + `<tbody>${tbody}</tbody>`;
      results.appendChild(table);
    }
  }

  if (!matchFound) {
    results.innerHTML =
      '<div class="text-center text-gray-500 mt-4">No matching properties found.</div>';
  }
}
