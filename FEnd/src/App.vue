<template>
  <nav v-if="loggedIn">
    <router-link to="/home">Αρχική</router-link> |
    <router-link to="/info">Πληροφορίες</router-link> |
    <router-link to="/statistics">Στατιστικά</router-link> |
    <router-link to="/about">Αναζήτηση</router-link> | 
    <router-link to="/qualify">Που περνάω</router-link> |
    <router-link to="/favorites">Αγαπημένα</router-link> |
    <a v-on:click="logout" :style="{ color: 'white', fontSize: '12px'}"> Logout </a>
  </nav>
  <nav v-else>
    <router-link to="/home">Αρχική</router-link> | 
    <router-link to="/info">Πληροφορίες</router-link> |
    <router-link to="/statistics">Στατιστικά</router-link> |
    <router-link to="/login" :style="{ color: 'white', fontSize: '12px'}">Login</router-link> -
    <router-link to="/" :style="{ color: 'white', fontSize: '12px'}">SignUp</router-link> 
  
    
  </nav>
  <router-view/>
  <PageUp />
  
</template>

<script>
import PageUp from './components/PageUp.vue'

export default {
  name: 'App',
  components: {
    PageUp
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.isLoggedIn = localStorage.length>0;
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.go('/home')
      //this.$router.push({name:'home'})
      location.reload();
    },
    login2() {
      this.isLoggedIn = true;
      
    },
    logout2() {
      this.isLoggedIn = false;
      this.$router.push({name:'home'})
      
    },
  },
  computed: {
    loggedIn() {
      return this.isLoggedIn;
    },
  },
  mounted(){
        let user= localStorage.getItem('User-Info');
        if(!user)
        {
            this.$router.push({name:"home"}) 
        }
        // if(user)
        // {
        //   this.isLoggedIn = true;
        // }
    }
  
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
    padding: 30px;
    background-color: #009879;
  
  }
  
nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
nav a.router-link-exact-active {
    color: white;
  }

</style>
