// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

import Vuex from "vuex";

import moment from "moment";

import VueCharts from "vue-chartjs";

import convertRegion from "./convertRegion";

export default function(Vue, { appOptions, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(Vuex);

  Vue.mixin({
    methods: {
      convertRegion,
      formatLastUpdatedDate(dateStr) {
        const date = moment(dateStr);
        return `${date.format("dddd, MMMM DD")} at ${date.format("h:mm a")}`;
      },
      formatDate: (dateStr) => {
        const date = moment(dateStr);

        return date.format("MMMM D");
      },
      formatNumber(num) {
        if (num == null) return "no data";
        if (num >= 1000000) {
          return Math.round(100 * (num / 1000000)) / 100 + "M";
        } else if (num >= 1000) {
          return Math.round(10 * (num / 1000)) / 10 + "K";
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  });

  if (isClient) {
    Vue.use(VueCharts);
  }

  head.link.push({
    href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
    rel: "stylesheet",
  });

  appOptions.store = new Vuex.Store({
    state: {
      stateData: {},
    },
  });
}
