<script lang="ts">
  export let data;
  const { event } = data;

  let name = '';
  let email = '';
  let phone = '';

  const handleSubmit = () => {
    const payload = {
      event: event.title,
      name,
      email,
      phone,
    };
    console.log('Form Submitted:', payload);
    // You can integrate with your backend or service here
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDay = (dateStr: string) => {
    return new Date(dateStr).getDate();
  };

  const getMonth = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', { month: 'short' });
  };
</script>

<section class="event-banner">
  {#if event.featuredImage?.asset?.url}
    <img class="banner-img" src={event.featuredImage.asset.url} alt={event.title} />
  {/if}
  <div class="banner-overlay"></div>
  <div class="banner-content">
    <div class="container">
      <h1>{event.title}</h1>
    </div>
  </div>
</section>

<section class="event-main container">
  <div class="event-content">
    {#if event.description}
      <div class="description">
        {@html event.description}
      </div>
    {/if}
  </div>

  <aside class="event-sidebar">
    <div class="event-details-card">
      <div class="calendar-display">
        <div class="calendar-date">
          <div class="calendar-date-start">
            <span class="calendar-month">{getMonth(event.startDate)}</span>
            <span class="calendar-day">{getDay(event.startDate)}</span>
          </div>
          {#if event.startDate !== event.endDate}
            <div class="calendar-date-end">
              <span class="calendar-month">{getMonth(event.endDate)}</span>
              <span class="calendar-day">{getDay(event.endDate)}</span>
            </div>
          {/if}
        </div>
        <div class="calendar-details">
          <h3>Event Details</h3>
          <div class="detail-item">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M3 9l2.5 11h13L21 9M3 9h18M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"></path>
            </svg>
            <div>
              <div class="detail-label">Date</div>
              <div class="detail-value">
                {formatDate(event.startDate)}
                {#if event.startDate !== event.endDate}
                  <br />to {formatDate(event.endDate)}
                {/if}
              </div>
            </div>
          </div>
          {#if event.location}
            <div class="detail-item">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <div class="detail-label">Location</div>
                <div class="detail-value">{event.location}</div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <form class="registration-form" on:submit|preventDefault={handleSubmit}>
      <h3>Register for this event</h3>
      <div class="form-group">
        <label for="name">Full Name</label>
        <input id="name" type="text" placeholder="Your Name" bind:value={name} required />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input id="email" type="email" placeholder="email@example.com" bind:value={email} required />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input id="phone" type="tel" placeholder="+1 (123) 456-7890" bind:value={phone} required />
      </div>
      <button type="submit">Register Now</button>
    </form>
  </aside>
</section>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Banner Styles */
  .event-banner {
    position: relative;
    width: 100%;
    height: 80vh;
    min-height: 400px;
    max-height: 800px;
    overflow: hidden;
    margin-bottom: 3rem;
  }

  .banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
  }

  .banner-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 4rem 0;
    color: white;
  }

  .banner-content h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem;
    line-height: 1.2;
    max-width: 800px;
  }

  .event-date-banner {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.9);
    color: #222;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
  }

  .date-day {
    font-size: 2rem;
    line-height: 1;
  }

  .date-month {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Main Content Layout */
  .event-main {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    margin: 4rem auto;
  }

  .event-content {
    flex: 2 1 600px;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #444;
  }

  .description :global(p) {
    margin-bottom: 1.5rem;
  }

  .description :global(a) {
    color: #0066cc;
    text-decoration: none;
    font-weight: 500;
  }

  .description :global(a:hover) {
    text-decoration: underline;
  }

  /* Sidebar Styles */
  .event-sidebar {
    flex: 1 1 350px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
  }

  /* Calendar/Event Details Card */
  .event-details-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    overflow: hidden;
  }

  .calendar-display {
    display: flex;
    flex-direction: column;
  }

  .calendar-date {
    display: flex;
    background: #0066cc;
    color: white;
    padding: 1.5rem;
    justify-content: center;
    gap: 1rem;
  }

  .calendar-date-start,
  .calendar-date-end {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
  }

  .calendar-date-end {
    position: relative;
  }

  .calendar-date-end::before {
    content: "→";
    position: absolute;
    left: -0.8rem;
    color: rgba(255,255,255,0.7);
  }

  .calendar-month {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }

  .calendar-day {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }

  .calendar-details {
    padding: 1.5rem;
  }

  .calendar-details h3 {
    margin: 0 0 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #222;
  }

  .detail-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: flex-start;
  }

  .detail-item svg {
    color: #0066cc;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .detail-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  .detail-value {
    font-size: 0.95rem;
    color: #333;
    line-height: 1.5;
  }

  /* Registration Form */
  .registration-form {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    padding: 2rem;
  }

  .registration-form h3 {
    margin: 0 0 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #222;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .registration-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #444;
  }

  .registration-form input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }

  .registration-form input:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0,102,204,0.1);
  }

  .registration-form button {
    width: 100%;
    padding: 1rem;
    background: #0066cc;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .registration-form button:hover {
    background: #0055aa;
  }

  @media (max-width: 768px) {
    .banner-content h1 {
      font-size: 2.2rem;
    }

    .event-main {
      flex-direction: column;
    }

    .event-content,
    .event-sidebar {
      flex: 1 1 100%;
    }
  }
</style>