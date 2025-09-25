<template>
  <footer class="footer">
    <div class="container">
      <!-- Logo and Links -->
      <div class="logo-links">
        <!-- Logo on the left -->
        <div class="logo-container">
          <img src="../assets/logoDark.png" alt="Your Website Logo" class="logo">
        </div>
        <!-- Links on the right -->
        <div class="links">
          <h6 class="footer-link">About Us</h6>
          <h6 class="footer-link">Contact Us</h6>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterLayer",
};
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #acacac;
  padding: 10px 0;
}

.container {
  margin: 0 auto;
}

.logo-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.logo {
  max-width: 100%; 
  height: auto;
}

.links {
  display: flex;
  justify-content: flex-end;
}

.footer-link {
  color: #acacac;
  margin-left: 20px;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #fab300;
}

/* Responsive Styles */
@media only screen and (max-width: 576px) {
  .logo-container {
  flex: 1;
}
}

</style>
