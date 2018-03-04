<template>
    <div id="sliders" class="container">
        <div class="row collections-block">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x">

                <h4 class="block-title text-center">
                    OUR COLLECTIONS
                </h4>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x text-center ">
                    <div class="col-lg-offset-2 col-lg-4 col-md-6 col-sm-12 col-xs-12">

                        <div class="items-carousel">
                            <div class="slider" v-for="image in herigateImg">
                                <img v-bind:src="image">
                            </div>
                        </div>

                        <h6 class="padding-top-1x">
                            HERITAGE
                        </h6>

                        <p>
                            Heritage, is full of a broad selection of high quality lighting
                            designs, versatile enough for many types of atmospheres and
                            spaces. Heritage assorted 30’s, 40’s and 50’s Soul and Jazz
                            inspired lamps takes on the legacy of – WISDOM – of men
                            who craft with their own hands.
                        </p>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">

                        <div class="items-carousel">
                            <div class="slider" v-for="image in graphicImg">
                                <img v-bind:src="image">
                            </div>
                        </div>

                        <h6 class="padding-top-1x">
                            GRAPHIC
                        </h6>

                        <p>
                            Non-conventional and juicy: here they are, the colorful and
                            extremely communicative graphic lamps made for Delightfull’s
                            new collection. Ideal for hotels and clubs, these floor, table
                            and wall fixtures will revolutionize the lighting concepts,
                            arriving in form of letters, numbers or symbols.
                        </p>
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
                herigateImg : ['/img/about/collections-slider/heritage/1.jpg',
                               '/img/about/collections-slider/heritage/2.jpg',
                               '/img/about/collections-slider/heritage/3.jpg',
                               '/img/about/collections-slider/heritage/4.jpg',
                               '/img/about/collections-slider/heritage/5.jpg',
                               '/img/about/collections-slider/heritage/6.jpg',
                               '/img/about/collections-slider/heritage/7.jpg',
                               '/img/about/collections-slider/heritage/8.jpg',
                               '/img/about/collections-slider/heritage/9.jpg',
                               '/img/about/collections-slider/heritage/10.jpg'],

                graphicImg   : ['/img/about/collections-slider/graphic/1.jpg',
                                '/img/about/collections-slider/graphic/2.jpg',
                                '/img/about/collections-slider/graphic/3.jpg',
                                '/img/about/collections-slider/graphic/4.jpg',
                                '/img/about/collections-slider/graphic/5.jpg',
                                '/img/about/collections-slider/graphic/6.jpg',
                                '/img/about/collections-slider/graphic/7.jpg',
                                '/img/about/collections-slider/graphic/8.jpg',
                                '/img/about/collections-slider/graphic/9.jpg']
            }
        },

        methods: {

        },

        mounted() {
            $('.items-carousel').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 9000,
                nextArrow: '<i class="slick-next fa fa-angle-right"></i>',
                prevArrow: '<i class="slick-prev fa fa-angle-left"></i>',
                autoplay: true,
                autoplaySpeed: 8000,
                fade: true,
                cssEase: 'linear'
            });
        }
    }
</script>
