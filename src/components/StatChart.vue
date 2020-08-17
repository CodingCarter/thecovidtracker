<template>
  <LineChart
    :chartData="{
      labels,
      datasets: [
        {
          barThickness: 4,
          backgroundColor: colors[color] ? colors[color] : color,
          data,
        },
      ],
    }"
    :options="{
      title: {
        display: true,
        text: title,
        padding: 15,
        fontFamily: 'Open Sans',
        fontSize: 20,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: `# of ${title}`,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: false,
              labelString: 'Date',
            },
          },
        ],
      },
    }"
  />
</template>

<script>
import moment from "moment";
import LineChart from "~/components/LineChart.js";

export default {
  props: ["labels", "data", "title", "color"],
  data() {
    return {
      colors: {
        green: "#6c9b8b",
        darkblue: "#13293e",
        orange: "#fd7122",
      },
    };
  },
  components: {
    LineChart,
  },
  methods: {
    formatDate: (dateStr) => {
      const date = moment(dateStr);

      return date.format("MMMM D");
    },
  },
};
</script>
