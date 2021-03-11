<template>
    <div class="personal-cab__user-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="personal-cab__user-data">
                        <div class="personal-cab__subtitle">
                            Персональная информация
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="user-data__form form">
                        <file-selector
                                accept-extensions=".jpg,.svg"
                                :multiple="false"
                                :max-file-size="5 * 1024 * 1024"
                                @changed="handleFilesChanged"
                        >
                            <template v-slot:loader>ЗАГРУЗКА</template>
                            Выбрать файл
                        </file-selector>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ChangeFIO",
        methods: {

            handleFilesChanged(files) {
                console.log('Selected files: ');
                console.log(files[0]);
            },
        },
    }
</script>

<style scoped>

</style>