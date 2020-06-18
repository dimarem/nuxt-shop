<template>
  <article>
    <nuxt-link :to="`/description/${content.id}`">
      <img
        :src="content.image"
        :alt="content.title"
        :class="{ lucid }"
        @load="lucid = false"
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
  data () {
    return {
      lucid: true
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

<style lang="scss" scoped>
article {
  box-sizing: border-box;
  position: relative;
  width: 250px;
  margin: 0 2rem 4rem;
  padding: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 60%;
    border-radius: 25px;
    background-color: rgb(240, 240, 240);
  }
}

h1, h2, p {
  margin: 1rem 0;
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

h1 {
  font-family: $bold;
  font-size: 1rem;
}

h2 {
  font-family: $light;
  color: rgb(150, 150, 150);
  text-transform: uppercase;
  font-size: .95rem;
}

p {
  color: $brown;
  font-family: $numeric;
}

img {
  display: block;
  width: 150px;
  margin: auto;
}

.lucid {
  opacity: 0;
}
</style>
