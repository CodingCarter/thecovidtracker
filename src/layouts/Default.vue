<template>
  <div class="layout">
    <Header />
    <transition name="fade" appear>
      <div>
        <slot />
      </div>
    </transition>
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
.fade-enter-active {
  transition: all 400ms;
  transform: scale(1);
  opacity: 1;
  will-change: transform, opacity;
}

.fade-enter {
  transform: scale(0.95) translateY(-5%);
  opacity: 0;
}

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
