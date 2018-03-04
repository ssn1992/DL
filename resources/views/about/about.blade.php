@extends('lib.master.main')

@section('styles')
@stop

@section('scripts')
    <script src="{!! asset('js/about/about.js') !!}" type="text/javascript"></script>
@stop

@section('title')
@stop

@section('content')

<div id="about-page">

    {{-- Slider component --}}
    @component('components.slider.slider-static', array('id' => 'sliders', 'sliders'=>[ ['img/about/slider-main/1.jpg', ''],
                                                                                        ['img/about/slider-main/2.jpg', ''],
                                                                                        ['img/about/slider-main/3.jpg', ''],
                                                                                        ['img/about/slider-main/4.jpg', ''],
                                                                                        ['img/about/slider-main/5.jpg', ''],
                                                                                        ['img/about/slider-main/6.jpg', ''],
                                                                                        ['img/about/slider-main/7.jpg', '']]))
    @endcomponent

    {{-- Mission --}}
    <div class="container">
        <div class="row mission-block">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">

                {{-- Block Title  --}}
                <h4 class="block-title text-center">
                    OUR MISSION
                </h4>
                {{-- -Block Title  --}}

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x text-center">

                    <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                        <img src="{{ asset('/img/about/collections-slider/mission/1.jpg')}}">
                    </div>

                    <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                        <img src="{{ asset('/img/about/collections-slider/mission/2.jpg')}}">
                    </div>

                    <div class="mission-text col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <p> Design Unique Lamps</p>
                        <p>
                            Focused on the best combination of high quality design and
                            high quality craftsmanship. Our pieces not only illuminate
                            interiors they also add strong design presence to a space
                            with their unique forms.
                        </p>
                    </div>

                    <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                        <img src="{{ asset('/img/about/collections-slider/mission/3.jpg')}}">
                    </div>

                    <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                        <img src="{{ asset('/img/about/collections-slider/mission/4.jpg')}}">
                    </div>

                </div>

            </div>
        </div>
    </div>
    {{-- .Mission --}}

    {{-- DL World --}}
    <div class="container">
        <div class="row video-block">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">

                {{-- Block Title  --}}
                <h4 class="block-title text-center">
                    A DELIGHTFULL WORLD!
                </h4>
                {{-- -Block Title  --}}

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x text-center ">
                    <div class="video-text col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <p>
                            DELIGHTFULL’s world is about ambiance, history, moments that stay forever
                            through lighting designs created by our artisans with wisdom and passion for
                            craftsmanship. It is a know-how culture combining the past Heritage of
                            handwork with attention to emerging needs of the future.
                        </p>
                    </div>

                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/o-MxH3ERubE" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {{-- .DL World --}}

    {{-- Values --}}
    <div class="container">
        <div class="row values-block">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">

                {{-- Block Title  --}}
                <h4 class="block-title text-center">
                    VALUES
                </h4>
                {{-- -Block Title  --}}

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x text-center ">
                    <div class="values-img col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <img style="max-width: 400px" src="{{ asset('/img/about/values/lamp.png')}}">
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <h6>
                            DESIGN
                        </h6>

                        <p>
                            Each DELIGHTFULL piece shows our intense
                            passion for lighting design and vintage
                            classics.
                        </p>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <h6>
                            ELEGANCE
                        </h6>

                        <p>
                            Each piece has a unique identity, that is what
                            makes it special.
                        </p>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <h6>
                            SOFTNESS
                        </h6>

                        <p>
                            A present value appealing to soft, relaxing
                            and thoughtful senses.
                        </p>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <h6>
                            SKILLS
                        </h6>

                        <p>
                            Each DELIGHTFULL piece has a Heritage of
                            manual wisdom frequently forgotten with
                            massive production.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {{-- .Values --}}



    <!-- Slider COLLECTIONS-->
    @component('components.slider.base', array( 'id' => 'slider-collections', 'col' => 'col-lg-12'))
    @endcomponent
</div>
@stop
