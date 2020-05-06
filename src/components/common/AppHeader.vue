<template>
  <div id="header">
    <router-link to="/"><h1>코로나19 현재현황</h1></router-link>

    <div id="nav">
      <router-link to="/">국내현황</router-link>
      <router-link to="/global">해외현황</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#header {
  overflow: hidden;
  margin: 2rem 0;

  h1 {
    font-size: 2rem;
    float: left;
  }

  #nav {
    float: right;
    line-height: 42px;

    a {
      padding: 1rem;
      transition: all 0.2s;
    }
    a:hover {
      color: #fff;
      background: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
