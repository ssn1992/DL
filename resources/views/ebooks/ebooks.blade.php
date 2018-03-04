@extends('lib.master.main')

@section('styles')
    <link href="{!! asset('css/video-page/video-page.css') !!}" media="all" rel="stylesheet" type="text/css" />
@stop

@section('scripts')
    <!-- Ebooks Modal -->
    <div class="col-lg-6 col-lg-offset-3 modal inmodal fade" id="form-modal" tabindex="-1" role="dialog"  aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 style="color: #EC1B33" class="modal-title text-center">DOWNLOAD NOW</h4>
                </div>
                <div class="modal-body" style="text-align: center; display: block;">

                    <p style="color: #4d4c4c">Just fill in your details below and download the Ebook </p>

                    <input type="text" class="form-control text-center margin-bottom-none" placeholder="Enter your name">
                    <input type="text" class="form-control text-center" style="margin-top: 10px" placeholder="Enter your email">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Download</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        
        function modal() {
            $('#form-modal').modal('show');
        }

    </script>
@stop

@section('title')
@stop

@section('content')

{{-- Visual component --}}
@component('components.visual-menu.visual-menu-general', array('hasTitle' => false)))
@endcomponent

<section id="ebooks-page" class="col-lg-12">
    <div class="container">
            <div class="row">

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2 class="block-title text-left margin-top-3x margin-bottom-2x">
                        Ebooks
                        <small>Get inspired</small>
                    </h2>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 padding-bottom-2x">
                    <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                        <img src="{{ asset('img/ebooks/ebook_2.png' )}}" alt="">

                        <div class="text-center">
                            <a onclick="modal()" href="#" class="btn btn-default margin-right-none">Download</a>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-8 col-sm-8 col-xs-12">
                        <h4 class="padding-bottom-1x text-center">The Best Dining Room Chandelier Ideas</h4>
                        <p class="text-justify"><strong>Delightfull,</strong> brings you a collection of the best Dining Room Ideas collected in a complete ebook with all the information you might need! Download it now and get to know all our pieces like the  <strong> Amy Chandelier </strong> or the <strong>Galliano Chandelier.</strong></p>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 padding-bottom-2x">
                    <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                        <img src="{{ asset('img/ebooks/ebook_1.png' )}}" alt="">

                        <div class="text-center">
                            <a onclick="modal()" href="#" class="btn btn-default margin-right-none">Download</a>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-8 col-sm-8 col-xs-12">
                        <h4 class="padding-bottom-1x text-center">Pendant Lamps</h4>
                        <p class="text-justify">Some of the most unique and timeless chandeliers and pendant lamps are portrayed such as the <strong>Amy</strong> or the <strong>Jackson</strong>. Download to read more.</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 padding-bottom-2x">
                    <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                        <img src="{{ asset('img/ebooks/ebook_3.png' )}}" alt="">

                        <div class="text-center">
                            <a onclick="modal()" href="#" class="btn btn-default margin-right-none">Download</a>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-8 col-sm-8 col-xs-12">
                        <h4 class="padding-bottom-1x text-center">Floor Lamps for Your Mid-Century Home</h4>
                        <p class="text-justify"><strong>Jackson,</strong> Amy, Lee, these are some of <strong>Delightfull’s</strong> floor lamps for you mid century home design projects. Grab your inspiration right here!</p>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                        <img src="{{ asset('img/ebooks/ebook_4.png' )}}" alt="">

                        <div class="text-center">
                            <a  onclick="modal()"href="#" class="btn btn-default margin-right-none">Download</a>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-8 col-sm-8 col-xs-12">
                        <h4 class="padding-bottom-1x text-center">Brighten Up USA</h4>
                        <p class="text-justify">Nothing better to light up your country than the <strong>Coltrane Suspension</strong> or the <strong>Turner Table Lamp</strong>. These pieces from <strong>Delightfull</strong> will make a stand in your american home. Get inspired and download the ebook right now!</p>
                    </div>
                </div>
            </div>
        </div>
</section>

@stop