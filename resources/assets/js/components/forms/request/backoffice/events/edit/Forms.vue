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
                        <p v-if="success">The event was successfully edited</p>
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
                            <h4 class="title">Edit Events</h4>
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
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.title.value)}">
                                            <label>{{ payload.title.label }}</label>
                                            <p id="trans-title" style="display: none">{{ trans(payload.title.post) }}</p>

                                            <input v-model="payload.title.post" :name=payload.title.value  v-validate :data-vv-rules=payload.title.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.title.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.title.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.title.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.subTitle.value)}">
                                            <label>{{ payload.subTitle.label }}</label>
                                            <p id="trans-subTitle" style="display: none">{{ trans(payload.subTitle.post) }}</p>

                                            <input v-model="payload.subTitle.post" :name=payload.subTitle.value  v-validate :data-vv-rules=payload.subTitle.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.subTitle.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.subTitle.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.subTitle.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.text.value)}">
                                            <label>{{ payload.text.label }}</label>
                                            <p id="trans-text" style="display: none">{{ trans(payload.text.post) }}</p>

                                            <textarea rows="5" v-model="payload.text.post" :name=payload.text.value  v-validate :data-vv-rules=payload.text.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.text.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.text.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.text.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.beginDate.value)}">
                                            <label>{{ payload.beginDate.label }}</label>
                                            <input id="begin-date" :name=payload.beginDate.value v-model="payload.beginDate.post"  v-validate :data-vv-rules=payload.beginDate.rules :data-vv-validate-on="validateForm" type="text" class="input form-control datepicker">
                                            <span v-show="errors.has(payload.beginDate.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.beginDate.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.beginDate.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.endDate.value)}">
                                            <label>{{ payload.endDate.label }}</label>
                                            <input id="end-date" :name=payload.endDate.value v-model="payload.endDate.post"  v-validate :data-vv-rules=payload.endDate.rules :data-vv-validate-on="validateForm" type="text" class="input form-control datepicker">
                                            <span v-show="errors.has(payload.endDate.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.endDate.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.endDate.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <label class="control-label">Image</label>
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(uploadFiles.image.value)}">
                                            <span v-show="errors.has(uploadFiles.image.value)" class="material-icons form-control-feedback">clear</span>
                                            <droply id="dropZoneImage"
                                                    ref="dropZoneImage"
                                                    url="/post"
                                                    :autoProcessQueue="false"
                                                    :maxNumberOfFiles="1"
                                                    upload-message-text="Drop file(s) to upload <br><strong>or click</strong>">
                                            </droply>
                                        </div>
                                        <span v-show="errors.has(uploadFiles.image.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(uploadFiles.image.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.imageAlt.value)}">
                                            <label class="control-label">{{ payload.imageAlt.label }}</label>
                                            <input v-model="payload.imageAlt.post" :name=payload.imageAlt.value  v-validate :data-vv-rules=payload.imageAlt.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.imageAlt.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.imageAlt.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.imageAlt.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card card-shadow">
                                            <div class="card-header" data-background-color="red" style="margin-bottom: 20px;">
                                                <h5 style="float: right" class="title">Images</h5>

                                                <div class="card-nav-tabs card-plain">
                                                    <div class="header header-danger">
                                                        <div class="nav-tabs-navigation">
                                                            <div class="nav-tabs-wrapper">
                                                                <ul class="nav nav-tabs text-center" data-tabs="tabs">
                                                                    <li class="active">
                                                                        <a v-bind:href="'#image-nav-' + payload.id.post" data-toggle="tab">1</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="content">
                                                <div class="tab-content text-center">
                                                    <div class="tab-pane active" v-bind:id="'image-nav-' + payload.id.post">
                                                        <label style="padding-bottom: 20px;"></label>

                                                        <div>
                                                            <div class="card-image">
                                                                <a>
                                                                    <img class="img" v-bind:src="'/' + payload.images.post">
                                                                </a>
                                                                <div class="card-actions">
                                                                </div>
                                                            </div>
                                                            <button @click="editImage()" type="button" class="btn btn-success btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Edit">
                                                                <i class="material-icons">edit</i>
                                                            </button>
                                                            <h5 style="color:#EC1B33;" class="card-title">
                                                                Alt
                                                            </h5>
                                                            {{ trans(payload.images.alt) }}
                                                            <div style="margin-top: 0; margin-bottom: 20px;" class="form-group label-floating col-md-12">
                                                                <input v-bind:id="'image-alt-'+ this.payload.id.post" type="text" class="input form-control">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End Tabs on plain Card -->
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Edit Events</button>
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

    import Droply from 'droply'

    export default {
        components: {
            'droply': Droply
        },

        data() {
            return {
                isLoading: true,
                success: false,
                customError: null,
                processQueue: false,
                showRemoveAllButton: false,
                validateForm: 'none',
                uploadFiles: {
                    image : {
                        fieldType: 'text-field',
                        label : 'Image',
                        value : 'image',
                        rules : 'required',
                        post  : null,
                    }
                },
                payload: {
                    images         : {
                        fieldType: 'text-field',
                        label : 'Images',
                        value : 'images',
                        alt   : null,
                        rules : '',
                        post  : null,
                        data  : [],
                    },
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
                    subTitle         : {
                        fieldType: 'text-field',
                        label : 'Sub Title',
                        value : 'subTitle',
                        rules : 'required',
                        post  : null,
                    },
                    text         : {
                        fieldType: 'text-field',
                        label : 'Text',
                        value : 'text',
                        rules : 'required',
                        post  : null,
                    },
                    beginDate         : {
                        fieldType: 'text-field',
                        label : 'Begin-date',
                        value : 'beginDate',
                        rules : 'required',
                        post  : null,
                    },
                    endDate         : {
                        fieldType: 'text-field',
                        label : 'End-date',
                        value : 'endDate',
                        rules : 'required',
                        post  : null,
                    },
                    imageAlt         : {
                        fieldType: 'text-field',
                        label : 'Image Alt',
                        value : 'imageAlt',
                        rules : '',
                        post  : null,
                    },
                }
            }
        },

        methods: {
            checkValidDate (dateFrom = window.moment(), dateTo = window.moment()) {
                let flag = true;

                let date = {};
                date.dateFrom      = dateFrom.format('YYYY-MM-DD');
                date.dateTo        = dateTo.format('YYYY-MM-DD');

                // If Date Range is valid do a request otherwise throw a exception
                if (date.dateFrom  > date.dateTo ||
                    date.dateFrom === 'Invalid date' ||
                    date.dateTo === 'Invalid date') {

                    this.$validator.errors.add('beginDate', 'Please select a valid date range.', 'required');
                    this.$validator.errors.add('endDate', 'Please select a valid date range.', 'required');

                    flag = false;
                }

                return flag;

            },

            payloadMount () {
                let request = this.payload;
                let payload = new FormData();

                // Add payload form inputs
                Object.keys(request).forEach(function (value) {
                    payload.append(value, request[value].post)
                });

                if (this.payload.language.post === 'en') {

                    // Add Images form inputs
                    let counterImage = 0;
                    for (counterImage; counterImage < this.$refs.dropZoneImage.getQueuedFiles().length; counterImage++) {
                        payload.append("image", this.$refs.dropZoneImage.getQueuedFiles()[counterImage]);
                    }

                }

                return payload;
            },

            validateBeforeSubmit() {
                this.payload.beginDate.post = $('#begin-date').val();
                this.payload.endDate.post   = $('#end-date').val();

                this.$validator.validateAll().then((result) => {

                    if (result &&
                        this.checkValidDate(window.moment($('#begin-date').val()), window.moment($('#end-date').val()))) {

                        this.editEvent();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            loadComboBox () {
                this.$nextTick(function () {
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                });
            },

            editImage () {
                let self = this;

                self.customError = null;

                let payload = {}
                    payload.lang      = this.payload.language.post;
                    payload.imageAlt  = $('#image-alt-' + this.payload.id.post).val();
                    payload.eventId = this.payload.id.post;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-events-image',
                    data: payload
                })

                .then(function (response) {
                    window.location.href = window.location.pathname;
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();
                });
            },

            getEvent () {
                let self = this;

                // Start Loader
                self.isLoading = true;

                let payload = {};

                payload.id = parseInt(window.location.pathname.split("/").pop());

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/events/actions/edit/' + payload.id ,
                    data: payload,
                })

                .then(function (response) {
                    self.customError = null;

                    self.setEventToEdit(response.data);
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();

                });
            },

            setEventToEdit (response) {
                this.payload.id.post              = response.event.id;
                this.payload.title.post           = response.event.title;
                this.payload.subTitle.post        = response.event.subTitle;
                this.payload.text.post            = response.event.text;

                this.payload.beginDate.post       = moment(response.event.beginDate).format('YYYY-MM-DD');
                this.payload.endDate.post         = moment(response.event.endDate).format('YYYY-MM-DD');

                // Images
                this.payload.images.post          = response.event.image;
                this.payload.images.alt           = response.event.alt;

                this.$nextTick(function () {
                    this.payload.title.post       = $('#trans-title').text();
                    this.payload.subTitle.post    = $('#trans-subTitle').text();
                    this.payload.text.post        = $('#trans-text').text();

                    // Stop Loader
                    this.isLoading = false;
                });
            },

            editEvent () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-events',
                    data: payload,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
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
            window.loaderLadda = Ladda.create(document.querySelector( '.ladda-button'));

            // Get Event
            this.getEvent();

            // Get Languages
            this.getLanguagesList();
        }

    }
</script>
