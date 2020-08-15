<template>
  <Layout>
    <ul>
      <li v-for="state in states" v-bind:key="state.hash">
        <g-link :to="`/states/${state.state.toLowerCase()}/`">
          {{ state.state }}
        </g-link>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Hello, world!",
  },
  data() {
    return {
      states: [],
    };
  },
  async mounted() {
    const states = await fetch(
      "https://api.covidtracking.com/v1/states/current.json"
    );

    this.states = await states.json();
  },
};
</script>
