<style scoped>
</style>
<template>
    <section class="padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="container">
            <!-- Block Title -->
            <h2 class="block-title text-center margin-bottom-2x">
                Projects
                <small>Design</small>
            </h2>
            <!-- Block Title END -->

            <div class="row">
                <div v-for="project in projects.data" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div class="tile tile-banner">
                        <a href="#" class="preview-box">
                            <img v-bind:src="project.image" v-bind:alt="project.alt">

                            <div class="banner-meta text-light text-center">
                                <!-- <h4 class="title">{{ trans('projects.' + project.id + '_name')}}</h4> -->

                                <h4 class="title">{{ trans(project.name)}}</h4>


                                <!-- <h4 class="title">{{ project.title }}</h4> -->

                                <span>{{ trans(project.subTitle)}}</span>
                            </div>
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
            axios.post('get-projects-featured')
            .then(function (response) {
                // Update Instance Data
                self.updateData(response.data);

            })
            .catch(function (error) {
                // Update Instance Data with error
                console.log("error");
            });
        },

        data() {
            return {
                projects : []
            }
        },

        methods: {
            updateData(response) {
                this.projects = response;
            }

        },
    }
</script>
