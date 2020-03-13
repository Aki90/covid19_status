<template>
  <header id="header">
    <h1 class="text-center">코로나19 현재현황</h1>
    <nav class="menu">
      <ul class="spot">
        <li><router-link to="/">국내현황</router-link></li>
        <li><router-link to="/global">국외현황</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style src="@/assets/scss/common/header.scss" lang="scss" scoped></style>
