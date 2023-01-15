<template>
    <h1> Αγαπημένα </h1>
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
</template>

<script>
import axios from 'axios'

export default {
//name: 'UsersTable',
data () {
  return {
    departments:[],
    favorites:[],
    searchText2: '',
    
  }
},
created() {

  let user= localStorage.getItem('User-Info');
        let token= JSON.parse(localStorage.getItem('User-Token'));
        if(user)
        {
          axios
          .get("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/favorites",{headers: {'x-token': token}})
          .then(response => {console.log('favorites: ', response);response.data.forEach(el=>this.favorites.push(el.uni_id))
          
          
    axios
    .get('https://vaseis.iee.ihu.gr/api/index.php/departments')
    .then(response => {console.log(response);response.data.forEach(el=>{
        
        if(this.favorites.includes(el.code)){
            this.departments.push(el)
        }
        
        })});
        });
          }
    
        
  

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
