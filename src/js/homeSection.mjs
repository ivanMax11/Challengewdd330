// homeSection.mjs
export function loadHomeSection(container) {
  console.log('Cargando home section');

  const content = `
    <div class="home-container">
      <aside class="sidebar">
        <h3>Explore the Infinity of Space</h3>
        <ul>
          <li>
            <a href="https://images.nasa.gov/search?q=galaxies&page=1&media=image,video,audio&yearStart=1920&yearEnd=2023" target="_blank" rel="noopener noreferrer">
              <span>Galaxies</span>
              <img src="./public/images/galaxy.webp" alt="Galaxies">
            </a>
            
          </li>
          <li>
            <a href= "https://images.nasa.gov/search?q=stars&page=1&media=image&yearStart=1920&yearEnd=2023">
              <span>Stars</span>
              <img src="./public/images/stars.webp" alt="Planets">
            </a>
            
          </li>
          <li>
            <a href="https://images.nasa.gov/search?q=planets&page=1&media=image&yearStart=1920&yearEnd=2023" >
              <span>Planets</span>
              <img src="./public/images/earthplanet.webp" alt="Stars">
            </a>
          </li>
        </ul>
      </aside>
      <div class="main-content">
        <img src="./public/images/discover.webp" alt="Hero Image">
        <p>Discover Earth as NASA sees it. Learn why this information matters to us all</p>
        <div class="discover-more">
          <a href="https://gis.earthdata.nasa.gov/portal/apps/sites/#/earth-information-center/pages/earth-now" target="_blank" >
            <button>Discover more</button>
          </a>
        </div>
        <div class="more-info">
          <h3></h3>
          <img src="./public/images/join.webp" alt="Hero Image">
          <p>Discover more about our space program and participate in the NASA virtual program</p>
          <a href="https://www.nasa.gov/nasa-virtual-guest-program/" target="_blank" rel="noopener noreferrer ">
          <button>Here</button></a>
         
        </div>
      </div>
    </div>
  `;

  container.innerHTML = content;
}
