<template>
  <div class="cart-indicator">
    <transition appear name="goods-amount" mode="out-in">
      <div :key="goods_amount">
        {{ goods_amount }}
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */

export default {
  props: {
    /**
     * Количество товаров в корзине.
     */
    goods_amount: {
      type: Number,
      required: false
    }
  }
}
</script>

<style lang="scss">
.cart-indicator {
  position: absolute;
  left: -50%;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
  min-width: 1.25rem;
  border-radius: 3px;
  background-color: $blue;
  overflow: hidden;

  & > div {
    color: white;
    font-size: .6875rem;
    font-family: $bold;
  }
}

.goods-amount-enter {
  transform: translateY(-200%);
}

.goods-amount-leave-to {
  transform: translateY(200%);
}

.goods-amount-enter-active, .goods-amount-leave-active {
  transition: .25s;
}
</style>
