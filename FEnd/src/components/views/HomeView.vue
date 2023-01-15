<template>
  <div class="Home">
    <h1>Καλώς ήρθατε στο Vaseis App</h1>
  </div>

  <div class="box">  </div>

  <div class="carousel-container"> <CarouselTwo /> </div>  

  <div class="box">  </div>
  <hr class="rounded">
  

  <div class="front-box"> 
      <h2 :style="{ color: '#009879', paddingLeft:'10px', textAlign:'left', paddingTop:'10px', marginLeft:'10%'}"> Kατέκτησε το μέλλον σου με αυτοπεποίθηση.. </h2> 
      <h3 :style="{ color: '#009879', paddingLeft:'10px', textAlign:'left', paddingTop:'10px', marginLeft:'10%', marginRight:'50%'}">
        <img src="../../assets/check.png" alt="graduation-students" width="30px" height="30px">Βρες έξυπνες πληροφορίες για να ξεκινήσεις δυναμικά την καριέρα που σου ταιριάζει. <br><br>
        <img src="../../assets/check.png" alt="graduation-students" width="30px" height="30px">Δες τις βάσεις για τη σχολή που σε ενδιαφέρει και πώς μεταβάλλονται τα τελευταία χρόνια.</h3>
  </div>


  <div > 
    <img src="../../assets/graduation-students.jpg" alt="graduation-students" width="70%" height="auto">
  </div>

  <hr class="rounded">
  <div> <h3> Σχολές Πανεπιστημίων της Ελλάδος </h3> </div>
  <input type="text" v-model="searchText2" placeholder="Search by name" />
  <div class="content-table-container">
    
      <table class="content-table">
        <thead>
        <tr>
          <th>Κωδικός</th>
          <th>Σχολή</th>
          <th>Ιστοσελίδα</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in filteredDepartments" :key="dep.id">
          <td>{{dep.code}}</td>
          <td>{{dep.name}}</td>
          <td>{{dep.websiteURL}}</td>
        </tr>
      </tbody>
      </table>
    </div>

    <div class="box">  </div>

    <div class="footer-box"> 
      <h1 :style="{ color: 'white', paddingLeft:'30px', textAlign:'left', paddingTop:'30px'}"> e-Vaseis </h1>
    </div>
    


</template>

<script>
import CarouselTwo from './CarouselTwo.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    CarouselTwo
  },
  data () {
  return {
    departments: [],
    searchText2: '',
    depts: [],
    selectedUser: null
  }
},
created() {
  axios
    .get('https://vaseis.iee.ihu.gr/api/index.php/v1.0/bases/department/1625?type=gel-ime-gen')
    .then(response => {console.log(response);(this.users = response.data)});
    axios
    .get('https://vaseis.iee.ihu.gr/api/index.php/departments')
    .then(response => {console.log(response);(this.departments = response.data)});
    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/universities')
      .then(response => (this.depts = response.data.records))
},
computed: {
  filteredDepartments() {
    return this.departments.filter(dep => {
      return dep.name.toLowerCase().includes(this.searchText2.toLowerCase());
    });
  },
}
}

</script>

