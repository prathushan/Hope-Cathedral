<!-- /src/lib/components/footer.svelte -->
<script lang="ts">
  import { urlFor } from '../utils/image-builder';

  export let footerData: any;

  // console.log('footerData:', footerData);

  const logo = footerData?.footerLogo;
  const menus = footerData?.footerMenus ?? [];
  const footerTitle = footerData?.footerTitle ?? '';
</script>

<footer class="footer">
  {#if logo}
    <div class="footer-logo">
      <img
        src={urlFor(logo).width(150).format('webp').url()}
        alt={footerTitle || 'Footer Logo'}
        width="150"
      />
    </div>
  {/if}

  <div class="footer-menus">
    {#each menus as menu}
      <div class="footer-menu">
        <h4>{menu.menuTitle}</h4>
        <ul>
          {#each menu.links as link}
            <li>
              <a href={link.slug?.current?.startsWith('/') ? link.slug.current : '/' + link.slug.current}>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

</footer>

<style>
  .footer {
    background-color: #222;
    color: #eee;
    padding: 2rem 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .footer-logo img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .footer-menus {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .footer-menu h4 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .footer-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-menu li {
    margin-bottom: 0.5rem;
  }

  .footer-menu a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }

  .footer-menu a:hover {
    color: #fff;
    text-decoration: underline;
  }

  .footer-title {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    color: #888;
  }

  @media (max-width: 600px) {
    .footer {
      flex-direction: column;
      align-items: center;
    }
    .footer-menus {
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
    }
    .footer-menu h4 {
      text-align: center;
    }
  }
</style>
