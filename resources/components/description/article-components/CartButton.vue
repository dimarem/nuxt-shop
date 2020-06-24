<template>
  <button @click="process_click">
    <span class="label">
      <transition name="label" mode="out-in">
        <Check v-if="added" />
        <CartSVG v-else />
      </transition>
    </span>
    <span class="text">
      <transition name="text" mode="out-in">
        <span v-if="added" key="Добавлено">Добавлено</span>
        <span v-else key="В корзину">В корзину</span>
      </transition>
    </span>
  </button>
</template>

<script>
import CartSVG from './cart-button-components/CartSVG.vue'
import Check from './cart-button-components/Check.vue'

export default {
  components: {
    CartSVG,
    Check
  },
  data () {
    return {
      added: false,
      timer: null
    }
  },
  methods: {
    /**
     * Обрабатывает клик по кнопке,
     * выставляя индикатор "added" в true.
     */
    process_click () {
      this.added = true

      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.added = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  position: relative;
  padding: 1rem 2rem;
  padding-left: 3rem;
  background-color: $grey;
  border: none;
  outline: none;
  font-family: inherit;
  color: white;
  font-size: .9375rem;
  border-radius: 30px;
  overflow: hidden;
}

.label {
  position: absolute;
  left: 4rem;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
}

.label-enter, .label-leave-to {
  opacity: 0;
}

.label-enter-active, .label-leave-active {
  transition: .15s;
}

.text {
  display: inline-block;
  width: 150px;
  text-align: center;

  & > span {
    display: inline-block;
  }
}

.text-enter {
  opacity: 0;
  transform: translateY(200%);
}

.text-leave-to {
  opacity: 0;
  transform: translateY(-200%);
}

.text-enter-active, .text-leave-active {
  transition: .15s;
}

svg {
  width: 1.125rem;
  height: 1.125rem;
  fill: white;
}
</style>
