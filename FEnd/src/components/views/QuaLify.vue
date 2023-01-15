<template>
  <div class="Qualify">
    <h1>Που περνάω</h1>
    <hr class="rounded">
    <div> <h3> Σχολές που περνάω - ΓΕΛ Ημερήσια 90%</h3> </div>
    <div> Συμπλήρωσε τα μόρια σου: <input type="text" v-model="moria" placeholder="Τα μόρια μου" /> </div>
    <div class="content-table-container">
      <table class="content-table">
        <thead>
          <tr>
            <th>Πρώτος</th>
            <th>Βάση</th>
            <th>Τμήμα</th>
            <th>Πανεπιστήμιο</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="base in filteredUsers" :key="base.id">
            <td>{{base.baseFirst}}</td>
            <td>{{base.baseLast}}</td>
            <td>{{base.deptName}}</td>
            <td>{{base.uniTitle}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <hr class="rounded">

  <div class="Qualify">
    <div> <h3> Σχολές που περνάω - ΕΠΑΛ Ημερήσια 90%</h3> </div>
    <div> Συμπλήρωσε τα μόρια σου:<input type="text" v-model="moria2" placeholder="Τα μόρια μου" /> </div>
    <div class="content-table-container">
      <table class="content-table">
        <thead>
          <tr>
            <th>Πρώτος</th>
            <th>Βάση</th>
            <th>Τμήμα</th>
            <th>Πανεπιστήμιο</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="base2 in filteredUsers2" :key="base2.id">
            <td>{{base2.baseFirst}}</td>
            <td>{{base2.baseLast}}</td>
            <td>{{base2.deptName}}</td>
            <td>{{base2.uniTitle}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <hr class="rounded">

  <div class="Qualify">
    <div> <h3> Σχολές που περνάω - ΓΕΛ Ημερήσια 10%</h3> </div>
    <div> Συμπλήρωσε τα μόρια σου:<input type="text" v-model="moria3" placeholder="Τα μόρια μου" /> </div>
    <div class="content-table-container">
      <table class="content-table">
        <thead>
          <tr>
            <th>Πρώτος</th>
            <th>Βάση</th>
            <th>Τμήμα</th>
            <th>Πανεπιστήμιο</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="base3 in filteredUsers3" :key="base3.id">
            <td>{{base3.baseFirst}}</td>
            <td>{{base3.baseLast}}</td>
            <td>{{base3.deptName}}</td>
            <td>{{base3.uniTitle}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <hr class="rounded">

  <div class="Qualify">
    <div> <h3> Σχολές που περνάω - ΕΠΑΛ Ημερήσια 10%</h3> </div>
    <div> Συμπλήρωσε τα μόρια σου:<input type="text" v-model="moria4" placeholder="Τα μόρια μου" /> </div>
    <div class="content-table-container">
      <table class="content-table">
        <thead>
          <tr>
            <th>Πρώτος</th>
            <th>Βάση</th>
            <th>Τμήμα</th>
            <th>Πανεπιστήμιο</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="base4 in filteredUsers4" :key="base4.id">
            <td>{{base4.baseFirst}}</td>
            <td>{{base4.baseLast}}</td>
            <td>{{base4.deptName}}</td>
            <td>{{base4.uniTitle}}</td>
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
  name: 'BaseTable',
  data () {
    return {
      bases: [],
      bases2: [],
      bases3: [],
      bases4: [],
      moria:'',
      moria2:'',
      moria3:'',
      moria4:''
    }
  },
  computed: {
    filteredUsers() {
      return this.bases.filter(base => base.baseLast > this.moria);
    },
    filteredUsers2() {
      return this.bases2.filter(base2 => base2.baseLast > this.moria2);
    },
    filteredUsers3() {
      return this.bases3.filter(base3 => base3.baseLast > this.moria3);
    },
    filteredUsers4() {
      return this.bases4.filter(base4 => base4.baseLast > this.moria4);
    }
  },
  mounted() {
    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/bases/search/?base=30000&year=2022&details=full&type=gel-ime-gen')
      .then(response => (this.bases = response.data.records))

    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/bases/search/?base=30000&year=2022&details=full&type=epal-ime-gen')
      .then(response => (this.bases2 = response.data.records))
    
    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/bases/search/?base=30000&year=2022&details=full&type=gel-ime-ten')
      .then(response => (this.bases3 = response.data.records))

    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/bases/search/?base=30000&year=2022&details=full&type=epal-ime-ten')
      .then(response => (this.bases4 = response.data.records))
  },
  
}
</script>
