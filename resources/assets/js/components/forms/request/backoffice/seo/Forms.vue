<style scoped>
    .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
        cursor: auto;
    }
    .form-group .help-block {
        display: block;
    }
    span.check::after {
        animation: unset!important;
    }
    span.check form-control::after {
        animation: unset!important;
    }

    @media (max-width: 480px), (max-width: 767px) {
        .form-group .form-control {
            width: 100% !important;
        }
    }
</style>
<template>
    <div class="content">

        <!-- Modal Core -->
        <div class="modal fade" id="modal-response" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                        <h4 v-if="success" class="modal-title text-center" id="myModalLabel">Success</h4>
                        <h4 v-else class="modal-title text-center" id="myModalLabel">Error</h4>

                    </div>
                    <div class="modal-body text-center">
                        <p v-if="success">The Seo was successfully added</p>
                        <p v-else-if="customError != null">{{ customError }}</p>
                        <p v-else>An error has occurred please try again later</p>

                        <div>
                            <i v-if="success" style="font-size: 35px; color: #2ab27b" class="material-icons">&#xE876;</i>
                            <i v-else style="font-size: 35px; color: #EC1B33" class="material-icons">&#xE000;</i>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header" data-background-color="red">
                            <h4 class="title">Add Seo</h4>
                            <p class="category">Complete the following form</p>
                        </div>
                        <div class="card-content">
                            <form @submit.prevent="validateBeforeSubmit()" id="form-section-projects" enctype='multipart/form-data'>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.title.value)}">
                                            <label class="control-label">{{ payload.title.label }}</label>
                                            <input v-model="payload.title.post" :name=payload.title.value  v-validate :data-vv-rules=payload.title.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.title.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.title.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.title.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.keywords.value)}">
                                            <label class="control-label">{{ payload.keywords.label }}</label>
                                            <input v-model="payload.keywords.post" :name=payload.keywords.value  v-validate :data-vv-rules=payload.keywords.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.keywords.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.keywords.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.keywords.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.campaignHeader.value)}">
                                            <label class="control-label">{{ payload.campaignHeader.label }}</label>
                                            <textarea rows="5" v-model="payload.campaignHeader.post" :name=payload.campaignHeader.value  v-validate :data-vv-rules=payload.campaignHeader.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.campaignHeader.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.campaignHeader.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.campaignHeader.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.campaignBody.value)}">
                                            <label class="control-label">{{ payload.campaignBody.label }}</label>
                                            <textarea rows="5" v-model="payload.campaignBody.post" :name=payload.campaignBody.value  v-validate :data-vv-rules=payload.campaignBody.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.campaignBody.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.campaignBody.value)" class="help-block text-danger text-center">
                                                <strong>{{ errors.first(payload.campaignBody.value) }}</strong>
                                            </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.description.value)}">
                                            <label class="control-label">{{ payload.description.label }}</label>
                                            <textarea rows="5" v-model="payload.description.post" :name=payload.description.value  v-validate :data-vv-rules=payload.description.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.description.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.description.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.description.value) }}</strong>
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Add Seo</button>
                                <div class="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
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
                success: false,
                customError: null,
                processQueue: false,
                showRemoveAllButton: false,
                validateForm: 'none',
                payload: {
                    title         : {
                        fieldType: 'text-field',
                        label : 'Title',
                        value : 'title',
                        rules : 'required',
                        post  : null,
                    },
                    keywords         : {
                        fieldType: 'text-field',
                        label : 'Keywords',
                        value : 'keywords',
                        rules : 'required',
                        post  : null,
                    },
                    description         : {
                        fieldType: 'text-field',
                        label : 'Description',
                        value : 'description',
                        rules : 'required',
                        post  : null,
                    },
                    campaignHeader         : {
                        fieldType: 'text-field',
                        label : 'Campaign Header',
                        value : 'campaignHeader',
                        rules : '',
                        post  : null,
                    },
                    campaignBody         : {
                        fieldType: 'text-field',
                        label : 'Campaign Body',
                        value : 'campaignBody',
                        rules : '',
                        post  : null,
                    },
                }
            }
        },

        methods: {
            payloadMount () {
                let request = this.payload;
                let payload = new FormData();

                // Add payload form inputs
                Object.keys(request).forEach(function (value) {
                    payload.append(value, request[value].post)
                });

                return payload;
            },

            cleanForm () {
                let self = this;

                //Clean Form
                Object.keys(self.payload).forEach(function (value) {
                    self.payload[value].post = null
                });
            },

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {

                    if (result) {

                        this.addSeo();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            addSeo () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'add-seo',
                    data: payload,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                .then(function (response) {
                    self.success     = true;
                    self.customError = null;
                    window.loaderLadda.stop();
                    $("#modal-response").modal();

                    // Clean Form after submit
                    self.cleanForm();


                })
                .catch(function (error) {
                    self.success = false;

                    if (error.response.status === 409) {
                        self.customError = error.response.data.message;
                    } else {
                        self.customError = null;
                    }

                    window.loaderLadda.stop();
                    $("#modal-response").modal();
                });
            },
        },

        mounted() {
            window.loaderLadda = Ladda.create(document.querySelector('.ladda-button'));
        }

    }
</script>
