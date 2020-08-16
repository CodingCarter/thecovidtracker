<template>
  <Layout>
    <div class="world-page">
      <main>
        <figure>
          <p v-html="worldNow ? formatNumber(worldNow.TotalConfirmed) : '-'" />
          <figcaption>cases</figcaption>
        </figure>
        <figure>
          <p v-html="worldNow ? formatNumber(worldNow.TotalDeaths) : '-'" />
          <figcaption>deaths</figcaption>
        </figure>
        <figure>
          <p v-html="worldNow ? formatNumber(worldNow.TotalRecovered) : '-'" />
          <figcaption>recovered</figcaption>
        </figure>
      </main>
    </div>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      worldNow: null,
      worldHistory: null,
    };
  },
  async mounted() {
    let worldNow;
    let worldHistory;

    worldNow = await (await fetch(
      `https://api.covid19api.com/world/total`
    )).json();

    worldHistory = await (await fetch(
      `https://api.covid19api.com/world`
    )).json();

    this.worldNow = worldNow;
    this.worldHistory = worldHistory;
  },
};
</script>

<style lang="scss">
.world-page {
  main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    text-align: center;
    height: calc(100vh - 5rem);

    @include containerWidthPadding;

    p {
      font-size: 4rem;
      font-weight: 500;
      margin: 0;
      margin-bottom: 1rem;
    }

    figcaption {
      font-size: 1.6rem;
    }
  }
}
</style>
