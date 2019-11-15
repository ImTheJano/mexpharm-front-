<template>
  <div id="app">
    <navbar class=""/>
    <div class="container mt-5 pt-5">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import Vuex from 'vuex'
  import navbar from './components/NavBar'
  export default {
    components:{navbar},
    methods: {
      ...Vuex.mapActions(['loadSettings','testBackEnd'])
    },
    mounted() {
      this.loadSettings()
      this.testBackEnd()
    },
  }
</script>