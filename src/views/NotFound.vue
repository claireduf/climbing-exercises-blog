<template>
  <div class="blog-main">
    <div class="outer-container">
      <div class="back">
        <router-link to="/">retour</router-link>
      </div>

      <h1>Oups</h1>
      <div class="not-found-text">
      <p>Désolé, cette page est introuvable.</p>
      </div>
      <router-link to="/" style="text-decoration: underline;">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
