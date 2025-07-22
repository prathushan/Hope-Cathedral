<script lang="ts">
  export let data: {
    banner: { title: string; backgroundImage?: { asset: { _ref: string } } } | null;
    ourStoryCard: { title: string; paragraph: string; image?: { asset: { _ref: string } } } | null;
    nextStepBlock: {
      label: string;
      textBlock: { text: { children: { text: string }[] }[] };
      buttonBlock: { text: string };
      image?: { asset: { _ref: string } };
    } | null;
    ourBeliefsBlock: {
      label: string;
      block: {
        _type: string;
        cards: { _key: string; title: string; paragraph: string }[];
      }[];
    } | null;
    coreValuesBlock: {
      label: string;
      block: {
        _type: string;
        faqs: { _key: string; question: string; answer: string }[];
      }[];
    } | null;
  };

  const beliefs = data.ourBeliefsBlock?.block?.[0]?.cards ?? [];
  const faqs = data.coreValuesBlock?.block?.[0]?.faqs ?? [];

  let activeTab = 0;
  // let activeFAQ: number | null = null;

  // function toggleFAQ(index: number) {
  //   activeFAQ = activeFAQ === index ? null : index;
  // }

 let activeFAQ = null;

function toggleFAQ(index) {
  activeFAQ = activeFAQ === index ? null : index;
} 

  function getSanityImageUrl(ref: string): string {
    if (!ref) return '';
    const id = ref.replace('image-', '').replace(/-(jpg|png|webp)$/, '');
    const format = ref.split('-').pop();
    return `https://cdn.sanity.io/images/8a8pria4/production/${id}.${format}`;
  }

   
</script>



