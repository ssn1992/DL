@extends('lib.master-backoffice.main')

@section('styles')
@stop

@section('scripts')
    <script src="{!! asset('js/master-backoffice/events/actions.js') !!}" type="text/javascript"></script>
@stop

@section('title')
@stop

@section('content')

<!-- Data tables component-->
@component('components.data-tables.data-tables', array( 'id' => 'events-actions-table', 'col' => 'col-lg-12'))
@endcomponent

@stop