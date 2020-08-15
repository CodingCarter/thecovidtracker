<template>
  <header>
    <h3>The Covid Tracker</h3>

    <nav>
      <g-link to="/">Home</g-link>
      <g-link to="/world/">Live World Data</g-link>
      <g-link to="/states/il/">Illinois</g-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: $bg-secondary;
  padding: 0.5rem 0;
  height: 4rem;

  @include containerWidthPadding;

  h3 {
    margin: 0;
  }

  nav {
    a {
      text-decoration: none;
      color: inherit;
      padding: 1rem 1.25rem;
    }
  }
}
</style>
