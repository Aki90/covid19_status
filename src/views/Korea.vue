<template>
  <main>
    <template>
      <h2>국내 발생 현황</h2>
      <span v-show="synthesize.timestamp" class="times">
        [ {{ synthesize.timestamp | formatDate }} 기준 ]
      </span>

      <table>
        <!-- test -->
        TODO: 테이블 만들기부터 그 다음은 각자버튼 리스트 만들어주고 버튼 클릭시
        각자 ROW 표 나오도록 제작 완료.
      </table>
    </template>
  </main>
</template>

<script>
import { fetchKoreaData } from '../api/index.js';
import bus from '@/utils/bus';

export default {
  data() {
    return {
      synthesize: [],
    };
  },
  async created() {
    try {
      bus.$emit('start:spinner');
      const { data } = await fetchKoreaData('synthesize');
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
