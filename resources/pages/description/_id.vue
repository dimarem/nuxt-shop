<template>
  <section>
    <main class="watches-description">
      <div class="image-block">
        <img :src="page_data.image">
      </div>
      <div class="description-block">
        <article>
          <h1>{{ page_data.title }}</h1>
          <h2>{{ page_data.brand }}</h2>
          <div class="price">
            {{ formatted_price }}
          </div>
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
          <div class="cart-button">
            <button>В корзину</button>
          </div>
        </article>
      </div>
    </main>
  </section>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-console */

import axios from 'axios'

export default {
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
  display: flex;
  min-height: 100vh;

  .image-block, .description-block {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
  }

  .image-block {
    background-color: rgb(240, 240, 240);
  }

  h1, h2 {
    margin: 0;
    font-weight: normal;
  }

  h1 {
    font-family: $light-header;
    font-size: 4rem;
  }

  h2 {
    font-family: $light;
    font-size: 1rem;
    color: rgb(150, 150, 150);
  }

  .price {
    margin: 2rem 0;
    font-size: 1.5rem;
    color: $brown;
    font-family: $numeric;
  }

  .characteristic {
    display: flex;
    font-size: .9rem;

    &:not(:last-of-type) {
      margin-bottom: 5px;
    }

    & > div:first-of-type {
      color: rgb(150, 150, 150);
    }

    & > div:last-of-type {
      font-family: $bold;
      padding-left: 10px;
    }
  }

  .cart-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 4rem;

    button {
      cursor: pointer;
      padding: .5rem 2rem;
      font-family: $regular;
      border: none;
      outline: none;
      font-size: 1rem;
      color: white;
      border-radius: 30px;
      background-color: $brown;
    }
  }

  img {
    margin: auto;
    width: 50%;
    max-width: 400px;
  }
}
</style>
