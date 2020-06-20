<template>
  <button>
    <div class="lines">
      <div class="line" />
      <div class="line" />
      <div class="line" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: $light-blue;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11),
              0 2px 2px rgba(0,0,0,0.11),
              0 4px 4px rgba(0,0,0,0.11),
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);
  transform: translateX(-50%);
  transition: .3s ease-out;
}

.line {
  height: 2px;
  width: 20px;
  background-color: white;

  &:not(:last-of-type) {
    margin-bottom: 3px;
  }
}
</style>
