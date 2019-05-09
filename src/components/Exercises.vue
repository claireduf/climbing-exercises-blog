<template>
  <!-- Check exercises exist -->
  <div v-if="exercises.length !== 0" class="blog-main">
    <!-- Template for exercises -->
    <div v-for="exercise in exercises" :key="exercise.id" v-bind:exercise="exercise" class="exercise">
      <router-link :to="linkResolver(exercise)">
        <h2>{{ $prismic.richTextAsPlain(exercise.data.title) }}</h2>
        <p class="exercise-meta"><span class="created-at">{{ Intl.DateTimeFormat('en-US', dateOptions).format(new Date(exercise.data.date)) }}</span></p>
        <div>
          <p>{{getFirstParagraph(exercise)}}</p>
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
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      linkResolver: this.$prismic.linkResolver
    }
  },
  methods: {
    getExercises () {
      //Query to get exercises
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'exercise'),
        { orderings : '[my.exercise.date desc]' }
      ).then((response) => {
        this.exercises = response.results;
      })
    },
    //Function to get the first paragraph of text in an exercise and limit the displayed text at 300 characters
    getFirstParagraph (exercise) {
      const textLimit = 300;
      const slices = exercise.data.description;
      let firstParagraph = '';
      let haveFirstParagraph = false;

      slices.map(function(slice) {
        if (!haveFirstParagraph) {
          if (slice.slice_type == "text") {
            slice.primary.text.forEach(function(block){
              if (block.type == "paragraph") {
                if (!haveFirstParagraph) {
                  firstParagraph += block.text;
                  haveFirstParagraph = true;
                }
              }
            });
          }
        }
      });
      
      const limitedText = firstParagraph.substr(0, textLimit)

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...';
      }
      else {
        return firstParagraph;
      }
    },
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
