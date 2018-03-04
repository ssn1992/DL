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

    .card.card-shadow {
        -webkit-box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.12),
        0 4px 20px 0px rgba(0, 0, 0, 0.12),
        0 7px 8px -5px rgba(0, 0, 0, 0.12)!important;

        box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.12),
        0 4px 20px 0px rgba(0, 0, 0, 0.12),
        0 7px 8px -5px rgba(0, 0, 0, 0.12)!important;
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
                        <p v-if="success">The Seo was successfully edited</p>
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

                    <!-- Loader -->
                    <div id="isLoading" v-if="isLoading">
                        <div>
                            <div class="vue-simple-spinner"></div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header" data-background-color="red">
                            <h4 class="title">Edit Seo</h4>
                            <p class="category">Complete the following form</p>
                        </div>
                        <div class="card-content">
                            <form @submit.prevent="validateBeforeSubmit()" id="form-section-projects" enctype='multipart/form-data'>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="col-md-offset-4 col-md-3">
                                            <div class="text-center" :class="{'has-error': errors.has(payload.language.value)}">
                                                <label>{{ payload.language.label }}</label>

                                                <select v-model="payload.language.post" :name=payload.language.value  v-validate :data-vv-rules=payload.language.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                    <option style="text-transform: uppercase;" :value="values" v-for="values in payload.language.data">

                                                        <span v-bind:id="values"></span>

                                                        {{ values }}
                                                    </option>
                                                </select>

                                                <span v-show="errors.has(payload.language.value)" class="material-icons form-control-feedback">clear</span>
                                            </div>
                                            <span v-show="errors.has(payload.language.value)" class="help-block text-danger text-center">
                                                <strong>{{ errors.first(payload.language.value) }}</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.title.value)}">
                                            <label>{{ payload.title.label }}</label>
                                            <p id="title-trans" style="display: none">{{ trans(payload.title.post) }}</p>

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
                                            <label>{{ payload.keywords.label }}</label>
                                            <p id="keywords-trans" style="display: none">{{ trans(payload.keywords.post) }}</p>

                                            <input v-model="payload.keywords.post" :name=payload.keywords.value  v-validate :data-vv-rules=payload.keywords.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.keywords.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.keywords.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.keywords.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.campaignHeader.value)}">
                                            <label>{{ payload.campaignHeader.label }}</label>
                                            <textarea rows="5" v-model="payload.campaignHeader.post" :name=payload.campaignHeader.value  v-validate :data-vv-rules=payload.campaignHeader.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.campaignHeader.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.campaignHeader.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.campaignHeader.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.campaignBody.value)}">
                                            <label>{{ payload.campaignBody.label }}</label>
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
                                            <label>{{ payload.description.label }}</label>
                                            <p id="description-trans" style="display: none">{{ trans(payload.description.post) }}</p>

                                            <textarea rows="5" v-model="payload.description.post" :name=payload.description.value  v-validate :data-vv-rules=payload.description.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.description.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.description.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.description.value) }}</strong>
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Edit Seo</button>
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
                isLoading: true,
                success: false,
                customError: null,
                processQueue: false,
                showRemoveAllButton: false,
                validateForm: 'none',
                payload: {
                    id         : {
                        fieldType: 'text-field',
                        label : 'Id',
                        value : 'id',
                        rules : '',
                        post  : null,
                    },
                    language         : {
                        fieldType   : 'text-field',
                        defaultLang : null,
                        label       : 'Languages',
                        value       : 'language',
                        rules       : 'required',
                        post        : 'en',
                        data        : []
                    },
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

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {

                    if (result) {

                        this.editSeo();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            setSeoToEdit (response) {
                this.payload.id.post              = response.seo.id;
                this.payload.title.post           = response.seo.title;
                this.payload.keywords.post        = response.seo.keywords;
                this.payload.description.post     = response.seo.description;
                this.payload.campaignHeader.post  = response.seo.campaignHeader;
                this.payload.campaignBody.post    = response.seo.campaignBody;

                this.$nextTick(function () {
                    this.payload.title.post        = $('#title-trans').text();
                    this.payload.keywords.post     = $('#keywords-trans').text();
                    this.payload.description.post  = $('#description-trans').text();

                    // Stop Loader
                    this.isLoading = false;
                });
            },

            loadComboBox () {
                this.$nextTick(function () {
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                });
            },

            getSeo () {
                let self = this;

                // Start Loader
                self.isLoading = true;

                let payload = {};
                payload.id = parseInt(window.location.pathname.split("/").pop());

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/seo/actions/edit/' + payload.id ,
                    data: payload,
                })

                .then(function (response) {
                    self.customError = null;

                    self.setSeoToEdit(response.data);
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();

                });
            },

            editSeo () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-seo',
                    data: payload,
                })

                .then(function () {
                    window.location.href = window.location.pathname;
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

            getLanguagesList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'languages-list',
                })

                .then(function (response) {
                    self.customError = null;
                    var parts  = window.location.pathname.split('/')
                    self.payload.language.defaultLang = parts[5];
                    self.payload.language.data = response.data.languages;
                    self.payload.language.post = parts[5];

                    self.loadComboBox();
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();
                });
            },

            setLanguage (language) {
                let self = this;
                let payload = {}
                payload.lang = language;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'set-language',
                    data: payload,
                })

                .then(function (response) {
                    self.customError = null;

                    var parts  = window.location.pathname.split('/')
                    // change segments
                    parts[4] = 'edit';
                    parts[5] = self.payload.language.post;
                    parts[6] = self.payload.id.post;
                    var url = parts.join('/')

                    window.location.href = url;
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();
                });
            },
        },

        watch: {
            'payload.language.post': function(val, oldVal){
                if (this.payload.language.post != this.payload.language.defaultLang) {
                    this.setLanguage(this.payload.language.post);
                }
            }
        },

        mounted() {
            window.loaderLadda = Ladda.create(document.querySelector('.ladda-button'));

            // Get Languages
            this.getLanguagesList();

            // Get Seo
            this.getSeo();
        }

    }
</script>
