<template>
  <main id="main" class="text-center">
    <!-- current -->
    <div class="current">
      <h2>{{ current.current }}</h2>
      <!-- current_table -->
      <table class="current_table table table-hover table-striped">
        <thead>
          <tr>
            <th v-for="title in current.colume" :key="title.id">
              <span>{{ title }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="current_datas"
            v-for="datas in current.data"
            :key="datas.id"
          >
            <td class="current_data" v-for="data in datas" :key="data.id">
              {{ data }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- current_table -->
    </div>
    <!-- //current -->

    <br />

    <!-- local -->
    <div class="local">
      <h2>지역별 발생현황 ({{ local.current }} )</h2>
      <!-- local_table -->
      <table class="local_table table table-hover table-striped">
        <thead>
          <tr>
            <th v-for="title in local.colume" :key="title.id">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="parsing in local.data" :key="parsing.id">
            <td class="area" v-for="(info, index) in parsing" :key="info.id">
              {{ index }}
            </td>
            <td
              class="additional_patients"
              v-for="info in parsing"
              :key="info.id"
            >
              + {{ info[0] }}
            </td>
            <td class="patients" v-for="info in parsing" :key="info.id">
              {{ info[1] }}
            </td>
            <td v-for="info in parsing" :key="info.id">{{ info[2] }}</td>
            <td v-for="info in parsing" :key="info.id">{{ info[3] }}</td>
            <td v-for="info in parsing" :key="info.id">{{ info[4] }} %</td>
          </tr>
        </tbody>
      </table>
      <!-- //local_table -->
    </div>
    <!-- //local -->
  </main>
</template>

<script>
import axios from 'axios';
import bus from '@/utils/bus';

export default {
  data() {
    return {
      current: [],
      local: [],
    };
  },
  async created() {
    bus.$emit('start:spinner');
    try {
      const api = 'http://slb-3774813.ncloudslb.com/';
      // current
      const { data } = await axios.get(api);
      this.current = data;

      // local
      const res = await axios.get(`${api}/jieuccheck`);
      this.local = res.data;

      setTimeout(() => {
        bus.$emit('end:spinner');
      }, 300);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style src="@/assets/scss/main.scss" lang="scss" scoped></style>
