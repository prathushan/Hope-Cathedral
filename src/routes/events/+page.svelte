<script lang="ts">
  export let data;
  const { events, heroBlock } = data;

  // Format: June 12 25
  function getFullDate(dateStr: string) {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    })} ${date.getFullYear().toString().slice(-2)}`;
  }

  // Format: August 3–23, 2025
  function getDateRange(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    return `${s.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}–${e.getDate()}, ${e.getFullYear()}`;
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
      <h1>{heroBlock.title}</h1>
      {#if heroBlock.subtitle}
        <p>{heroBlock.subtitle}</p>
      {/if}
      {#if heroBlock.buttons?.length}
        <div class="hero-buttons">
          {#each heroBlock.buttons as button}
            <a
              class="hero-btn"
              href={button.url}
              target={button.openInNewTab ? '_blank' : '_self'}
              rel={button.openInNewTab ? 'noopener noreferrer' : ''}
            >
              {button.text}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}

<section class="event-cards">
  <h1>Upcoming Events</h1>

  {#if events.length}
    <div class="grid">
      {#each events as event}
        <div class="event-card {isPastEvent(event.endDate) ? 'past-event' : ''}">
          <div class="month-badge">{getDateRange(event.startDate, event.endDate)}</div>

          {#if event.featuredImage?.asset?.url}
            <a href={`/events/${event.slug.current}`}>
              <img class="event-img" src={event.featuredImage.asset.url} alt={event.title} />
            </a>
          {/if}

          <div class="event-info">
            <h2>
              <a href={`/events/${event.slug.current}`}>{event.title}</a>
            </h2>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No upcoming events found.</p>
  {/if}
</section>

<style>
  .hero-section {
    padding: 8rem 2rem;
    background: linear-gradient(to right, #e0eafc, #cfdef3);
    text-align: center;
  }

  .hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #003366;
  }

  .hero-content p {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 2rem;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .hero-btn {
    background: #0047ab;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.3s ease;
  }

  .hero-btn:hover {
    background: #003080;
  }

  .event-cards {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: auto;
  }

  .grid {
    display: grid;
    gap: 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .event-card {
    background: #f4f8fc;
    border-radius: 18px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    position: relative;
    transition: transform 0.2s ease;
    padding-bottom: 1.2em;
  }

  .event-card:hover {
    transform: translateY(-5px);
  }

  .month-badge {
    background: white;
    color: #333;
    font-weight: 600;
    border-radius: 25px;
    padding: 0.4rem 1rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 0.9rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .event-img {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 1px solid #e0e0e0;
  }

  .event-info {
    padding: 1.2rem;
    text-align: center;
  }

  .event-info h2 {
    font-size: 1.25rem;
    margin: 1rem 0 0.5rem;
    color: #0047ab;
  }

  .event-info h2 a {
    text-decoration: none;
  }

  .event-info p {
    font-size: 0.95rem;
    color: #333;
  }

  /* Grayed out past event */
  .past-event {
    filter: grayscale(0.9);
    opacity: 0.6;
    pointer-events: none;
  }

  .past-event .event-info h2,
  .past-event .event-info p,
  .past-event .month-badge {
    color: #999;
  }
</style>
