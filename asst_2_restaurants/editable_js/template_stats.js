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
  
const total = data.length;

const categoryCounts = data.reduce((acc, r) => {
    acc[r.category || "Unknown"] = (acc[r.category || "Unknown"] || 0) + 1;
    return acc;
  }, {});

  const mostCommonCategory = Object.entries(categoryCounts).sort((a,b) => b[1]-a[1])[0];

  const resultCounts = data.reduce((acc, r) => {
    acc[r.inspection_results || "Unknown"] = (acc[r.inspection_results || "Unknown"] || 0) + 1;
    return acc;
  }, {});

  const cityCounts = data.reduce((acc, r) => {
    acc[r.city || "Unknown"] = (acc[r.city || "Unknown"] || 0) + 1;
    return acc;
  }, {});

  return `
    <h2 class="view-title">📈 Statistics View</h2>
    <div style="display:flex; flex-wrap:wrap; gap:20px;">
      <div style="flex:1; min-width:200px; border:1px solid #ccc; padding:10px; border-radius:5px;">
        <h3>Total Restaurants</h3>
        <p>${total}</p>
      </div>
      <div style="flex:1; min-width:200px; border:1px solid #ccc; padding:10px; border-radius:5px;">
        <h3>Most Common Category</h3>
        <p>${mostCommonCategory[0]} (${mostCommonCategory[1]})</p>
      </div>
      <div style="flex:1; min-width:200px; border:1px solid #ccc; padding:10px; border-radius:5px;">
        <h3>Inspection Results</h3>
        <ul>
          ${Object.entries(resultCounts).map(([k,v]) => `<li>${k}: ${v}</li>`).join('')}
        </ul>
      </div>
      <div style="flex:1; min-width:200px; border:1px solid #ccc; padding:10px; border-radius:5px;">
        <h3>Restaurants per City (Top 5)</h3>
        <ul>
          ${Object.entries(cityCounts)
            .sort((a,b) => b[1]-a[1])
            .slice(0,5)
            .map(([k,v]) => `<li>${k}: ${v}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  
}

export default showStats