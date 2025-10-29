
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality

 const container = document.getElementById("data-display");
  if (!container) {
    console.error("❌ No element found with class 'data-display'");
    return;
  }

  // Unique cities and categories with reduce
  const cities = data.reduce((acc, d) => {
    if (d.city && !acc.includes(d.city)) acc.push(d.city);
    return acc;
  }, []);

  const categories = data.reduce((acc, d) => {
    if (d.category && !acc.includes(d.category)) acc.push(d.category);
    return acc;
  }, []);

  // Build the table inside the container
  container.innerHTML = `
    <h2>heading insert here</h2>
    <div style="overflow-x:auto; max-height:500px; border:1px solid #ccc;">
      <table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse; table-layout:fixed; width:100%;">
        <thead style="background:#f2f2f2; position:sticky; top:0;">
          <tr>
            <th >ID</th>
            <th style="position:relative;">
            <div style="display:flex; flex-direction:column; ">
              Date
              <select id="dateSort">
                <option value="">Sort</option>
                <option value="newest">Newest → Oldest</option>
                <option value="oldest">Oldest → Newest</option>
              </select>
            </th>
            <th>Name</th>
            <th style="position:relative;">
              Category
              <div style="display:flex; flex-direction:column; ">
              <select id="categoryFilter">
                <option value="">All</option>
                ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </th>
            <th style="position:relative;">
            <div style="display:flex; flex-direction:column;">
              City
              <select id="cityFilter">
                <option value="">All</option>
                ${cities.map(c => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </th>
            <th>State</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          ${makeRows(data)}
        </tbody>
      </table>
    </div>
  `;

  enableFilters(data);
}

function makeRows(data) {
  return data.map(d => `
    <tr>
      <td>${d.establishment_id || ''}</td>
      <td>${d.inspection_date ? new Date(d.inspection_date).toLocaleDateString() : ''}</td>
      <td>${d.name || ''}</td>
      <td>${d.category || ''}</td>
      <td>${d.city || ''}</td>
      <td>${d.state || ''}</td>
      <td>${d.inspection_results || ''}</td>
    </tr>
  `).join('');
}

function enableFilters(data) {
  const dateSort = document.getElementById("dateSort");
  const cityFilter = document.getElementById("cityFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const body = document.getElementById("tableBody");

  function updateTable() {
    let filtered = [...data];

    // Filter by City
    const cityVal = cityFilter.value;
    if (cityVal) filtered = filtered.filter(d => d.city === cityVal);

    // Filter by Category
    const catVal = categoryFilter.value;
    if (catVal) filtered = filtered.filter(d => d.category === catVal);

    // Sort by Date using reduce
    const sortVal = dateSort.value;
    if (sortVal) {
      filtered = filtered.reduce((acc, cur) => { acc.push(cur); return acc; }, []);
      filtered.sort((a, b) => {
        const da = new Date(a.inspection_date);
        const db = new Date(b.inspection_date);
        return sortVal === "newest" ? db - da : da - db;
      });
    }

    // Update the table rows
    body.innerHTML = makeRows(filtered);
  }

  // Attach event listeners to all filters
  [dateSort, cityFilter, categoryFilter].forEach(sel =>
    sel.addEventListener("change", updateTable)
  );
}

// ✅ Call this once your data is ready
// Example:
// loadData().then(showInteractiveTable);
// or if your data variable already exists:
export default showTable;