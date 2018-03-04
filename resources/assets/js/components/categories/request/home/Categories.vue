<style scoped>
</style>
<template>
    <section id="visual-menu" class="col-lg-12 col-md-12 col-sm-12 hidden-xs">
        <div class="container">

            <!-- Block Title -->
            <h2 class="block-title text-center margin-bottom-2x">
                Categories
                <small> Lighting </small>
            </h2>
            <!-- Block Title END -->

            <div class="row">
                <div v-for="category in categories.data" class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                    <div class="tile tile-visual-menu">
                        <a v-bind:href="locale + category.link" class="preview-box">
                            <img v-bind:src="category.image" alt="">
                            <div class="tile-title">{{ category.name }}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        beforeMount () {
            let self = this;

            // Send a POST request
            axios.post('get-categories')
            .then(function (response) {
                // Update Instance Data
                self.updateData(response.data);

            })
            .catch(function () {
            });
        },

        data() {
            return {
                categories : [],
                locale     : trans.locale + '/'
            }
        },

        methods: {
            updateData(response) {
                this.categories = response;
            }
        },
    }
</script>
