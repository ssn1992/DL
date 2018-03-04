@extends('lib.master.main')

@section('styles')
@stop

@section('scripts')
    <script src="{!! asset('js/home/home.js') !!}" type="text/javascript"></script>
@stop

@section('title')
@stop

@section('content')

{{-- Slider component --}}
@component('components.slider.slider', array("sliders" => $sliders)))
@endcomponent

{{-- Visual component --}}
@component('components.categories.categories')
@endcomponent

@if(false)
@component('components.visual-menu.visual-menu', array('title' => 'Categories', 'subTitle' => 'Lighting', 'hasTitle' => true)))
@endcomponent
@endif

{{-- Projects component --}}
@component('components.projects.projects'))
@endcomponent

{{-- Newsletters component --}}
@component('components.newsletters.newsletters'))
@endcomponent

{{-- Instagram component --}}
@component('components.instagram.instagram'))
@endcomponent

{{-- Banner component --}}
@component('components.banner.banner', array("banner" => $banner)))
@endcomponent

{{-- Sister Brands component --}}
@component('components.sister-brands.sister-brands'))
@endcomponent

@stop
