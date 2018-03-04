<style scoped>
    .to-top {
        height: 100px;
        display: block;
        width: 100px;
        position: absolute;
        bottom: 0px;
        right: 20px;
        z-index: 999999999;
    }
</style>
<template>

    <div class="to-top" style="height: 100px; width: 100px; display: none;">
        <a v-on:click="goTop"> Click me </a>
    </div>

</template>

<script>

    export default {

        data () {
            return {
            }
        },

        methods: {
            goTop: function (event) {
                console.log('click top' + event)

            },
        },

        mounted () {
            console.log('working to top')
        }
    }
</script>
