@extends('lib.master.main')

@section('styles')
    <link href="{!! asset('css/video-page/video-page.css') !!}" media="all" rel="stylesheet" type="text/css" />
@stop

@section('scripts')
@stop

@section('title')
@stop

@section('content')

{{-- Visual component --}}
@component('components.visual-menu.visual-menu-general', array('hasTitle' => false)))
@endcomponent

<section id="video-page" class="padding-bottom-2x">
    <div class="container">
        <div class="row">

        <!-- Video component-->
        @component('components.video.video', array('links' => [
                                                       ['Featured', '', [
                                                       ['col-lg-12 col-md-12 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/o-MxH3ERubE' , '']
                                                       ]],
                                                       ['Most Popular Videos', '', [
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/frx23ugpQo4', 'Salone del Mobile Best Moments'],
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/uL10Xpb-qfk', 'Coltrane Family - Delightfull | Unique Lamps'],
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/lVyvroWSMV8', 'Floor Lamp Amy -  Delightfull | Unique Lamps'],
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/gkfT90mfZTY', 'Best Design Studio Ever | Delightfull LifeStyle']
                                                       ]],
                                                       ['Choose your playlist', '', [
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/YDZuGjLSQSg?list=PLRASh-57GyRyFP8pDl_COZJ9hbRfNSEyY', 'GRAPHIC COLLECTION'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/33nf7W49hNc?list=PLRASh-57GyRwNjNNpJREodaviUXE9n2dg', 'TABLE LAMPS'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/sZobKpVAF78?list=PLRASh-57GyRxGq9AJcuBaPzer1w6p2rGN', 'WALL LAMPS'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-1x', 'https://www.youtube.com/embed/ULTa8-I9wzw?list=PLRASh-57GyRz3SjcwvxKrvyC9q6qV6KnZ', 'LIGHTING FINISHES | LUXURY MATERIALS'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-1x', 'https://www.youtube.com/embed/HRZ374-TT8I?list=PLRASh-57GyRz23EZpfwdRYxM1zw9jrLbl', 'UNIQUE BLOG | PRESS'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-1x', 'https://www.youtube.com/embed/FVlzbSIFpgo?list=PLRASh-57GyRzQEUmirRsvFXTHZPQuHEkp', 'FLOOR LAMPS'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-1x', 'https://www.youtube.com/embed/mPWkJsE9qC8?list=PLRASh-57GyRxTw24rsFy9-UhtzvrsUOt2', 'SUSPENSIONS LAMPS'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-1x', 'https://www.youtube.com/embed/gkfT90mfZTY?list=PLRASh-57GyRyorHxHH6_z7qVvAFGS8tWW', 'ARTS & CRAFTS | UNIQUE PRODUCTION'],
                                                       ['col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-top-1x', 'https://www.youtube.com/embed/MGzgP24bTV0?list=PLRASh-57GyRz3sFA-Np7c3aA6f9BsAVdH', 'NEWS & EVENTS'],
                                                       ]],
                                                       ['Latest Videos', '', [
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/fNIv2uuXVOY', 'Amy Suspension Lamp DelightFULL'],
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/o-MxH3ERubE', 'Delightfull Celebrates Design With Friends'],
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/FVlzbSIFpgo', 'Ike Brass Floor Lamp I Delightfull'],
                                                       ['col-lg-3 col-md-3 col-sm-12 col-xs-12', 'https://www.youtube.com/embed/QNqpbdKT_wQ', 'Delightfull - 1 Day To Go Maison et Objet'],
                                                       ]]]))
        @endcomponent

        </div>
    </div>
</section>

@stop
