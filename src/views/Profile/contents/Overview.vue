<template>
    <div class="overview">
        <div class="section">
            <Stats :statuses="user.stats.statuses.anime" />
        </div>
    </div>
</template>

<script>
import Stats from  '@/components/modules/Stats'
 
export default {
    name: 'Overview',
    props: ['user'],
    components:{
        Stats
    }
}
</script>

<style scoped>
.overview{
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: calc(45% - 40px) 55%;
    margin-top: 30px;
}
@media (max-width: 1040px){
    .overview {
        display: block;
    }
}
</style>