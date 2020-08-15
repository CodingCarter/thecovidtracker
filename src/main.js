// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

import Vuex from "vuex";

import VueCharts from "vue-chartjs";

export default function(Vue, { appOptions, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(Vuex);

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
