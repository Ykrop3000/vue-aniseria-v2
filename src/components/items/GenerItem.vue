<template>
    <router-link class="genre" :to="{name:'Genre',params:{slug:j}}"> {{j}} </router-link>
</template>

<script>

export default {
    props:['j',"GENRES"],
    computed: {
    },
}
</script>

<style scoped>
.genre{
    background: var(--media-background);
    border-radius: 10px;
    color: var(--media-background-text);
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 700;
    height: 20px;
    line-height: 2rem;
    margin-right: 11px;
    padding: 0 12px;
    text-transform: lowercase;
}
</style>