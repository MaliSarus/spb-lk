<template>
  <li>
    {{workshop.name}}:{{workshop.price.basePrice}}
  </li>
</template>

<script>
  export default {
    name: "AdditionalServicesItem",
    props:['workshop']
  }
</script>

<style scoped>

</style>