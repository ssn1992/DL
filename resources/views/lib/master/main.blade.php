<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>DelightFULL @yield('title') </title>

    {{-- STYLE SECTION --}}
    <link href="{!! asset('css/master/master.css') !!}" media="all" rel="stylesheet" type="text/css" />
    @yield('styles')
    {{-- .STYLE SECTION --}}
</head>
<body>
{{-- Page Wrapper --}}
<div class="page-wrapper">
    {{-- Top Bar --}}
    @component('lib.master.top-bar'))
    @endcomponent

    {{-- Mobile Header --}}
    @component('lib.master.header-mobile'))
    @endcomponent

    <div canvas="container">
        {{-- Backdrop for Mobile menu  --}}
        <div class="backdrop offcanvas-toggle"></div>

        {{-- Header --}}
        @component('lib.master.header'))
        @endcomponent

        {{-- Content --}}
        <main>
            <div class="page-wrapper">
                @yield('content')
            </div>
        </main>
        {{-- .Content --}}

        {{-- Footer --}}
        @component('lib.master.footer'))
        @endcomponent
    </div>
</div>
{{-- .Page Wrapper --}}

{{-- ToTop component --}}
@component('components.to-top.to-top'))
@endcomponent
{{-- SCRIPTS SECTION --}}
<script src="{!! asset('js/plugins/slidebars/slidebars.js') !!}" type="text/javascript"></script>
<script src="{!! asset('js/master/master.js') !!}" type="text/javascript"></script>
<script>
    window.trans =
    <?php
    // copy all translations from /resources/lang/CURRENT_LOCALE/* to global JS variable
    $lang_files = File::files(resource_path() . '/lang/' . App::getLocale());
    $trans = [];
    foreach ($lang_files as $f) {
        $filename = pathinfo($f)['filename'];
        $trans[$filename] = trans($filename);
    }
    $trans['locale'] = App::getLocale();
    echo json_encode($trans);
    ?>;
</script>
@yield('scripts')
{{-- .SCRIPTS SECTION --}}
</body>
</html>
