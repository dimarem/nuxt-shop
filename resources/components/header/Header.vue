<template>
  <header>
    <!-- кнопка переводящая на страницу корзины -->
    <button>
      <CartSVG />
    </button>
  </header>
</template>

<script>
import CartSVG from './components/CartSVG.vue'

export default {
  components: {
    CartSVG
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
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03),
              0 2px 4px rgba(0,0,0,0.03),
              0 4px 8px rgba(0,0,0,0.03),
              0 8px 16px rgba(0,0,0,0.03),
              0 16px 32px rgba(0,0,0,0.03);
}

button {
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
}

svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: $grey;
  transition: .25s;
}
</style>
