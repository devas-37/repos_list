<template>
  <div class="content">
    <Header
      :lang="lang"
      @onChange="changeLanguage"
    />
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header.vue'
export default {
    components:{
        Header,
    },
    data(){
        return{
            lang:'RUS',
        }
    },
    computed:{
        getImgUrl(lang) {
            var images = require.context('./assets/flags/', false, /\.svg$/)
            return images('./' + lang + '.svg')
        },
    },
    methods:{
        changeLanguage(lang){
            this.lang=lang
        },
    },
}
</script>
<style lang="scss">
@import "app.scss"
</style>
