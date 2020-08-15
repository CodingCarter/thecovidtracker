<template>
  <Layout>
    <span style="display:none;">Loading...</span>
    <div class="state-page" v-if="stateMeta && stateDaily && stateHistory">
      <main>
        <h1 v-html="convertRegion(this.$route.params.state.toUpperCase(), 1)" />
        <h2>Covid-19 Statistics</h2>
        <p
          v-if="stateMeta.notes"
          v-html="'Notes: ' + stateMeta.notes.replace(/\n/g, '<br>')"
        />
        <p v-else />
      </main>
      <aside>
        <div class="stats-section">
          <h2>All-Time Data</h2>
          <div class="stats">
            <figure v-if="stateDaily.deathConfirmed">
              <figcaption>Deaths Confirmed</figcaption>
              <p v-html="numberWithCommas(stateDaily.deathConfirmed)" />
            </figure>
            <figure v-else>
              <figcaption>Deaths</figcaption>
              <p v-html="numberWithCommas(stateDaily.death)" />
            </figure>
            <figure>
              <figcaption>Cases</figcaption>
              <p v-html="numberWithCommas(stateDaily.positive)" />
            </figure>
            <figure>
              <figcaption>Hospitalized</figcaption>
              <p v-html="numberWithCommas(stateDaily.hospitalizedCurrently)" />
            </figure>
          </div>
        </div>
        <div class="stats-section">
          <h2>Daily Updates</h2>
          <div class="stats">
            <figure>
              <figcaption>New Cases</figcaption>
              <p v-html="numberWithCommas(stateDaily.positiveIncrease)" />
            </figure>
            <figure>
              <figcaption>New Deaths</figcaption>
              <p v-html="numberWithCommas(stateDaily.deathIncrease)" />
            </figure>
            <figure>
              <figcaption>New Test Results</figcaption>
              <p
                v-html="numberWithCommas(stateDaily.totalTestResultsIncrease)"
              />
            </figure>
          </div>
        </div>
        <p class="last-update">
          Last updated on {{ formatDate(stateDaily.lastUpdateEt) }}
        </p>
      </aside>
    </div>
    <main v-else>
      <h1>Loading data...thank you for your patience :)</h1>
    </main>
  </Layout>
</template>

<script>
import { convertRegion } from "./convertRegion.js";
import LineChart from "./LineChart.js";
import moment from "moment";

export default {
  data() {
    return {
      stateMeta: null,
      stateDaily: null,
      stateHistory: null,
      datacollection: null,
    };
  },
  components: {
    LineChart,
  },
  methods: {
    convertRegion,
    numberWithCommas(x) {
      if (x == null) return "no data";
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDate(dateStr) {
      const date = moment(dateStr);
      return `${date.format("dddd, MMMM DD")} at ${date.format("h:mm a")} EST`;
    },
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
      font-size: 3.5rem;
      font-weight: 700;
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
    .stats-section {
      &:nth-of-type(2) {
        border-top: rgba(200, 200, 200, 0.6) 1px solid;
        padding-top: 0.5rem;
      }

      h2 {
        font-size: 2.6rem;
        margin-bottom: 1.25rem;
        margin-top: 1rem;
      }

      .stats {
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
