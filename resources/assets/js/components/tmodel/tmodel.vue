<template>
    <div>
        <model-three src="../models/json/scene.json"></model-three>
    </div>
</template>

<script>
    import { ModelThree} from 'vue-3d-model'

    export default {
        components: { ModelThree },

        mounted() {
            console.log('3d model');
        }
    }
</script>
