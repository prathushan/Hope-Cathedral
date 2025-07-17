<script lang="ts">
  import { onMount } from 'svelte';
  import { urlFor } from '../utils/image-builder';

  export let menu: any;
  export let liveService: any;

  const items = menu?.items ?? [];
  const logo = menu?.headerLogo;

  const srcset = [100, 150, 200, 300]
    .map(w => `${urlFor(logo).width(w).format('webp').url()} ${w}w`)
    .join(', ');

  const sizes = '(max-width: 600px) 100px, 150px';

  // Current values
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  
  // Track displayed values (will update after animation)
  let displayDays = 0;
  let displayHours = 0;
  let displayMinutes = 0;
  let displaySeconds = 0;
  
  // Animation states
  let animateDays = false;
  let animateHours = false;
  let animateMinutes = false;
  let animateSeconds = false;
  
  let timer;

  const calculateCountdown = () => {
    if (!liveService?.startTime) return;

    const target = new Date(liveService.startTime).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance > 0) {
      // Calculate new values
      const newDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Trigger animations when values change
      if (newSeconds !== seconds) {
        seconds = newSeconds;
        animateSeconds = true;
        setTimeout(() => {
          displaySeconds = seconds;
          animateSeconds = false;
        }, 300);
      }
      if (newMinutes !== minutes) {
        minutes = newMinutes;
        animateMinutes = true;
        setTimeout(() => {
          displayMinutes = minutes;
          animateMinutes = false;
        }, 300);
      }
      if (newHours !== hours) {
        hours = newHours;
        animateHours = true;
        setTimeout(() => {
          displayHours = hours;
          animateHours = false;
        }, 300);
      }
      if (newDays !== days) {
        days = newDays;
        animateDays = true;
        setTimeout(() => {
          displayDays = days;
          animateDays = false;
        }, 300);
      }
    } else {
      clearInterval(timer);
    }
  };

  onMount(() => {
    calculateCountdown();
    timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  });
</script>

<header class="header">
  <div class="logo-block">
    <a href="/" class="logo-link">
      <img
        class="logo"
        src={urlFor(logo).width(150).format('webp').url()}
        srcset={srcset}
        sizes={sizes}
        alt="Logo"
      />
    </a>

    {#if liveService?.startTime}
      <div class="countdown">
        <h2 class="countdown-title">{liveService.title}</h2>
        <div class="time-boxes">
          <!-- Days -->
          <div class="time-box">
            <div class="flip-card {animateDays ? 'flipping' : ''}">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="value">{displayDays}</span></div>
                <div class="flip-card-back"><span class="value">{days}</span></div>
              </div>
            </div>
            <span class="label">DAYS</span>
          </div>
          
          <!-- Hours -->
          <div class="time-box">
            <div class="flip-card {animateHours ? 'flipping' : ''}">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="value">{displayHours}</span></div>
                <div class="flip-card-back"><span class="value">{hours}</span></div>
              </div>
            </div>
            <span class="label">HRS</span>
          </div>
          
          <!-- Minutes -->
          <div class="time-box">
            <div class="flip-card {animateMinutes ? 'flipping' : ''}">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="value">{displayMinutes}</span></div>
                <div class="flip-card-back"><span class="value">{minutes}</span></div>
              </div>
            </div>
            <span class="label">MINS</span>
          </div>
          
          <!-- Seconds -->
          <div class="time-box">
            <div class="flip-card {animateSeconds ? 'flipping' : ''}">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="value">{displaySeconds}</span></div>
                <div class="flip-card-back"><span class="value">{seconds}</span></div>
              </div>
            </div>
            <span class="label">SECS</span>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <nav class="nav">
    <ul class="menu">
      {#each items as item}
        <li class="menu-item {item.hasSubmenu ? 'has-submenu' : ''}">
          <a href={"/" + (item.slug?.current ?? '')}>
            {item.title}
          </a>
          {#if item.hasSubmenu}
            <ul class="submenu">
              {#each item.submenuItems as sub}
                <li>
                  <a href={"/" + (sub.slug?.current ?? '')}>
                    {sub.title}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  /* Existing styles remain the same until the flip card section */

  /* Flip card styles */
  .flip-card {
    perspective: 1000px;
    width: 50px;
    height: 50px;
    position: relative;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .flip-card.flipping .flip-card-inner {
    transform: rotateX(180deg);
  }

  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e0e0e0;
    border-radius: 6px;
  }

  .flip-card-back {
    transform: rotateX(180deg);
  }

  /* Rest of the existing styles remain unchanged */
  .header {
    position: fixed;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 2rem;
    background-color: #ffffff;
    border-bottom:1px solid #226DAB;
  }

  .logo {
    height: 50px;
  }

  .logo-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .countdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .countdown-title {
    font-size: 0.8rem;
    font-weight: bold;
    color: #333;
    margin: 0 0 0.2rem 0;
  }

  .time-boxes {
    display: flex;
    gap: 0.5rem;
  }

  .time-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50px;
  }

  .time-box .value {
    font-size: 1rem;
    font-weight: bold;
    color: #000;
  }

  .time-box .label {
    font-size: 0.75rem;
    color: #555;
    margin-top: 0.2rem;
  }

  .nav .menu {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
  }

  .menu-item {
    position: relative;
  }

  .menu-item a {
    text-decoration: none;
    color: #226DAB;
    font-size: 1.1rem;
  }

  .menu-item.has-submenu > a::after {
    content: "";
    display: inline-block;
    margin-left: 6px;
    vertical-align: middle;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #226DAB transparent transparent transparent;
  }

  .has-submenu {
    position: relative;
    overflow: visible;
  }

  .has-submenu .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #226DAB;
    padding: 0.5rem 0;
    list-style: none;
    min-width: 200px;
    z-index: 100;
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform-origin: center top;
    clip-path: inset(50% 0 50% 0);
    opacity: 0;
    transition: clip-path 0.4s ease, opacity 0.3s ease;
    pointer-events: none;
  }

  .has-submenu:hover .submenu {
    clip-path: inset(0 0 0 0);
    opacity: 1;
    pointer-events: auto;
  }

  .submenu li {
    padding: 0.5rem 1rem;
  }

  .submenu li a {
    display: block;
    padding: 10px 16px;
    color: #fff;
    text-decoration: none;
    transition: background 0.3s ease;
  }

  .submenu li a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .menu-item:last-child a {
    padding: 0.5em 1em;
    background-color: #226DAB;
    color: white;
    border: 1px solid #ffffff;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
</style>