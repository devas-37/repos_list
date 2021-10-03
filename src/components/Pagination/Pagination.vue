<template>
  <div
    v-if="showing"
    class="pagination"
  >
    <div>
      <span
        class="prev"
        @click="prevPage"
      >
        «
      </span>
      <span
        v-for="(number) in Numbers"
        :key="number"
        class="numbers"
        :class="{'active_page':activePage===number}"
        @click="onChange(number)"
      >
        <span> {{ number }}</span>
      </span> 
      <span
        class="next"
        @click="nextPage"
      >
        »
      </span>
    </div>
  </div>
</template>
<script>
export default {
    name:'Pagination',
    props:{
        max:{
            type:Number,
            default:()=>0,
        },
        perPage:{
            type:Number,
            default:()=>30,
        },
    },
    emits:['onChange'],
    data(){
        return{
            activePage:1,
            showing:true,
        }
    },
    computed:{
        Numbers(){
            return [...Array(Math.round(this.max/this.perPage)).keys()].map(i=>{
                return i+1
            })
        },
    },
    mounted(){
        if (this.max<this.perPage)
            this.showing=false
    },
    methods:{
        prevPage(){
            if (this.activePage!==1){
                this.$emit('onChange',--this.activePage)
            } 
        },
        nextPage(){
            if (this.activePage<Math.round(this.max/this.perPage)){
                this.$emit('onChange',++this.activePage)
            }
        },
        onChange(number){
            this.activePage=number
            this.$emit('onChange',number)
        },
    },
}
</script>
<style scoped lang='scss'>
@import 'pagination.scss';
</style>