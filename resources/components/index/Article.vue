<template>
  <article>
    <nuxt-link :to="`/description/${content.id}`">
      <header>
        <img
          :src="content.image"
          :alt="content.title"
        >
      </header>
      <main>
        <h1>{{ content.title }}</h1>
        <div class="price">
          {{ formatted_price }}
        </div>
      </main>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    /**
     * Объект содержащий описание товара.
     */
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Отформатированное представление цены.
     *
     * @returns {string}
     */
    formatted_price () {
      const price = new Intl.NumberFormat('ru-RU').format(this.content.price)

      const abbreviations = {
        USD: '$',
        RUB: '₽'
      }

      const currency = abbreviations[this.content.currency]

      return `${currency} ${price}`
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: $grey;
  text-decoration: none;

  &:hover img {
    transform: scale(1.035);
  }
}

header {
  padding: 2rem;
  background-color: rgb(245, 245, 245);
}

img {
  max-width: 100%;
  transition: .5s;
}

main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 0;
  margin-top: 1rem;
  padding: 0;
}

h1, .price {
  font-size: .95rem;
}

h1 {
  margin: 0;
  font-family: $bold;
  font-weight: normal;
}

.price {
  font-family: $numeric;
  color: $brown;
  text-align: right;
}
</style>
