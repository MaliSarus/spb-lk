<template>
  <ul>
    <additional-services-item v-for="workshop in workshops" :workshop="workshop" :key="workshop.id"/>
  </ul>
</template>

<script>
    import AdditionalServicesItem from "./AdditionalServicesItem";

    export default {
        name: "AdditionalServicesList",
        components: {AdditionalServicesItem},
        props: ['workshops']
    }
</script>

<style lang="scss" scoped>
  ul {
    margin: 0;
    padding: 0;
  }

</style>