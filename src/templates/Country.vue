<template>
  <Layout>
    <div class="country-page" v-if="countryNow && countryHistory">
      <section class="main">
        <main>
          <h1 v-html="countryNow.Country" />
          <h2>Covid-19 Statistics</h2>
          <p>
            Notes: Most countries are not recording recoveries as diligently as
            they are with cases and deaths. Due to that, there are spikes in
            recoveries that are just mostly due to a backlog of recoveries from
            the states/provinces that is finally sent to the countries.
          </p>
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
      </section>
      <section class="charts">
        <StatChart
          :labels="countryHistory.map((el) => formatDate(el.Date))"
          :data="countryHistory.map((el) => el.Confirmed)"
          title="Cumulative Cases"
          color="green"
        />
        <StatChart
          :labels="countryHistory.map((el) => formatDate(el.Date))"
          :data="countryHistory.map((el) => el.Deaths)"
          title="Cumulative Deaths"
          color="darkblue"
        />
        <StatChart
          :labels="countryHistory.map((el) => formatDate(el.Date))"
          :data="countryHistory.map((el) => el.Recovered)"
          title="Cumulative Recoveries"
          color="orange"
        />
        <StatChart
          :labels="countryHistory.map((el) => formatDate(el.Date))"
          :data="
            countryHistory.map((el) => {
              let index = countryHistory.indexOf(el) - 1;
              if (index == -1) return;
              return (
                el.Confirmed -
                countryHistory[countryHistory.indexOf(el) - 1].Confirmed
              );
            })
          "
          title="Daily Cases"
          color="green"
        />
        <StatChart
          :labels="countryHistory.map((el) => formatDate(el.Date))"
          :data="
            countryHistory.map((el) => {
              let index = countryHistory.indexOf(el) - 1;
              if (index == -1) return;
              return (
                el.Deaths -
                countryHistory[countryHistory.indexOf(el) - 1].Deaths
              );
            })
          "
          title="Daily Deaths"
          color="darkblue"
        />
        <StatChart
          :labels="countryHistory.map((el) => formatDate(el.Date))"
          :data="
            countryHistory.map((el) => {
              let index = countryHistory.indexOf(el) - 1;
              if (index == -1) return;
              const toReturn =
                el.Recovered -
                countryHistory[countryHistory.indexOf(el) - 1].Recovered;
              if (toReturn < 0) return;

              return toReturn;
            })
          "
          title="Daily Recoveries"
          color="orange"
        />
      </section>
    </div>
  </Layout>
</template>

<script>
import moment from "moment";
import StatsCard from "~/components/StatsCard.vue";
import StatChart from "~/components/StatChart.vue";

export default {
  components: {
    StatsCard,
    StatChart,
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
  section.main {
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

  .charts {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 5%;
    grid-row-gap: 4rem;
    margin-top: 5rem;

    div {
      h4 {
        display: none;
        font-size: 1.5rem;
        text-align: center;
      }

      // width: 33vw;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>
