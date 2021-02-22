<template>
      <el-dialog
        :visible.sync="my_triger"
        class="list-editor-wrap dilog"
        >
        <div class="list-editor">

            <div class="header" :style="{'background-image':bigPoster}">
                <div class="content">
                    <div class="cover" >
                        <img  :src="poster || require('@/assets/img/noimage.jpg')" alt="poster" style="opacity: 1">
                    </div>
                    <div class="title" v-text="ANIME.russian"></div>
                    <div class="save-btn" @click="setrates">Сохранить</div>
                </div>
            </div>
            <div class="body">
                <div class="input-wrap anime">
                    <div class="form status">
                        <div class="input-title">Статус</div>
                        <el-select v-model="list.status" placeholder="Статус">
                            <el-option
                            v-for="(val,key) in $store.state.stats"
                            :key="key"
                            :label="val"
                            :value="key">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form score">
                        <div class="input-title">Рейтинг</div>
                        <el-input-number v-model="list.score" controls-position="right" :min="1" :max="10"></el-input-number>
                    </div>
                    <div class="form progress">
                        <div class="input-title">Эпизод</div>
                        <el-input-number v-model="list.episodes" controls-position="right" :min="1" :max="ANIME.episodes"></el-input-number>
                    </div>

                </div>
            </div>
                        
        </div>
        </el-dialog>
</template>


<script>
import {mapActions} from 'vuex'

export default {
    name: 'SetRates',
    props: [
        'triger',
        'poster',
        'bigPoster',
        'ANIME',
        'isLoggedIn',
        'user'
    ],
    data(){
        return{
             list:{
                status: '',
                score: 0,
                episodes: 0
            }
        }
    },
    methods:{
        ...mapActions(['SET_ANIME_RATES']),    
        setrates(){
            if(this.isLoggedIn){

                this.SET_ANIME_RATES({
                    target_id: this.ANIME.id,
                    status: this.list.status,
                    user_id: this.user.id,
                    score: this.score,
                    episodes: this.episodes
                });
                this.my_triger = false
            }else{
                this.$message.error('Для этого действия тебе необходима регистрация на сайте.');
            }
        },
        
    },
    computed:{
        my_triger:{
            get(){
                return this.triger
            },
            set(v){
                this.$emit('set_triger', v)
            }
        }
    },
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
.list-editor-wrap .el-dialog {
    animation: in .25s ease-in-out;
    background: 0 0;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 33px rgb(0 0 0 / 48%);
    width: 100%;
    max-width: 1000px;
}
.list-editor-wrap .list-editor .body {
    background: rgb(var(--color-foreground));
    display: grid;
    grid-gap: 50px;
    grid-template-columns: auto 160px;
    padding: 50px;
    padding-top: 70px;
}
.list-editor-wrap .list-editor .body .input-wrap {
    display: grid;
    grid-gap: 40px;
    grid-template-areas:
        "status score progress"
        "start finish repeat"
        "notes notes notes"
        "advanced advanced advanced";
    justify-content: space-around;
}
.input-title {
    color: rgba(var(--color-text-light),.9);
    font-size: 1.3rem;
    padding-bottom: 8px;
    padding-left: 1px;
}
.list-editor-wrap .list-editor .body .status {
    grid-area: status;
}
.list-editor-wrap .list-editor .body .progress {
    grid-area: progress;
}
.list-editor-wrap .list-editor .body .score {
    grid-area: score;
}
.list-editor-wrap .el-select {
    box-shadow: none;
}
.el-select>.el-input {
    display: block;
}
.list-editor-wrap .el-input, .list-editor-wrap .el-input-number, .list-editor-wrap .el-select, .list-editor-wrap .el-textarea {
    width: 100%;
}
.el-input, .el-textarea {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    color: rgb(var(--color-text));
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
@media (max-width: 1040px){
    .list-editor-wrap .list-editor .body .input-wrap {
        display: block;
    }
    .list-editor-wrap .list-editor .body .input-wrap .form {
    margin-bottom: 25px;
}
}
@media (max-width: 760px){
    .list-editor-wrap .list-editor .body {
        display: block;
        padding: 30px;
        padding-top: 70px;
    }
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
    grid-column-gap: initial;
    margin-top: auto;
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
    word-wrap: break-word;
    word-break: initial;
    line-break: normal;
    hyphens: auto;
}

.list-editor-wrap .header .favourite {
    margin-left: auto;
    margin-bottom: 13px;
    margin-right: 10px;
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