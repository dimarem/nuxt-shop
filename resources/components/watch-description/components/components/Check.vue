<template>
  <div />
</template>

<style lang="scss" scoped>
div {
  position: relative;
  width: 1rem;
  height: .5rem;
  transform: translateY(-.25rem) rotate(-45deg);

  &::before, &::after {
    content: "";
    position: absolute;
    left: 0;
    background-color: white;
    transform-origin: left top;
  }

  &::before {
    top: 0;
    width: 2px;
    height: 100%;
    transform: scaleY(0);
    animation: scale-before .15s forwards;
  }

  &::after {
    bottom: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    animation: scale-after .35s .15s forwards;
  }
}

@keyframes scale-before {
  0% {
    transform: scaleY(0);
  } 100% {
    transform: scaleY(1);
  }
}

@keyframes scale-after {
  0% {
    transform: scaleX(0);
  } 100% {
    transform: scaleX(1);
  }
}
</style>
