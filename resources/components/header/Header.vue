<template>
  <header>
    <div class="header-container">
      <CartButton
        to="/cart"
        :goods_amount="goods_amount"
      />
    </div>
  </header>
</template>

<script>
/* eslint-disable camelcase */

import { mapState } from 'vuex'
import CartButton from './components/cart-button/CartButton.vue'

export default {
  components: {
    CartButton
  },
  computed: {
    ...mapState(['cart']),
    /**
     * Расчитывает общее количество
     * товаров в корзине.
     *
     * @returns {number}
     */
    goods_amount () {
      let goods_amount = 0

      for (let i = 0; i < this.cart.length; i++) {
        goods_amount += this.cart[i].total
      }

      return goods_amount
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03),
              0 2px 4px rgba(0,0,0,0.03),
              0 4px 8px rgba(0,0,0,0.03),
              0 8px 16px rgba(0,0,0,0.03),
              0 16px 32px rgba(0,0,0,0.03);
}

.header-container {
  display: flex;
  justify-content: flex-end;
  max-width: 1440px;
  margin: auto;
}
</style>
