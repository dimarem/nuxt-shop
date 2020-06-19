<template>
  <div>
    <transition name="loading-component">
      <LoadingComponent v-if="loading" />
    </transition>
    <nuxt />
  </div>
</template>

<script>
import LoadingComponent from '~/components/misc/LoadingComponent.vue'

export default {
  components: {
    LoadingComponent
  },
  data () {
    return {
      loading: true
    }
  },
  beforeMount () {
    const vm = this

    window.addEventListener('load', () => {
      vm.loading = false
    })
  }
}
</script>

<style lang="scss">
  .loading-component-leave-to {
    opacity: 0;
  }

  .loading-component-leave-active {
    transition: 1s;
  }
</style>
