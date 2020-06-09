<template>
  <section>
    <main>
      <Article v-for="n in 100" :key="n" :content="content" />
    </main>
  </section>
</template>

<script>
import Article from '~/components/index/Article.vue'

export default {
  components: {
    /**
     * Формирует краткое описание
     * и ссылку на страницу с полным.
     */
    Article
  },
  data () {
    return {
      content: {
        id: 1,
        title: 'Heritage',
        brand: 'Ambassador',
        price: 1000,
        currency: 'USD',
        image: '/images/watch.png'
      }
    }
  }
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: auto;
  padding: 10rem 0 2rem;
}
</style>
