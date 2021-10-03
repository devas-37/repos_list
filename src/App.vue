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
import Header from './components/Header/Header.vue'
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
    mounted(){

        this.$i18n.locale=localStorage.getItem('language')||'ru'
    },
    methods:{
        changeLanguage(lang){
            this.lang=lang
            let l={
                RUS:'ru',
                ENG:'en',
                UZB:'uz',
            }
            this.$i18n.locale=l[lang]
            localStorage.setItem('language',l[lang])
        },
    },
}
</script>
<style lang="scss">
@import "app.scss"
</style>
