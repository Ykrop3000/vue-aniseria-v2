<template>
    <div class="comments container"     
    v-infinite-scroll="handleScroll" 
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10">
        <h2>Комментарии</h2>
        <SpinnerItem v-if="render && COMMENTS.length == 0"/>

        <div class="comment-editor" :class="{'active': open}">
            <div class="wrap">
                <div class="editor">
                    <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="Write comment"
                    v-model="text_comment">
                    </el-input>

                    <div class="actions">
                        <div class="button cancel" @click="open = false">Закрыть</div>
                        <div class="button save" @click="submit">Написать</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="comment-create" v-if="isLoggedIn">
            <div class="actions">
                <div class="button comment" @click="open = !open">
                    Написать
                </div>
            </div>
        </div>

        <div class="comment-wrap depth-0" v-for="(i,id) in COMMENTS" :key="id">

            <div class="comment" >
                <div class="header">
                    <router-link :to="{name: 'User', params:{username:i.user.nickname}}" class="user">
                        <div class="avatar"  v-lazy:background-image="i.user.avatar"></div>
                        {{i.user.nickname}}
                    </router-link>
                    <div class="time" v-text="date(i.created_at)"></div>
                </div>
                <div class="markdown" v-html="$bbcode.parse(i.body)"></div>
            </div>

        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'

const SpinnerItem = () => import('@/components/items/SpinnerItem.vue')


export default {
    props: ['id','render','isLoggedIn'],
    directives:{
        infiniteScroll
    },
    computed:{
        ...mapGetters(['COMMENTS'])
    },
    data(){
        return{
            text_comment: '',
            open:false,
        }
    },
    methods:{
        ...mapActions(['GET_COMMENTS','SET_COMMENTS']),
        handleScroll(){
            if(this.render && this.id && this.COMMENTS.length != 0){
                let page = Math.ceil(this.COMMENTS.length/11)+1;
                this.GET_COMMENTS({id:this.id, page:page})
            }
        },
        submit(){
            this.SET_COMMENTS({id:this.id,text:this.text_comment})
            this.open = false
        },
        date(d){
            return moment(d).lang("ru").startOf('day').fromNow(); 
        }
    },
    components:{
        SpinnerItem,
    },
    mounted(){
        this.GET_COMMENTS({id:this.id, page:1})
    }
}
</script>

<style scoped>
.comments{
    margin-top: 40px;
}
.comment-wrap {
    background: rgb(var(--color-foreground));
    margin-bottom: 20px;
    border-radius: 4px;
    font-size: 1.4rem;
}
.comment-wrap.depth-0 {
    padding-bottom: 2px;
    margin-bottom: 25px;
}
.comment {
    padding: 20px;
}
.header{
    align-items: center;
    display: flex;
    margin-bottom: 15px;
}
.comment .markdown{
    line-height: 1.4;
}
.markdown {
    overflow-wrap: break-word;
    word-break: break-word;
}
.header .time{
    color: rgb(var(--color-text-lighter));
    margin-left: 12px;
    font-size: 1.2rem;
}
.user {
    align-items: center;
    color: rgb(var(--color-blue));
    display: flex;
}
.avatar{
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px;
    display: inline-block;
    height: 35px;
    margin-right: 12px;
    width: 35px;
}
.comment-editor {
    bottom: -300px;
    left: 0;
    opacity: 0;
    padding: 10vh 10vw;
    pointer-events: none;
    position: fixed;
    transition: bottom .3s ease,opacity .2s ease;
    width: 100vw;
    z-index: 999;
}
.comment-editor.active{
    bottom: 0;
    opacity: 1;
    pointer-events: auto;
}
.wrap {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr;
}
.wrap .editor{
    padding-top: 10px;
}

.wrap .editor, .wrap .preview{
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 30px 0 rgba(var(--color-shadow-dark),.18);
}
.actions{
    margin-top: 10px;
    justify-content: flex-end;
    display: flex;
}
.comment-create{
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 35px;
}
.comment-create .actions{
    align-items: center;
    display: flex;
    margin-left: auto;
    margin-top: 0px;
}
.button.comment{
    background: rgb(var(--color-blue));
    padding-left: 15px;
    padding-right: 30px;
}

.button {
    align-items: center;
    background: rgb(var(--color-blue));
    border-radius: 4px;
    color: rgb(var(--color-text-bright));
    cursor: pointer;
    display: inline-flex;
    font-size: 1.3rem;
    margin-left: 18px;
    padding: 10px 15px;
    transition: .2s;
}
.comment-create .button {
    align-items: center;
    border-radius: 4px;
    color: rgb(var(--color-text-bright));
    cursor: pointer;
    display: inline-flex;
    font-size: 1.4rem;
    height: 36px;
    margin-left: 18px;
    padding: 10px 20px;
}
.button.cancel {
    background: rgb(var(--color-background));
    color: rgb(var(--color-text-light));
}

@media (max-width: 1040px){
    .comment-editor {
        padding: 20px;
    }
    .wrap{
        display: block;
    }
}
</style>