@extends('lib.master-backoffice.main')

@section('styles')
@stop

@section('scripts')
    <script src="{!! asset('js/master-backoffice/press-releases/actions.js') !!}" type="text/javascript"></script>
@stop

@section('title')
@stop

@section('content')

<!-- Data tables component-->
@component('components.data-tables.data-tables', array( 'id' => 'press-releases-actions-table', 'col' => 'col-lg-12'))
@endcomponent

@stop