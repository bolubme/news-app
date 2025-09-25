<template>
    <div>
      <!-- Redirect logic can be added here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage',
    mounted() {
      // Redirect to the root path '/'
      this.$router.push('/');
    }
  }
  </script>
  
  <style scoped>
  /* Your styles */
  </style>
  