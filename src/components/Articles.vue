<template>
  <!-- Check articles exist -->
  <div v-if="articles.length !== 0" class="blog-main">
    <!-- Template for articles -->
    <div v-for="article in articles" :key="article.id" v-bind:article="article" class="article">
      <router-link :to="linkResolver(article)">
        <h2>{{ $prismic.richTextAsPlain(article.data.title) }}</h2>
        <p class="article-meta"><span class="created-at">{{ Intl.DateTimeFormat('en-US', dateOptions).format(new Date(article.data.date)) }}</span></p>
        <div>
          <p>{{getFirstParagraph(article)}}</p>
        </div>
      </router-link>
    </div>
  </div>
  <!-- If no articles return message -->
  <div v-else class="blog-main">
    <p>No Articles published at this time.</p>
  </div>
</template>

<script>
export default {
  name: 'articles',
  data () {
    return {
      articles: [],
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      linkResolver: this.$prismic.linkResolver
    }
  },
  methods: {
    getArticles () {
      //Query to get articles
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'article'),
        { orderings : '[my.article.date desc]' }
      ).then((response) => {
        this.articles = response.results;
      })
    },
    //Function to get the first paragraph of text in an article and limit the displayed text at 300 characters
    getFirstParagraph (article) {
      const textLimit = 300;
      const slices = article.data.body;
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
    this.getArticles()
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
