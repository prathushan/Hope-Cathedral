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
        <div class="slide-timer">
          <!-- Days -->
          <div class="time-unit">
            <div class="time-card {animateDays ? 'slide' : ''}">
              <div class="current">{displayDays < 10 ? `0${displayDays}` : displayDays}</div>
              <div class="next">{days < 10 ? `0${days}` : days}</div>
            </div>
            <span class="unit-label">DAYS</span>
          </div>
          
          <div class="time-separator">:</div>
          
          <!-- Hours -->
          <div class="time-unit">
            <div class="time-card {animateHours ? 'slide' : ''}">
              <div class="current">{displayHours < 10 ? `0${displayHours}` : displayHours}</div>
              <div class="next">{hours < 10 ? `0${hours}` : hours}</div>
            </div>
            <span class="unit-label">HOURS</span>
          </div>
          
          <div class="time-separator">:</div>
          
          <!-- Minutes -->
          <div class="time-unit">
            <div class="time-card {animateMinutes ? 'slide' : ''}">
              <div class="current">{displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes}</div>
              <div class="next">{minutes < 10 ? `0${minutes}` : minutes}</div>
            </div>
            <span class="unit-label">MINUTES</span>
          </div>
          
          <div class="time-separator">:</div>
          
          <!-- Seconds -->
          <div class="time-unit">
            <div class="time-card {animateSeconds ? 'slide' : ''}">
              <div class="current">{displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}</div>
              <div class="next">{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <span class="unit-label">SECONDS</span>
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
  /* Existing header styles remain the same */
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

  /* New Slide Timer Styles */
  .countdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0.5rem;
  }

  .countdown-title {
    font-size: 0.6rem;
    font-weight: 600;
    color: #555;
    margin: 0 0 0.2rem 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .slide-timer {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time-card {
    position: relative;
    width: 2.5rem;
    height: 2rem;
    background: #f8f8f8;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: #226DAB;
  }

  .time-card .current,
  .time-card .next {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-card .current {
    top: 0;
    background: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
  }

  .time-card .next {
    top: 100%;
    background: linear-gradient(to bottom, #e8e8e8, #f8f8f8);
  }

  .time-card.slide .current {
    animation: slide-up 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }

  .time-card.slide .next {
    animation: slide-up 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }

  @keyframes slide-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }

  .unit-label {
    font-size: 0.6rem;
    color: #777;
    margin-top: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }

  .time-separator {
    font-size: 1.2rem;
    color: #226DAB;
    margin-bottom: 0.8rem;
    font-weight: bold;
  }

  /* Glow effect on hover */
  .time-unit:hover .time-card {
    box-shadow: 0 0 10px rgba(34, 109, 171, 0.5);
    transition: box-shadow 0.3s ease;
  }

  /* Rest of the existing styles remain unchanged */
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