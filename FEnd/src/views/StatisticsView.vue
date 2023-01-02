<template>
    <div class="Statistics">
      <h1>Στατιστικά</h1>
      <div>
        <table class="content-table">
          <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Town</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Town</td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  mounted() {
    axios
      .get('https://vaseis.iee.ihu.gr/api/index.php/specialcategories')
      .then((response) => {
        console.log(response)
      })
  }
}
</script>
