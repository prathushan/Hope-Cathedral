<script>
  export let error;
  export let status;
</script>

{#if status === 404}
  <h1>404 - Page Not Found</h1>
  <p>Sorry, the page you are looking for does not exist.</p>
  <a href="/">Go back home</a>
{:else}
  <h1>{status}</h1>
  <p>{error?.message}</p>
{/if}

<style>
  h1 {
    font-size: 3rem;
    color: #e00;
  }
  p {
    margin: 1rem 0;
  }
  a {
    color: blue;
    text-decoration: underline;
  }
</style>
