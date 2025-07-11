<script lang="ts">
  export let data;

  const content = data.page.content;

  const heroBlock = content.find(c => c._type === 'builderBlock' && c.block[0]?._type === 'heroSection')?.block[0];
  const cardBlock = content.find(c => c._type === 'builderBlock' && c.block[0]?._type === 'cardSection')?.block[0];
  const imageWithTextBlock = content.find(c => c._type === 'builderBlock' && c.block[0]?._type === 'imageWithText')?.block[0];

  const videoId = heroBlock?.videoEmbedCode?.split('/').pop();
  const sideVideoId = imageWithTextBlock?.videoEmbed?.split('/').pop()?.split('?')[0];
</script>



<!-- VIDEO BACKGROUND -->
{#if videoId}
  <div class="video-wrapper">
    <div class="video-inner">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${videoId}&playsinline=1`}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>

      {#if heroBlock}
        <div class="hero-content">
          <h1>{heroBlock.title}</h1>
          {#if heroBlock.buttons?.length}
            <button>{heroBlock.buttons[0].text}</button>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- HERO SECTION -->


<!-- CARD SECTION -->
{#if cardBlock}
  <section class="card-section">
    <div class="card-grid">
      {#each cardBlock.cards as card}
        <div class="card">
          <h3>{card.title}</h3>
          <p>{card.paragraph}</p>
          <a href={card.button.slug.current}>{card.button.text}</a>
        </div>
      {/each}
    </div>
  </section>
{/if}

<!-- {#if imageWithTextBlock}
  <section class="image-with-text">
    <div class="video-column">
      <iframe
        src={`https://www.youtube.com/embed/${sideVideoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playsinline=1`}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
    <div class="text-column">
      <h2>{imageWithTextBlock.title}</h2>
      <p>{imageWithTextBlock.description}</p>
    </div>
  </section>
{/if} -->


<style>

.video-wrapper {
  position: sticky;
  top: 0;
  width: 100%;
  height: 110vh;
  z-index: -1;
  overflow: hidden;
}

.video-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-inner iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw;
  min-height: 110vh;
  min-width: 177.77vh;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  padding: 2rem;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

.hero-content button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
}


  .card-section {
    padding: 6rem 1.5rem 4rem;
    /* background: #f8f8f8; */
    z-index: 2;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .card p {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1.5rem;
  }

  .card a {
    padding: 0.8rem 1.6rem;
    background: #000;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
  }
  .image-with-text {
    background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
  /* max-width: 1200px; */
  margin: 0 auto;
}

.video-column {
  flex: 1 1 500px;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.video-column iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.text-column {
  flex: 1 1 400px;
}

.text-column h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.text-column p {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
}

</style>