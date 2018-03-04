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
                        <p v-if="success">The event was successfully added</p>
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
                            <h4 class="title">Add Events</h4>
                            <p class="category">Complete the following form</p>
                        </div>
                        <div class="card-content">
                            <form @submit.prevent="validateBeforeSubmit()" id="form-section-projects" enctype='multipart/form-data'>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.title.value)}">
                                            <label class="control-label">{{ payload.title.label }}</label>
                                            <input v-model="payload.title.post" :name=payload.title.value  v-validate :data-vv-rules=payload.title.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.title.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.title.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.title.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.subTitle.value)}">
                                            <label class="control-label">{{ payload.subTitle.label }}</label>
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
                                            <label class="control-label">{{ payload.text.label }}</label>
                                            <textarea rows="5" v-model="payload.text.post" :name=payload.text.value  v-validate :data-vv-rules=payload.text.rules :data-vv-validate-on="validateForm" type="text" class="input form-control"></textarea>
                                            <span v-show="errors.has(payload.text.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.text.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.text.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.beginDate.value)}">
                                            <label >{{ payload.beginDate.label }}</label>
                                            <input id="begin-date" :name=payload.beginDate.value  v-validate :data-vv-rules=payload.beginDate.rules :data-vv-validate-on="validateForm" type="text" class="input form-control datepicker">
                                            <span v-show="errors.has(payload.beginDate.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.beginDate.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.beginDate.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.endDate.value)}">
                                            <label>{{ payload.endDate.label }}</label>
                                            <input id="end-date" :name=payload.endDate.value  v-validate :data-vv-rules=payload.endDate.rules :data-vv-validate-on="validateForm" type="text" class="input form-control datepicker">
                                            <span v-show="errors.has(payload.endDate.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.endDate.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.endDate.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
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
                                <div class="row">
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

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Add Events</button>
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
                        rules : 'required',
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

                // Add Images form inputs
                let counterImage = 0;
                for (counterImage; counterImage < this.$refs.dropZoneImage.getQueuedFiles().length; counterImage++) {
                    payload.append("image", this.$refs.dropZoneImage.getQueuedFiles()[counterImage]);
                }

                return payload;
            },

            cleanForm () {
                let self = this;

                //Clean Form
                Object.keys(self.payload).forEach(function (value) {
                    self.payload[value].post = null
                });

                $('#begin-date').val(null);
                $('#end-date').val(null);

                self.$refs.dropZoneImage.removeAllFiles();
            },

            validateBeforeSubmit() {
                this.payload.beginDate.post = $('#begin-date').val();
                this.payload.endDate.post   = $('#end-date').val();

                this.$validator.validateAll().then((result) => {
                    if (this.$refs.dropZoneImage.getQueuedFiles().length === 0) {
                        this.$validator.errors.add('image', 'The image file field is required.', 'required');
                    } else {
                        this.errors.remove('image');
                    }

                    if (result &&
                        (this.$refs.dropZoneImage.getQueuedFiles().length > 0) &&
                        this.checkValidDate(window.moment($('#begin-date').val()), window.moment($('#end-date').val()))) {

                        this.addEvent();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            addEvent () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'add-event',
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
            window.loaderLadda = Ladda.create(document.querySelector( '.ladda-button'));
        }

    }
</script>
