<template>
  <section>
    <main class="watches-description">
      <h1>{{ page_data.title }}</h1>
      <h2>{{ page_data.brand }}</h2>
      <div class="price">
        {{ formatted_price }}
      </div>
      <div class="image">
        <img :src="page_data.image">
      </div>
      <div class="characteristics">
        <div class="characteristic">
          <div>Номер лота:</div>
          <div>{{ page_data.id }}</div>
        </div>
        <div class="characteristic">
          <div>Страна: </div>
          <div>{{ page_data.country }}</div>
        </div>
        <div class="characteristic">
          <div>Пол:</div>
          <div>{{ page_data.sex }}</div>
        </div>
        <div class="characteristic">
          <div>Тип механизма:</div>
          <div>{{ page_data.mechanism }}</div>
        </div>
        <div class="characteristic">
          <div>Метал корпуса:</div>
          <div>{{ page_data.carcass }}</div>
        </div>
        <div class="characteristic">
          <div>Материал браслета:</div>
          <div>{{ page_data.armlet }}</div>
        </div>
      </div>
      <div class="cart-button">
        <button>
          <ShoppingCartSVG />
          В корзину
        </button>
      </div>
    </main>
  </section>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-console */

import axios from 'axios'
import ShoppingCartSVG from '~/components/description/ShoppingCartSVG.vue'

export default {
  components: {
    ShoppingCartSVG
  },
  /**
   * Запрашивает данные текущей страницы.
   */
  asyncData ({ store, params, error, env: { baseUrl } }) {
    const url = `${baseUrl}/api/description/${params.id}`

    // проверим наличие данных в кеше
    const { cached, index } = store.getters.in_cache(url)

    // данные по этой странице уже были получены ранее
    // вернем их
    if (cached) {
      const { page_data } = store.getters.get_from_cache(index)

      return { page_data }
    }

    // данные отсутствуют в кеше
    return axios
      .get(url)
      .then(({ data }) => {
        const { success, page_data: [page_data] } = data

        if (success) {
          // сохраним данные в кеше
          store.commit('save_in_cache', { url, page_data })

          return { page_data }
        } else {
          error({ statusCode: 500, message: 'Сервис временно недоступен' })
        }
      })
      .catch((e) => {
        error({ statusCode: 500, message: 'Сервис временно недоступен' })
      })
  },
  watchQuery: true,
  computed: {
    /**
     * Формирует строковое
     * представление цены.
     *
     * @returns {string}
     */
    formatted_price () {
      const price = new Intl.NumberFormat('ru-RU').format(this.page_data.price)

      const abbreviations = {
        USD: '$',
        RUB: '₽'
      }

      const currency = abbreviations[this.page_data.currency]

      return `${currency} ${price}`
    }
  }
}
</script>

<style lang="scss">
.watches-description {
  box-sizing: border-box;
  max-width: 1200px;
  margin: auto;
  padding: 4rem 1rem;

  h1, h2, .price {
    text-align: center;
  }

  h1, h2 {
    margin: 0;
    font-weight: normal;
    text-align: center;
  }

  h1, h2 {
    margin-bottom: .5rem;
  }

  h1 {
    font-family: $light-header;
    font-size: 2.5rem;
  }

  h2 {
    font-size: .85rem;
    color: rgb(155, 155, 155);
  }

  .price, .characteristics, .cart-button {
    margin: 2rem 0;
  }

  .price {
    font-family: $numeric;
    font-size: 1.5rem;
    color: $brown;
  }

  .image {
    padding: 2rem;
    background-color: rgb(245, 245, 245);
  }

  img {
    display: block;
    max-width: 400px;
    margin: auto;

    @media screen and (max-width: 800px) {
      max-width: 300px;
    }

    @media screen and (max-width: 475px) {
      max-width: 200px;
    }
  }

  .characteristics {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    max-width: 600px;
    margin: 2rem auto;
  }

  .characteristic {
    box-sizing: border-box;
    width: 200px;
    padding: 1rem;

    div {
      text-align: center;
    }

    & > div:first-of-type {
      font-size: .85rem;
      color: rgb(155, 155, 155);
    }

    & > div:last-of-type {
      font-family: $bold;
      font-size: .95rem;
    }
  }

  .cart-button {
    button {
      cursor: pointer;
      position: relative;
      display: block;
      margin: auto;
      padding: 1rem 3rem;
      padding-left: 4rem;
      border: none;
      outline: none;
      background-color: $light-blue;
      color: white;
      font-family: $bold;
      transition: .25s;

      &:hover {
        background-color: darken($color: $light-blue, $amount: 10%);
      }
    }

    svg {
      position: absolute;
      left: 2rem;
      top: .75rem;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: .5rem;
      fill: white;
      transition: .25s;
    }
  }
}
</style>
