/**
 * STATS VIEW - ENHANCED WITH GSAP ANIMATIONS
 * Show aggregate statistics with animated counters and bars
 */
function showStats(data) {
  const extracted = data.slice(0, 24);
  const total = extracted.length;

  // Category counts
  const categoryCounts = extracted.reduce((acc, r) => {
    acc[r.category || "Unknown"] = (acc[r.category || "Unknown"] || 0) + 1;
    return acc;
  }, {});

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

  const colorResult = res => {
    const r = res.toLowerCase();
    if (r === "pass") return "#10b981";
    if (r === "fail") return "#ef4444";
    if (r === "n/a") return "#6b7280";
    return "#007cba";
  };

  const htmlContent = `
    <h2 class="view-title">Health & Safety Insights</h2>
    <p class="view-description">Aggregate patterns across the dataset</p>
    
    <div class="bento-grid">
      <!-- Total Card -->
      <div class="bento-card stat-card" data-value="${total}">
        <div class="card-label">Total</div>
        <div class="card-value" data-target="${total}">${total}</div>
        <div class="card-text">Restaurants</div>
      </div>

      <!-- Category Card -->
      <div class="bento-card stat-card" data-value="${mostCommonCategory[1]}">
        <div class="card-label">Top Category</div>
        <div class="card-value">${mostCommonCategory[0]}</div>
        <div class="card-text" data-target="${mostCommonCategory[1]}">${mostCommonCategory[1]}</div>
      </div>

      <!-- Inspection Results (spans 2 on laptop) -->
      <div class="bento-card span-2 results-card">
        <div class="card-label">Inspection Results</div>
        ${Object.entries(resultCounts).map(([k,v]) => `
          <div class="result-bar" style="background-color:${colorResult(k)};" data-count="${v}">
            <span>${k}</span>
            <span class="result-count">${v}</span>
          </div>
        `).join('')}
      </div>

      <!-- Top Cities -->
      <div class="bento-card span-4 cities-card">
        <div class="card-label">Top 5 Cities</div>
        ${topCities.map(([city, count]) => `
          <div class="city-row">
            <span class="city-name">${city}</span>
            <span class="city-count" data-target="${count}">${count}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Apply GSAP animations after DOM is rendered
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animateStats();
    });
  });

  return htmlContent;
}

/**
 * GSAP Animation Functions for Stats View
 */
function animateStats() {
  // Check if elements exist before animating
  const title = document.querySelector('.view-title');
  const description = document.querySelector('.view-description');
  const cards = document.querySelectorAll('.bento-card');
  
  if (!title || !cards.length) return;

  // SET initial states BEFORE elements are visible
  gsap.set(title, { opacity: 0, y: -30 });
  if (description) gsap.set(description, { opacity: 0, y: -20 });
  gsap.set(cards, { opacity: 0, scale: 0.8, y: 50 });

  // Animate TO visible state
  gsap.to(title, {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power3.out'
  });

  if (description) {
    gsap.to(description, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      delay: 0.2,
      ease: 'power3.out'
    });
  }

  // Animate bento cards with stagger
  gsap.to(cards, {
    duration: 0.8,
    opacity: 1,
    scale: 1,
    y: 0,
    stagger: 0.15,
    ease: 'back.out(1.4)',
    delay: 0.4
  });

  // Animate number counters
  const counterElements = document.querySelectorAll('[data-target]');
  counterElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const startValue = { value: 0 };
    
    gsap.to(startValue, {
      duration: 2,
      value: target,
      ease: 'power2.out',
      delay: 0.8,
      onUpdate: function() {
        el.innerHTML = Math.ceil(startValue.value);
      },
      onComplete: function() {
        el.innerHTML = target;
      }
    });
  });

  // Animate result bars
  const resultBars = document.querySelectorAll('.result-bar');
  resultBars.forEach((bar, index) => {
    const count = parseInt(bar.getAttribute('data-count'));
    const countSpan = bar.querySelector('.result-count');
    
    if (!countSpan || isNaN(count)) return;
    
    // Animate width
    gsap.fromTo(bar, 
      { scaleX: 0, transformOrigin: 'left' },
      {
        duration: 1,
        scaleX: 1,
        delay: 1 + (index * 0.1),
        ease: 'power2.out',
        clearProps: 'transform'
      }
    );

    // Animate counter
    const startValue = { value: 0 };
    gsap.to(startValue, {
      duration: 1.5,
      value: count,
      delay: 1 + (index * 0.1),
      ease: 'power2.out',
      onUpdate: function() {
        countSpan.innerHTML = Math.ceil(startValue.value);
      },
      onComplete: function() {
        countSpan.innerHTML = count;
      }
    });
  });

  // Animate city rows
  const cityRows = document.querySelectorAll('.city-row');
  if (cityRows.length) {
    gsap.from(cityRows, {
      duration: 0.6,
      opacity: 0,
      x: -30,
      stagger: 0.1,
      delay: 1.2,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }
}

export default showStats;