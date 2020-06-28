<template>
  <article>
    <Images
      :src="images"
      :alt="page_data.title"
    />
    <main>
      <h1>{{ page_data.title }}</h1>
      <h2>{{ page_data.brand }}</h2>
      <div id="price">
        {{ formatted_price }}
      </div>
      <div id="characteristics">
        <div class="characteristic">
          <div>Номер лота:</div>
          <div>{{ page_data.id }}</div>
        </div>
        <div class="characteristic">
          <div>Страна:</div>
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
      <div id="cart-button-container">
        <button
          id="cart-button"
          @click="add_to_cart(page_data)"
        >
          <CartSVG />
          В корзину
        </button>
      </div>
    </main>
  </article>
</template>

<script>
/* eslint-disable vue/prop-name-casing */

import { mapMutations } from 'vuex'
import Images from './components/Images.vue'
import CartSVG from './components/CartSVG.vue'

export default {
  components: {
    Images,
    CartSVG
  },
  props: {
    /**
     * Объект содержащий описание товара.
     */
    page_data: {
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
      const price = new Intl.NumberFormat('ru-RU').format(this.page_data.price)

      const abbreviations = {
        USD: '$',
        RUB: '₽'
      }

      const currency = abbreviations[this.page_data.currency]

      return `${currency} ${price}`
    },
    /**
     * Возвращает изображения текущих часов.
     *
     * @returns {array}
     */
    images () {
      let images = []

      try {
        images = JSON.parse(this.page_data.images)
      } catch (e) {}

      return images
    }
  },
  methods: {
    ...mapMutations(['add_to_cart'])
  }
}
</script>

<style lang="scss" scoped>
article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  max-width: 1440px;
  min-height: calc(100vh - 6rem); /* 6rem - padding блока main */
  margin: auto;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    display: block;
  }
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 1000px) {
    margin-top: 2rem;
  }
}

h1, h2 {
  margin: 0;
  font-weight: normal;
  text-align: center;
  font-family: $header;
}

h1 {
  font-size: 3rem;
  opacity: 0;
  animation: shift-from-right .5s forwards;

  @media screen and (max-width: 425px) {
    font-size: 2rem;
  }
}

h2 {
  font-size: .875rem;
  color: rgb(150, 150, 150);
  opacity: 0;
  animation: shift-from-right .5s .1s forwards;
}

#price {
  margin: 2rem 0;
  text-align: center;
  font-family: $numeric;
  font-size: 1.25rem;
  color: darken($color: $blue, $amount: 25%);
  opacity: 0;
  animation: shift-from-right .5s .2s forwards;
}

#characteristics {
  max-width: 500px;
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  opacity: 0;
  animation: shift-from-right .5s .3s forwards;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 375px) {
    display: block;
    max-width: 100%;
  }
}

.characteristic {
  &:not(:last-of-type) {
    @media screen and (max-width: 375px) {
      margin-bottom: 1rem;
    }
  }

  & > div:first-of-type {
    margin-bottom: 5px;
    font-size: .875rem;
    color: rgb(150, 150, 150);
  }

  & > div:last-of-type {
    font-family: $bold;
    font-size: .9375rem;
  }
}

#cart-button-container {
  display: flex;
  justify-content: center;
  margin: 4rem 0;
  opacity: 0;
  animation: shift-from-right .5s .4s forwards;
}

#cart-button {
  cursor: pointer;
  position: relative;
  padding: 1rem 2rem;
  padding-left: 3.5rem;
  background-color: $blue;
  border: none;
  outline: none;
  font-family: inherit;
  color: white;
  font-size: .9375rem;
  border-radius: 5px;
  transition: .3s;

  &:active {
    transform: scale(.97);
  }

  &:hover {
    background-color: lighten($color: $blue, $amount: 5%);
    box-shadow: 0 1px 1px rgba(0,0,0,0.11),
                0 2px 2px rgba(0,0,0,0.11),
                0 4px 4px rgba(0,0,0,0.11),
                0 8px 8px rgba(0,0,0,0.11),
                0 16px 16px rgba(0,0,0,0.11),
                0 32px 32px rgba(0,0,0,0.11);
  }

  svg {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    width: 1.125rem;
    height: 1.125rem;
    fill: white;
    transform: translateY(-50%);
  }
}

@keyframes shift-from-right {
  0% {
    opacity: 0;
    transform: translateX(20px);
  } 100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
