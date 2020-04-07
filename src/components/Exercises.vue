<template>
  <!-- Check exercises exist -->
  <div v-if="exercises.length !== 0" class="blog-main">
    <!-- Template for exercises -->
    <div v-for="exercise in exercises" :key="exercise.id" v-bind:exercise="exercise" class="exercise">
      <router-link :to="linkResolver(exercise)">
        <h2>{{ $prismic.richTextAsPlain(exercise.data.title) }}</h2>
        <p class="exercise-meta"><span class="duration">{{ getExerciseDuration(exercise) }}</span></br>
        <span class="type_of_energetic">{{ getTypeOfEnergetic(exercise) }}</span></br>
        <span class="mental_level">{{ getMentalLevel(exercise) }}</span></br>
        <span class="place">{{ getPlace(exercise) }}</span></p>
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
    getDescription (exercise) {
      return exercise.data.description
      },
    getExerciseDuration (exercise) {
      if (exercise.data.duration)
        return "Durée : " + exercise.data.duration + " min"
      else
       return ""
    },
    getTypeOfEnergetic (exercise) {
      if (exercise.data.type_of_energetic)
        return exercise.data.type_of_energetic
      else return "Pas de filière spécifique"
    },
    getMentalLevel (exercise) {
      if (exercise.data.mental_level)
        return "Mental : " + exercise.data.mental_level
      else return "0"
    },
    getPlace (exercise) {
      return exercise.data.place_for_exercise
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
.exercise {
  margin-bottom: 3rem;
}
.exercise h2 {
  margin: 0;
}
.exercise-meta {
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
