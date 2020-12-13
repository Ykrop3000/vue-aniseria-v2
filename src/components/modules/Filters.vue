<template>
    <div class="filters-wrap primary-filters">


        <div class="mobile-filters"  v-if="width < 1040">
            <div class="search-wrap">
                <i class="icon fas fa-search"></i>
                <input type="search" placeholder="Поиск" class="search">
            </div>
            <div class="open-btn" :class="{'active': mobileFilters}" @click="mobileFilters = !mobileFilters">
                <i class="icon fas fa-sliders-h"></i>
            </div>
        </div>
        <div class="filters" v-if="mobileFilters || width >= 1040">
            <div class="filter filter-select" v-if="width >= 1040">
                <div class="name">
                    Поиск
                </div>
                <div class="search-wrap">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search">
                </div>
            </div>
            <SelectItem :title="'Жанры'" :options="GENRES"/>          
        </div>
    </div>
</template>

<script>

import SelectItem from '@/components/items/SelectItem'

export default {
    components:{
        SelectItem
    },
    props:[
        'GENRES'
    ],
    data(){
        return{
            width: window.innerWidth,
            mobileFilters: false
        }
    },
    methods:{
        handleWidthChange() {
            this.width =  window.innerWidth;
        },
    },
    mounted(){
        window.addEventListener(
            "resize",
            this.handleWidthChange
        );
         this.FilterOptions = this.options
    },
    watch:{
        GENRES(){
            this.GENRES.forEach(function(item) {
                item.active = false;
            });
        }
    }
}
</script>

<style scoped>
.select-wrap{
    position: relative;
    width: 100%;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}
.select{
    align-items: center;
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    cursor: pointer;
    display: grid;
    font-size: 1.3rem;
    font-weight: 600;
    grid-template-columns: auto 20px;
    letter-spacing: .03rem;
    padding: 11px 16px;
}
.options{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    left: 0;
    position: absolute;
    top: calc(100% + 10px);
    width: 100%;
    z-index: 50;
}
.option-group:first-of-type .group-title{
    margin-top: 0;
}
.option.selected, .option:hover {
    color: rgb(var(--color-blue-600));
    background: rgba(var(--color-background-200),.6);
}
.option{
    border-radius: 4px;
    color: rgb(var(--color-gray-700));
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 10px 12px;
    transition: background .2s ease-in-out,color .2s ease-in-out;
    white-space: normal;
}
.label{
    display: grid;
    grid-template-columns: auto 16px;
}
.group-title{
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: .06rem;
    margin-top: 15px;
    padding: 4px;
    text-transform: uppercase;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.scroll-wrap{
    max-height: 500px;
    overflow: auto;
    overscroll-behavior: contain;
    padding: 10px;
}
.ps-container {
    position: relative;
}
.ps {
    overflow: hidden!important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}
.filter{
    background: 0 0;
    border: none;
    color: rgb(var(--color-gray-700));
    display: inline-block;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    margin: 0;
    outline: 0;
    padding: 0;
    width: 100%;
}
.placeholder {
    color: rgb(var(--color-gray-500));
}
.placeholder, .tags, .value{
    position: absolute;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.value-wrap{
    position: relative;
    max-height: 14px;
}
.primary-filters{
    z-index: 700;
}
.filters-wrap {
    display: grid;
    grid-template-columns: auto 42px;
    align-items: center;
}
.name{
    color: rgb(var(--color-gray-900));
    font-size: 1.5rem;
    font-weight: 600;
    padding: 10px 0;
    text-transform: capitalize;
}

.search-wrap svg{
    color: rgb(var(--color-gray-400));
    font-size: 1.3rem;
    height: 1.6rem;
}
.filters{
    margin: 40px 0;
    margin-bottom: 25px;
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(5,170px);
}
.mobile-filters{
    align-items: center;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: auto 42px;
    margin-top: 20px;
    padding: 0 20px;
    margin-bottom: 20px;
}
.mobile-filters .search-wrap{
    align-items: center;
    grid-gap: 12px;
}
.search-wrap{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    display: grid;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    grid-gap: 10px;
    grid-template-columns: 13px auto 13px;
    letter-spacing: .03rem;
    padding: 11px 16px;
    padding-left: 13px;
}
.mobile-filters .search-wrap .search{
    padding-top: 3px;
}
.search {
    background: 0 0;
    border: none;
    color: rgb(var(--color-gray-700));
    display: inline-block;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    margin: 0;
    outline: 0;
    padding: 0;
    width: 100%;
}
.open-btn{
    align-items: center;
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    color: rgb(var(--color-gray-500));
    cursor: pointer;
    display: inline-flex;
    font-size: 1.8rem;
    height: 42px;
    justify-content: center;
    width: 42px;
    transition: color .3s ease-in-out;
}
.open-btn.active{
    color: rgb(var(--color-blue-500));
}
.mobile-filters+.filters {
    margin-top: -5px;
}

@media (min-width: 1540px){
    .filters {
        grid-template-columns: repeat(6,180px);
    }
}
@media (max-width: 1040px){
    .filters-wrap{
        grid-template-columns: auto;
    }
    .filters{
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        margin: 20px 0;
        margin-bottom: -560px;
        padding-bottom: 600px;
        grid-template-columns: repeat(30,auto);
        -ms-scroll-snap-type: x mandatory;
        scroll-snap-type: x mandatory;
        grid-gap: 0;
        -webkit-overflow-scrolling: initial;
    }
    .filters .filter-select{
        width: 190px;
    }
    .filters .filter{
        scroll-snap-align: start;
        padding-left: 20px;
    }
}
</style>