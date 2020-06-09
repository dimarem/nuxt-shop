<template>
  <article>
    <nuxt-link :to="`/watch/${content.id}`">
      <img
        :src="content.image"
        :alt="content.title"
      >
    </nuxt-link>
    <h1>{{ content.title }}</h1>
    <h2>{{ content.brand }}</h2>
    <p>{{ formatted_price }}</p>
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
     * Формирует строковое
     * представление цены.
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

<style lang="scss">
article {
  position: relative;
  width: 250px;
  margin: 0 2rem;
  padding: 1rem;
  padding-top: 8rem;
  border-radius: 25px;
  background-color: rgb(240, 240, 240);

  &:not(:last-of-type) {
    margin-bottom: 12rem;
  }

  h1, h2, p {
    margin: 1rem 0;
    text-align: center;
  }

  h1, h2 {
    font-weight: normal;
  }

  h1, p {
    font-family: $bold;
  }

  h2 {
    font-family: $light;
    font-size: 1rem;
    color: rgb(150, 150, 150);
    text-transform: uppercase;
  }

  p {
    color: $brown;
    font-family: $numeric;
  }

  img {
    position: absolute;
    left: 50%;
    top: -50%;
    width: 150px;
    transform: translateX(-50%);
  }
}
</style>
