<template>
  <main>
    <h2>해외 발생 현황</h2>
    <span v-show="synthesize.timestamp" class="times">
      [ {{ synthesize.timestamp | formatDate }} 기준 ]
    </span>
  </main>
</template>

<script>
import { fetchGlobalData } from '../api/index';
import bus from '@/utils/bus';

// API Key TODO: 인터셉터로 넘기기
export default {
  data() {
    return {
      synthesize: [],
    };
  },
  async created() {
    try {
      bus.$emit('start:spinner');
      const { data } = await fetchGlobalData('synthesize');
      this.synthesize = data.data[0];
      setTimeout(() => {
        bus.$emit('end:spinner');
      }, 300);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
h2 {
  &::after {
    content: '';
    display: block;
    width: 10rem;
    height: 2px;
    margin: 1rem auto;
    background: #414141;
  }
}

.times {
  font-weight: 600;
}
</style>
