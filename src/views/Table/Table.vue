<template>
  <div class="container py-4 px-0">
    <div class="profile_section">
      <div class="avatar">
        <img
          :src="Organisation.avatar_url"
          alt="Avatar"
          width="100"
        >
      </div>

      <div class="information">
        <h2 class="my-0">
          <a :href="'https://github.com/'+Organisation.login">{{ Organisation.name }}</a>
        </h2>
        <span
          class="mb-1"
        >
          {{ Organisation.bio }}
        </span>
        <ul>
          <li>
            <img
              src="../../assets/location.svg"
              alt="Location"
              width="16"
            >
            {{ Organisation.location }}
          </li>
          <li>
            <img
              src="../../assets/link.svg"
              alt="Location"
              width="16"
            >
            <a
              :href="Organisation.blog"
              target="_blank"
            >{{ Organisation.blog }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container search_bar">
    <div class="d-flex">
      <div
        class="input-group"
      >
        <input
          v-model="fInput"
          class="form-control"
          :placeholder="$t('filter')"
          @keypress.esc="filter=''"
          @keypress.enter="filter=fInput"
        >
        <button
          class="btn btn-success"
          @click="filter=fInput"
        >
          {{ $t('filter_btn') }}
        </button>
      </div>
      <button
        v-if="fInput"
        class="btn btn-warning ms-2"
        @click="fInput='',filter=''"
      >
        {{ $t('clr_btn') }}
      </button>
    </div>
    <div class="paginate">
      <pagination
        :max="Organisation.public_repos"
        :per-page="30"
        @onChange="fetchPage"
      /> 
    </div>
  </div>

  <div
    class="w-100"
  >
    <super-table
      :data="Repositories"
      :filter="filter"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SuperTable from '../../components/SuperTable/SuperTable.vue'
import Pagination from '../../components/Pagination/Pagination.vue'
import axios from 'axios'
export default {
    name:'Table',
    components:{
        SuperTable,
        Pagination,
    },
    data(){
        return{
            activeTab:1,
            filter:'',
            fInput:'',
        }
    },
    computed:{
        ...mapGetters(['Repositories','Organisation']),
    },
    mounted(){
        if(!this.Organisation.login){
            this.$router.push('/')
        }
    },
    methods:{
        fetchPage(number){
            axios
                .get('https://api.github.com/users/' + this.Organisation.login+'/repos',{
                    params:{
                        page:number,
                    },
                })
                .then((res) => {
                    if (res.data){
                        this.$store.commit('setRepositories',res.data)
                    }
                })
            console.log(number)
        },
    },
}
</script>

<style lang='scss'>
@import 'table.scss';
</style>