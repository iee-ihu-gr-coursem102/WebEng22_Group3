<template>
  <div>
    <h1>Αναζήτηση Σχολών και Τμημάτων</h1>
    <hr class="rounded">
  </div>  

  <div> <h3> Σχολές Πανεπιστημίων της Ελλάδος </h3> </div>
  <input type="text" v-model="searchText2" placeholder="Αναζήτηση με όνομα" />
  <div class="content-table-container">
      <table class="content-table">
        <thead>
        <tr>
          <td>Αγαπημένα</td>
          <th>Code</th>
          <th>Σχολή</th>
          <th>Ιστοσελίδα</th>
          <th>Τηλέφωνο</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in filteredDepartments" :key="dep.id">
          <label>
                <input type="checkbox"  :checked="this.favorites.includes(+dep.code)"  @click="(event)=>updateFavorites(event,dep.code)"/>
                <span class="star"></span>
          </label>
          <td>{{dep.code}}</td>
          <td>{{dep.name}}</td>
          <td>{{dep.websiteURL}}</td>
          <td>{{dep.phone}}</td>
          <td>{{dep.email}}</td>
        </tr>
      </tbody>
      </table>
    </div>

    <div> <h3> Βάσεις ανά τμήμα και έτος </h3> </div>
    <div>
      <input type="text" v-model="searchText3" placeholder="Αναζήτηση ανά έτος" />
      <button @click="search()" :style="{ marginBottom:'30px'}">Search</button>
      
      <input type="text" v-model="searchText4" placeholder="Αναζήτηση ανά τμήμα" />
      <button @click="search()">Search</button>
    </div>
      <div class="content-table-container">
        <table class="content-table">
          <thead>
          <tr>
            <th>Έτος</th>
            <th>uniTitle</th>
            <th>deptName</th>
            <th>baseFirst</th>
            <th>baseLast</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.year}}</td>
            <td>{{user.uniTitle}}</td>
            <td>{{user.deptName}}</td>
            <td>{{user.baseFirst}}</td>
            <td>{{user.baseLast}}</td>
          </tr>
        </tbody>
        </table>
      </div>  

</template>

<script>
import axios from 'axios'

export default {
//name: 'UsersTable',
data () {
  return {
    users: [],
    departments:[],
    favorites: [],
    searchText2: '',
    searchText3: '',
    searchText4: ''
  }
},
created() {

  let user= localStorage.getItem('User-Info');
        let token= JSON.parse(localStorage.getItem('User-Token'));
        if(user)
        {
          axios
          .get("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/favorites",{headers: {'x-token': token}})
          .then(response => {console.log('favorites: ', response);response.data.forEach(el=>this.favorites.push(el.uni_id))});
          }
    
   
  axios
    .get('https://vaseis.iee.ihu.gr/api/index.php/departments')
    .then(response => {console.log(response);(this.departments = response.data)});

    // let newDept=this.departments.map(dept=>{
    //   if (this.favorites.includes(dept.code)){
    //     dept.isChecked=true
    //   }
    //   else {
    //     dept.isChecked=false
    //   }
    // })
    // console.log("newDept:", newDept)
    // this.departments=newDept
    
},
computed: {
  filteredDepartments() {
    return this.departments.filter(dep => {
      return dep.name.toLowerCase().includes(this.searchText2.toLowerCase());
      
    });
  },
},
  methods:{
    search(){
      axios
      .get(`https://vaseis.iee.ihu.gr/api/index.php/bases/search/?base=20000&department=${this.searchText4}&year=${this.searchText3}&details=full&type=gel-ime-gen`)
      .then(response => {console.log(response.data.records);(this.users = response.data.records)});
    },
    updateFavorites(event,uni_id){
      console.log("code: ", uni_id)
      console.log("event: ", event)
      console.log("event target: ", event.target.checked)
      let token= JSON.parse(localStorage.getItem('User-Token'));
      
      if (event.target.checked){
        axios
          .post("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/favorites",{uni_id: uni_id},{headers: {'x-token': token}})
          .then(response => {console.log('favorites: ', response)});
          }

        if (!event.target.checked){
          axios.delete("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/favorites",{headers: {'x-token': token},data:{uni_id: uni_id}}).then(response => {console.log('favorites: ', response)});
          }
        
      },

      isFav(uni_id){

        console.log("in is fav:", uni_id)
        return this.favorites.includes(uni_id);
        

      }
    
  },
  mounted(){
        let user= localStorage.getItem('User-Info');
        let token= JSON.parse(localStorage.getItem('User-Token'));
        if(user)
        {
          axios
          .get("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/favorites",{headers: {'x-token': token}})
          .then(response => {console.log('favorites: ', response)});
          }
    }
}
</script>

<style>
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + span.star:before {
  content: "\2606";
  font-size:20px;
  color: grey;
}

input[type="checkbox"]:checked + span.star:before {
  content: "\2605";
  color: yellow;
}

</style>