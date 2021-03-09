<template>
  <div class="personal-cab__control control">
    <router-link :to="to" class="control__block">
      <div class="control__title">
        <slot name="control-title">Заголовок</slot>
      </div>
      <div class="control__desc">
        <div class="control__image">
          <img :src="iconSrc" alt="">
        </div>
        <div class="control__text">
          <slot name="control-text">Текст</slot>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "ControlItem",
    props:['to', 'iconSrc']
  }
</script>

<style scoped>

</style>