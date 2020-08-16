<template>
  <section class="stats-card">
    <h2 v-html="heading" />
    <div>
      <figure v-for="{ title, stat } in data" v-bind:key="title">
        <figcaption v-html="title" />
        <p v-html="stat ? formatNumber(stat) : 'NULL'" />
      </figure>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    heading: String,
    data: Array,
  },
};
</script>

<style lang="scss" scoped>
.stats-card {
  h2 {
    font-size: 2.6rem;
    margin-bottom: 1.25rem;
    margin-top: 1rem;
  }

  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    width: auto;

    figure {
      margin: 0;

      figcaption {
        font-size: 1.25rem;
        font-weight: 500;
      }

      p {
        font-size: 2rem;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
