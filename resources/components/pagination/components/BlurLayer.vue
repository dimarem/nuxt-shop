<template>
  <div class="blur-layer" />
</template>

<style lang="scss" scoped>
.blur-layer {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000, $alpha: .75);
}
</style>
