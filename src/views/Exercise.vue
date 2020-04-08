<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="/">retour</router-link>
      </div>
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>

      <h1 class="title">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
      <p v-if="fields.duration" class="exercise-meta"><span class="duration">{{ "Durée : " + fields.duration + " min" }}</span></p>
      <p v-if="fields.type_of_energetic" lass="exercise-meta"><span class="type_of_energetic">{{ "Filière travaillée : " + fields.type_of_energetic }}</span></p>
      <p v-if="fields.place_for_exercise" class="exercise-meta"><span class="place_for_exercise">{{ "À faire en : " + fields.place_for_exercise }}</span></p>
      <p v-if="fields.mental_level" class="exercise-meta"><span class="mental_level">{{ "Difficulté mentale : " + fields.mental_level }}</span></p>

      <p class="exercise-part">{{ $prismic.richTextAsPlain(fields.description) }}</p>

    </div>
  </div>
</template>

<script>

export default {
  name: 'exercise',
  data () {
    return {
      documentId: '',
      fields: {
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
      this.$prismic.client.getByUID('exercise', uid)
        .then((document) => {
        this.$log.debug('le doc est ', document)
          if (document) {
          this.$log.debug('on y est')
            this.documentId = document.id
            this.fields.title = document.data.title
            this.fields.description = document.data.description
            this.fields.mental_level = document.data.mental_level
            this.fields.type_of_energetic = document.data.type_of_energetic
            this.fields.place_for_exercise = document.data.place_for_exercise
            this.fields.duration = document.data.duration
            this.$log.debug('mental_level: ', this.fields.mental_level)

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
.exercise-part.single a {
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
  .exercise-part pre {
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
