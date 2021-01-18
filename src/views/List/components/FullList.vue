<template>
    <div>


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
