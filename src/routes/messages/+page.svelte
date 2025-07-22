<script lang="ts">
  export let data;
  const { heroBlock, messagesByCategory } = data;

  let searchTerm = '';
  
  function filterMessagesByTitle(messages: any[], term: string) {
    if (!term) return messages;
    return messages.filter(msg => 
      msg.title.toLowerCase().includes(term.toLowerCase())
    );
  }
</script>

{#if heroBlock}
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">{heroBlock.title}</h1>
      {#if heroBlock.subtitle}
        <p class="hero-subtitle">{heroBlock.subtitle}</p>
      {/if}
    </div>
    <div class="hero-wave">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
  </section>
{/if}

<main class="container">
  <div class="search-container">
    <input
      type="text"
      placeholder="Search messages by title..."
      bind:value={searchTerm}
      class="search-input"
    />
    <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
    </svg>
  </div>

  {#each Object.entries(messagesByCategory) as [category, messages]}
    <section class="category-section">
      <h2 class="category-heading">
        <span class="heading-text">{category}</span>
        <span class="heading-line"></span>
      </h2>
      <div class="message-grid">
        {#each filterMessagesByTitle(messages, searchTerm) as msg}
          <a href={`/messages/${msg.slug.current}`} class="message-card" aria-label={`View ${msg.title}`}>
            <div class="image-container">
              <img
                src={msg.bannerImage.asset.url}
                alt={msg.title}
                class="message-thumb"
                loading="lazy"
              />
              <div class="image-overlay"></div>
            </div>
            <div class="card-content">
              <h3 class="message-title">{msg.title}</h3>
              <div class="message-meta">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>{new Date(msg.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #2d3748;
    background-color: #f8fafc;
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    padding: 10rem 2rem 8rem;
    background:#d2e0f5;
    text-align: center;
    color: white;
    overflow: hidden;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    animation: fadeInUp 0.8s ease-out;
    color:#003366;
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 2.5rem;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .hero-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .hero-wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 100px;
  }

  .hero-wave .shape-fill {
    fill: #f8fafc;
  }

  /* Container */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Search Container */
  .search-container {
    position: relative;
    margin: 2rem 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border-radius: 8px;
    border: 2px solid #d2e0f5;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .search-input:focus {
    outline: none;
    border-color: #d2e0f5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #94a3b8;
  }

  /* Category Section */
  .category-section {
    margin: 4rem 0;
  }

  .category-heading {
    display: flex;
    align-items: center;
    margin: 3rem 0 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    color:#003366;
  }

  .heading-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #e2e8f0, transparent);
  }

  /* Message Grid */
  .message-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns:4fr 4fr 4fr;
  }

  /* Message Card */
  .message-card {
    text-decoration: none;
    color: inherit;
    display: block;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 12px;
    overflow: hidden;
  }

  .message-card:hover {
    transform: translateY(-5px);
  }

  .image-container {
    position: relative;
    width:100%;
    padding-top: 56.25%;
  }

  .message-thumb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .message-card:hover .image-overlay {
    opacity: 1;
  }

  .message-card:hover .message-thumb {
    transform: scale(1.05);
  }

  .card-content {
    padding: 1.25rem 0rem;
  }

  .message-title {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    transition: color 0.3s ease;
  }


  .message-meta {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color:#003366;

  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
   color:#003366;

  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-section {
      padding: 7rem 1.5rem 5rem;
    }

    .message-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .hero-section {
      padding: 5rem 1rem 4rem;
    }

    .category-heading {
      font-size: 1.5rem;
      margin: 2rem 0 1.5rem;
    }

    .message-grid {
      grid-template-columns: 1fr;
    }
  }
</style>