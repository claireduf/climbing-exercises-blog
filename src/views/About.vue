<template>
  <!-- Vue conditional to check if there is any content in document -->
  <div v-if="hasContent" class="page">
    <div class="home">
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>
      <div class="about-image" :style="{ backgroundImage: 'url(' + fields.image + ')' }">
      </div>
      <!-- Template for page title -->
      <h1 class="blog-title">
        {{ $prismic.richTextAsPlain(fields.headline) }}
      </h1>
      <!-- Template for page description -->
      <p class="about-body">{{ $prismic.richTextAsPlain(fields.body) }}</p>
    </div>
  </div>
  <!-- If no content return message -->
  <div v-else class="home">
    <p> Please add some content to your blog home document.</p>
  </div>

</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      documentId: '',
      fields: {
        title: null,
        body: null,
        image: null
      },
    }
  },
  methods: {
    getContent () {
      //Query to get home content
      this.$prismic.client.getSingle('about')
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.title = document.data.title;
            this.fields.body = document.data.body;
            this.fields.image = document.data.image.url;

            //Check that the blog home contains content
            this.checkForContent();

          } else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    },
    //Function to check for any content on the about page
    checkForContent(){
      if (
        this.fields.image != undefined ||
        this.$prismic.richTextAsPlain(this.fields.title) !== "" ||
        this.$prismic.richTextAsPlain(this.fields.body) !== ""
      ) {
        this.hasContent = true;
      }
    },
  },
  created () {
    this.getContent()
    window.prismic.setupEditButton();
  }
}
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: auto;
  text-align: center;
}
.home .about-image {
  height: 140px;
  width: 140px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  margin: 1em auto;
}
.home .about-body {
  font-size: 18px;
  color: #9A9A9A;
  line-height: 30px;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  font-family: 'Lato', sans-serif;
  border-bottom: 1px solid #DADADA;
}
/* Media Queries */
@media (max-width: 767px) {
  .home {
    padding: 0 20px;
  }
}
</style>
