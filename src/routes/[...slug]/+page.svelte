<!-- src/routes/[...slug]/+page.svelte -->
<!-- <script lang="ts">
  import { page } from '$app/stores'; // ← triggers reactive updates
  export let data;
  const { page: pageData } = data;

  $: currentSlug = $page.url.pathname;
</script>

<svelte:head>
  <title>{pageData.title}</title> 
</svelte:head>

<h1>{pageData.title}</h1> -->

<!-- Display content -->
<!-- {#each pageData.content as section (section._key)}
  {#if section.block[0]._type === 'heroSection'}
    <section class="hero-section">
      {@html section.block[0].videoEmbedCode}
      <h2>{section.block[0].title}</h2>
      <button>{section.block[0].buttons[0].text}</button>
    </section>
  {:else if section.block[0]._type === 'cardSection'}
    <section class="card-section">
      <h2>{section.block[0].sectionTitle}</h2>
      <div class="grid grid-cols-3 gap-4">
        {#each section.block[0].cards as card}
          <div class="card">
            <h3>{card.title}</h3>
            <p>{card.paragraph}</p>
            <a href={card.button.slug.current}>{card.button.text}</a>
          </div>
        {/each}
      </div>
    </section>
  {/if}
{/each} -->
