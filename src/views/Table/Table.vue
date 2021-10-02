<template>
  <div class="result">
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
      <div class="tabs">
        <span
          :class="{'active_tab':activeTab===1}"
          @click="activeTab=1"
        >Table</span>
        <span
          :class="{'active_tab':activeTab===2}"
          @click="activeTab=2"
        >Card</span>
      </div>
    </div>
    

    <!--  -->
  </div>
  <div
    v-if="activeTab===1"
    class="result_table"
  >
    <div class="repos_table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(repository, index) in Repositories"
            :key="index"
          >
            <td>
              <a
                :href="'https://github.com/'+Organisation.login+'/'+repository.name"
                target="_blank"
              >{{ repository.name }}</a> 
            </td>
            <td>{{ repository.description }}</td>
            <td>{{ repository.language }}</td>
            <td class="stars">
              <img
                src="../../assets/star.svg"
                alt="Star"
                width="20"
              ><span>{{ repository.stargazers_count }}</span>
            </td>
          </tr>
          <tbody />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    name:'Table',
    data(){
        return{
            activeTab:1,
        }
    },
    computed:{
        ...mapGetters(['Repositories','Organisation']),
    },
    mounted(){
        axios
            .get('https://api.github.com/users/facebook/repos',{
                params:{
                    per_page:30,
                    page:1,
                },
            })
            .then((res) => {
                this.$store.commit('setRepositories',res.data)
             
            });
        if(!this.Organisation.login){
            this.$router.push('/')
        }
    },
    methods:{

    },
}
</script>

<style lang='scss'>
@import 'style.scss';
</style>