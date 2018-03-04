<style lang="scss" scoped>
    .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
        cursor: auto;
    }
    .card form [class*="col-"] {
        padding-left: 15px!important;
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
                        <p v-if="success">The Press Release was successfully added</p>
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
                            <h4 class="title">Add Press Releases</h4>
                            <p class="category">Complete the following form</p>
                        </div>
                        <div class="card-content">
                            <form @submit.prevent="validateBeforeSubmit()" id="form-section-projects" enctype='multipart/form-data'>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.name.value)}">
                                            <label class="control-label">{{ payload.name.label }}</label>
                                            <input v-model="payload.name.post" :name=payload.name.value  v-validate :data-vv-rules=payload.name.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.name.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.name.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.name.value) }}</strong>
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
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label">PDF</label>
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(uploadFiles.pdf.value)}">
                                            <span v-show="errors.has(uploadFiles.pdf.value)" class="material-icons form-control-feedback">clear</span>
                                            <droply id="dropZonePdf"
                                                    ref="dropZonePdf"
                                                    url="/post"
                                                    :autoProcessQueue="false"
                                                    :maxNumberOfFiles="1"
                                                    :maxFileSizeInMB="64"
                                                    :acceptedFileTypes="'.pdf'"
                                                    upload-message-text="Drop file to upload <br><strong>or click</strong>">
                                            </droply>
                                        </div>
                                        <span v-show="errors.has(uploadFiles.pdf.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(uploadFiles.pdf.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="form-group label-floating" :class="{'has-error': errors.has(payload.details.value)}">
                                                <label class="control-label"> {{ payload.details.label }}</label>
                                                <textarea v-model="payload.details.post" rows="5" :name=payload.details.value  v-validate :data-vv-rules=payload.details.rules :data-vv-validate-on="validateForm"  class="input form-control"></textarea>
                                                <span v-show="errors.has(payload.details.value)" class="material-icons form-control-feedback">clear</span>
                                            </div>
                                        </div>
                                        <span v-show="errors.has(payload.details.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.details.value) }}</strong>
                                        </span>
                                    </div>
                                </div>

                                    <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Add Press Release</button>
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
                    },
                    pdf : {
                        fieldType: 'text-field',
                        label : 'PDF',
                        value : 'pdf',
                        rules : 'required',
                        post  : null,
                    },
                },
                payload: {
                    name         : {
                        fieldType: 'text-field',
                        label : 'Name',
                        value : 'name',
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
                    details         : {
                        fieldType: 'text-field',
                        label : 'Press Releases Details',
                        value : 'details',
                        rules : 'required',
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

                // Add Images form inputs
                let counterImage = 0;
                for (counterImage; counterImage < this.$refs.dropZoneImage.getQueuedFiles().length; counterImage++) {
                    payload.append("image", this.$refs.dropZoneImage.getQueuedFiles()[counterImage]);
                }

                // Add PDF form inputs
                let counterPdf = 0;
                for (counterPdf; counterPdf < this.$refs.dropZonePdf.getQueuedFiles().length; counterPdf++) {
                    payload.append("pdf", this.$refs.dropZonePdf.getQueuedFiles()[counterPdf]);
                }

                return payload;
            },

            cleanForm () {
                let self = this;

                //Clean Form
                Object.keys(self.payload).forEach(function (value) {
                    self.payload[value].post = null
                });

                self.$refs.dropZoneImage.removeAllFiles();
                self.$refs.dropZonePdf.removeAllFiles();
            },

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (this.$refs.dropZoneImage.getQueuedFiles().length === 0) {
                        this.$validator.errors.add('image', 'The image file field is required.', 'required');
                    } else {
                        this.errors.remove('image');
                    }
                    if (this.$refs.dropZonePdf.getQueuedFiles().length === 0) {
                        this.$validator.errors.add('pdf', 'The PDF file field is required.', 'required');
                    } else {
                        this.errors.remove('pdf');
                    }

                    if (result && (this.$refs.dropZoneImage.getQueuedFiles().length > 0)
                               && (this.$refs.dropZonePdf.getQueuedFiles().length > 0)) {

                        this.addPressRelease();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            addPressRelease () {
                window.loaderLadda.start();

                let self    = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'add-press-release',
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
