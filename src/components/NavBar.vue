<template>
  <div class="container">
    <nav class="made-navbar">
      <div class="made-container">
        <router-link to="/" class="made-nav-item" :class="{ active: $route.path === '/' }">Home</router-link>
        <router-link to="/world" class="made-nav-item" :class="{ active: $route.path === '/world' }">World</router-link>
        <router-link to="/sports" class="made-nav-item" :class="{ active: $route.path === '/sports' }">Sports</router-link>
        <router-link to="/business" class="made-nav-item" :class="{ active: $route.path === '/business' }">Business</router-link>
        <router-link to="/politics" class="made-nav-item" :class="{ active: $route.path === '/politics' }">Politics</router-link>
        <router-link to="/entertainment" class="made-nav-item" :class="{ active: $route.path === '/entertainment' }">Entertainment</router-link>
        <router-link to="/life-style" class="made-nav-item" :class="{ active: $route.path === '/life-style' }">Lifestyle</router-link>  
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.container {
  margin-bottom: 7px;
}

.made-navbar {
  margin-top: 25px;
  background-color: #333;
}

.made-container {
  display: flex;
  margin: 0;
  overflow-x: auto; /* Enable horizontal scrolling for small screens */
}

.made-nav-item {
  color: white;
  text-decoration: none;
  padding: 10px;
  transition: background-color 0.3s;
}

.active {
  background-color: #fab300;
}

.made-nav-item:hover {
  background-color: #fab300;
}

/* Responsive Styles */
@media only screen and (max-width: 576px) {
  .made-container {
    flex-wrap: nowrap;
    justify-content: flex-start; 
    overflow-x: scroll; 
    -webkit-overflow-scrolling: touch; 
  }

  .made-nav-item {
    white-space: nowrap; 
  }
}
</style>
