<template>
  <div class="container">
    <div class="profile_section">
      <div>
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
  </div>

  <div class="container tabs">
    <span
      :class="{'active_tab':activeTab===1}"
      @click="activeTab=1"
    >{{ $t('tab1') }}</span>
    <span
      :class="{'active_tab':activeTab===2}"
      @click="activeTab=2"
    >{{ $t('tab2') }}</span>
    <div class="paginate">
      <pagination
        :max="Organisation.public_repos"
        :per-page="30"
        @onChange="fetchPage"
      /> 
    </div>
  </div>

  <div
    v-if="activeTab===1"
    class="result_table"
  >
    <super-table :data="Repositories" />
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
@import 'style.scss';
</style>