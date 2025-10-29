
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */
function showCards(data) {
  const cardHTML = data
    .map(
       /*html*/ 
      (restaurant) => `
                <div class="restaurant-card">
                    <h3>${restaurant.name}</h3>
                    <p><strong>Category:</strong> ${restaurant.category}</p>
                    <p><strong>City:</strong> ${
                      restaurant.city
                    } | <strong>State:</strong> ${restaurant.state}</p>
                    <p><strong>Inspection_type:</strong> ${restaurant.inspection_type}</p>
                    <p><strong>Owned by:</strong> ${restaurant.owner}</p>
                    <p><strong>Results:</strong> ${restaurant.inspection_results}</p>
                </div>
            `
    )
    .join(" ");
     /*html*/ 
  return `
                <h2 class="view-title">🃏 Card View</h2>
                <p class="view-description">Browse restaurants as individual cards - perfect for comparing options</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}

export default showCards;