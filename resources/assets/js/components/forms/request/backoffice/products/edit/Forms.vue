<style scoped>
    .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
        cursor: auto;
    }

    @media (max-width: 480px), (max-width: 767px) {
        .form-group .form-control {
            width: 100% !important;
        }
    }

    col-lg-3.col-md-3.col-sm-6.col-xs-6.checkbox-group {
        padding-left: 15px !important;
    }

    button.dropdown-toggle.btn.btn-primary.btn-round {
        outline: 0!important;
    }

    .title {
        margin-left: 15px;
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
                        <p v-if="success">The product was successfully edited</p>
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
                            <h4 class="title">Edit Products</h4>
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
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.weight.value)}">
                                            <label>{{ payload.weight.label }}</label>

                                            <input v-model="payload.weight.post" :name=payload.weight.value  v-validate :data-vv-rules=payload.weight.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.weight.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.weight.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.weight.value) }}</strong>
                                        </span>
                                    </div>
                                </div>

                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-3">
                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.component.label }} </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div :class="{'has-error': errors.has(payload.material.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.material.label }} </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.component.label }} </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div :class="{'has-error': errors.has(payload.material.value)}">
                                            <div class="title">
                                                <label style="font-size: 14px;" class="control-label"> {{ payload.material.label }} </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Body</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.body.value)}">

                                            <select multiple v-model="payload.body.post" :name=payload.body.value  v-validate :data-vv-rules=payload.body.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.body.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.body.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.body.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Base</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.base.value)}">

                                            <select multiple v-model="payload.base.post" :name=payload.base.value  v-validate :data-vv-rules=payload.base.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.base.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.base.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.base.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Shade</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.shade.value)}">

                                            <select multiple v-model="payload.shade.post" :name=payload.shade.value  v-validate :data-vv-rules=payload.shade.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.shade.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.shade.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.shade.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Bulb Holder</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.bulbHolder.value)}">

                                            <select multiple v-model="payload.bulbHolder.post" :name=payload.bulbHolder.value  v-validate :data-vv-rules=payload.bulbHolder.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.bulbHolder.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.bulbHolder.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.bulbHolder.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Counter Weight</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.counterweight.value)}">

                                            <select multiple v-model="payload.counterweight.post" :name=payload.counterweight.value  v-validate :data-vv-rules=payload.counterweight.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.counterweight.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.counterweight.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.counterweight.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Wire</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.wire.value)}">

                                            <select multiple v-model="payload.wire.post" :name=payload.wire.value  v-validate :data-vv-rules=payload.wire.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.wire.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.wire.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.wire.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Canopy</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.canopy.value)}">

                                            <select multiple v-model="payload.canopy.post" :name=payload.canopy.value  v-validate :data-vv-rules=payload.canopy.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.canopy.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.canopy.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.canopy.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.component.value)}">
                                            <select disabled :name=payload.component.value  v-validate :data-vv-rules=payload.component.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round">
                                                <option value="1">Top Cover</option>
                                            </select>

                                            <span v-show="errors.has(payload.component.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.component.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.component.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-3">

                                        <div :class="{'has-error': errors.has(payload.topCover.value)}">

                                            <select multiple v-model="payload.topCover.post" :name=payload.topCover.value  v-validate :data-vv-rules=payload.topCover.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                <option :value="values.value" v-for="values in payload.material.data">

                                                    <span v-bind:id="values.value"></span>

                                                    {{ trans(values.label) }}
                                                </option>
                                            </select>

                                            <span v-show="errors.has(payload.topCover.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.topCover.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.topCover.value) }}</strong>
                                        </span>
                                    </div>

                                    <span v-show="errors.has(payload.material.value)" class="help-block text-danger text-center">
                                        <strong>{{ errors.first(payload.material.value) }}</strong>
                                    </span>
                                </div>

                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.dimensions.value)}">
                                            <label>{{ payload.dimensions.label }}</label>

                                            <input v-model="payload.dimensions.post" :name=payload.dimensions.value  v-validate :data-vv-rules=payload.dimensions.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.dimensions.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.dimensions.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.dimensions.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.bulbs.value)}">
                                            <label>{{ payload.bulbs.label }}</label>
                                            <p id="bulbs-trans" style="display: none">{{ trans(payload.bulbs.post) }}</p>

                                            <input v-model="payload.bulbs.post" :name=payload.bulbs.value  v-validate :data-vv-rules=payload.bulbs.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.bulbs.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.bulbs.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.bulbs.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" else>
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.bulbs.value)}">
                                            <label>{{ payload.bulbs.label }}</label>
                                            <p id="bulbs-trans" style="display: none">{{ trans(payload.bulbs.post) }}</p>

                                            <input v-model="payload.bulbs.post" :name=payload.bulbs.value  v-validate :data-vv-rules=payload.bulbs.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.bulbs.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.bulbs.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.bulbs.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.nameSeo.value)}">
                                            <label>{{ payload.nameSeo.label }}</label>
                                            <p id="nameSeo-trans" style="display: none">{{ trans(payload.nameSeo.post) }}</p>

                                            <input v-model="payload.nameSeo.post" :name=payload.nameSeo.value  v-validate :data-vv-rules=payload.nameSeo.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.nameSeo.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.nameSeo.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.nameSeo.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.descSeo.value)}">
                                            <label>{{ payload.descSeo.label }}</label>
                                            <p id="descSeo-trans" style="display: none">{{ trans(payload.descSeo.post) }}</p>

                                            <input v-model="payload.descSeo.post" :name=payload.descSeo.value  v-validate :data-vv-rules=payload.descSeo.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.descSeo.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.descSeo.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.descSeo.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.keywordsSeo.value)}">
                                            <label>{{ payload.keywordsSeo.label }}</label>
                                            <p id="keywordsSeo-trans" style="display: none">{{ trans(payload.keywordsSeo.post) }}</p>

                                            <input v-model="payload.keywordsSeo.post" :name=payload.keywordsSeo.value  v-validate :data-vv-rules=payload.keywordsSeo.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.keywordsSeo.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.keywordsSeo.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.keywordsSeo.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.priceWW.value)}">
                                            <label>{{ payload.priceWW.label }}</label>
                                            <input v-model="payload.priceWW.post" :name=payload.priceWW.value  v-validate :data-vv-rules=payload.priceWW.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.priceWW.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.priceWW.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.priceWW.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.stockWW.value)}">
                                            <label>{{ payload.stockWW.label }}</label>
                                            <input v-model="payload.stockWW.post" :name=payload.stockWW.value  v-validate :data-vv-rules=payload.stockWW.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.stockWW.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.stockWW.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.stockWW.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.priceUsa.value)}">
                                            <label>{{ payload.priceUsa.label }}</label>
                                            <input v-model="payload.priceUsa.post" :name=payload.priceUsa.value  v-validate :data-vv-rules=payload.priceUsa.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.priceUsa.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.priceUsa.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.priceUsa.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.stockUsa.value)}">
                                            <label>{{ payload.stockUsa.label }}</label>
                                            <input v-model="payload.stockUsa.post" :name=payload.stockUsa.value  v-validate :data-vv-rules=payload.stockUsa.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.stockUsa.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.stockUsa.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.stockUsa.value) }}</strong>
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
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <label>Image</label>
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(uploadFiles.image.value)}">
                                            <span v-show="errors.has(uploadFiles.image.value)" class="material-icons form-control-feedback">clear</span>
                                            <droply id="dropZoneImage"
                                                    ref="dropZoneImage"
                                                    url="/post"
                                                    :autoProcessQueue="false"
                                                    upload-message-text="Drop file(s) to upload <br><strong>or click</strong>">
                                            </droply>
                                        </div>
                                        <span v-show="errors.has(uploadFiles.image.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(uploadFiles.image.value) }}</strong>
                                        </span>
                                    </div>

                                    <div class="col-md-6">
                                        <label>ImageHr</label>
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(uploadFiles.imageHr.value)}">
                                            <span v-show="errors.has(uploadFiles.imageHr.value)" class="material-icons form-control-feedback">clear</span>
                                            <droply id="dropZoneImageHr"
                                                    ref="dropZoneImageHr"
                                                    url="/post"
                                                    :autoProcessQueue="false"
                                                    upload-message-text="Drop file(s) to upload <br><strong>or click</strong>">
                                            </droply>
                                        </div>
                                        <span v-show="errors.has(uploadFiles.imageHr.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(uploadFiles.imageHr.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.imageAlt.value)}">
                                            <label>{{ payload.imageAlt.label }}</label>
                                            <p id="imageAlt-trans" style="display: none">{{ trans(payload.imageAlt.post) }}</p>

                                            <input v-model="payload.imageAlt.post" :name=payload.imageAlt.value  v-validate :data-vv-rules=payload.imageAlt.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.imageAlt.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.imageAlt.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.imageAlt.value) }}</strong>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.imageHrAlt.value)}">
                                            <label>{{ payload.imageHrAlt.label }}</label>
                                            <p id="imageHrAlt-trans" style="display: none">{{ trans(payload.imageHrAlt.post) }}</p>

                                            <input v-model="payload.imageHrAlt.post" :name=payload.imageHrAlt.value  v-validate :data-vv-rules=payload.imageHrAlt.rules :data-vv-validate-on="validateForm" type="text" class="input form-control">
                                            <span v-show="errors.has(payload.imageHrAlt.value)" class="material-icons form-control-feedback">clear</span>
                                        </div>
                                        <span v-show="errors.has(payload.imageHrAlt.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.imageHrAlt.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card card-shadow">
                                            <div class="card-header" data-background-color="red" style="margin-bottom: 20px;">
                                                <h5 style="float: right" class="title">Images</h5>

                                                <div class="card-nav-tabs card-plain">
                                                    <div class="header header-danger">
                                                        <div class="nav-tabs-navigation">
                                                            <div class="nav-tabs-wrapper">
                                                                <ul class="nav nav-tabs text-center" data-tabs="tabs">
                                                                    <li v-bind:class="checkIndex(index)" v-for="(values, index) in payload.images.data">
                                                                        <a v-bind:href="'#image-nav-' + values.id" data-toggle="tab">{{ index + 1 }}</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="content">
                                                <div class="tab-content text-center">
                                                    <div v-for="(values, index) in payload.images.data" v-bind:class="checkIndex(index)" class="tab-pane" v-bind:id="'image-nav-' + values.id">
                                                        <label style="padding-bottom: 20px;"></label>

                                                        <div>
                                                            <div class="card-image">
                                                                <a>
                                                                    <img class="img" v-bind:src="'/' + values.image">
                                                                </a>
                                                                <div class="ripple-container"></div></div>
                                                            <div class="card-footer">
                                                                <div class="card-content text-center" style="display: inherit;">
                                                                    <div class="card-actions">
                                                                        <button @click="editImage(values.id)" type="button" class="btn btn-success btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Edit">
                                                                            <i class="material-icons">edit</i>
                                                                        </button>
                                                                        <button v-if="payload.language.post === 'en'" @click="deleteImage(values.id, payload.images.data.length)" type="button" class="btn btn-danger btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Remove">
                                                                            <i class="material-icons">close</i>
                                                                        </button>
                                                                    </div>
                                                                    <h5 style="color:#EC1B33;" class="card-title">
                                                                        Alt
                                                                    </h5>
                                                                    <div class="card-description">
                                                                        {{ trans(values.alt) }}
                                                                    </div>
                                                                </div>

                                                                <div style="margin-top: 0; margin-bottom: 20px;" class="form-group label-floating col-md-12">
                                                                    <input v-bind:id="'image-alt-'+ values.id" type="text" class="input form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End Tabs on plain Card -->
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card card-shadow">
                                            <div class="card-header" data-background-color="red" style="margin-bottom: 20px;">
                                                <div class="card-nav-tabs card-plain">
                                                    <div class="header header-danger">
                                                        <h5 style="float: right" class="title">Images Hr</h5>

                                                        <div class="nav-tabs-navigation">
                                                            <div class="nav-tabs-wrapper">
                                                                <ul class="nav nav-tabs text-center" data-tabs="tabs">
                                                                    <li v-bind:class="checkIndex(index)" v-for="(values, index) in payload.imagesHr.data">
                                                                        <a v-bind:href="'#image-hr-nav-' + values.id" data-toggle="tab">{{ index + 1 }}</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="content">
                                                <div class="tab-content text-center">
                                                    <div v-for="(values, index) in payload.imagesHr.data" v-bind:class="checkIndex(index)" class="tab-pane" v-bind:id="'image-hr-nav-' + values.id">
                                                        <label style="padding-bottom: 20px;"></label>

                                                        <div>
                                                            <div class="card-image">
                                                                <a>
                                                                    <img class="img" v-bind:src="'/' + values.image">
                                                                </a>
                                                                <div class="ripple-container"></div></div>
                                                            <div class="card-footer">
                                                                <div class="card-content text-center" style="display: inherit;">
                                                                    <div class="card-actions">
                                                                        <button @click="editImageHr(values.id)" type="button" class="btn btn-success btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Edit">
                                                                            <i class="material-icons">edit</i>
                                                                        </button>
                                                                        <button v-if="payload.language.post === 'en'" @click="deleteImageHr(values.id, payload.imagesHr.data.length)" type="button" class="btn btn-danger btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Remove">
                                                                            <i class="material-icons">close</i>
                                                                        </button>
                                                                    </div>
                                                                    <h5 style="color:#EC1B33;" class="card-title">
                                                                        Alt
                                                                    </h5>
                                                                    <div class="card-description">
                                                                        {{ trans(values.alt) }}
                                                                    </div>
                                                                </div>

                                                                <div style="margin-top: 0; margin-bottom: 20px;" class="form-group label-floating col-md-12">
                                                                    <input v-bind:id="'imageHr-alt-'+ values.id" type="text" class="input form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End Tabs on plain Card -->
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>PDF</label>
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
                                <div class="row" v-if="payload.oldPdf.post != null && payload.oldPdf.post != undefined">
                                    <div class="col-md-12">
                                        <label style="padding-bottom: 20px;">PDF</label>

                                        <div class="card card-product card-shadow">
                                            <div class="card-image">
                                                <div class="ripple-container"></div></div>
                                            <div class="card-footer">
                                                <div class="card-content text-center" style="display: inherit;">
                                                    <div class="card-actions">
                                                        <a target="_blank" v-bind:href="'/' + payload.oldPdf.post">
                                                            <button type="button" class="btn btn-info btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Download">
                                                                <i class="material-icons">&#xE417;</i>
                                                            </button>
                                                        </a>
                                                    </div>
                                                    <div style="display: block;" class="img-responsive text-center">
                                                        <img style="display: inline-block; width: 60px;" class="img-responsive text-center" src="/images/pdf/pdf.png">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <label>3D Model</label>
                                        <div class="form-group label-floating" :class="{'has-error': errors.has(uploadFiles.model.value)}">
                                            <span v-show="errors.has(uploadFiles.model.value)" class="material-icons form-control-feedback">clear</span>
                                            <droply id="dropZoneModel"
                                                    ref="dropZoneModel"
                                                    url="/post"
                                                    :autoProcessQueue="false"
                                                    :maxNumberOfFiles="1"
                                                    :maxFileSizeInMB="64"
                                                    upload-message-text="Drop file to upload <br><strong>or click</strong>">
                                            </droply>
                                        </div>
                                        <span v-show="errors.has(uploadFiles.model.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(uploadFiles.model.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.model.post != null && payload.model.post != undefined">
                                    <div class="col-md-12">
                                        <label style="padding-bottom: 20px;">3D Model</label>

                                        <div class="card card-product card-shadow">
                                            <div class="card-image">
                                                <div class="ripple-container"></div></div>
                                            <div class="card-footer">
                                                <div class="card-content text-center" style="display: inherit;">
                                                    <div class="card-actions">
                                                        <button @click="deleteModel()" type="button" class="btn btn-danger btn-simple" rel="tooltip" data-placement="bottom" title="" data-original-title="Remove">
                                                            <i class="material-icons">close</i>
                                                        </button>
                                                    </div>
                                                    <div style="display: block;" class="img-responsive text-center">
                                                        <model-obj v-bind:src="'/' + payload.model.post"></model-obj>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="form-group label-floating" :class="{'has-error': errors.has(payload.description.value)}">
                                                <label> {{ payload.description.label }}</label>
                                                <p id="description-trans" style="display: none">{{ trans(payload.description.post) }}</p>

                                                <textarea v-model="payload.description.post" rows="5" :name=payload.description.value  v-validate :data-vv-rules=payload.description.rules :data-vv-validate-on="validateForm"  class="input form-control"></textarea>
                                                <span v-show="errors.has(payload.description.value)" class="material-icons form-control-feedback">clear</span>
                                            </div>
                                        </div>
                                        <span v-show="errors.has(payload.description.value)" class="help-block text-danger text-center">
                                            <strong>{{ errors.first(payload.description.value) }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="col-md-12">
                                        <div class="title" style="margin-left: 0">
                                            <label style="font-size: 14px;" class="control-label"> {{ payload.relatedProducts.label }} </label>
                                        </div>

                                        <div class="form-group label-floating" :class="{'has-error': errors.has(payload.relatedProducts.value)}">

                                            <div :class="{'has-error': errors.has(payload.relatedProducts.value)}">

                                                <select data-live-search="true" multiple v-model="payload.relatedProducts.post" :name=payload.relatedProducts.value  v-validate :data-vv-rules=payload.relatedProducts.rules :data-vv-validate-on="validateForm" class="selectpicker" data-style="btn btn-primary btn-round" title="Select one option">
                                                    <option :value="values.value" v-for="values in payload.relatedProducts.data">

                                                        <span v-bind:id="values.value"></span>

                                                        {{ values.label }}
                                                    </option>
                                                </select>

                                                <span v-show="errors.has(payload.relatedProducts.value)" class="material-icons form-control-feedback">clear</span>
                                            </div>
                                            <span v-show="errors.has(payload.relatedProducts.value)" class="help-block text-danger text-center">
                                                <strong>{{ errors.first(payload.relatedProducts.value) }}</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="payload.language.post === 'en'">
                                    <div class="form-group">
                                        <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> Options </label>
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 checkbox-group" style="padding-left: 15px">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" v-model="payload.visible.post" :name=payload.visible.value :data-vv-validate-on="validateForm">
                                                    {{ payload.visible.label }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 checkbox-group padding-left: 15px">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" v-model="payload.certificate.post" :name=payload.certificate.value :data-vv-validate-on="validateForm">
                                                    {{ payload.certificate.label }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 checkbox-group padding-left: 15px">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" v-model="payload.new.post" :name=payload.new.value :data-vv-validate-on="validateForm">
                                                    {{ payload.new.label }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 checkbox-group padding-left: 15px">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" v-model="payload.contract.post" :name=payload.contract.value :data-vv-validate-on="validateForm">
                                                    {{ payload.contract.label }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary pull-right ladda-button" data-style="expand-right">Edit Product</button>
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

    import Droply from 'droply'

    import { ModelObj } from 'vue-3d-model'

    export default {
        components: {
            'droply': Droply,
            ModelObj
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
                    image         : {
                        fieldType: 'text-field',
                        label : 'Image',
                        value : 'image',
                        rules : 'required',
                        post  : null,
                    },
                    imageHr         : {
                        fieldType: 'text-field',
                        label : 'Image Hr',
                        value : 'imageHr',
                        rules : 'required',
                        post  : null,
                    },
                    pdf         : {
                        fieldType: 'text-field',
                        label : 'PDF',
                        value : 'pdf',
                        rules : 'required',
                        post  : null,
                    },
                    model         : {
                        fieldType: 'text-field',
                        label : '3D Model',
                        value : 'model',
                        rules : '',
                        post  : null,
                    },
                },
                payload: {
                    images         : {
                        fieldType: 'text-field',
                        label : 'Images',
                        value : 'images',
                        rules : 'required',
                        post  : null,
                        data  : [],
                    },
                    imagesHr         : {
                        fieldType: 'text-field',
                        label : 'ImagesHr',
                        value : 'imagesHr',
                        rules : 'required',
                        post  : null,
                        data  : [],
                    },
                    model         : {
                        fieldType: 'text-field',
                        label : 'Model',
                        value : 'model',
                        rules : 'required',
                        post  : null,
                    },
                    oldPdf         : {
                        fieldType: 'text-field',
                        label : 'Pdf',
                        value : 'oldPdf',
                        rules : '',
                        post  : null,
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
                        rules : '',
                        post  : null,
                    },
                    weight         : {
                        fieldType: 'text-field',
                        label : 'Weight',
                        value : 'weight',
                        rules : '',
                        post  : null,
                    },
                    dimensions         : {
                        fieldType: 'text-field',
                        label : 'Dimensions',
                        value : 'dimensions',
                        rules : '',
                        post  : null,
                    },
                    bulbs         : {
                        fieldType: 'text-field',
                        label : 'Bulbs',
                        value : 'bulbs',
                        rules : '',
                        post  : null,
                    },
                    nameSeo         : {
                        fieldType: 'text-field',
                        label : 'Name SEO',
                        value : 'nameSeo',
                        rules : '',
                        post  : null,
                    },
                    descSeo         : {
                        fieldType: 'text-field',
                        label : 'Desc SEO',
                        value : 'descSeo',
                        rules : '',
                        post  : null,
                    },
                    keywordsSeo         : {
                        fieldType: 'text-field',
                        label : 'Keywords SEO',
                        value : 'keywordsSeo',
                        rules : '',
                        post  : null,
                    },
                    priceWW         : {
                        fieldType: 'text-field',
                        label : 'Price World Wide',
                        value : 'priceWW',
                        rules : '',
                        post  : null,
                    },
                    stockWW         : {
                        fieldType: 'text-field',
                        label : 'Stock World Wide',
                        value : 'stockWW',
                        rules : '',
                        post  : null,
                    },
                    priceUsa         : {
                        fieldType: 'text-field',
                        label : 'Price USA',
                        value : 'priceUsa',
                        rules : '',
                        post  : null,
                    },
                    stockUsa         : {
                        fieldType: 'text-field',
                        label : 'Stock USA',
                        value : 'stockUsa',
                        rules : '',
                        post  : null,
                    },
                    imageAlt         : {
                        fieldType: 'text-field',
                        label : 'Image Alt',
                        value : 'imageAlt',
                        rules : '',
                        post  : null,
                    },
                    imageHrAlt         : {
                        fieldType: 'text-field',
                        label : 'ImageHr Alt',
                        value : 'imageHrAlt',
                        rules : '',
                        post  : null,
                    },
                    videoUrl         : {
                        fieldType: 'text-field',
                        label : 'Video URL',
                        value : 'videoUrl',
                        rules : '',
                        temp  : null,
                        post  : null,
                    },
                    description         : {
                        fieldType: 'text-field',
                        label : 'Product Description',
                        value : 'description',
                        rules : '',
                        post  : null,
                    },
                    visible         : {
                        fieldType: 'text-field',
                        label : 'Visible',
                        value : 'visible',
                        rules : '',
                        post  : true,
                    },
                    certificate         : {
                        fieldType: 'text-field',
                        label : 'UL Certificate',
                        value : 'certificate',
                        rules : '',
                        post  : false,
                    },
                    new         : {
                        fieldType: 'text-field',
                        label : 'New',
                        value : 'new',
                        rules : '',
                        post  : false,
                    },
                    contract         : {
                        fieldType: 'text-field',
                        label : 'Contract',
                        value : 'contract',
                        rules : '',
                        post  : false,
                    },
                    cat         : {
                        fieldType: 'text-field',
                        label : 'Category',
                        value : 'cat',
                        rules : '',
                        post  : null,
                        data  : [],
                    },
                    component         : {
                        fieldType: 'text-field',
                        label : 'Component',
                        value : 'component',
                        rules : '',
                        post  : null,
                        data  : [],
                    },
                    body         : {
                        fieldType: 'text-field',
                        label : 'body',
                        value : 'body',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    base         : {
                        fieldType: 'text-field',
                        label : 'base',
                        value : 'base',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    shade         : {
                        fieldType: 'text-field',
                        label : 'shade',
                        value : 'shade',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    bulbHolder         : {
                        fieldType: 'text-field',
                        label : 'bulbHolder',
                        value : 'bulbHolder',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    counterweight         : {
                        fieldType: 'text-field',
                        label : 'counterweight',
                        value : 'counterweight',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    wire         : {
                        fieldType: 'text-field',
                        label : 'wire',
                        value : 'wire',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    canopy         : {
                        fieldType: 'text-field',
                        label : 'canopy',
                        value : 'canopy',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    topCover         : {
                        fieldType: 'text-field',
                        label : 'topCover',
                        value : 'topCover',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    material         : {
                        fieldType: 'text-fields',
                        label : 'Material',
                        value : 'material',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                    relatedProducts         : {
                        fieldType: 'text-fields',
                        label : 'Related Products',
                        value : 'relatedProducts',
                        rules : '',
                        post  : [],
                        data  : [],
                    },
                }
            }
        },

        methods: {
            validateMaterials() {
                let flag = false;

                if (this.payload.body.post.length === 0 && this.payload.base.post.length === 0 && this.payload.shade.post.length === 0 && this.payload.bulbHolder.post.length === 0 &&
                    this.payload.counterweight.post.length === 0 && this.payload.wire.post.length === 0 && this.payload.canopy.post.length === 0 && this.payload.topCover.post.length === 0) {

                    this.$validator.errors.add('material', 'Please choose at least one material.', 'required');
                } else {
                    this.errors.remove('material');
                    console.log('true');
                    flag = true;
                }

                return flag;
            },

            validateYouTubeVideoUrl(videoUrl) {
                if (youtubeUrl.extractId(videoUrl) === false) {
                    this.$validator.errors.add('videoUrl', 'The Video Url is invalid.', 'required');
                    return false
                } else {
                    this.errors.remove('videoUrl');
                    this.payload.videoUrl.temp = this.payload.videoUrl.post;
                    this.payload.videoUrl.post = youtubeUrl.extractId(videoUrl);
                }
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
                        payload.append("image["+ counterImage +"]", this.$refs.dropZoneImage.getQueuedFiles()[counterImage]);
                    }
                    payload.append("counterImage", counterImage);

                    // Add imageHr form inputs
                    let counterImageHr = 0;
                    for (counterImageHr; counterImageHr < this.$refs.dropZoneImageHr.getQueuedFiles().length; counterImageHr++) {
                        payload.append("imageHr["+ counterImageHr +"]", this.$refs.dropZoneImageHr.getQueuedFiles()[counterImageHr]);
                    }
                    payload.append("counterImageHr", counterImageHr);

                    // Add Model form inputs
                    let counterModel = 0;
                    for (counterModel; counterModel < this.$refs.dropZoneModel.getQueuedFiles().length; counterModel++) {
                        payload.append("model", this.$refs.dropZoneModel.getQueuedFiles()[counterModel]);
                    }

                }

                // Add PDF form inputs
                let counterPdf = 0;
                for (counterPdf; counterPdf < this.$refs.dropZonePdf.getQueuedFiles().length; counterPdf++) {
                    payload.append("pdf", this.$refs.dropZonePdf.getQueuedFiles()[counterPdf]);
                }

                return payload;
            },

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {

                    // Validate Materials
                    this.validateMaterials();

                    if (result && (this.validateYouTubeVideoUrl(this.payload.videoUrl.post) != false)
                        && (this.validateMaterials() === true)) {

                        this.editProduct();

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

            checkIndex (index) {
                if (index === 0) {
                    return 'active'
                }
            },

            getCatList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'cats-products-list',
                })

                    .then(function (response) {
                        self.customError = null;
                        self.payload.cat.data = response.data.cat.data;
                    })
                    .catch(function (error) {
                        self.customError = null;
                    });
            },

            loadComboBox () {
                this.$nextTick(function () {
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                });
            },

            setProductToEdit (response) {
                this.payload.model.post           = response.product.valter;
                this.payload.id.post              = response.product.id;
                this.payload.name.post            = response.product.name;
                this.payload.oldPdf.post          = response.product.pdf;
                this.payload.weight.post          = response.product.weight;
                this.payload.dimensions.post      = response.product.dimensions;
                this.payload.bulbs.post           = response.product.bulbs;
                this.payload.priceWW.post         = response.product.price_ww;
                this.payload.stockWW.post         = response.product.stock_ww;
                this.payload.priceUsa.post        = response.product.price_usa;
                this.payload.stockUsa.post        = response.product.stock_usa;
                this.payload.videoUrl.post        = response.product.video_url;
                this.payload.new.post             = response.product.new;
                this.payload.contract.post        = response.product.contract;
                this.payload.certificate.post     = response.product.certificate;
                this.payload.visible.post         = response.product.visible;
                this.payload.description.post     = response.product.description;
                this.payload.descSeo.post         = response.product.desc_seo;
                this.payload.keywordsSeo.post     = response.product.keywords_seo;
                this.payload.nameSeo.post         = response.product.title_seo;
                this.payload.cat.post             = response.product.id_category;
                this.payload.relatedProducts.post = response.relatedProducts;

                // Images
                this.payload.images.data          = response.images;
                this.payload.imagesHr.data        = response.imagesHr;

                // Materials
                this.payload.base.post            = response.materials.base;
                this.payload.body.post            = response.materials.body;
                this.payload.bulbHolder.post      = response.materials.bulbHolder;
                this.payload.canopy.post          = response.materials.canopy;
                this.payload.counterweight.post   = response.materials.counterweight;
                this.payload.shade.post           = response.materials.shade;
                this.payload.topCover.post        = response.materials.topCover;
                this.payload.wire.post            = response.materials.wire;

                this.$nextTick(function () {
                    this.payload.name.post        = $('#name-trans').text();
                    this.payload.description.post = $('#description-trans').text();
                    this.payload.bulbs.post       = $('#bulbs-trans').text();
                    this.payload.descSeo.post     = $('#descSeo-trans').text();
                    this.payload.keywordsSeo.post = $('#keywordsSeo-trans').text();
                    this.payload.nameSeo.post     = $('#nameSeo-trans').text();

                    // Refresh Combobox
                    this.loadComboBox ();

                    // Stop Loader
                    this.isLoading = false;
                });
            },

            deleteModel() {
                let self = this;

                let payload = {}
                payload.model  = this.payload.model.post;
                payload.productId = self.payload.id.post;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/delete-product-model',
                    data: payload
                })

                    .then(function (response) {
                        self.customError = null;

                        // Get Product
                        self.getProduct();
                    })
                    .catch(function (error) {
                        self.customError = null;
                        self.success = false;

                        // Stop Loader
                        self.isLoading = false;

                        $("#modal-response").modal();
                    });
            },

            editImage (id) {
                let self = this;

                self.customError = null;

                let payload = {}
                payload.lang      = this.payload.language.post;
                payload.imageAlt  = $('#image-alt-' + id).val();
                payload.imageId   = id;
                payload.productId = this.payload.id.post;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-product-image',
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

            editImageHr (id) {
                let payload = {}
                payload.lang        = this.payload.language.post;
                payload.imageHrAlt  = $('#imageHr-alt-' + id).val();
                payload.imageId     = id;
                payload.productId   = this.payload.id.post;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-product-imageHr',
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

            deleteImage (id, index) {
                let self = this;

                console.log(index);

                if (index <= 1) {
                    self.customError = "Sorry you need at least one image";
                    self.success     = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();

                } else {

                    let payload = {}
                    payload.imageId = id;
                    payload.productId = self.payload.id.post;

                    // Send a POST request
                    axios({
                        method: 'post',
                        url: 'admin-area/delete-product-image',
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
                }
            },

            deleteImageHr (id, index) {
                let self = this;

                if (index <= 1) {
                    self.customError = "Sorry you need at least one image";
                    self.success = false;

                    // Stop Loader
                    self.isLoading = false;

                    $("#modal-response").modal();

                } else {

                    let payload = {}
                    payload.imageId = id;
                    payload.productId = self.payload.id.post;

                    // Send a POST request
                    axios({
                        method: 'post',
                        url: 'admin-area/delete-product-imageHr',
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
                }
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

            getComponentsList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'products-component-list',
                })

                    .then(function (response) {
                        self.customError = null;
                        self.payload.component.data = response.data.component.data;

                    })
                    .catch(function (error) {
                        self.customError = null;
                        self.success = false;

                        // Stop Loader
                        self.isLoading = false;

                        $("#modal-response").modal();
                    });
            },

            getMaterialList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'products-material-list',
                })

                    .then(function (response) {
                        self.customError = null;
                        self.payload.material.data = response.data.material.data;
                        self.loadComboBox();
                    })
                    .catch(function (error) {
                        self.customError = null;
                        self.success     = false;

                        // Stop Loader
                        self.isLoading   = false;

                        $("#modal-response").modal();
                    });
            },

            getProduct () {
                let self = this;

                console.log('is loading')
                // Start Loader
                self.isLoading = true;

                let payload = {};

                payload.id = parseInt(window.location.pathname.split("/").pop());

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/products/actions/edit/' + payload.id ,
                    data: payload,
                })

                    .then(function (response) {
                        self.customError = null;

                        self.setProductToEdit(response.data);
                        console.log(response);
                    })
                    .catch(function (error) {
                        self.customError = null;
                        self.success = false;

                        // Stop Loader
                        self.isLoading = false;

                        $("#modal-response").modal();

                    });
            },

            editProduct () {
                window.loaderLadda.start();

                let self    = this;
                let payload = this.payloadMount();

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'admin-area/edit-product',
                    data: payload,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                    .then(function (response) {
                        window.location.href = window.location.pathname;
                    })
                    .catch(function (error) {
                        self.customError = null;

                        self.payload.videoUrl.post = self.payload.videoUrl.temp;

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

            getLanguage () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'get-language',
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

            getRelatedProductsList () {
                let self = this;

                // Send a POST request
                axios({
                    method: 'post',
                    url: 'related-products-list',
                })

                    .then(function (response) {
                        self.payload.relatedProducts.data = response.data.relatedProducts;
                        self.loadComboBox();
                    })
                    .catch(function (error) {
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

            // Get Related Products list
            this.getRelatedProductsList();

            // Get Cat list
            this.getCatList();

            // Get Material list
            this.getMaterialList();

            // Get Product
            this.getProduct();

            // Get Languages
            this.getLanguagesList();
        }
    }

</script>
