<template>
  <div >
    <carousel :autoplay="2000" :items-to-show="4" :interval="3000">
      <slide v-for="image in images" :key="image.id">
        <img :src="image.logoURL" alt="Image" v-bind:width="200" v-bind:height="200">
        <div>{{ image.title }}</div>
      </slide>
  
      <template #addons>
        <navigation />
        <pagination />
      </template>

    </carousel>
  </div>
</template>

<script>
import axios from 'axios'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'


export default {
  name: 'ImageCarousel',
  components: {
    Carousel,
      Slide,
      //Pagination,
      Navigation,
  },
  data() {
    return {
      images: [],
    }
  },
  async mounted() {
    const response = await axios.get('https://vaseis.iee.ihu.gr/api/index.php/universities')
    this.images = response.data.records
  }
}
</script>
