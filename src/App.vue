<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
    <Spinner :loading="loadingStatus" />
  </div>
</template>

<script>
import metaInfo from '@/utils/meta';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import Spinner from '@/components/Spinner';
import bus from '@/utils/bus';
export default {
  metaInfo, // Meta Tag 관련 설정
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
<style lang="scss">
@import '@/assets/scss/default.scss'; // reset.css

#app {
  text-align: center;
  width: 1200px;
  margin: 0 auto;
}
</style>
