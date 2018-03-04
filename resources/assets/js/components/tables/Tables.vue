<style scoped>
    #table_wrapper {
        min-height: 361px;
    }
</style>

<template>
    <div>
        <!-- Error Modal -->
        <div class="modal inmodal fade" v-bind:id='tableId + "modal"' tabindex="-1" role="dialog"  aria-hidden="true" style="z-index: 209999950!important;">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title text-center">Please try again later</h4>
                    </div>
                    <div class="modal-body" style="text-align: center; display: block;">
                        <i class="fa fa-warning fa-5x text-danger" style="display: block;"></i>
                        <small class="font-bold text-danger"> {{ errorMessage }}</small><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loader -->
        <div id="isLoading" v-if="isLoading">
            <div>
                <div class="vue-simple-spinner"></div>
            </div>
        </div>

        <div id="table_wrapper" class="col-lg-12 col-md-12">
            <div class="card" style="min-height: 361px;">
                <div class="card-header" data-background-color="red">
                    <h4 class="title"> {{ page }} </h4>
                </div>
                <div class="card-content table-responsive">
                    <table v-if="data" v-bind:id='tableId' class="table table-hover mdl-data-table display nowrap mdl-typography--text-center" cellspacing="0" width="100%">
                        <thead class="text-danger">

                        <tr>
                            <th v-for="column in columns">
                                {{ column }}
                            </th>

                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody v-if="data">
                        <tr v-for="(value, index) in data">
                            <td v-for="value in data[index]">
                                <span v-if="value === true">  <i class="material-icons">&#xE876;</i> </span>
                                <span v-else-if="value === false"> <i class="material-icons">&#xE14C;</i> </span>
                                <span v-else>{{ trans(value) }} </span>
                            </td>

                            <td>
                                <a title="Edit" @click="editField(data[index].id)"> <i style="color: #ffa726; font-size: 20px;" class="material-icons">&#xE22B;</i> </a>
                                <a title="Delete" @click="deleteField(data[index].id)"> <i style="color: #ED5565; font-size: 24px; padding-left: 5px;" class="material-icons">&#xE5C9;</i></a>
                            </td>
                        </tr>
                        </tbody>

                        <tfoot>
                        <tr>
                            <th v-for="column in columns">
                                {{ column }}
                            </th>

                            <th>
                                Actions
                            </th>
                        </tr>
                        </tfoot>
                    </table>

                    <table v-else v-bind:id='tableId' class="mdl-data-table display nowrap" cellspacing="0" width="100%" style="min-height:127px;">
                        <thead>
                        <tr><th></th></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isLoading: true,
            tableName: null,
            tableId: null,
            columns: null,
            data: null,
            errorMessage: null,
            delteUrl: null,
            requestUrl: null,
            page: null,
        }
    },

    methods: {
        // *****************************
        // ***** Private functions *****
        // *****************************
        /**
         *
         * _tablesRequest
         *
         * Tables Component Component POST
         *
         * @param isUpdate
         * @param instance
         * @param payload
         * @private
         */
        tablesRequest(_request, isUpdate = false, _page = this.page) {
            let self = this;

            self.url        = 'tables/' + _request;
            self.requestUrl = _request;
            self.page       = _page;

            // Show Loader
            self.isLoading = true;

            // Send a POST request
            axios({
                method: 'post',
                url: 'tables/' + _request,
            })

            .then(function (response) {
                // Update Instance Data
                self.updateData(isUpdate, response.data.table);
            })
            .catch(function (error) {
                // Update Instance Data with error
                self.updateDataWithError(isUpdate, _request, error.response);
            });
        },

        deleteField(id) {
            // Create payload {id}
            let payload    = {}
                payload.id = id;

            let self = this;

            // Send a POST request
            axios({
                method: 'post',
                url: self.url + '/delete',
                data: payload
            })

            .then(function (response) {
                window.actionsTable.tablesRequest(self.requestUrl, true);
            })
            .catch(function (error) {
                console.log(error);
                //Set error message
                self.errorMessage = error.response.statusText;

                // Show error modal
                $('#' + self.tableId + 'modal').modal('show');
            });
        },

        editField(id) {
            window.location.href = window.location.pathname + '/edit/en/' + id;
        },

        // Update Data instance
        updateData(isUpdate = false, response) {
            this.errorMessage = null;
            // If Table instance is already created destroy previous
            if (isUpdate) {
                window[this.tableId].destroy();
            }

            //Update Data
            this.tableId   = response.tableId
            this.tableName = response.tableName,
            this.data      = response.data,
            this.columns   = response.columns,

            this.$nextTick(function () {
                // Create Table Instance
                this.createTable(this.tableId, false, isUpdate);
            })
        },

        // Update Data instance if an error occurred
        updateDataWithError(isUpdate = false, response, error) {
            // If Table instance is already created destroy previous
            if (isUpdate) {
                // Create Table Instance
                window[this.tableId].destroy();
            }

            // Set Error message
            if (error != undefined) {
                this.errorMessage = error.statusText;
            } else {
                this.errorMessage = 'Error';
            }

            // Update data
            this.tableId   = response
            this.tableName = 'Table - ' + this.errorMessage;
            this.data      = null
            this.columns   = null,

            this.$nextTick(function () {
                // Create Table Instance
                this.createTable(this.tableId, true);
            })
        },

        // Create Table instance
        createTable(instanceName, error = false, isUpdate = false) {
            /**
             * Create Data Table function
             *
             * @param instanceName
             */
            var self = this;
            window[instanceName] = $('#' + instanceName).DataTable({
                dom: 'Bfrtip',
                sScrollX: "100%",
                stateSave: true,
                colReorder: true,
                lengthChange: false,
                order: [[ 0, 'desc' ]],
                columnDefs: [{
                    targets: [0], //Comma separated values
                    visible: false,
                    searchable: false }
                ],
                buttons: [
                    {
                        text: '<i title="Add" class="material-icons">&#xE145;</i>', action: function () {
                        window.location.href = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/')) + '/add';}
                    },
                    {
                        text: '<i title="Refresh" class="material-icons">&#xE5D5;</i>', action: function () {
                        window.actionsTable.tablesRequest(self.requestUrl, true);}
                    },
                    {
                        extend: 'colvis',
                        text: '<i class="material-icons">visibility</i>',
                        postfixButtons: ['colvisRestore']
                    },
                    {
                        text: '<i class="material-icons">settings_backup_restore</i>', action: function () {
                        window[instanceName].colReorder.reset();
                    },
                    }
                ],
                oLanguage: {
                    oPaginate:
                        {
                            "sNext": '<i class="material-icons">chevron_right</i>',
                            "sPrevious": '<i class="material-icons">chevron_left</i>'
                        }
                },
                initComplete: function () {
                    // Stop Loader
                    self.isLoading = false;

                    if (error) {
                        // Show error modal
                        $('#' + instanceName + 'modal').modal('show');
                    }
                },
            });

            window[instanceName]
                .column( '0:visible' )
                .order( 'desc' )
                .draw();
        },
    },
}
</script>