<template>
  <div class="container-sm">
    <table>
      <thead>
        <tr>
          <th>
            {{ $t('t1') }}
          </th>
          <th>
            {{ $t('t2') }}
          </th>
          <th>
            {{ $t('t3') }}
          </th>
          <th>
            {{ $t('t4') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(repository, index) in Repos"
          :key="index"
        >
          <td class="repos_name">
            <a
              :href="'https://github.com/'+Organisation.login+'/'+repository.name"
              target="_blank"
            >{{ repository.name }}</a> 
          </td>
          <td
            class="description" 
          >
            <span>{{ repository.description }}</span>
          </td>
          <td class="lang">
            {{ repository.language }}
          </td>
          <td>
            <span class="stars">
              <img
                src="../../assets/star.svg"
                alt="Star"
                width="20"
              ><span>{{ repository.stargazers_count }}</span>
            </span>
          </td>
        </tr>
        <tbody />
      </tbody>
    </table>
    <div class="card-container">
      <div
        v-for="(repository, index) in Repos"
        :key="index"
        class="card"
      >
        <div class="d-flex justify-content-between">
          <a
            :href="'https://github.com/'+Organisation.login+'/'+repository.name"
            target="_blank"
          >{{ repository.name }}</a> 
          <span class="badge">Public</span>
        </div>
        <div class="description fs-6">
          <span>{{ repository.description }}</span>
        </div>
        <div class="info">
          <span class="stars">
            <img
              src="../../assets/star.svg"
              alt="Star"
              width="20"
            ><span>{{ repository.stargazers_count }}</span>
          </span>

          <span> {{ repository.language }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'SuperTable',
    props: {
        data:{
            type:Array,
            default:()=>[],
        },
        filter:{
            type:String,
            default:()=>'',
        },
    },
    computed:{
        ...mapGetters(['Organisation']),
        Repos(){
            return this.filter?this.data.filter(e=>{
                return e.name.toLowerCase().includes(this.filter.toLowerCase())
            }):this.data
        },
        
    },
};
</script>

<style lang="scss" scoped >
@import 'supertable.scss'
</style>
