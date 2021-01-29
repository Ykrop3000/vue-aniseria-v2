<template>
        <el-dialog
        :visible.sync="visible"
        :fullscreen="true"
        class="list-editor-wrap"
        :close="$emit('close')"
        >

        <div class="header" :style="{'background-image':`url(https://st.kp.yandex.net/images/film_big/${ANIME.kp_id}.jpg`}">
            <div class="content">
                <div class="cover" v-lazy-container="{ selector: 'img' }">
                    <img :data-src="SHIKIURL + ANIME.image.original" alt="poster">
                </div>
                <div class="title" v-text="ANIME.russian"></div>
                <div class="favourite"></div>
                <div class="save-btn"></div>
            </div>
        </div>
        
        </el-dialog>
</template>

<script>
export default {
    name: 'dilog',
    props:['ANIME','visible']
}
</script>


<style>

.list-editor-wrap .el-dialog__header {
    padding: 0;
    position: relative;
    z-index: 20;
}
.el-dialog__body, .el-dialog__header, .el-dialog__title {
    color: rgb(var(--color-text));
}
.el-dialog__header {
    background: rgb(var(--color-foreground));
    border-radius: 3px 3px 0 0;
}

.list-editor-wrap .el-dialog__body {
    background: 0 0;
    color: rgb(var(--color-text));
    font-size: 1.3rem;
    line-height: normal;
    padding: 0;
}
.el-dialog__body {
    background: rgb(var(--color-background));
    border-radius: 3px;
}
.list-editor-wrap .header .cover img {
    width: 100%;
}
</style>


<style scoped>


.list-editor-wrap .header {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: inset 0 0 250px #2f3133;
    height: 180px;
    position: relative;
}

.list-editor-wrap .header .content {
    align-items: flex-end;
    display: flex;
    height: 100%;
    padding: 50px;
    padding-bottom: 0;
    position: relative;
    z-index: 10;
}
.list-editor-wrap .header:after {
    background: rgba(31,40,53,.65);
    bottom: 0;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 5;
}
.list-editor-wrap .header .cover {
    border-radius: 2px;
    margin-bottom: -30px;
    max-width: 100px;
    overflow: hidden;
}
.list-editor-wrap .header .title {
    color: rgba(var(--color-white),.9);
    font-size: 1.6rem;
    padding: 20px;
}
.list-editor-wrap .header .favourite {
    margin-left: auto;
    margin-bottom: 13px;
    margin-right: 10px;
}
.outline.isFavourite{
    color: rgb(var(--color-red));
}
.favourite.isFavourite{
    color: #ffaebc;
}
.outline{
    background: 0 0;
    color: rgb(var(--color-white));
    font-size: 1.6rem;
    opacity: .9;
}
.list-editor-wrap .header .save-btn {
    background: rgb(var(--color-blue));
    border-radius: 3px;
    color: rgb(var(--color-white));
    cursor: pointer;
    font-size: 1.3rem;
    margin-bottom: 15px;
    padding: 8px 14px;
}
@media (max-width: 760px){
    .list-editor-wrap .header .content {
        padding: 30px;
        padding-bottom: 0;
    }
}

</style>