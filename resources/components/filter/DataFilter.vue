<template>
  <div class="data-filter" />
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    axios.get('/filter/filter.json').then(({ data }) => {
      // eslint-disable-next-line no-console
      console.log(data)
    })
  }
}
</script>

<style lang="scss">
</style>
