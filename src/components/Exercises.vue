<template>
  <!-- Check exercises exist -->
  <div v-if="exercises.length !== 0" class="blog-main">
    <!-- Template for exercises -->
    <div v-for="exercise in exercises" :key="exercise.id" v-bind:exercise="exercise" class="exercise">
      <router-link :to="linkResolver(exercise)">
        <h2>{{ $prismic.richTextAsPlain(exercise.data.title) }}</h2>
        <p class="exercise-meta"><span class="duration">{{ getExerciseDuration(exercise) }}</span></p>
        <div>
          <p>{{getDescription(exercise)}}</p>
        </div>
      </router-link>
    </div>
  </div>
  <!-- If no exercises return message -->
  <div v-else class="blog-main">
    <p>No exercises published at this time.</p>
  </div>
</template>

<script>
export default {
  name: 'exercises',
  data () {
    return {
      exercises: [],
      linkResolver: this.$prismic.linkResolver
    }
  },
  methods: {
    getExercises () {
      //Query to get exercises
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'exercise'),
        { orderings : '[my.exercise.title desc]' }
      ).then((response) => {
        this.exercises = response.results;
      })
    },
    //Function to get the first paragraph of text in an article and limit the displayed text at 300 characters
    getDescription (exercise) {
      return exercise.data.description
      },
    getExerciseDuration (exercise){
      return "Durée : " + exercise.data.duration + " min"
    }
  },
  created () {
    this.getExercises()
  }
}
</script>

<style scoped>
.blog-main {
  max-width: 700px;
  margin: auto;
}
.article {
  margin-bottom: 3rem;
}
.article h2 {
  margin: 0;
}
.article-meta {
  color: #9A9A9A;
  font-family: 'Lato', sans-serif;
  margin-bottom: 8px;
  font-size: 16px;
}
/* Media Queries */
@media (max-width: 767px) {
  .blog-main {
    padding: 0 20px;
    font-size: 18px;
  }
}
</style>
