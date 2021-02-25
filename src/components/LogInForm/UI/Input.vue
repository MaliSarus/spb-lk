<template>
  <div class="form__input">
    <label :for="inputId">{{   label }}</label>
    <input :type="inputType" :id="inputId">
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ['inputId', 'inputType','label']
}
</script>

<style scoped>

</style>