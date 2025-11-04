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

const extracted = data.slice(0, 24);

const groups = extracted.reduce((acc, item) => {
    const key = item.city || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return `
    <h2 class="view-title">Restaurants by City</h2>
    <p class="view-description">Restaurants grouped by their city for easy comparison.</p>
    ${Object.keys(groups).map(city => `
      <div class="category-section">
        <h3 class="category-header">${city} (${groups[city].length} restaurants)</h3>
        <div class="category-items">
          ${groups[city].map(r => `
            <div class="category-item">
              <span>${r.name || "Unnamed Restaurant"}</span>
              <span>${r.inspection_results || "Unknown"}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  `;

  
}

export default showCategories;