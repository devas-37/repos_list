<template>
  <div class="logo my-5">
    <img
      src="../../assets/octat.svg"
      alt="GitHub logo"
    >
  </div>
  <div class="search">
    <input
      v-model="orgsName"
      class="form-control w-50 d-inline-block"
      placeholder="Type organisation name"
      @keypress.enter="fetchOrgs"
    >
    <button
      class="btn btn-primary ms-2"
      @click="fetchOrgs"
    >
      Search
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    data() {
        return{
            orgName:'',
        }
    },
    computed:{
        ...mapGetters(['getRepositories','getOrganisation']),
    },
    methods: {
        fetchOrgs() {
            if (this.orgsName) {
                axios
                    .get('https://api.github.com/users/' + this.orgsName)
                    .then((res) => {
                        if (res.data){
                            this.$store.commit('setOrganisation',res.data)
                            this.fetchRepositories()
                        }
                    }).catch((res)=>{
                        console.log(res)
                    });
            }
        },
        fetchRepositories(){
            axios
                .get('https://api.github.com/users/' + this.orgsName+'/repos')
                .then((res) => {
                    if (res.data){
                        console.log()
                        this.$router.push('/table')
                    }
                })
        },
    },
};
</script>
<style type="scss">
@import "style.scss";
</style>
