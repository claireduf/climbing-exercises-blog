<template>
  <div class='post-part single container'>
    <blockquote class="block-quotation">{{ $prismic.richTextAsPlain(quote) }}</blockquote>
  </div>
</template>

<script>
export default {
  props: ['quote'],
  name: 'quote-slice'
}
</script>

<style scoped>
.block-quotation {
  margin-bottom: 2rem;
  display: inline-block;
  font-style: italic;
  font-size: 24px;
}
.block-quotation:before {
  content: "« "
}
.block-quotation:after {
  content: " »"
}
.block-citation {
  display: inline-block;
  font-style: italic;
  border-left: solid #B4B4B4 4px;
  padding-left: 10px;
}
@media screen and (min-width: 975px) {
  .block-quotation {
    width: 130%;
    margin: 0 -15% 2rem -15%;
    font-size: 30px;
    padding: 0;
  }
  .block-citation {
    margin: 20px 0;
  }
}
</style>
