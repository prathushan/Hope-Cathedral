<script lang="ts">
  import { urlFor } from '../utils/image-builder';
  export let footerData: any;

  const logo = footerData?.footerLogo;
  const menus = footerData?.footerMenus ?? [];
  const footerTitle = footerData?.footerTitle ?? '';
</script>

<footer class="footer">
  <!-- Top Wave SVG -->
  <div class="footer-wave">
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
  <path
    d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,181.3C672,171,768,149,864,128C960,107,1056,85,1152,101.3C1248,117,1344,171,1392,197.3L1440,224"
    fill="none"
    stroke="#226DAB"
    stroke-width="3"
  />
</svg>

  </div>

  {#if logo}
    <div class="footer-logo">
      <img
  src={urlFor(logo).width(300).format('webp').url()}
  srcset={`${urlFor(logo).width(150).format('webp').url()} 1x, ${urlFor(logo).width(300).format('webp').url()} 2x`}
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
              <a href={link.slug?.current ? (link.slug.current.startsWith('/') ? link.slug.current : '/' + link.slug.current) : '#'}>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  {#if footerData?.footerText}
    <div class="footer-text">{footerData.footerText}</div>
  {/if}

  {#if footerData?.addressSection}
    <div class="footer-address">
      {#if footerData.addressSection.addressTitle}
        <h4>{footerData.addressSection.addressTitle}</h4>
      {/if}
      {#if footerData.addressSection.address}
        <p>{footerData.addressSection.address}</p>
      {/if}
      {#if footerData.addressSection.email}
        <p>Email: <a href={`mailto:${footerData.addressSection.email}`}>{footerData.addressSection.email}</a></p>
      {/if}
      {#if footerData.addressSection.phone}
        <p>Phone: <a href={`tel:${footerData.addressSection.phone}`}>{footerData.addressSection.phone}</a></p>
      {/if}
    </div>
  {/if}

  {#if footerData?.socialLinks?.length}
   <div class="footer-social">
  {#each footerData.socialLinks as social}
    {#if social.url}
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.platform}
      >
        <i class={`fab fa-${social.iconName}`}></i>
      </a>
    {/if}
  {/each}
</div>

  {/if}

  {#if footerData?.copyrightText}
    <div class="footer-title">
      {footerData.copyrightText}
    </div>
  {/if}
</footer>

<style>
  .footer {
    background-color: #ffffff;
    color: #226DAB;
    padding: 150px 3rem 3rem;
    position: relative;
    overflow: hidden;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .footer-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150px;
    z-index: 0;
    overflow: hidden;
    line-height: 0;
  }

  .footer-wave svg {
    display: block;
    width: 100%;
    height: 150px;
  }

  .footer-logo img {
    display: block;
    max-width: 100%;
    height: auto;
    z-index: 2;
    position: relative;
  }

  .footer-menus {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    z-index: 2;
    position: relative;
  }

  .footer-menu h4 {
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .footer-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size:14px;
  }

  .footer-menu li {
    margin-bottom: 0.5rem;
  }

  .footer-menu a {
    color: #000;
    text-decoration: none;
    transition: color 0.3s;
    font-weight:500 !important;
  }

  .footer-menu a:hover {
    text-decoration: underline;
  }

  .footer-address,
  .footer-text {
    max-width: 300px;
    color: #444;
    font-size: 0.95rem;
    z-index: 2;
    position: relative;
  }

  .footer-social {
    display: flex;
    gap: 1rem;
    align-items: center;
    z-index: 2;
    position: relative;
  }

  .footer-social i {
    color: #226DAB;
    font-size: 1.25rem;
    transition: color 0.3s ease;
  }

  .footer-social i:hover {
    color: #1a4f7d;
  }

  .footer-title {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    color: #000000;
    z-index: 2;
    position: relative;
    text-align:justify;
    font-weight:500 !important;
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
