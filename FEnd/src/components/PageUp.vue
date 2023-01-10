<template>
  <button class="page-up" @click="scrollToTop">
    <img src="../assets/pageup.png" alt="Page Up">
  </button>
</template>

<script>
export default {
  name: 'PageUpButton',
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>
.page-up {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
