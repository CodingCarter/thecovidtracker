<template>
  <Layout>
    <div class="state-page" v-if="stateMeta && stateDaily && stateHistory">
      <main>
        <h1 v-html="convertRegion(this.$route.params.state.toUpperCase(), 1)" />
        <h2>Covid-19 Statistics</h2>
        <p
          v-html="
            stateMeta.notes
              ? 'Notes: ' + stateMeta.notes.replace(/\n/g, '<br>')
              : 'No notes available.'
          "
        />
      </main>
      <aside>
        <StatsCard
          heading="All-Time Data"
          :data="[
            {
              title: 'Cases',
              stat: stateDaily.positive,
            },
            {
              title: 'Deaths',
              stat: stateDaily.deathConfirmed || stateDaily.death,
            },
            {
              title: 'Hospitalized',
              stat: stateDaily.hospitalizedCurrently,
            },
          ]"
        />
        <StatsCard
          heading="Daily Updates"
          :data="[
            {
              title: 'New Cases',
              stat: stateDaily.positiveIncrease,
            },
            {
              title: 'New Deaths',
              stat: stateDaily.deathIncrease,
            },
            {
              title: 'New Test Results',
              stat: stateDaily.totalTestResultsIncrease,
            },
          ]"
        />
        <p class="last-update">
          Last updated on
          {{ formatLastUpdatedDate(stateDaily.lastUpdateEt) }} EST
        </p>
      </aside>
    </div>
    <main v-else>
      <h1>Loading data...thank you for your patience :)</h1>
    </main>
  </Layout>
</template>

<script>
import StatsCard from "~/components/StatsCard.vue";

export default {
  data() {
    return {
      stateMeta: null,
      stateDaily: null,
      stateHistory: null,
    };
  },
  components: {
    StatsCard,
  },
  async mounted() {
    let stateMeta;
    let stateDaily;
    let stateHistory;
    if (
      this.$store.states &&
      this.$store.states[this.$route.params.state.toLowerCase()]
    ) {
      stateMeta = this.$store.states[this.$route.params.state].stateMeta;
      stateDaily = this.$store.states[this.$route.params.state].stateDaily;
      stateHistory = this.$store.states[this.$route.params.state].stateHistory;
    } else {
      stateMeta = await (await fetch(
        `https://api.covidtracking.com/v1/states/${
          this.$route.params.state
        }/info.json`
      )).json();

      stateDaily = await (await fetch(
        `https://api.covidtracking.com/v1/states/${
          this.$route.params.state
        }/current.json`
      )).json();

      stateHistory = await (await fetch(
        `https://api.covidtracking.com/v1/states/${
          this.$route.params.state
        }/daily.json`
      )).json();

      if (!this.$store.states) this.$store.states = {};

      this.$store.states[stateDaily.state.toLowerCase()] = {
        stateMeta,
        stateDaily,
        stateHistory,
      };
    }

    this.stateMeta = stateMeta;
    this.stateDaily = stateDaily;
    this.stateHistory = stateHistory;
  },
};
</script>

<style lang="scss">
div.state-page {
  width: calc(100% - 10rem);
  padding: 3rem 5rem;
  display: grid;
  grid-template-columns: 45% auto;
  grid-gap: 5%;

  main {
    h1 {
      margin: 0;
      font-size: 3.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0;
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
      font-weight: 600;
    }

    p {
      margin-bottom: 0;
      font-size: 0.95rem;
    }
  }

  aside {
    .stats-card:nth-of-type(2) {
      border-top: rgba(200, 200, 200, 0.6) 1px solid;
      padding-top: 0.5rem;
    }

    .last-update {
      text-align: right;
      margin-top: 0.2rem;
      font-size: 0.8rem;
    }
  }
}
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
