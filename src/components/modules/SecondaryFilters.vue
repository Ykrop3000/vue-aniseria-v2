<template>
    <div class="secondary-filters">
            <div class="active-filters">
                <i class="fas fa-tags tags-icon" v-if="filterActive || searchActive"></i>
                <div class="filter" v-if="searchActive">
                    <span class="lable" v-text="'Поиск: '+ search"></span>
                </div>
            </div>
            <div class="selects-wrap">
                <div class="sort-wrap sort-select" v-click-outside="tr">
                    <i class="fas fa-sort icon"></i>
                    <span @click="sortTr = !sortTr" class="label" v-text="sortText"></span>
                    <div v-if="sortTr"  class="dropdown">
                        <div class="option"  @click="SetOrder('popularity'); sortText = 'По популярности'; sortTr = false" v-text="'По популярности'"></div>
                        <div class="option"  @click="SetOrder('aired_on'); sortText = 'По дате выхода'; sortTr = false" v-text="'По дате выхода'"></div>
                        <div class="option"  @click="SetOrder('ranked'); sortText = 'Рейтингу'; sortTr = false " v-text="'По рейтингу'"></div>
                        <div class="option"  @click="SetOrder('name'); sortText = 'По алфавиту'; sortTr = false " v-text="'По алфавиту'"></div>
                        <div class="option"  @click="SetOrder('random'); sortText = 'Cлучайный'; sortTr = false " v-text="'Cлучайный'"></div>
                        <div class="option"  @click="SetOrder('episodes'); sortText = 'По сериям'; sortTr = false " v-text="'По сериям'"></div>
                        <div class="option"  @click="SetOrder('kind'); sortText = 'По типу'; sortTr = false " v-text="'По типу'"></div>
                        <div class="option"  @click="SetOrder('status'); sortText = 'По статусу'; sortTr = false " v-text="'По статусу'"></div>
                    </div> 
                </div>
                <!--
                <div class="wrap">
                    <div class="icon-wrap cover" :class="{ active: ViewMode==0}" @click="SetViewMode(0)"><i class="fas fa-th icon"></i></div>
                    <div class="icon-wrap chart" :class="{ active: ViewMode==1}" @click="SetViewMode(1)"><i class="fas fa-th-large icon"></i></div>
                    <div class="icon-wrap" :class="{ active: ViewMode==2}" @click="SetViewMode(2)"><i class="fas fa-th-list icon" ></i></div>
                </div>
                -->
            </div>
        </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    name: '',
    data(){
        return{
            sortTr: false,
            sortText: 'По популярности',
            ViewMode: localStorage.vm || 0,
            filterActive: false,
            
        }
    },
    directives:{
        ClickOutside
    },
    computed:{
        searchActive:{
            get(){
                if (this.$route.query.search && this.$route.query.search != ''){
                    return true
                }else{  
                    return false
                }
            }
        },
        search:{
            get(){
                return this.$route.query.search || ''
            }
        }
    },
    methods: {
        tr(){
            this.sortTr = false
        },
        SetViewMode(vm){
            localStorage.vm = vm
            
            this.ViewMode = vm
        },
        SetOrder(order){
            this.$query({order: order})
        },
    },
    watch:{
        '$route.query'(){
            if(this.$route.query.vm){
                this.ViewMode = this.$route.query.vm
            }
        },
    }
}
</script>


<style scoped>
.filter{
    transition: 0.2s linear;
    background: rgb(var(--color-blue-600));
    border-radius: 6px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 13px;
    margin-right: 12px;
    padding: 5px 8px;
    text-transform: capitalize;
}
.secondary-filters{
    align-items: center;
    display: grid;
    grid-template-columns: auto -webkit-min-content;
    grid-template-columns: auto min-content;
    margin-bottom: 30px;
    min-height: 23px;
    position: relative;
}
.active-filters, .landing .title {
    z-index: 5;
    position: relative;
}
.active-filters{
    align-items: center;
    display: flex;
    flex-wrap: wrap;
}
.secondary-filters .selects-wrap{
    display: flex;
    align-items: center;
}
/* .sort-select{
    border-right: solid 1px rgb(var(--color-gray-400));
    padding-right: 10px;
    margin-right: 12px;
} */
.sort-wrap{
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.label {
    color: rgb(var(--color-gray-600));
    font-size: 1.3rem;
    font-weight: 600;
    padding-left: 8px;
    white-space: nowrap;
}
.secondary-filters .wrap {
    align-items: center;
    cursor: pointer;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
}
.icon{
    font-size: 1.8rem;
}
.icon-wrap.active .icon{
    color: rgb(var(--color-gray-600));
}
.icon-wrap .icon{
    cursor: pointer;
    color: rgb(var(--color-gray-500));
    transition: color .3s ease;
    font-size: 1.8rem;
}
.dropdown{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    cursor: auto;
    right: -15px;
    padding: 10px 16px;
    position: absolute;
    top: calc(100% + 10px);
    width: 150px;
    z-index: 50;
}
.dropdown:before {
    width: 0;
    height: 0;
    content: "";
    z-index: 2;
    transform: scale(1.01);
    border-bottom: .6rem solid currentColor;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
    bottom: 100%;
    color: rgb(var(--color-gray-100));
    left: calc(50% - 6px);
    position: absolute;
}
.option{
    color: rgb(var(--color-gray-700));
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 8px 0;
    transition: color .2s ease;
}
.option:hover {
    color: rgb(var(--color-blue-600));
}
.tags-icon {
    color: rgb(var(--color-gray-500));
    font-size: 1.5rem;
    margin-right: 16px;
}
@media (max-width: 400px){
    .secondary-filters {
        padding: 0 10px  !important;
    }
}
@media (max-width: 1040px){
    .secondary-filters {
        padding: 0 20px !important;
    }
    .container{
        padding: 0 !important;
    }
}
</style>