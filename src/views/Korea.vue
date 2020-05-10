<template>
  <main v-show="synthesize.timestamp">
    <h2>국내 발생 현황</h2>
    <span class="times">
      [ {{ synthesize.announced_timestamp | formatDate }} 기준 ]
    </span>
    <table class="table">
      <thead>
        <tr>
          <th class="certified">확진환자</th>
          <th class="deisolated">격리해제</th>
          <th class="isolated">격리중</th>
          <th class="dead">사망자</th>
          <th class="increased_foreign">해외유입</th>
          <th class="increased_local">지역감염</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td_certified">
            {{ synthesize.certified | makeComma }} 명 ( +{{
              synthesize.increased
            }}
            )
          </td>
          <td class="td_deisolated">
            {{ synthesize.deisolated | makeComma }} 명
          </td>
          <td class="td_isolated">{{ synthesize.isolated | makeComma }} 명</td>
          <td class="td_dead">{{ synthesize.dead | makeComma }} 명</td>
          <td class="td_increased_foreign">
            {{ synthesize.increased_foreign | makeComma }} 명
          </td>
          <td class="td_increased_local">
            {{ synthesize.increased_local | makeComma }} 명
          </td>
        </tr>
      </tbody>
    </table>

    <h3>도시별 발생 현황</h3>
    <!-- locale -->
    <div class="locale">
      <form @submit.prevent="submitLocale(value)">
        <multiselect
          v-model="value"
          deselect-label="Can't remove this value"
          track-by="name"
          label="name"
          placeholder="도시명"
          :options="options"
          :allow-empty="false"
        >
          <template slot="singleLabel" slot-scope="{ option }">
            <strong>{{ option.name }}</strong>
          </template>
        </multiselect>
        <button class="button" type="submit" :disabled="!value.locale">
          검색
        </button>
      </form>

      <span class="localname" v-show="locale.name">
        - {{ locale.name }} 시(도) 현황 -
      </span>
      <table class="table" v-show="locale.timestamp">
        <thead>
          <tr>
            <th class="certified">확진환자</th>
            <th class="deisolated">격리해제</th>
            <th class="isolated">격리중</th>
            <th class="dead">사망자</th>
            <th class="increased_foreign">해외유입</th>
            <th class="increased_local">지역감염</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="td_certified">
              {{ locale.certified | makeComma }} 명 ( +{{ locale.increased }} )
            </td>
            <td class="td_deisolated">
              {{ locale.deisolated | makeComma }} 명
            </td>
            <td class="td_isolated">{{ locale.isolated | makeComma }} 명</td>
            <td class="td_dead">{{ locale.dead | makeComma }} 명</td>
            <td class="td_increased_foreign">
              {{ locale.increased_foreign | makeComma }} 명
            </td>
            <td class="td_increased_local">
              {{ locale.increased_local | makeComma }} 명
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- // locale -->
  </main>
</template>

<script>
import { fetchKoreaData } from '@/api';
import bus from '@/utils/bus';
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: { name: '도시명', locale: '' },
      locale: [],
    };
  },
  computed: mapState({
    synthesize: state => state.localeSynthesize,
    options: state => state.localeOptions,
  }),
  methods: {
    async submitLocale(value) {
      // 도시명 검색 차단
      if (value.locale === '') {
        return false;
      }

      // API locale 데이터 받아오기
      try {
        bus.$emit('start:spinner');
        const responseData = await this.$store.dispatch(
          'fetchKoreaLocale',
          this.value.locale,
        );
        this.locale = responseData;
        // locale 데이터에 지역이름 추가
        this.locale.name = value.name;
        setTimeout(() => {
          bus.$emit('end:spinner');
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      bus.$emit('start:spinner');
      // synthesize 데이터 받아오기
      await this.$store.dispatch('fetchKoreaSynthesize', this.value.locale);
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
@import '@/assets/scss/Korea.scss';
</style>
