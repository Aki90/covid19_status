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
  display: block;
  font-weight: 600;
  margin-bottom: 1rem;
}

.table {
  th {
    padding: 1rem;
    text-shadow: 0px 1px #ffffff, 1px 1px 0px #dad7d7;
  }
  td {
    padding: 1rem;
  }

  .certified {
    color: #de481f;
  }
  .td_certified {
    background-color: #de481f;
    color: #fff;
  }

  .deisolated {
    color: #2b81c8;
  }
  .td_deisolated {
    background-color: #2b81c8;
    color: #fff;
  }

  .isolated {
    color: #f59d35;
  }
  .td_isolated {
    background-color: #f59d35;
    color: #fff;
  }

  .dead {
    color: #464646;
  }
  .td_dead {
    background-color: #464646;
    color: #fff;
  }

  .increased_foreign {
    color: #4550c0;
  }
  .td_increased_foreign {
    background-color: #4550c0;
    color: #fff;
  }

  .increased_local {
    color: #c73c16;
  }
  .td_increased_local {
    background-color: #c73c16;
    color: #fff;
  }
}

h3 {
  margin-top: 2rem;
  &::after {
    content: '';
    display: block;
    width: 9rem;
    height: 2px;
    margin: 0.5rem auto;
    background: #414141;
  }
}
.locale {
  margin: 0 auto;

  .localname {
    display: block;
    font-weight: 600;
    margin-top: 1rem;
  }

  .multiselect {
    display: inline-block;
    width: 30%;
  }
  .button {
    width: 10%;
    margin-left: 1rem;
    padding: 0.5rem 0;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 0.5rem;
    cursor: pointer;
    &[disabled] {
      cursor: not-allowed;
    }

    &:hover {
      background-color: #41b883;
      color: #fff;
    }
  }
}
</style>
