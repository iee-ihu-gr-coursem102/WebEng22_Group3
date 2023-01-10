<template>
  <div>
    <h1>Αναζήτηση Σχολών και Τμημάτων</h1>
    <hr class="rounded">
    <div> <h3> Τμήμα </h3> </div>
    <div class="content-table-container">
      <table class="content-table">
        <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.code}}</td>
          <td>{{user.deptName}}</td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>

  <div> <h3> Σχολές Πανεπιστημίων της Ελλάδος </h3> </div>
  <div class="content-table-container">
    <input type="text" v-model="searchText2" placeholder="Search by name" />
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
                <input type="checkbox" v-model="dep.isFavorite" @change="updateFavorites"/>
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
    users: [],
    departments: [],
    searchText2: '',
  }
},
created() {
  axios
    .get('https://vaseis.iee.ihu.gr/api/index.php/v1.0/bases/department/1625?type=gel-ime-gen')
    .then(response => {console.log(response);(this.users = response.data)});
    axios
    .get('https://vaseis.iee.ihu.gr/api/index.php/departments')
    .then(response => {console.log(response);(this.departments = response.data)});
    
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