/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  
const extracted = data.slice(0, 24);
  const total = extracted.length;

  // Category counts
  const categoryCounts = extracted.reduce((acc, r) => {
    acc[r.category || "Unknown"] = (acc[r.category || "Unknown"] || 0) + 1;
    return acc;
  }, {});

  // Most common category
  const mostCommonCategory = Object.entries(categoryCounts).sort((a,b) => b[1]-a[1])[0] || ["None", 0];

  // Inspection result counts
  const resultCounts = extracted.reduce((acc, r) => {
    let res = r.inspection_results || "Unknown";
    if (res.trim() === "------") res = "N/A";
    acc[res] = (acc[res] || 0) + 1;
    return acc;
  }, {});

  // City counts (Top 5)
  const cityCounts = extracted.reduce((acc, r) => {
    const city = r.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const topCities = Object.entries(cityCounts)
    .sort((a,b) => b[1]-a[1])
    .slice(0,5);

  // Function to color inspection results
  const colorResult = res => {
    const r = res.toLowerCase();
    if (r === "pass") return "#10b981";
    if (r === "fail") return "#ef4444";
    if (r === "n/a") return "#6b7280";
    return "#007cba";
  };

  return `
    

    <h2 class="view-title">Health & Safety Insights</h2>
    <p class="view-description">Aggregate patterns across the dataset</p>
    
    <div class="bento-grid">
      <!-- Total Card -->
      <div class="bento-card">
        <div class="card-label">Total</div>
        <div class="card-value">${total}</div>
        <div class="card-text">Restaurants</div>
      </div>

      <!-- Category Card -->
      <div class="bento-card">
        <div class="card-label">Top Category</div>
        <div class="card-value">${mostCommonCategory[0]}</div>
        <div class="card-text">${mostCommonCategory[1]}</div>
      </div>

      <!-- Inspection Results (spans 2 on laptop) -->
      <div class="bento-card span-2">
        <div class="card-label">Inspection Results</div>
        ${Object.entries(resultCounts).map(([k,v]) => `
          <div class="result-bar" style="background-color:${colorResult(k)};">
            <span>${k}</span>
            <span class="result-count">${v}</span>
          </div>
        `).join('')}
      </div>

      <!-- Top Cities (spans 4 on laptop - full width) -->
      <div class="bento-card span-4">
        <div class="card-label">Top 5 Cities</div>
        ${topCities.map(([city, count]) => `
          <div class="city-row">
            <span class="city-name">${city}</span>
            <span class="city-count">${count}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export default showStats;

