@extends('lib.master-press-area.main')

@section('styles')
@stop

@section('scripts')
    <script src="{!! asset('js/press-area/home.js') !!}" type="text/javascript"></script>
@stop

@section('title')
    Press Area
@stop

@section('content')
    <section id="press-area-home" class="padding-bottom-2x">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/XVXCSn2jY4g" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">
                    <img src="{{ asset('img/press-area/home/presskit.jpg' )}}" alt="">
                    <div class="text-right press-kit-home">
                        <span> Presskit: </span>
                        <a href="/press/about-the-brand/presskit.php"> EN |</a>
                        <a href="/press/about-the-brand/presskit.php"> PT</a>
                        <a href="/press/about-the-brand/presskit.php"> FR |</a>
                        <a href="/press/about-the-brand/presskit.php"> DE |</a>
                        <a href="/press/about-the-brand/presskit.php"> IT |</a>
                    </div>

                </div>

            </div>
        </div>

        {{-- Instagram component --}}
        @component('components.press-releases.sliders.press-releases'))
        @endcomponent

        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">
                    {{-- Block Title  --}}
                    <h4 class="block-title text-center">
                        NEW COVERS
                    </h4>
                    {{-- -Block Title  --}}

                    <div class="padding-top-2x">
                        <div class="col-lg-12">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/7.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> HANNA </span>
                                    <p style="padding: 0" class="text-center"> FLOOR </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/8.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> ETTA </span>
                                    <p style="padding: 0" class="text-center"> WALL </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/9.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> BASIE </span>
                                    <p style="padding: 0" class="text-center"> WALL </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/10.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> NEIL </span>
                                    <p style="padding: 0" class="text-center"> SUSPENSION </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/11.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> COLEMAN </span>
                                    <p style="padding: 0" class="text-center"> FLOOR </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/12.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> TURNER </span>
                                    <p style="padding: 0" class="text-center"> SUSPENSION </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/1.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> HENDRIX </span>
                                    <p style="padding: 0" class="text-center"> CHANDELIER </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/2.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> HANK </span>
                                    <p style="padding: 0" class="text-center"> SUSPENSION </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/3.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> LAINE </span>
                                    <p style="padding: 0" class="text-center"> SUSPENSION </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/4.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> BOTTI </span>
                                    <p style="padding: 0" class="text-center"> FLOOR </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/5.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> NORAH </span>
                                    <p style="padding: 0" class="text-center"> WALL </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                                <!-- Press Releases -->
                                <div class="press-slider">
                                    <a href="#">
                                        <img src="{{ asset('img/press-area/covers/6.png' )}}" alt="">
                                    </a>
                                    <span class="text-center"> ARETHA </span>
                                    <p style="padding: 0" class="text-center"> SUSPENSION </p>
                                </div>
                                <!-- .Press Releases -->
                            </div>
                        </div>

                    </div>

                    <div class="padding-top-2x">
                        <div class="col-lg-offset-4 col-lg-4 view-all-button" style="padding-top: 40px">
                            <a href="#" class="btn btn-default btn-block margin-right-none">VIEW ALL COVERS</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@stop