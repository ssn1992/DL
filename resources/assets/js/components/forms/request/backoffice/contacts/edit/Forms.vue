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
                        <p v-if="success">The contact was successfully edited</p>
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
                            <h4 class="title">Edit Contacts</h4>
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
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
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
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.email.value)}">
                                            <label>{{ payload.email.label }}</label>

                                            <input v-model="payload.email.post" :name=payload.email.value  v-validate :data-vv-rules=payload.email.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.email.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.email.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.email.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.skype.value)}">
                                            <label>{{ payload.skype.label }}</label>
                                            <input v-model="payload.skype.post" :name=payload.skype.value  v-validate :data-vv-rules=payload.skype.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.skype.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.skype.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.skype.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.phone.value)}">
                                            <label>{{ payload.phone.label }}</label>
                                            <input v-model="payload.phone.post" :name=payload.phone.value  v-validate :data-vv-rules=payload.phone.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.phone.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.phone.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.phone.value) }}</strong>
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
                                <div class="row" v-if="payload.language.post === 'en'">
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
                                <div class="row" v-if="payload.language.post === 'en'">
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

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Edit Contact</button>
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
                        rules : '',
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
                this.$validator.validateAll().then((result) => {
                    if (result) {

                        this.editContact();

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

            getContact () {
                let self = this;

                // Start Loader
                self.isLoading = true;

                let payload = {};

                payload.id = parseInt(window.location.pathname.split("/").pop());

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/contacts/actions/edit/' + payload.id ,
                    data: payload,
                })

                .then(function (response) {
                    self.customError = null;

                    self.setContactToEdit(response.data);
                })
                .catch(function (error) {
                    self.customError = null;
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();

                });
            },

            editImage () {
                let self = this;

                self.customError = null;

                let payload = {}
                    payload.lang      = this.payload.language.post;
                    payload.imageAlt  = $('#image-alt-' + this.payload.id.post).val();
                    payload.contactId = this.payload.id.post;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-contacts-image',
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

            setContactToEdit (response) {
                this.payload.id.post              = response.contact.id;
                this.payload.name.post            = response.contact.name;
                this.payload.email.post           = response.contact.email;
                this.payload.skype.post           = response.contact.skype;
                this.payload.phone.post           = response.contact.phone;
                this.payload.department.post      = response.contact.idDep;
                this.payload.market.post          = response.market.idMarket;

                // Images
                this.payload.images.post          = response.contact.image;
                this.payload.images.alt           = response.contact.imageAlt;

                this.$nextTick(function () {
                    // Stop Loader
                    this.isLoading = false;
                });
            },

            editContact () {
                window.loaderLadda.start();

                let self = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-contacts',
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

            // Get Contact
            this.getContact();

            // Get Languages
            this.getLanguagesList();

            // Get Department list
            this.getDepartmentList();

            // Get Market list
            this.getMarketList();
        }

    }
</script>
