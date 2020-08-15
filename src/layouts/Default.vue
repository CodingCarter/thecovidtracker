<template>
  <div class="layout">
    <Header />
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Header from "~/components/Header";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
html {
  font-family: "Open Sans", sans-serif;
  color: $txt-primary;
  background: $bg-primary;

  &,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
  }
}
</style>
