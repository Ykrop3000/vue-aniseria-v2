<template>
    <div class="trailer">
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
.trailer{
    position: relative;

}
.trailer>iframe{
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>