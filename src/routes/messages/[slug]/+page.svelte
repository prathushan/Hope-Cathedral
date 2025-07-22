<script lang="ts">
  export let data;
  const msg = data.message;
</script>

<article class="message-page">
  <section class="video-container">
    {#if msg.videoType === 'embed'}
      <div class="video-embed">
        {@html msg.videoEmbed}
      </div>
    {:else if msg.videoType === 'upload'}
      <video src={msg.videoFile.asset.url} controls class="video-player" />
    {:else if msg.videoType === 'url'}
      <video src={msg.videoUrl} controls class="video-player" />
    {/if}
  </section>

  <section class="content-container">
    <header class="message-header">
      <div class="category-badge">{msg.category.title}</div>
      <h1>{msg.title}</h1>
      <div class="meta-container">
        <span class="author">By {msg.author}</span>
        <span class="divider">•</span>
        <span class="date">{new Date(msg.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
    </header>

    <section class="description">
      <p>{msg.description}</p>
    </section>
  </section>

  {#if msg.related?.length}
    <section class="related-section">
      <h2>More From This Series</h2>
      <div class="related-grid">
        {#each msg.related as rel}
          <a href={`/messages/${rel.slug.current}`} class="related-card">
            <div class="image-container">
              <img src={rel.bannerImage.asset.url} alt={rel.title} class="related-thumb" />
              <div class="overlay"></div>
            </div>
            <h3>{rel.title}</h3>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</article>

<style>
  :global(:root) {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --text: #1e293b;
    --text-light: #64748b;
    --bg: #f8fafc;
    --card-bg: #ffffff;
    --radius: 12px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .message-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 4rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--text);
    line-height: 1.6;
  }

  .video-container {
    position: relative;
    width: 100%;
    border-radius: var(--radius);
    overflow: hidden;
    padding-top:18%;
  }
  .content-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .message-header {
    margin: 3rem 0 2rem;
    text-align: center;
  }

  .category-badge {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .message-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
    line-height: 1.2;
    color: var(--text);
  }

  .meta-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: var(--text-light);
    font-size: 1rem;
    margin-top: 1rem;
  }

  .divider {
    opacity: 0.5;
  }

  .description {
    margin: 3rem 0;
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--text);
  }

  .description p {
    margin: 1.5rem 0;
  }

  .related-section {
    margin: 0rem auto 0;
    max-width: 1200px;
  }

  .related-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color:#00;

  }

  .related-section h2 span {
    color: var(--primary);
    font-weight: 700;
  }

  .related-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .related-card {
    text-decoration: none;
    color: inherit;
    display: block;
    transition: var(--transition);
  }

  .related-card:hover {
    transform: translateY(-5px);
  }

  .image-container {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    aspect-ratio: 16 / 9;
    margin-bottom: 1rem;
    box-shadow: var(--shadow);
  }

  .related-thumb {
    width: 100%;
    height: 100%;
    display: block;
    transition: var(--transition);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
    opacity: 0;
    transition: var(--transition);
  }

  .related-card:hover .overlay {
    opacity: 1;
  }

  .related-card:hover .related-thumb {
    transform: scale(1.03);
  }

  .related-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0.5rem 0;
    color: var(--text);
    transition: var(--transition);
  }

  .related-card:hover h3 {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    .message-page {
      padding: 0 1.5rem 3rem;
    }
    
    .message-header h1 {
      font-size: 2rem;
    }
    
    .related-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .message-page {
      padding: 0 1rem 2rem;
    }
    
    .message-header h1 {
      font-size: 1.75rem;
    }
    
    .meta-container {
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .divider {
      display: none;
    }
  }
</style>