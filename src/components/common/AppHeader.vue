<template>
  <header id="header">
    <router-link to="/"><h1>코로나19 현재현황</h1></router-link>

    <nav id="nav">
      <router-link to="/">국내현황</router-link>
      <router-link to="/global">해외현황</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/AppHeader.scss';
</style>
