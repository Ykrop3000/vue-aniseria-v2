<template>
    <div class="screenshots-wrapp">
        <h2>Скриншоты</h2>
        <div class="screenshots">
            <enlargeable-image v-for="(i, id) in SCREENSHOTS" animation_duration="500"  :key="id" :src="SHIKIURL + i.preview" :src_large="SHIKIURL + i.original" />
        </div>
    </div>
</template>

<script>

import EnlargeableImage from '@diracleo/vue-enlargeable-image';
import {mapGetters} from 'vuex';

export default {
    props:['anime'],
    components:{
        EnlargeableImage
    },
    computed: {
        ...mapGetters([
            'SHIKIURL',
            'SCREENSHOTS'
            ]),
    },
    mounted(){
        this.$store.dispatch('GET_SCREENSHOTS', this.$route.params.slug)
    }


}
</script>

