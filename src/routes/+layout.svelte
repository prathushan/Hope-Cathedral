<!-- /src/routes/+layout.svelte -->
<script lang="ts">
  export let data;
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import '../app.css'
</script>

<Header menu={data.menu} />
<main>
  <slot />
</main>
<Footer footerData={data.footerSetting} />

