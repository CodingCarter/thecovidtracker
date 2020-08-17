<template>
  <Layout>
    <h1 :key="isReloading">404 Error, bud</h1>
  </Layout>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      isReloading: false,
    };
  },
  mounted() {
    setTimeout(location.reload(), 7500);
  },
};
</script>
