<script lang="ts">
  import { urlFor } from '../lib/utils/image-builder'; 
  export let data;
  import { onMount } from 'svelte';

  const carouselBlock = data.page.content.find(
    c => c.label === 'card section 3'
  )?.block[0];

  let selectedIndex = 0;
  let userInteracted = false;

  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  function moveToSelected(direction: 'prev' | 'next' | number) {
    const total = carouselBlock.cards.length;
    if (typeof direction === 'number') {
      selectedIndex = mod(direction, total);
    } else if (direction === 'next') {
      selectedIndex = mod(selectedIndex + 1, total);
    } else if (direction === 'prev') {
      selectedIndex = mod(selectedIndex - 1, total);
    }
  }

  let autoScrollInterval: NodeJS.Timeout;

  function handleUserInteraction() {
    if (!userInteracted) {
      userInteracted = true;
      window.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    }
  }

  onMount(() => {
    autoScrollInterval = setInterval(() => {
      moveToSelected('next');
    }, 3000);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      clearInterval(autoScrollInterval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  });

  function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function resumeAutoScroll() {
    autoScrollInterval = setInterval(() => {
      moveToSelected('next');
    }, 3000);
  }

  function handleKeyDown(e: KeyboardEvent) {
    handleUserInteraction();
    switch (e.key) {
      case 'ArrowLeft': moveToSelected('prev'); break;
      case 'ArrowRight': moveToSelected('next'); break;
    }
  }

  const content = data.page.content;

  const heroBlock = content.find(c => c._type === 'builderBlock' && c.block[0]?._type === 'heroSection')?.block[0];
  const cardBlock = content.find(c => c._type === 'builderBlock' && c.block[0]?._type === 'cardSection')?.block[0];
  const imageWithTextBlock = content.find(c => c._type === 'builderBlock' && c.block[0]?._type === 'imageWithText')?.block[0];

  const videoId = heroBlock?.videoEmbedCode?.split('/').pop();
  const sideVideoId = imageWithTextBlock?.videoEmbed?.split('/').pop()?.split('?')[0];
  const cardSection2 = data.page.content.find(c => c.label === 'card section 2')?.block[0];

</script>

<!-- VIDEO BACKGROUND -->
{#if videoId}
  <div class="video-wrapper">
    <div class="video-inner">
      {#if userInteracted}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${videoId}&playsinline=1`}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="hero-video"
          loading="lazy"
        ></iframe>
      {:else}
        <div class="video-placeholder" style={`background-image: url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`}></div>
      {/if}
      
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
          <h2>{card.title}</h2>
          <p>{card.paragraph}</p>
          <a href={card.button.slug.current}>{card.button.text}</a>
        </div>
      {/each}
    </div>
  </section>
{/if}

{#if imageWithTextBlock}
  <section class="image-with-text">
    <div class="video-column">
      {#if userInteracted}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${sideVideoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${sideVideoId}&playsinline=1`}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="second-video"
          loading="lazy"
        ></iframe>
      {:else}
        <div class="video-placeholder" style={`background-image: url(https://img.youtube.com/vi/${sideVideoId}/maxresdefault.jpg)`}></div>
      {/if}
    </div>
    <div class="text-column">
      <h2>{imageWithTextBlock.title}</h2>
      <p>{imageWithTextBlock.description}</p>
    </div>
  </section>
{/if}

<!-- CARD SECTION 2 -->
{#if cardSection2}
  <section class="card-section-2">
    <h2 class="card-grid-max">{cardSection2.sectionTitle}</h2>
    <div class="card-grid">
      {#each cardSection2.cards as card}
        {#if card.button?.slug?.current}
          <a href={'/' + card.button.slug.current.replace(/^\/?/, '')} class="card">
            <h3>{card.title}</h3>
            <p>{card.paragraph}</p>
          </a>
        {:else}
          <div class="card">
            <h3>{card.title}</h3>
            <p>{card.paragraph}</p>
          </div>
        {/if}
      {/each}
    </div>
  </section>
{/if}

{#if carouselBlock}
  <section class="carousel-section">
    <h2>{carouselBlock.sectionTitle}</h2>
    <div class="carousel-container" on:mouseenter={pauseAutoScroll} on:mouseleave={resumeAutoScroll}>
      <div class="carousel">
        {#each carouselBlock.cards as card, index (index)}
          <div
            class="carousel-item"
            class:selected={index === selectedIndex}
            class:prev={index === mod(selectedIndex - 1, carouselBlock.cards.length)}
            class:prevLeftSecond={index === mod(selectedIndex - 2, carouselBlock.cards.length)}
            class:next={index === mod(selectedIndex + 1, carouselBlock.cards.length)}
            class:nextRightSecond={index === mod(selectedIndex + 2, carouselBlock.cards.length)}
            class:hideLeft={
              index !== selectedIndex &&
              index !== mod(selectedIndex - 1, carouselBlock.cards.length) &&
              index !== mod(selectedIndex - 2, carouselBlock.cards.length) &&
              index !== mod(selectedIndex + 1, carouselBlock.cards.length) &&
              index !== mod(selectedIndex + 2, carouselBlock.cards.length) &&
              mod(index - selectedIndex, carouselBlock.cards.length) > carouselBlock.cards.length / 2
            }
            class:hideRight={
              index !== selectedIndex &&
              index !== mod(selectedIndex - 1, carouselBlock.cards.length) &&
              index !== mod(selectedIndex - 2, carouselBlock.cards.length) &&
              index !== mod(selectedIndex + 1, carouselBlock.cards.length) &&
              index !== mod(selectedIndex + 2, carouselBlock.cards.length) &&
              mod(index - selectedIndex, carouselBlock.cards.length) <= carouselBlock.cards.length / 2
            }
            on:click={() => moveToSelected(index)}
          >
            <div class="image-background" style={`background-image: url(${urlFor(card.image).width(800).url()})`}>
              <div class="card-content">
                <h3>{card.title}</h3>
                <p>{card.paragraph}</p>
                {#if card.button}
                  <a href={card.button.slug.current}>{card.title}</a>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="carousel-buttons">
        <button class="arrow-button" on:click={() => moveToSelected('prev')} aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button class="arrow-button" on:click={() => moveToSelected('next')} aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
{/if}

<style>
  .video-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    height: 130vh;
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
    min-height: 60vh;
    min-width: 177.77vh;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .video-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 56.25vw;
    min-height: 60vh;
    min-width: 177.77vh;
    transform: translate(-50%, -50%);
    background-size: cover;
    background-position: center;
  }

  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
    color: white;
  }

  .hero-content h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 60px;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }

  .hero-content button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight:500;
    background: #226DAB;
    backdrop-filter: blur(8px);
    color: #FFF;
    border: 1px solid #FFF;
    border-radius: 8px;
    cursor: pointer;
  }

  .card-section {
    padding: 6rem 1.5rem 4rem;
    z-index: 2;
  }

  .card-section .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card-section .card {
    background: #226DAB;
    padding: 2rem 3rem 3rem;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
    min-height: 280px;
  }

  .card-section .card:hover {
    transform: translateY(-5px);
  }

  .card-section .card h2 {
    font-size: 1.5rem;
    color:#fff;
    margin-bottom: 1rem;
  }

  .card-section .card p {
    font-size: 1rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }

  .card-section .card a {
    padding: 0.8rem 1.6rem;
    background: #fff;
    color: #226DAB;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    margin-top:20px;
    display:inline-block;
  }

  .image-with-text {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    padding: 4rem 2rem;
    margin: 0 auto;
  }

  .video-column {
    flex: 1 1 500px;
    position: relative;
    padding-bottom: 30.25%;
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
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color:#226DAB;
    text-transform:uppercase;
  }

  .text-column p {
    font-size: 1.1rem;
    color: #444;
    line-height: 1.6;
  }

  .card-section-2 {
    background-color: #fff;
    padding: 4rem 1.5rem;
    max-width: 100%;
    margin: 0 auto;
  }

  .card-section-2 h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color:#226DAB;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 25px;
  }

  .card-section-2 .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card-section-2 .card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .card-section-2 a.card {
    text-decoration: none;
    color: inherit;
  }

  .card-section-2 .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: #226DAB;
    transition: all 0.4s ease;
    z-index: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .card-section-2 .card:hover::before {
    width: 600px;
    height: 600px;
    opacity: 0.1;
  }

  .card-section-2 .card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .card-section-2 .card::after {
    content: '';
    background: url('data:image/svg+xml,<svg fill="none" stroke="%23226DAB" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5l7 7-7 7"/></svg>');
    background-repeat: no-repeat;
    background-position: center;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  .card-section-2 .card h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #226DAB;
    margin: 0 0 0.25rem;
    position: relative;
    z-index: 1;
  }

  .card-section-2 .card p {
    font-size: 0.9rem;
    color: #333;
    margin: 0;
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }

  .carousel-section {
    background-color: #fff;
    padding: 1rem 1.5rem;
    text-align: center;
    position: relative;
  }
  .carousel-section h2{
    color:#226DAB;
    font-size:1.5rem;
  }

  .carousel-container {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    overflow: hidden;
  }

  .carousel {
    position: relative;
    height: 450px;
  }

  .carousel-item {
    position: absolute;
    width: 300px;
    height: 400px;
    transition: transform 0.5s ease, left 0.5s ease, opacity 0.5s ease;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    opacity: 1;
    cursor: pointer;
  }

  .image-background {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    position: relative;
    box-sizing: border-box;
  }

  .image-background::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent);
    z-index: 1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    color: white;
    text-align: left;
    transform: translateY(20px);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }

  .card-content h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .card-content p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .card-content a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: white;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .card-content a:hover {
    background: #f0f0f0;
  }

  .selected {
    z-index: 10;
    left: 50%;
    transform: translateX(-50%) scale(1.1);
  }

  .selected .card-content {
    transform: translateY(0);
    opacity: 1;
  }

  .prev {
    z-index: 5;
    left: 30%;
    transform: translateX(-50%) scale(0.9);
  }

  .next {
    z-index: 5;
    left: 70%;
    transform: translateX(-50%) scale(0.9);
  }

  .prevLeftSecond {
    z-index: 4;
    left: 15%;
    transform: translateX(-50%) scale(0.8);
    opacity: 0.7;
  }

  .nextRightSecond {
    z-index: 4;
    left: 85%;
    transform: translateX(-50%) scale(0.8);
    opacity: 0.7;
  }

  .hideLeft {
    left: 0%;
    opacity: 0;
    transform: translateX(-50%) scale(0.7);
  }

  .hideRight {
    left: 100%;
    opacity: 0;
    transform: translateX(-50%) scale(0.7);
  }

  .carousel-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    padding:10px;
  }

  .arrow-button {
    background: #226DAB;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .arrow-icon {
    width: 24px;
    height: 24px;
    stroke: #ffffff;
  }

  @media (max-width: 1024px) {
    .prevLeftSecond,
    .nextRightSecond {
      display: none;
    }

    .prev {
      left: 25%;
    }

    .next {
      left: 75%;
    }
  }

  @media (max-width: 768px) {
    .carousel-item {
      width: 90%;
      left: 50% !important;
      transform: translateX(-50%) scale(1) !important;
    }

    .prev,
    .next,
    .prevLeftSecond,
    .nextRightSecond,
    .hideLeft,
    .hideRight {
      display: none !important;
    }
  }
</style>