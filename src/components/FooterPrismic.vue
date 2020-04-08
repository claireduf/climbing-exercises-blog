<template>
  <footer class="footer">
    <img class="logo" src="../assets/img/patate.gif" alt="Patate">
    <p class="footer-text">Une création Patate</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterPrismic'
}
</script>

<style scoped>
.footer {
  padding: 40px 0;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  border-top: 1px solid #DADADA;
}
.logo {
  width: 100px;
}

.footer-text {
  font-family: 'Lato', sans-serif;
  color: #9A9A9A;
  font-size: 10px;
}
</style>
