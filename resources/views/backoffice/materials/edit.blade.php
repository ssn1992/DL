@extends('lib.master-backoffice.main')

@section('styles')
@stop

@section('scripts')
    <script src="{!! asset('js/master-backoffice/materials/edit.js') !!}" type="text/javascript"></script>
@stop

@section('title')
@stop

@section('content')

{{-- Forms component --}}
@component('components.forms.forms', array( 'id' => 'forms', 'col' => ''))
@endcomponent

@stop