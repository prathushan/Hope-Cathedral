<!-- /src/lib/components/header.svelte -->
<script lang="ts">
  import { urlFor } from '../utils/image-builder';
  export let menu: any;

  const items = menu?.items ?? [];
  const logo = menu?.headerLogo;

  const srcset = [100, 150, 200, 300]
    .map(w => `${urlFor(logo).width(w).format('webp').url()} ${w}w`)
    .join(', ');

  const sizes = '(max-width: 600px) 100px, 150px';
</script>

<header class="header">
  <a href="/" class="logo-link">
    <img
      class="logo"
      src={urlFor(logo).width(150).format('webp').url()}
      srcset={srcset}
      sizes={sizes}
      alt="Logo"
    />
  </a>

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .logo {
    height: 50px;
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
    color: #333;
    font-weight: 500;
  }

  /* Arrow for items with submenu */
  .menu-item.has-submenu > a::after {
    content: "";
    display: inline-block;
    margin-left: 6px;
    vertical-align: middle;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #333 transparent transparent transparent;
  }

  .has-submenu .submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    color: #333;
    text-decoration: none;
    display: block;
  }

  .submenu li a:hover {
    background-color: #f0f0f0;
  }
</style>
