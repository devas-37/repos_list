<template>
  <div class="header">
    <div>
      <img
        src="../../assets/logo_white.svg"
        alt="Github"
        width="32"
      >
      <h4>
        <router-link
          class="home"
          to="/"
        >
          {{ $t("title") }}
        </router-link>
      </h4>
    </div>
 
    <div class="language">
      <span
        @click.stop="showContext=!showContext"
        @mouseenter="showContext=true"
      >{{ lang }}</span>
      <ul
        :class="{'showContext':showContext}"
      >
        <li @click="$emit('onChange','RUS')">
          <img
            src="../../assets/flags/RUS.svg"
            alt="Russian"
            width="20"
          > RUS
        </li>
        <li @click="$emit('onChange','UZB')">
          <img
            src="../../assets/flags/UZB.svg"
            alt="Russian"
            width="20"
          > UZB
        </li>
        <li @click="$emit('onChange','ENG')">
          <img
            src="../../assets/flags/ENG.svg"
            alt="Russian"
            width="20"
          > ENG
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    name:'Header',
    props:{
        lang:{
            type:String,
            default:'ENG',
        },
    },
    emits:['onChange'],
    data(){
        return{
            showContext:false,
        }
    },
    mounted(){
        document.addEventListener('click',()=>{
            this.showContext=false
        })
    },
}
</script>

<style scoped lang="scss">
@import 'header.scss'
</style>