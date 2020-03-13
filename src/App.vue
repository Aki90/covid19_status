<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
    <Spinner :loading="loadingStatus" />
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';
import Spinner from '@/components/Spinner';
import bus from '@/utils/bus';

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    Spinner,
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
  },
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
  },
  beforeDestroy() {
    bus.$off('start:spinner');
    bus.$off('end:spinner');
  },
};
</script>

<style scoped>
/* 웹 폰트 */
@font-face {
  font-family: 'MapoPeacefull';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: 'MapoPeacefull';
}
</style>
