<template>
    <div>

        <div class="results" :class="{ cover:ViewMode==0, chart:ViewMode==1, table:ViewMode==2}">
            <MediaCard v-for="i in ANIMES" :key="i.id" :Anime="i" :ViewMode="ViewMode" :isLoggedIn="isLoggedIn"/>
        </div>
        
        <Spinner v-if="ANIMES.length == 0"/>
    </div>
</template>
<script>

import MediaCard from '@/components/MediaCard'
import ClickOutside from 'vue-click-outside'
import Spinner from '@/components/items/SpinnerItem'


export default {
    components:{
        MediaCard,
        Spinner
    },
    directives:{
        ClickOutside
    },
    props:[
        'ViewMode',
        'ANIMES',
        'isLoggedIn'
    ],
}
</script>
