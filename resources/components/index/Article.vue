<template>
  <article>
    <nuxt-link :to="`/watch/${description.id}`">
      <img
        :src="description.image"
        :alt="description.title"
      >
    </nuxt-link>
    <h1>{{ description.title }}</h1>
    <h2>{{ description.brand }}</h2>
    <p>{{ description.price | currency(description.currency) }}</p>
  </article>
</template>

<script>
export default {
  filters: {
    /**
     * Форматирует цену в более "читаемый" вид,
     * добавляя символ соответствующей валюты.
     *
     * @param {number} price - цена.
     * @param {string} currency - код валюты.
     */
    currency (price, currency) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(price)
    }
  },
  props: {
    /**
     * Объект содержащий описание товара.
     */
    description: {
      type: Object,
      required: true
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
