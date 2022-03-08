<template>
  <div>
    <comp-header/>
    <router-view/>
  </div>
</template>


<script>
  import compHeader from './components/Header/Header.vue';

  export default {
    components:{
      compHeader
    },
    created(){
      this.$store.dispatch('refreshToken');//when we sign in and refresh the page it will ended up and we have
      //to sign in again
    }
  }
</script>


<style>
  @import './assets/style.css';

</style>