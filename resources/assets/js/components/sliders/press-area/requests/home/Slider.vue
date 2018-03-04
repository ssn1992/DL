<template>
    <div id="press-releases-slider" class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">
                <h4 class="block-title text-center">
                    PRESS RELEASES
                </h4>

                <div class="padding-top-2x items-carousel">
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/1.png" alt="">
                            </a>
                            <p class="text-center"> DELIGHTFULL AT MAISON ET OBJET PARIS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/2.png" alt="">
                            </a>
                            <p class="text-center"> 10 WINTER COLOR TRENDS TO STYLISH DAYS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/3.png" alt="">
                            </a>
                            <p class="text-center">LIGHT UP YOUR WORLD THIS CHRISTMAS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/4.png" alt="">
                            </a>
                            <p class="text-center"> ELEMENTS ALLURED BY THE LIGHT </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/5.png" alt="">
                            </a>
                            <p class="text-center"> DELIGHTFULL AT MAISON ET OBJET PARIS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/6.png" alt="">
                            </a>
                            <p class="text-center"> A GIFT FROM THE STARS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/4.png" alt="">
                            </a>
                            <p class="text-center"> A GIFT FROM THE STARS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <!-- Press Releases -->
                        <div class="press-slider">
                            <a href="#">
                                <img src="/img/press-area/press-releases/2.png" alt="">
                            </a>
                            <p class="text-center"> A GIFT FROM THE STARS </p>
                        </div>
                        <!-- .Press Releases -->
                    </div>
                </div>

                <div class="padding-top-2x">
                    <div class="col-lg-offset-4 col-lg-4 view-all-button">
                        <a href="#" class="btn btn-default btn-block margin-right-none">VIEW ALL PRESS PRESS RELEASES</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },

        methods: {

        },

        mounted() {
            $('.items-carousel').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 9000,
                nextArrow:
                    '<i class="slick-next material-icons chevron_right"></i>',
                prevArrow:
                    '<i class="slick-prev material-icons chevron_left"></i>',
            });
        }
    }
</script>
