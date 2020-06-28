<template>
  <button
    class="cart-button"
    @click="process_click"
  >
    <CartSVG />
    <transition name="cart-indicator">
      <CartIndicator
        v-if="goods_amount"
        :goods_amount="goods_amount"
      />
    </transition>
  </button>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */
/* eslint-disable curly */

import CartSVG from './components/CartSVG.vue'
import CartIndicator from './components/CartIndicator.vue'

export default {
  components: {
    /**
     * Изображение корзины.
     */
    CartSVG,
    /**
     * Индикатор указывающий
     * на количество товаров в корзине.
     */
    CartIndicator
  },
  props: {
    /**
     * URL по которому будет переведен
     * пользователь при клике по кнопке.
     */
    to: {
      type: String,
      required: false
    },
    /**
     * Количество товаров в корзине.
     */
    goods_amount: {
      type: Number,
      required: false
    }
  },
  methods: {
    /**
     * Переводит пользователя на страницу "to".
     */
    process_click () {
      if (this.to) this.$router.push(this.to)
    }
  }
}
</script>

<style lang="scss">
.cart-button {
  cursor: pointer;
  position: relative;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
}

svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: $grey;
}

.cart-indicator-enter {
  animation: cart-indicator-enter .25s forwards;
}

.cart-indicator-enter-active {
  transition: .25s;
}

@keyframes cart-indicator-enter {
  0% {
    transform: scale(.75);
  } 100% {
    transform: scale(1);
  }
}
</style>
