<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="/">retour à la liste</router-link>
      </div>

      <h1 class="exercise-title">{{ "fields.title" }}</h1>
      <p class="exercise-meta"><span class="duration">{{ "fields.duration" }}</span></br>
      <span class="type_of_energetic">{{ "fields.type_of_energetic" }}</span></br>
      <span class="mental_level">{{ "fields.mental_level" }}</span></br>
      <span class="place">{{ "fields.place" }}</span></p>

      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentUid"/>

    </div>
  </div>
</template>

<script>

export default {
  name: 'exercise',
  data () {
    return {
      documentId: '',
      fields : {
        title: null,
        description: null,
        mental_level: null,
        place_for_exercise: null,
        type_of_energetic: null,
        duration: null
        }
    }
  },
  methods: {
    getContent (uid) {
      //Query to get exercise content
      this.$prismic.client.query(
        this.$prismic.Predicates.getByUID('exercise', uid)
        ).then((document) => {
          if (document) {
            this.documentId = document.data.uid
            this.fields.title = document.data.title
            this.fields.description = document.data.description
            this.fields.mental_level = document.data.mental_level
            this.fields.place_for_exercise = document.data.place_for_exercise
            this.fields.type_of_energetic = document.data.type_of_energetic
            this.fields.duration = document.data.duration
          }
          else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>

<style>
.description a {
  text-decoration: none;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 23px;
}
.exercise-meta {
  color: #9A9A9A;
  font-family: 'Lato', sans-serif;
  margin-bottom: 8px;
}

/* Media Queries */
@media (max-width: 767px) {
  .post-part pre {
    font-size: 14px;
  }
  .exercise-meta {
    font-size: 16px;
  }
}

@media screen and (min-width: 768px) {
  .exercise-meta {
    font-size: 16px;
  }
}
</style>
