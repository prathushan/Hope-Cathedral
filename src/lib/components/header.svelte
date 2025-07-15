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

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let timer;

  const calculateCountdown = () => {
    if (!liveService?.startTime) return;

    const target = new Date(liveService.startTime).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance > 0) {
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
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
          <div class="time-box"><span class="value">{days}</span><span class="label">DAYS</span></div>
          <div class="time-box"><span class="value">{hours}</span><span class="label">HRS</span></div>
          <div class="time-box"><span class="value">{minutes}</span><span class="label">MINS</span></div>
          <div class="time-box"><span class="value">{seconds}</span><span class="label">SECS</span></div>
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
    background-color: #e0e0e0;
    padding: 0.2rem 0.2rem;
    border-radius: 6px;
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

  .has-submenu .submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #226DAB;
    padding: 0.5rem 0;
    list-style: none;
    min-width: 200px;
    z-index: 100;
  }

  .has-submenu:hover .submenu {
    display: block;
  }

  .submenu li {
    padding: 0.5rem 1rem;
  }

  .submenu li a {
    color: #ffffff;
    text-decoration: none;
    display: block;
    padding: 5px;
  }

  .submenu li a:hover {
    /* optional hover styles */
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
