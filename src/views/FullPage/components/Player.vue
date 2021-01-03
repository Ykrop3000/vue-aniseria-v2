<template>
    <div class="trailer">
        <h2></h2>
        <iframe :src="src" frameborder="0" allowfullscreen="true" class="video"></iframe>
    </div>
</template>
<script>
export default {
    props:[
        'src'
    ]
}
</script>
<style scoped>
.video {
    border-radius: 4px;
    height: 230px;
    overflow: hidden;
    width: 100%;
}
</style>