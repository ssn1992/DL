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
                        <p v-if="success">The contact was successfully added</p>
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
                            <h4 class="title">Add Contacts</h4>
                            <p class="category">Complete the following form</p>
                        </div>
                        <div class="card-content">
                            <form @submit.prevent="validateBeforeSubmit()" id="form-section-projects" enctype='multipart/form-data'>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.name.value)}">
                                            <label class="control-label">{{ payload.name.label }}</label>
                                            <input v-model="payload.name.post" :name=payload.name.value  v-validate :data-vv-rules=payload.name.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.name.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.name.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.name.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.email.value)}">
                                            <label class="control-label">{{ payload.email.label }}</label>
                                            <input v-model="payload.email.post" :name=payload.email.value  v-validate :data-vv-rules=payload.email.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.email.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.email.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.email.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.skype.value)}">
                                            <label class="control-label">{{ payload.skype.label }}</label>
                                            <input v-model="payload.skype.post" :name=payload.skype.value  v-validate :data-vv-rules=payload.skype.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.skype.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.skype.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.skype.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.phone.value)}">
                                            <label class="control-label">{{ payload.phone.label }}</label>
                                            <input v-model="payload.phone.post" :name=payload.phone.value  v-validate :data-vv-rules=payload.phone.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.phone.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.phone.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.phone.value) }}</strong>
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
                                    <div class="col-sm-12">
                                        <div class="form-group" :class="{'has-error': errors.has(payload.department.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.department.label }} </label>
                                            </div>

                                            <div v-for="data in payload.department.data" class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" v-model="payload.department.post" :name=payload.department.value v-validate v-bind:value=data.value :data-vv-rules=payload.department.rules :data-vv-validate-on="validateForm"><span class="circle"></span><span class="check form-control"></span>
                                                        {{ trans(data.label) }}
                                                    </label>
                                                </div>
                                            </div>

                                            <span v-show="errors.has(payload.department.value)" class="material-icons form-control-feedback">clear</span>

                                            <div class="col-lg-12">
                                                <span v-show="errors.has(payload.department.value)" class="help-block text-danger text-center radio-button-error" style="width: 100%">
                                                    <strong>{{ errors.first(payload.department.value) }}</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group" :class="{'has-error': errors.has(payload.market.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.market.label }} </label>
                                            </div>

                                            <div v-for="data in payload.market.data" class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" v-model="payload.market.post" :name=payload.market.value v-validate v-bind:value=data.value :data-vv-rules=payload.market.rules :data-vv-validate-on="validateForm"><span class="circle"></span><span class="check form-control"></span>
                                                        {{ trans(data.label) }}
                                                    </label>
                                                </div>
                                            </div>

                                            <span v-show="errors.has(payload.market.value)" class="material-icons form-control-feedback">clear</span>

                                            <div class="col-lg-12">
                                                <span v-show="errors.has(payload.market.value)" class="help-block text-danger text-center radio-button-error" style="width: 100%">
                                                    <strong>{{ errors.first(payload.market.value) }}</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Add Contact</button>
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
                    name         : {
                        fieldType: 'text-field',
                        label : 'Name',
                        value : 'name',
                        rules : 'required',
                        post  : null,
                    },
                    email         : {
                        fieldType: 'text-field',
                        label : 'Email',
                        value : 'email',
                        rules : 'required|email',
                        post  : null,
                    },
                    skype         : {
                        fieldType: 'text-field',
                        label : 'Skype',
                        value : 'skype',
                        rules : 'required',
                        post  : null,
                    },
                    phone         : {
                        fieldType: 'text-field',
                        label : 'Phone',
                        value : 'phone',
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
                    department         : {
                        fieldType: 'text-field',
                        label : 'Department',
                        value : 'department',
                        rules : 'required',
                        post  : null,
                        data  : []
                    },
                    market         : {
                        fieldType: 'text-field',
                        label : 'Market',
                        value : 'market',
                        rules : '',
                        post  : null,
                        data  : []
                    }
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

                return payload;
            },

            cleanForm () {
                let self = this;

                //Clean Form
                Object.keys(self.payload).forEach(function (value) {
                    self.payload[value].post = null
                });

                self.$refs.dropZoneImage.removeAllFiles();
            },

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (this.$refs.dropZoneImage.getQueuedFiles().length === 0) {
                        this.$validator.errors.add('image', 'The image file field is required.', 'required');
                    } else {
                        this.errors.remove('image');
                    }

                    if (result && this.$refs.dropZoneImage.getQueuedFiles().length > 0) {

                        this.addContact();

                        console.log('Form Submitted!');
                    } else {
                        this.validateForm = null;
                        console.log('Correct them errors!');
                    }
                });
            },

            getDepartmentList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'department-list',
                })

                .then(function (response) {
                    console.log(response);
                    self.payload.department.data = response.data.department.data;

                })
                .catch(function (error) {
                });
            },

            getMarketList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'market-list',
                })

                    .then(function (response) {
                        console.log(response);
                        self.payload.market.data = response.data.market.data;

                    })
                    .catch(function (error) {
                    });
            },

            addContact () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'add-contact',
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

            // Get Department list
            this.getDepartmentList();

            // Get Market list
            this.getMarketList();
        }

    }
</script>
