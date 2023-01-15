<template>
<h1>Στατιστικά</h1>
<hr class="rounded">

  <div> <h3> Στατιστικά ανά έτος </h3> </div>
  <div>
    <input type="text" v-model="searchText2" placeholder="Γράψε το έτος" />
    <button @click="search()" :style="{ marginBottom:'30px'}">Search</button>
  </div>

  <div class="content-table-container2">
    
    <table class="content-table">
      <thead>
      <tr>
        <th>Έτος</th>
        <th>Κωδικός</th>
        <th>Τύπος Εξετάσεων</th>
        <th>Σειρά προτίμησης</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="stat in stats" :key="stat.id">
        <td>{{stat.year}}</td>
        <td>{{stat.code}}</td>
        <td>{{stat.examType}}</td>
        <td>{{stat.preference}}</td>
      </tr>
    </tbody>
    </table>
  </div>

    <div>
      <hr class="rounded">
      <div> <h3> Ειδικές Κατηγορίες </h3> </div>
      <div class="content-table-container2">
        <table class="content-table">
          <thead>
          <tr>
            <th>Κωδικός</th>
            <th>Τίτλος</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.code}}</td>
            <td>{{user.title}}</td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>

    <div>
      <hr class="rounded">
      <div> <h3> Τύποι εξετάσεων </h3> </div>
      <div class="content-table-container2">
        <table class="content-table">
          <thead>
          <tr>
            <th>Τίτλος</th>
            <th>Περιγραφή</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="extype in extypes" :key="extype.id">
            <td>{{extype.title}}</td>
            <td>{{extype.description}}</td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
    <hr class="rounded">

  </template>

<script>
import axios from 'axios'

export default {
  name: 'UsersTable',
  data () {
    return {
      users: [],
      extypes:[],
      searchText2: '',
      stats:[]
    }
  },
  mounted() {
    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/specialcategories')
      .then(response => {console.log(response);(this.users = response.data)})
      axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/specialcategories')
      .then(response => {console.log(response);(this.extypes = response.data)})
      
  },
  methods:{
    search(){
      axios
      .get(`https://vaseis.iee.ihu.gr/api/index.php/statistics/${this.searchText2}`)
      .then(response => {console.log(response.data[0]);(this.stats = response.data[0])});
    }
  }
}

</script>
