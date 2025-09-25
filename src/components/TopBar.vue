<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div class="container">
        <button
          data-mdb-collapse-init
          class="navbar-toggler"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        </button>
        <div class="" id="">
          <router-link to="/" class="navbar-brand mt-2 mt-lg-0">
            <img
              src="../assets/logoLight.png"
              height="100"
              alt="Logo"
              loading="lazy"
            />
          </router-link>
        </div>
        <router-link to="/chat" class="nav-item-chat" >Chat</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TopBar",
};
</script>

<style scoped>
.navbar {
  padding: 0px !important;
}

.container {
  padding-left: 0px;
  padding-right: 0px;
}

.nav-item {
  padding-right: 10px !important;
}

.nav-item a {
  font-weight: bold;
  color: black !important;
}

.nav-item a:hover {
  color: #fab300 !important;
}

.search-btn {
  padding-left: 10px;
  border-left: 1.5px solid black;
}

.nav-item-chat{
  margin-right: 30px;
   color: black;
   font-weight: bold
}

.nav-item-chat:hover{
  color: #fab300;
  text-decoration: none;
}

#searchBtn:hover {
  color: #fab300;
}


</style>
