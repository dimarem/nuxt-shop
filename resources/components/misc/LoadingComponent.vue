<template>
  <div class="loading-component">
    <div v-if="spinner_required" class="spinner">
      <div class="rect1" />
      <div class="rect2" />
      <div class="rect3" />
      <div class="rect4" />
      <div class="rect5" />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */

export default {
  props: {
    /**
     * Задержка отображения индикатора загрузки.
     */
    spinner_delay: {
      type: Number,
      required: false,
      default: 500
    }
  },
  data () {
    return {
      spinner_required: false
    }
  },
  mounted () {
    const vm = this

    setTimeout(() => {
      vm.spinner_required = true
    }, vm.spinner_delay)
  }
}
</script>

<style lang="scss" scoped>
.loading-component {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;
}

.spinner {
  width: 50px;
  height: 40px;
}

.spinner > div {
  display: inline-block;
  height: 100%;
  width: 4px;
  background-color: rgb(25, 25, 25);
  animation: scale 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  animation-delay: -1.1s;
}

.spinner .rect3 {
  animation-delay: -1.0s;
}

.spinner .rect4 {
  animation-delay: -0.9s;
}

.spinner .rect5 {
  animation-delay: -0.8s;
}

@keyframes scale {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  } 20% {
    transform: scaleY(1.0);
  }
}
</style>
