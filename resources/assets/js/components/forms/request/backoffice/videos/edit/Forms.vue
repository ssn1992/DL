<style scoped>
    .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
        cursor: auto;
    }
    .form-group .help-block {
        display: block;
    }
    .check.form-control::after {
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
                        <p v-if="success">The video was successfully edited</p>
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
                            <h4 class="title">Edit Videos</h4>
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
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.name.value)}">
                                            <label>{{ payload.name.label }}</label>
                                            <p id="name-trans" style="display: none">{{ trans(payload.name.post) }}</p>

                                            <input v-model="payload.name.post" :name=payload.name.value  v-validate :data-vv-rules=payload.name.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.name.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.name.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.name.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.videoUrl.value)}">
                                            <label>{{ payload.videoUrl.label }}</label>
                                            <input v-model="payload.videoUrl.post" :name=payload.videoUrl.value  v-validate :data-vv-rules=payload.videoUrl.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.videoUrl.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.videoUrl.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.videoUrl.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-sm-12">
                                        <div class="form-group" :class="{'has-error': errors.has(payload.cat.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.cat.label }} </label>
                                            </div>

                                            <div v-for="data in payload.cat.data" class="col-lg-3">
                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" v-model="payload.cat.post" :name=payload.cat.value v-validate v-bind:value=data.value :data-vv-rules=payload.cat.rules :data-vv-validate-on="validateForm"><span class="circle"></span><span class="check form-control"></span>
                                                        {{ data.label }}
                                                    </label>
                                                </div>
                                            </div>
                                            <span v-show="errors.has(payload.cat.value)" class="material-icons form-control-feedback">clear</span>

                                            <div class="col-lg-12">
                                                <span v-show="errors.has(payload.cat.value)" class="help-block text-danger text-center radio-button-error" style="width: 100%">
                                                    <strong>{{ errors.first(payload.cat.value) }}</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="form-group label-floating" :class="{'has-error': errors.has(payload.details.value)}">
                                                <label> {{ payload.details.label }}</label>
                                                <p id="details-trans" style="display: none">{{ trans(payload.details.post) }}</p>

                                                <textarea v-model="payload.details.post" rows="5" :name=payload.details.value  v-validate :data-vv-rules=payload.details.rules :data-vv-validate-on="validateForm"  class="input form-control"></textarea>
                                                <span v-show="errors.has(payload.details.value)" class="material-icons form-control-feedback">clear</span>
                                            </div>
                                        </div>
                                        <span v-show="errors.has(payload.details.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.details.value) }}</strong>
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Edit Video</button>
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

    const youtubeUrl = require('youtube-url');

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
                    name         : {
                        fieldType: 'text-field',
                        label : 'Name',
                        value : 'name',
                        rules : 'required',
                        post  : null,
                    },
                    videoUrl         : {
                        fieldType: 'text-field',
                        label : 'URL',
                        value : 'videoUrl',
                        rules : 'required',
                        post  : null,
                    },
                    details         : {
                        fieldType: 'text-field',
                        label : 'Details',
                        value : 'details',
                        rules : 'required',
                        post  : null,
                    },
                    cat         : {
                        fieldType: 'text-field',
                        label : 'Category',
                        value : 'cat',
                        rules : 'required',
                        post  : null,
                        data   : [],
                    },
                }
            }
        },

        methods: {
            validateYouTubeVideoUrl(videoUrl) {
                if (youtubeUrl.extractId(videoUrl) === false) {
                    this.$validator.errors.add('videoUrl', 'The Video Url is invalid.', 'required');
                    return false
                } else {
                    this.errors.remove('videoUrl');
                    this.payload.videoUrl.post = youtubeUrl.extractId(videoUrl);
                }
            },

            payloadMount () {
                let request = this.payload;
                let payload = {};

                // Add payload form inputs
                Object.keys(request).forEach(function (value) {
                    payload[value] = request[value].post;
                });

                return payload;
            },

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result && this.validateYouTubeVideoUrl(this.payload.videoUrl.post) != false) {

                        this.editVideo();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            setVideoToEdit (response) {
                this.payload.id.post              = response.video.id;
                this.payload.name.post            = response.video.name;
                this.payload.videoUrl.post        = response.video.url;
                this.payload.cat.post             = response.video.cat;
                this.payload.details.post         = response.video.details;

                this.$nextTick(function () {
                    this.payload.name.post        = $('#name-trans').text();
                    this.payload.details.post     = $('#details-trans').text();

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

            getVideo () {
                let self = this;

                // Start Loader
                self.isLoading = true;

                let payload = {};
                    payload.id = parseInt(window.location.pathname.split("/").pop());

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/videos/actions/edit/' + payload.id ,
                    data: payload,
                })

                .then(function (response) {
                    self.customError = null;

                    self.setVideoToEdit(response.data);
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();

                });
            },

            editVideo () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-videos',
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

            getCatList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'get-categories-videos',
                })

                .then(function (response) {
                    console.log(response);
                    self.payload.cat.data = response.data.cats.data;

                })
                .catch(function (error) {
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
            window.loaderLadda = Ladda.create(document.querySelector( '.ladda-button'));

            // Get Cat list
            this.getCatList();

            // Get Languages
            this.getLanguagesList();

            // Get Video
            this.getVideo();
        }

    }
</script>
