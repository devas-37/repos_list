<template>
  <div class="logo my-5">
    <img
      src="../../assets/octat.svg"
      alt="GitHub logo"
    >
  </div>
  
 
  <div
    class="input-group w-25"
  >
    <input
      v-model="orgName"
      class="form-control"
      :class="{'invalidate':invalid===true}"
      :placeholder="$t('placeholder')"
      @keypress.enter="fetchOrgs"
      @keydown="invalid=false"
    >
    <button
      class="btn btn-outline-primary"
      type="button"
    >
      {{ $t('search') }}
    </button>
  </div>
</template>

<script>
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
