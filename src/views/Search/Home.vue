<template>
  <div class="logo my-5">
    <img
      src="../../assets/octat.svg"
      alt="GitHub logo"
    >
  </div>
  
  <div class="container">
    <div
      v-if="invalid"
      class="validate_msg"
    >
      <span>Invalid organisation name</span>
    </div>
    <div class="search">
      <input
        v-model="orgName"
        class="form-control w-50"
        :class="{'invalidate':invalid===true}"
        :placeholder="$t('placeholder')"
        @keypress.enter="fetchOrgs"
        @keydown="invalid=false"
      >
      <button
        class="btn btn-primary ms-2"
        @click="fetchOrgs"
      >
        {{ $t('search') }}
      </button>
    </div>
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
            invalid:false,
        }
    },
    computed:{
        ...mapGetters(['getRepositories','getOrganisation']),
    },
    methods: {
        fetchOrgs() {
            if (this.orgName) {
                axios
                    .get('https://api.github.com/users/' + this.orgName)
                    .then((res) => {
                        if (res.data){
                            this.$store.commit('setOrganisation',res.data)
                            this.fetchRepositories()
                        }
                    }).catch(()=>{
                        this.invalid=true
                    });
            }
        },
        fetchRepositories(){
            axios
                .get('https://api.github.com/users/' + this.orgName+'/repos')
                .then((res) => {
                    if (res.data){
                        this.$store.commit('setRepositories',res.data)
                        this.$router.push('/table')
                    }
                })
        },
    },
};
</script>
<style lang="scss">
@import "style.scss";
</style>
