<template>
  <div id="app-one">
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
  #app-one {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }
</style>
