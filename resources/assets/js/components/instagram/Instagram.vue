<template>
    <div  class="padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="container">
            <!-- Block Title -->
            <h2 class="block-title text-center margin-bottom-2x">
                Instagram
                <small> Get Inspired With Our </small>
            </h2>
            <!-- Block Title END -->

            <div class="row">
                <vue-instagram token="253093357.6090697.0d9124a6373243c6aac109953ff8fa6e" username="delightfulll" :count="6">
                    <template slot="feeds" slot-scope="props">

                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                            <!-- Insta Tile -->
                            <div class="tile tile-insta">
                                <a :href=props.feed.link target="_blank" class="preview-box">
                                    <img :src= props.feed.images.standard_resolution.url>

                                    <span class="insta-meta" style="margin-left: -25px;"><i class="material-icons favorite"></i>
                                        {{ props.feed.likes.count }}
                                    </span>

                                    <span class="insta-meta" style="margin-left: 25px;"> <i class="material-icons mode_comment"></i>
                                        {{ props.feed.comments.count }}
                                    </span>
                                </a>
                            </div>
                            <!-- Insta Tile END -->
                        </div>
                    </template>

                    <template slot="error" slot-scope="props">
                        <div class="fancy-alert"> {{ props.error.error_message }} </div>
                    </template>
                </vue-instagram>

            </div>
        </div>
    </div>
</template>

<script>
    import VueInstagram from 'vue-instagram'

    export default {
        components: {
            'vue-instagram': VueInstagram
        },
    }
</script>
