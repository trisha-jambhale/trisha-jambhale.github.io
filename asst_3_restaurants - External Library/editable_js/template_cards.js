
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */
function showCards(data) {
  const extracted = data.slice(0, 24);
  const cardHTML = extracted


    .map(
       /*html*/ 
      (r) => `
                <div class="restaurant-card">
                    <div class="card-header">
                      <h3>${formatName(r.name || "Unnamed Restaurant")}</h3>
                  
                       <p class="category">${r.category || "Unknown Category"}</p>
                    </div>
                    
                     <div class="card-body">
                       <p><strong> <img src="maps-and-flags 1.png" alt="Restaurant Icon" width="20" height="20" style= "opacity: 30%">Address:</strong> ${r.address_line_1 || "N/A"}, ${r.city || ""}, ${r.state || ""} ${r.zip || ""}</p>
                       <p><strong><img src="real-estate-agent 1.png" alt="Restaurant Icon" width="20" height="20"style= "opacity: 30%"> Owner:</strong> ${r.owner || "Not Listed"}</p>
                       <p><strong><img src="checked 1.png" alt="Restaurant Icon" width="20" height="20" style= "opacity: 30% "> Last Inspection:</strong> ${r.inspection_date ? new Date(r.inspection_date).toLocaleDateString() : "N/A"}</p>
                       <p><strong><img src="report 1.png" alt="Restaurant Icon" width="20" height="20" style= "opacity: 30%"> Result:</strong> ${r.inspection_results || "Unknown"}</p>
                    </div>
                </div>
            `
    )
    .join(" ");
     /*html*/ 
  return `
                <h2 class="view-title">Restaurant Overview</h2>
                <p class="view-description">Browse key details of local restaurants and their latest inspection results</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}

function formatName(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}



export default showCards;