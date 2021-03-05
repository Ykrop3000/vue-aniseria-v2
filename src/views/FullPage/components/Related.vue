<template>
    <div class="relations" >
        <h2>Связанные</h2>

        <Spinner v-if="related.length == 0" />

        <div v-else :class="{'grid-wrap':width<760}" >
            <Card  v-for="(i, id) in related" :key="id" :data="i" :url="SHIKIURL" :width="width"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Spinner from '@/components/items/SpinnerItem'
import Card from './RelatedCard'

export default {
    name: 'Related',
    props:['related', 'width'],
    computed:{
        ...mapGetters(['SHIKIURL'])
    },
    components:{
        Spinner,
        Card
    }
}
</script>

<style scoped>
 .grid-wrap {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 15px;
    grid-template-columns: repeat(3,1fr);
}

@media (max-width: 1540px){
     .grid-wrap {
        grid-template-columns: repeat(2,1fr);
    }
}
@media (max-width: 1040px){
    .grid-wrap {
        grid-template-columns: repeat(1,1fr);
    }
}
@media (max-width: 760px){
    .relations .grid-wrap{
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        display: block;
    }
}

</style>
