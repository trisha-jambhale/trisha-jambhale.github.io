/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */
function showCategories(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics
 
const groups = data.reduce((acc, item) => {
    const key = item.category || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return `
    <h2 class="view-title">📂 Category View</h2>
    ${Object.keys(groups).map(cat => `
      <div class="category-group" style="margin-bottom:20px; border:1px solid #ccc; padding:10px; border-radius:5px;">
        <h3>${cat} (${groups[cat].length} restaurants)</h3>
        <ul>
          ${groups[cat].slice(0,5).map(r => `<li>${r.name} - ${r.city}</li>`).join('')}
          ${groups[cat].length > 5 ? `<li>...and ${groups[cat].length - 5} more</li>` : ''}
        </ul>
      </div>
    `).join('')}
  `;

  
}

export default showCategories;