<template>
  <section>
    <main :class="{filled: content.length, empty: !content.length}">
      <template v-if="content.length">
        <Article
          v-for="item in content"
          :key="item.id"
          :content="item"
        />
      </template>
      <template v-else>
        <p>Данные отсутствуют</p>
      </template>
    </main>
  </section>
</template>

<script>
import axios from 'axios'
import Article from '~/components/index/Article.vue'

export default {
  components: {
    /**
     * Формирует краткое описание товара
     * и ссылку на страницу с полным.
     */
    Article
  },
  /**
   * Запрашивает данные текущей страницы.
   */
  asyncData (ctx) {
    const { error, env: { baseUrl } } = ctx

    return axios
      .get(`${baseUrl}/api/watches`)
      .then((res) => {
        const data = res.data

        if (data.success) {
          return { content: data.watches }
        } else {
          error({ statusCode: 500, message: 'Сервис временно недоступен' })
        }
      })
      .catch((e) => {
        error({ statusCode: 500, message: 'Сервис временно недоступен' })
      })
  },
  data () {
    return {
      content: [] // массив, каждый элемент которого представляет краткое описание товара
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
}

.filled {
  padding: 10rem 0 2rem;
}

.empty {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 2rem 0;
}
</style>
