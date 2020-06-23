<template>
  <div id="image-block">
    <transition name="img" mode="out-in">
      <img
        :key="src[index]"
        :src="src[index]"
        :alt="alt"
      >
    </transition>
    <!-- селекторы изображений -->
    <div
      v-if="src.length > 0"
      id="selectors"
    >
      <button
        v-for="n in src.length"
        :key="n"
        :class="{ current: index === n - 1 }"
        class="selector"
        @click="index = n - 1"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  props: {
    /**
     * Массив содержащий ссылки на изображения.
     */
    src: {
      type: Array,
      required: true
    },
    /**
     * Наименование изображения.
     */
    alt: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      index: 0 // порядковый номер отображаемого изображения
    }
  }
}
</script>

<style lang="scss">
#image-block {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background-color: rgb(245, 245, 245);
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: white;
    animation: shift-to-top .5s forwards;
  }
}

img {
  max-width: 80%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
}

.img-enter, .img-leave-to {
  opacity: 0;
}

.img-enter-active, .img-leave-active {
  transition: .25s;
}

#selectors {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  opacity: 0;
  animation: show-up .5s .2s forwards;
}

.selector {
  cursor: pointer;
  position: relative;
  width: 1rem;
  height: 1rem;
  margin: 0;
  padding: 0;
  border: 2px solid $grey;
  outline: none;
  background-color: transparent;
  border-radius: 50%;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background-color: $grey;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: .3s;
  }
}

.current::after {
  opacity: 1;
}

@keyframes shift-to-top {
  0% {
    transform: translateY(0);
  } 100% {
    transform: translateY(-100%);
  }
}

@keyframes show-up {
  0% {
    opacity: 0;
    transform: translate(-50%, 100%);
  } 100% {
    opacity: 1;
    transform: translateY(-50%, 0);
  }
}
</style>
