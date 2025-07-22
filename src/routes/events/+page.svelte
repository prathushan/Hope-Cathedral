<script lang="ts">
  export let data;
  const { events, heroBlock } = data;

  function getDateRange(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    return `${s.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    })} – ${e.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}`;
  }

  function isPastEvent(endDate: string) {
    const now = new Date();
    const end = new Date(endDate);
    return end < now;
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
<div class="event-back">
<section class="location-cards">
  {#each events as event}
    <a
      class="card {isPastEvent(event.endDate) ? 'past-event' : ''}"
      href={`/events/${event.slug.current}`}
    >
      <div class="event-details">
        <h2>{event.title}</h2>

        {#if event.location}
          <p class="location">
            <span class="icon">
              <svg fill="#226eab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16">
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
              </svg>
            </span>
            {event.location}
          </p>
        {/if}

        <p class="event-dates">
          <span class="icon">
            <svg fill="#226eab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
              <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z"/>
            </svg>
          </span>Dates:
          {getDateRange(event.startDate, event.endDate)}
        </p>
      </div>

      {#if event.featuredImage?.asset?.url}
        <img src={event.featuredImage.asset.url} alt={event.title} class="event-img" />
      {/if}
    </a>
  {/each}
</section>
</div>

<style>
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
    font-size: clamp(1.5rem, 5vw, 4rem);
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
    fill: #F9FBFD;
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


  .location-cards {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    padding: 2rem 2rem;
    background-color:#F9FBFD;
  }

  .card {
    background: #ffffff;
    border-radius: 18px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .event-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    padding:8%;
    border-radius:50px !important;
  }

  .event-details {
    padding: 1.5rem 1.5rem 0 1.5rem ;
  }

  .event-details h2 {
    font-size: 1rem;
    color: #226eab;
    margin-bottom: 0.75rem;
  }

  .location,
  .event-dates {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #333;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }

  .past-event {
    filter: grayscale(0.9);
    opacity: 0.6;
    pointer-events: none;
  }

  .past-event h2,
  .past-event p {
    color: #999;
  }
</style>
