<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <Loader v-if="!fetching"/>
        <additional-services-list v-else-if="fetching && workshops.length" :workshops="workshops"/>
        <p v-else-if="!workshops.length && fetching" style="font-size: 24px; text-align: center">Вы приобрели все доступные дополнительные товары</p>
      </div>
    </div>
  </div>
</template>

<script>
    import AdditionalServicesList from "@/components/OrderCart/AdditionalServices/AdditionalServicesList";
    import axios from "axios";
    import Loader from "../../UI/Loader";

    export default {
        name: "OrderCartWorkshops",
        data() {
            return {
                workshops: [],
                fetching: false,
            }
        },
        components: {
            Loader,
            AdditionalServicesList
        },
        created() {
            axios
                .get('/api/catalog/workshops/')
                .then(res => {
                    if (res.data.status === "ok") {
                        this.workshops = res.data.items
                        this.fetching = true;
                    }
                })
        }
    }
</script>

<style scoped>

</style>