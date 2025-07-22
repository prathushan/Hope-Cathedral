<script lang="ts">
  import { urlFor } from '$lib/utils/image-builder';
  export let data;

  const { title, content } = data.leader;

  // Helper to split cards into first row and remaining rows in chunks of 3
  function chunkCards(cards) {
    const firstRow = cards.slice(0, 4);
    const rest = [];
    for (let i = 4; i < cards.length; i += 3) {
      rest.push(cards.slice(i, i + 3));
    }
    return { firstRow, rest };
  }
  const heroBlock = content.find(
  (c) => c._type === 'builderBlock' && c.block?.[0]?._type === 'heroSection'
)?.block?.[0];
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

{#each content as section (section._key)}

 


  <section class="section">
    {#each section.block as block (block._key)}

    {#if block._type === 'imageWithText'}
        <div class="image-text-block">
          <div class="image-col">
            <img
              src={urlFor(block.image.asset).width(800).auto('format').url()}
              alt={block.title}
            />
          </div>
          <div class="text-col">
            <h3>{block.title}</h3>
            <p>{@html block.description.replace(/\n/g, '<br>')}</p>
            <!-- {#if block.button?.label && block.button?.url}
              <a class="cta-button" href={block.button.url} target="_blank" rel="noopener noreferrer">
                {block.button.label}
              </a>
            {/if} -->
          </div>
        </div>



      {:else if block._type === 'cardSection'}
        <div class="card-section">
          {#if block.sectionTitle}
            <!-- <h3 class="section-title">{block.sectionTitle}</h3> -->
          {/if}

          <!-- First Row: 4 cards -->
          <div class="card-row four-columns">
            {#each chunkCards(block.cards).firstRow as card (card._key)}
              <div class="card">
                <img
                  src={urlFor(card.image.asset).width(300).auto('format').url()}
                  alt={card.title}
                />
                <div class="card-content">
                  <h4 class="card-title">{card.title}</h4>
                  <p class="card-subtitle">{card.paragraph}</p>
                  
                </div>
              </div>
            {/each}
          </div>

          <!-- Remaining Rows: groups of 3 cards -->
          {#each chunkCards(block.cards).rest as row, i}
            <div class="card-row three-columns" data-row={i + 2}>
              {#each row as card (card._key)}
                <div class="card">
                  <img
                    src={urlFor(card.image.asset).width(250).auto('format').url()}
                    alt={card.title}
                  />
                  <div class="card-content">
                    
                    <h4 class="card-title">{card.title}</h4>
                    <p class="card-subtitle">{card.paragraph}</p>
                  </div>
                </div>
              {/each}
            </div>
          {/each}
        </div>

      {:else}
        <!-- <div class="unknown-block">
          <strong>{block._type}</strong>
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div> -->
      {/if}
    {/each}
  </section>
{/each}

<style>
  .section {
    margin-bottom: 3rem;
  }

  .banner-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .image-text-block {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  @media (min-width: 768px) {
    .image-text-block {
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }

  .image-col img {
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
  }

  .text-col {
    /* flex: 1; */
    max-width:700px;
  }

  .text-col p {
    white-space: pre-line;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    margin-top: 1rem;
    background: #333;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    text-decoration: none;
  }

  .card-section {
    margin-top: 2rem;
  }

  .card-row {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .four-columns {
    grid-template-columns: repeat(4, 1fr);
  }

  .three-columns {
    grid-template-columns: repeat(3, 1fr);
  }

  .card {
    text-align: center;
    background-color: #f8f8f8;
    padding: 1rem;
    border-radius: 8px;
    transition: transform 0.2s;
    min-height:500px;
  }

  .card img {
    width: 200px;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    border-radius: 6px;
  }



.card-content {
  /* margin-top: 0.5rem; */
  background-color: #fff;
  position: relative;
  z-index: 1;
  transition: all 0.7s ease-in-out;
}

.card:hover .card-content {
  margin-top: -70px;
  padding: 20px;
  /* scroll-behavior: smooth; */
}
.card-content h4{
  margin-bottom:0 ;

}
.card-content p{
  margin-top:5px ;

}


  .unknown-block {
    padding: 1rem;
    background: #fff4f4;
    border-left: 4px solid red;
    margin-top: 1rem;
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
    fill: #ffffff;
  }

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
</style>