{#if data.banner}
  <section class="banner-section">
    {#if data.banner.backgroundImage}
      <div class="image-wrapper">
        <img
  src={getSanityImageUrl(data.banner.backgroundImage.asset._ref)}
  alt={data.banner.title}
  class="banner-image"
  loading="lazy"
  width="1280"
  height="440"
/>
        <div class="glass-title">
          <h1>{data.banner.title}</h1>
        </div>
      </div>
    {/if}
  </section>
{:else}
  <p>Loading banner content...</p>
{/if}
<!-- our story block section  -->
{#if data.ourStoryCard}
  <section class="our-story-section">
    <h2 class="our-story-heading">Our Story</h2>
    <div class="our-story-wrapper">
       <!-- <div class="story-image">
        {#if data.ourStoryCard?.image}
          <img
            src={getSanityImageUrl(data.ourStoryCard.image.asset._ref)}
            alt="Our Story"
          />
        {/if} 
      </div> -->
      <div class="story-text">
        <h3>{data.ourStoryCard.title}</h3>
        {#each data.ourStoryCard.paragraph.split('\n\n') as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    </div>
  </section>
{/if}
<!-- Take your next step block  -->
{#if data.nextStepBlock}
  <section class="next-step-section">
    <div class="next-step-wrapper">
      <div class="next-step-text">
        <h2>{data.nextStepBlock.label}</h2>
        {#each data.nextStepBlock.textBlock?.text as block}
          <p>{block.children[0]?.text}</p>
        {/each}
        {#if data.nextStepBlock.buttonBlock}
          <button class="next-step-btn">{data.nextStepBlock.buttonBlock.text}</button>
        {/if}
      </div>

      {#if data.nextStepBlock.image}
        <div class="next-step-image">
          <img
            src={getSanityImageUrl(data.nextStepBlock.image.asset._ref)}
            alt="Next Steps"
            loading="lazy"
          />
        </div>
      {/if}
    </div>
  </section>
{/if}

<!-- OUR BELIFES BLOCK  -->

{#if data.ourBeliefsBlock}
  <section class="our-beliefs-section">
    <h2 class="beliefs-heading">{data.ourBeliefsBlock.label}</h2>

    <div class="tab-header">
      {#each data.ourBeliefsBlock.block?.[0]?.cards as card, i (card._key)}
        <button
          class="tab-button {i !== activeTab ? 'inactive' : ''}"
          on:click={() => (activeTab = i)}
        >
          {card.title}
        </button>
      {/each}
    </div>

    <div class="tab-content">
      {#if data.ourBeliefsBlock.block?.[0]?.cards?.[activeTab]}
        <h3>{data.ourBeliefsBlock.block[0].cards[activeTab].title}</h3>
        <p>{data.ourBeliefsBlock.block[0].cards[activeTab].paragraph}</p>
      {/if}
    </div>
  </section>
{/if}

<!-- Our Core values Block  -->

{#if faqs.length > 0}
  <section class="faq-section">
    <h2 class="faq-heading">{data.coreValuesBlock?.label ?? 'Core Values'}</h2>

    <div class="faq-columns">
      <!-- First 5 items -->
      <div class="faq-column">
        {#each faqs.slice(0, 5) as faq, i}
          <div
            class="faq-item"
            class:active={activeFAQ === i}
            on:click={() => toggleFAQ(i)}
          >
            <div class="faq-question-wrapper">
              <span class="faq-icon">{activeFAQ === i ? '-' : '+'}</span>
              <span class="faq-question">{faq.question}</span>
            </div>

            {#if activeFAQ === i}
              <div class="faq-answer">
                {#each faq.answer as block}
                  {#each block.children as span}
                    {@html span.text}
                  {/each}
                  <br />
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Remaining items -->
      <div class="faq-column">
        {#each faqs.slice(5) as faq, j}
          <div
            class="faq-item"
            class:active={activeFAQ === j + 5}
            on:click={() => toggleFAQ(j + 5)}
          >
            <div class="faq-question-wrapper">
              <span class="faq-icon">{activeFAQ === j + 5 ? '-' : '+'}</span>
              <span class="faq-question">{faq.question}</span>
            </div>

            {#if activeFAQ === j + 5}
              <div class="faq-answer">
                {#each faq.answer as block}
                  {#each block.children as span}
                    {@html span.text}
                  {/each}
                  <br />
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}



<style>

.body {
  font-family: 'Hope-GT-US-Regular', Roboto, sans-serif
}
 .banner-section {
  position: relative;
  padding: 0;
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

/* Create a dark background layer on top */
.banner-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 30%;
  width: 100%;
  background-color: #131b23;
  z-index: 0;
}

  .image-wrapper {
    position: relative;
    width: 100%;
    max-width: 900px;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .banner-image {
    width: 100%;
    height: 440px;
    object-fit: cover;
    display: block;
  }

  .glass-title {
    position: absolute;
    bottom: 20rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 1rem 2rem;
    color: #000;
    text-align: center;
    max-width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .glass-title h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
  }

  @media (max-width: 768px) {
    .glass-title h1 {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    .glass-title {
      padding: 0.75rem 1.2rem;
    }

    .glass-title h1 {
      font-size: 1.1rem;
    }
  }

 .our-story-section {
  padding: 4rem 2rem;
  background-color: #fff;
  text-align: center; /* Center content globally */
}

.our-story-heading {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.our-story-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.story-text {
  max-width: 700px;
}

.story-text h3 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111;
}

.story-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  color: #333;
}


.next-step-section {
  padding: 4rem 2rem;
  background-color: #fff;
}

.next-step-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap-reverse; /* reverse to keep text left on large screens */
}

.next-step-text {
  flex: 1 1 50%;
  min-width: 300px;
}

.next-step-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.next-step-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
}

.next-step-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #131b23;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.next-step-btn:hover {
  background-color: #0d131a;
}

.next-step-image {
  flex: 1 1 45%;
  min-width: 300px;
}

.next-step-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .next-step-wrapper {
    flex-direction: column;
    text-align: center;
  }

  .next-step-btn {
    width: 100%;
  }
}
/* our belifes styles  */
.our-beliefs-section {
  padding: 60px 20px;
  background-color: white;
  font-family: 'Inter', 'Open Sans', sans-serif;
  text-align: center;
  height:600px
}

.beliefs-heading {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 40px;
  letter-spacing: 0.5px;
}

.tab-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
}

.tab-button {
  background-color: #f0f7ff;
  border: 2px solid transparent;
  color: #1565c0;
  padding: 10px 22px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background-color: #e3f2fd;
  border-color: #90caf9;
}

.tab-button:not(.inactive) {
  background-color: white;
  border-color: #42a5f5;
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.2);
}

.tab-content {
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  text-align: left;
  animation: fadeIn 0.4s ease-in-out;

  /* 👇 Fixed min-height for consistent layout */
  min-height: 280px;
  transition: min-height 0.3s ease;
}

.tab-content h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1565c0;
  margin-bottom: 20px;
}

.tab-content p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

/* Fade animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .tab-button {
    padding: 8px 14px;
    font-size: 14px;
  }

  .tab-content {
    padding: 30px 20px;
    min-height: 240px; /* slightly less for mobile */
  }
}

/* core values css */
.faq-section {
  background: #f7fbff;
  padding: 60px 20px;
font-family: 'Hope-GT-US-Regular', Roboto, sans-serif
}

.faq-heading {
  text-align: center;
  font-size: 2rem;
  color: #1565c0;
  margin-bottom: 40px;
  font-weight: 700;
}

.faq-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-column {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  background: #ffffff;
  border: 1px solid #cfe8ff;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  max-height: 80px;
  position: relative;
}

.faq-item:hover {
  background: #eaf4ff;
  transform: scale(1.02);
}

.faq-item.active {
  max-height: 300px;
}

.faq-question-wrapper {
  display: flex;
  align-items: center;
}

.faq-icon {
  font-size: 18px;
  color: #0d6efd;
  margin-right: 10px;
}

.faq-question {
  font-weight: 600;
  font-size: 16px;
  color: #1c3f72;
}

.uppercase-blue {
  color: #0d6efd;
}

.faq-answer {
  margin-top: 12px;
  color: #333;
  display: block;
  font-family: 'Hope-GT-US-Regular', Roboto, sans-serif
}

@media (max-width: 768px) {
  .faq-columns {
    flex-direction: column;
  }

  .faq-column {
    flex: 1 1 100%;
  }
}

</style>
