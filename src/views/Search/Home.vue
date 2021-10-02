<template>
  <div class="logo my-5">
    <img
      src="../../assets/logo-github.svg"
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
export default {
    name: 'Home',
    data() {
        '';
    },
    methods: {
        fetchOrgs() {
            axios
                .get('https://api.github.com/users/' + this.orgsName + '/repos')
                .then((res) => {
                    console.log(res);
                });
        },
    },
};
</script>
<style type="scss">
@import "style.scss";
</style>
