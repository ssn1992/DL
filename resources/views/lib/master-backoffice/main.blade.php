<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>DelightfFULL @yield('title') </title>

    {{-- STYLE SECTION --}}
    <link href="{!! asset('css/master-backoffice/master.css') !!}" media="all" rel="stylesheet" type="text/css" />
    @yield('styles')
    {{-- .STYLE SECTION --}}
</head>
<body>
{{-- Page Wrapper --}}
<div class="wrapper">

    {{-- Navigation --}}
    @component('lib.master-backoffice.navigation'))
    @endcomponent

    <div class="main-panel">
        {{-- Top Navbar --}}
        @component('lib.master-backoffice.top-navbar'))
        @endcomponent

        {{-- Content --}}
            @yield('content')
        {{-- .Content --}}

        {{-- Footer --}}
        @component('lib.master-backoffice.footer'))
        @endcomponent

    </div>

</div>
{{-- .Page Wrapper --}}

{{-- SCRIPTS SECTION --}}
<script src="{!! asset('js/master-backoffice/master.js') !!}" type="text/javascript"></script>
<script src="{!! asset('js/ladda/spin.min.js') !!}" type="text/javascript"></script>
<script src="{!! asset('js/ladda/ladda.min.js') !!}" type="text/javascript"></script>
<script src="{!! asset('js/ladda/ladda.jquery.min.js') !!}" type="text/javascript"></script>
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
    echo json_encode($trans);
    ?>;
</script>
@yield('scripts')
{{-- .SCRIPTS SECTION --}}
</body>
</html>
