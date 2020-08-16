<template>
  <Layout>
    <div class="country-page" v-if="countryNow && countryHistory">
      <main>
        <h1 v-html="countryNow.Country" />
        <h2>Covid-19 Statistics</h2>
        <p v-html="countryNow" />
      </main>
      <aside>
        <StatsCard
          heading="All-Time Data"
          :data="[
            {
              title: 'Cases',
              stat: countryNow.Confirmed,
            },
            {
              title: 'Recovered',
              stat: countryNow.Recovered,
            },
            {
              title: 'Deaths',
              stat: countryNow.Deaths,
            },
          ]"
        />
        <StatsCard
          heading="Daily Updates"
          :data="[
            {
              title: 'New Cases',
              stat: countryNow.ConfirmedChange || '-',
            },
            {
              title: 'New Recoveries',
              stat: countryNow.RecoveredChange || '-',
            },
            {
              title: 'New Deaths',
              stat: countryNow.DeathsChange || '-',
            },
          ]"
        />
        <p class="last-update">
          Last updated on {{ formatLastUpdatedDate(countryNow.Date) }} GMT+0
        </p>
      </aside>
    </div>
  </Layout>
</template>

<script>
import StatsCard from "~/components/StatsCard.vue";

export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      countryHistory: null,
      countryNow: null,
    };
  },
  async mounted() {
    let countryHistory;
    let countryNow;

    countryHistory = await (await fetch(
      `https://api.covid19api.com/total/country/${this.$route.params.country}`
    )).json();

    countryNow = countryHistory[countryHistory.length - 1];

    this.countryHistory = countryHistory;

    this.countryNow = {
      ...countryNow,
      ConfirmedChange:
        countryNow.Confirmed -
        countryHistory[countryHistory.length - 2].Confirmed,
      DeathsChange:
        countryNow.Deaths - countryHistory[countryHistory.length - 2].Deaths,
      RecoveredChange:
        countryNow.Recovered -
        countryHistory[countryHistory.length - 2].Recovered,
    };
  },
};
</script>

<style lang="scss">
div.country-page {
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
