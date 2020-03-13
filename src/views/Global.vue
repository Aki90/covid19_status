<template>
  <!-- global -->
  <main id="global" class="text-center">
    <h2>{{ global.current }}</h2>
    <!-- global_table -->
    <table class="global_table table table-hover table-striped">
      <thead>
        <tr>
          <th>나라별</th>
          <th>확진환자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="datas in global.data" :key="datas.id">
          <td v-for="data in datas" :key="data.id">
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- //global_table -->
  </main>
  <!-- //global -->
</template>

<script>
import axios from 'axios';
import bus from '@/utils/bus';

export default {
  data() {
    return {
      global: [],
    };
  },

  async created() {
    try {
      bus.$emit('start:spinner');

      const api = 'http://slb-3774813.ncloudslb.com';
      const { data } = await axios.get(`${api}/naeulcheck`);
      this.global = data;

      setTimeout(() => {
        bus.$emit('end:spinner');
      }, 300);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style src="@/assets/scss/global.scss" lang="scss" scoped></style>
