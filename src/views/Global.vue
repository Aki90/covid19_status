<template>
  <main v-show="synthesize.timestamp">
    <h2>해외 발생 현황</h2>
    <span class="times">
      [ {{ synthesize.announced_timestamp | formatDate }} 기준 ]
    </span>
    <table class="table">
      <thead>
        <tr>
          <th class="certified">확진환자</th>
          <th class="dead">사망자</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td_certified">
            {{ synthesize.certified | makeComma }} 명
          </td>
          <td class="td_dead">{{ synthesize.dead | makeComma }} 명</td>
        </tr>
      </tbody>
    </table>

    <h3>나라별 발생 현황</h3>
    <!-- location -->
    <div class="nation">
      <form @submit.prevent="submitNation(value)">
        <multiselect
          v-model="value"
          deselect-label="Can't remove this value"
          track-by="name"
          label="name"
          placeholder="나라명"
          :options="options"
          :allow-empty="false"
        >
          <template slot="singleLabel" slot-scope="{ option }">
            <strong>{{ option.name }}</strong>
          </template>
        </multiselect>
        <button class="button" type="submit" :disabled="!value.nation">
          검색
        </button>
      </form>
      <span class="nationname" v-show="nation.name">
        - {{ nation.name }} 현황 -
      </span>
      <table class="table" v-show="nation.timestamp">
        <thead>
          <tr>
            <th class="certified">확진환자</th>
            <th class="dead">사망자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="td_certified">{{ nation.certified | makeComma }} 명</td>
            <td class="td_dead">{{ nation.dead | makeComma }} 명</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- //nation -->
  </main>
</template>

<script>
import { fetchGlobalData } from '@/api';
import bus from '@/utils/bus';
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: { name: '나라명', nation: '' },
      nation: [],
    };
  },
  computed: mapState({
    synthesize: state => state.nationSynthesize,
    options: state => state.nationOptions,
  }),
  methods: {
    async submitNation(value) {
      // 나라명 검색 차단
      if (value.nation === '') {
        return false;
      }

      // API nation 데이터 받아오기
      try {
        bus.$emit('start:spinner');
        const responseData = await this.$store.dispatch(
          'fetchGlobalNation',
          this.value.nation,
        );
        this.nation = responseData;
        // nation 데이터에 나라이름 추가
        this.nation.name = value.name;
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
      await this.$store.dispatch('fetchGlobalSynthesize');
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
}

.table {
  th {
    width: 50%;
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

  .dead {
    color: #464646;
  }
  .td_dead {
    background-color: #464646;
    color: #fff;
  }
}

h3 {
  margin: 2rem 0 1rem;
  &::after {
    content: '';
    display: block;
    width: 9rem;
    height: 2px;
    margin: 0.5rem auto;
    background: #414141;
  }
}
.nation {
  margin: 0 auto;

  .nationname {
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
