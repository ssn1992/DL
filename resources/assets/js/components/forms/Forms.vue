<template>
    <div  class="padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="container">
            <div class="row">
                <h4 style="color: #EC1B33" class="modal-title text-center">DOWNLOAD NOW</h4>

                <form @submit.prevent="validateBeforeSubmit(payload)" id="form-section-projects" enctype="multipart/form-data">
                    <p style="color: #4d4c4c">Just fill in your details below and download the Ebook </p>

                    <div v-for="(data, index) in payload" v-model="payload">
                        <div v-if="data.fieldType == 'text-field'" class="form-group col-lg-6 padding-bottom" :class="{'has-error': errors.has(data.value)}">
                            <label class="label">{{ data.label }}</label>
                            <input v-model="data.post" :name=data.value  v-validate :data-vv-rules=data.rules :data-vv-validate-on="validateForm" class="form-control text-center margin-bottom-none" type="text" :placeholder="data.label"/>


                            <span v-show="errors.has(data.value)" class="help-block text-danger text-center">
                                <strong>{{ errors.first(data.value) }}</strong>
                            </span>
                        </div>


                    </div>

                    <div class="col-lg-12">
                        <button  class="ladda-button ladda-button-selector btn btn-primary" data-style="zoom-in" type="submit">Submit
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
    // VeeValidate import
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);

    export default {
        data() {
            return {
                validateForm: 'none',
                payload: {
                    projectName         : {
                        fieldType: 'text-field',
                        label : 'Name',
                        value : 'projectName',
                        rules : 'required',
                        post  : null,
                    },
                    projectImage         : {
                        fieldType: 'text-field',
                        label : 'Image',
                        value : 'projectImage',
                        rules : 'required',
                        post  : null,
                    },
                }
            }
        },

        methods: {
            validateBeforeSubmit(request) {
                console.log('validator');
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        var payload        = {};

                        Object.keys(request).forEach(function (value) {
                            payload[value] = request[value].post;
                        });

                        this.addProject(payload);

                        console.log(payload);
                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            addProject (payload) {
                var formData = new FormData();
                formData.append('image', this.payload.projectImage);

                console.log(payload);

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'add-project',
                    data: formData,
                })

                .then(function (response) {

                })
                .catch(function (error) {
                });
            },
        },

        mounted() {
            var instance = this;
            // Send a POST request
            axios.post('get-example')

            .then(function (response) {
                console.log('success');
                console.log(response.data.example.value);

                // Update Instance Data
                instance.transVue = response.data.example.value

            })
            .catch(function (error) {
                // Update Instance Data with error
                console.log('error')
            });
        }

    }
</script>
