@extends('lib.master.main')

@section('styles')
    <link href="{!! asset('css/time-line/time-line.css') !!}" media="all" rel="stylesheet" type="text/css" />
@stop

@section('scripts')
@stop

@section('title')
@stop

@section('content')

    {{-- Visual component --}}
    @component('components.visual-menu.visual-menu-general', array('hasTitle' => false)))
    @endcomponent

    <section id="time-line-page" class="padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="container">

            @if(true)

            <!-- Block Title -->
            <h2 class="block-title text-center margin-bottom-2x">
                Time Line
                <small>DelightFull</small>
            </h2><!-- Block Title END -->

            <ul class="timeline" style="max-width: 100%">
                <li class="timeline-event">
                    <label class="timeline-event-icon"></label>
                    <div class="timeline-event-copy">
                        <p class="timeline-event-thumbnail">April 2011 - Graphics</p>
                        <h3>GRAPHIC LAMP COLLECTION</h3>
                        <h4>Non-conventional and juicy</h4>

                        <div class="timeline-image">
                            <img src="{{ asset('img/time-line/time-line-1.jpg' )}}" alt="">
                        </div>

                        <p>
                            <strong>Colorful and extremely communicative graphic lamps</strong>
                            <br>
                            Ideal for hotels and clubs, these floor, table and wall fixtures will revolutionize the lighting concepts, arriving in form of letters, numbers or symbols. Each lighting letter is based on a wide selection of iconic type fonts with a Delightfull twist.
                        </p>

                        <p><strong>Night</strong><br>Each letter seems to talk and to impose a respectful position. Astonish yourself with the explosive “M” lighting letter featuring its complex body composed by aluminum, brass, acrylic and iron.</p>
                    </div>
                </li>
                <li class="timeline-event">
                    <label class="timeline-event-icon"></label>
                    <div class="timeline-event-copy">
                        <p class="timeline-event-thumbnail">Jun 2017 - Projects</p>
                        <h3>PROJECT MAMBA</h3>
                        <h4>Non-conventional and juicy</h4>

                        <div class="timeline-image">
                            <img src="{{ asset('img/time-line/time-line-2.jpg' )}}" alt="">
                        </div>

                        <p>
                            <strong>Colorful and extremely communicative graphic lamps</strong>
                            <br>
                            Ideal for hotels and clubs, these floor, table and wall fixtures will revolutionize the lighting concepts, arriving in form of letters, numbers or symbols. Each lighting letter is based on a wide selection of iconic type fonts with a Delightfull twist.
                        </p>

                        <p><strong>Night</strong><br>Each letter seems to talk and to impose a respectful position. Astonish yourself with the explosive “M” lighting letter featuring its complex body composed by aluminum, brass, acrylic and iron.</p>
                    </div>
                </li>
                <li class="timeline-event">
                    <label class="timeline-event-icon"></label>
                    <div class="timeline-event-copy">
                        <p class="timeline-event-thumbnail">September 2017 - Decor Festival</p>
                        <h3>DECOR FESTIVAL</h3>
                        <h4>Non-conventional and juicy</h4>

                        <div class="timeline-image">
                            <img src="{{ asset('img/time-line/time-line-3.jpg' )}}" alt="">
                        </div>

                        <p>
                            <strong>Colorful and extremely communicative graphic lamps</strong>
                            <br>
                            Ideal for hotels and clubs, these floor, table and wall fixtures will revolutionize the lighting concepts, arriving in form of letters, numbers or symbols. Each lighting letter is based on a wide selection of iconic type fonts with a Delightfull twist.
                        </p>

                        <p><strong>Night</strong><br>Each letter seems to talk and to impose a respectful position. Astonish yourself with the explosive “M” lighting letter featuring its complex body composed by aluminum, brass, acrylic and iron.</p>
                    </div>
                </li>
            </ul>

            @else

                <!-- Block Title -->
                <h2 class="block-title text-center margin-bottom-2x">
                    Time Line
                    <small>DelightFull</small>
                </h2><!-- Block Title END -->

                <ul class="timeline">
                    <li class="timeline-event">
                        <label class="timeline-event-icon"></label>
                        <div class="timeline-event-copy">
                            <p class="timeline-event-thumbnail">April 2011 - Graphics</p>
                            <h3>GRAPHIC LAMP COLLECTION</h3>
                            <h4>Non-conventional and juicy</h4>

                            <div class="timeline-image">
                                <img src="{{ asset('img/time-line/time-line-1.jpg' )}}" alt="">
                            </div>

                            <p>
                                <strong>Colorful and extremely communicative graphic lamps</strong>
                                <br>
                                Ideal for hotels and clubs, these floor, table and wall fixtures will revolutionize the lighting concepts, arriving in form of letters, numbers or symbols. Each lighting letter is based on a wide selection of iconic type fonts with a Delightfull twist.
                            </p>

                            <p><strong>Night</strong><br>Each letter seems to talk and to impose a respectful position. Astonish yourself with the explosive “M” lighting letter featuring its complex body composed by aluminum, brass, acrylic and iron.</p>
                        </div>
                    </li>
                    <li class="timeline-event">
                        <label class="timeline-event-icon"></label>
                        <div class="timeline-event-copy">
                            <p class="timeline-event-thumbnail">Jun 2017 - Projects</p>
                            <h3>PROJECT MAMBA</h3>
                            <h4>Non-conventional and juicy</h4>

                            <div class="timeline-image">
                                <img src="{{ asset('img/time-line/time-line-2.jpg' )}}" alt="">
                            </div>

                            <p>
                                <strong>Colorful and extremely communicative graphic lamps</strong>
                                <br>
                                Ideal for hotels and clubs, these floor, table and wall fixtures will revolutionize the lighting concepts, arriving in form of letters, numbers or symbols. Each lighting letter is based on a wide selection of iconic type fonts with a Delightfull twist.
                            </p>

                            <p><strong>Night</strong><br>Each letter seems to talk and to impose a respectful position. Astonish yourself with the explosive “M” lighting letter featuring its complex body composed by aluminum, brass, acrylic and iron.</p>
                        </div>
                    </li>
                    <li class="timeline-event">
                        <label class="timeline-event-icon"></label>
                        <div class="timeline-event-copy">
                            <p class="timeline-event-thumbnail">September 2017 - Decor Festival</p>
                            <h3>DECOR FESTIVAL</h3>
                            <h4>Non-conventional and juicy</h4>

                            <div class="timeline-image">
                                <img src="{{ asset('img/time-line/time-line-3.jpg' )}}" alt="">
                            </div>

                            <p>
                                <strong>Colorful and extremely communicative graphic lamps</strong>
                                <br>
                                Ideal for hotels and clubs, these floor, table and wall fixtures will revolutionize the lighting concepts, arriving in form of letters, numbers or symbols. Each lighting letter is based on a wide selection of iconic type fonts with a Delightfull twist.
                            </p>

                            <p><strong>Night</strong><br>Each letter seems to talk and to impose a respectful position. Astonish yourself with the explosive “M” lighting letter featuring its complex body composed by aluminum, brass, acrylic and iron.</p>
                        </div>
                    </li>
                </ul>

            @endif

        </div>
    </section>

@stop