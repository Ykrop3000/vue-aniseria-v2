<template>
<!-- Select Filter --->
    <div class="filter filter-select" v-if="options"> 
        <div class="name"  v-text="title"></div>
        <div class="select-wrap" :class="{'dropdown-visible': active}" v-click-outside="af">
            <div class="select">
                <div class="value-wrap" @click="active = true">

                    <div  v-if="options.filter(opt => opt.active === true).length != 0 " class="tags">

                        <div class="tag" v-text="options.filter(opt => opt.active === true)[0].russian || options.filter(opt => opt.active === true)[0].name"></div>
                        <div class="tag" v-if="options.filter(opt => opt.active === true).length > 1"  v-text="'+'+(options.filter(opt => opt.active === true).length-1).toString()"></div>

                    </div>
                    <div class="placeholder" v-if="options.filter(opt => opt.active === true).length === 0 && input === '' && !inputFocuse">Любые</div>
                    <!-- <input @focus="inputFocuse = true" @blur="inputFocuse = false" type="search" class="filter" v-if="width <= 760" v-model="input">--->

                    <div class="filter" ></div> 
                </div>

                
                <i class="fas fa-chevron-down icon" @click="active = true" focusable="false" v-if="options.filter(opt => opt.active === true).length === 0"></i>
                <i class="fas fa-times icon" focusable="false" @click="clear" v-else ></i>
                
            </div>

            <div class="mobile-banner" v-if="active && width <= 760">
                <div class="title" v-text="title"></div>
                <div focusable="false" class="fa fa-minus close-icon"></div>
            </div>

            <div class="options" v-if="active" v-click-outside="aff">
                <perfect-scrollbar class="scroll-wrap">
                    <div class="option-group">
                        <div class="group-title" v-text="title"></div>
                        <div class="option" v-for="(i,index) in options" :key="index" @click="Select(i)">
                            <div class="label">
                                <div class="name" v-text="i.russian || i.name"></div>
                                <div v-if="i.active" class="selected-icon circle">
                                    <i class="fas fa-check"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </perfect-scrollbar>
            </div>

        </div>
    </div>
<!------------------>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import ClickOutside from 'vue-click-outside'

export default {
    components: {
        PerfectScrollbar
    },
    directives: {
        ClickOutside
    },
    props:[
        'title',
        '_options',
        'type',
        'single'
    ],
    data(){
        let data = {
            input: '',
            inputFocuse: false,
            FilterOptions: [],
            active: false,
            width: window.innerWidth,
            flag: false,
        };
        return data        
    },
    computed:{
        options:{
            get(){
                if (this._options.length == 0){
                    return []
                }else{
                    let actives = [] 
                    if (this.$route.query[this.type]){
                        actives = this.$route.query[this.type].split(',').map(el => parseInt(el))
                    }
                    this._options.forEach(el => {
                        if (actives.includes(el.id)){
                            el.active = true
                        }
                    })
                    return this._options
                }
            }
        }
    },
    mounted(){
        window.addEventListener(
            "resize",
            this.handleWidthChange
        );
        
    },
    methods:{
        FO(){
            this.FilterOptions = this.options.filter(opt => opt.russian.includes(this.input) || opt.name.includes(this.input))
        },
        handleWidthChange() {
            this.width =  window.innerWidth;
        },
        af(){
            this.active = false
        },
        aff(){
            if (this.width <= 760) this.active = false
        },
        clear(update = true){

            this._options.forEach(function(item) {
                item.active = false;
            });
            this.options.forEach(function(item) {
                item.active = false;
            });

            if (update) this.$query({[this.type]:''})

            this.$forceUpdate();
        },
        Select(i){
            if (this.single) {
                this.clear(false)
            }
            this.options.forEach(function(item) {
                if(item.id === i.id){
                    item.active = !item.active
                }
            })

            let params = this.options.filter(o => o.active === true).map(o => o.id).join(',')
            
            this.$query({[this.type]:params})

            this.$forceUpdate();
        },
    },
    watch:{
        input(){
            if (this.input != ''){
                this.active = true
            }
            this.FO()
        },
        options(){

            this.FilterOptions = this.options
            this.$forceUpdate();
        }
    }
    
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped>
.select-wrap{
    position: relative;
    width: 100%;
}
.select-wrap:focus{
    outline: none;
}
.tag{
    color: rgb(var(--color-gray-800));
    background: rgba(var(--color-background-300),.8);
    border-radius: 6px;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 11px;
    margin-left: -8px;
    margin-top: -5px;
    padding: 5px 8px;
}
.circle {
    align-items: center;
    border-radius: 50%;
    color: rgb(var(--color-white));
    display: grid;
    font-size: 1.3rem;
    font-weight: 700;
    height: 25px;
    width: 25px;
}
.selected-icon{
    background: rgb(var(--color-blue-500));
    font-size: .8rem;
    height: 16px;
    width: 16px;
}
.circle, .emoji-spinner {
    justify-content: center;
    text-align: center;
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
.icon{
    color: rgb(var(--color-gray-400));
    cursor: pointer;
    font-size: 1.6rem;
    transition: color .2s ease;
    text-align: center;
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
    align-items: center;
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
.filter{
    background: 0 0;
    border: none;
    color: rgb(var(--color-gray-700));
    display: inline-block;
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
.filter>.name{
    color: rgb(var(--color-gray-900));
    font-size: 1.5rem;
    font-weight: 600;
    padding: 10px 0;
    text-transform: capitalize;
}
@media (max-width: 760px){
    .select-wrap.dropdown-visible:before {
        background: rgba(var(--color-overlay),.4);
        content: "";
        height: 100vh;
        left: 0;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 30;
    }
    .mobile-banner{
        align-items: center;
        color: rgba(var(--color-white),.9);
        display: grid;
        font-size: 1.5rem;
        font-weight: 700;
        grid-template-columns: auto 24px;
        left: 5vw;
        letter-spacing: .06rem;
        position: fixed;
        text-transform: uppercase;
        top: calc(25vh - 32px);
        width: 90vw;
        z-index: 60;
    }
    .close-icon{
        cursor: pointer;
        font-size: 2.2rem;
    }
    .options{
        position: fixed;
        width: 90vw;
        max-height: 60vh;
        left: 5vw;
        top: 25vh;
    }
    .option[data-v-0f4acdbb] {
        font-size: 1.6rem;
        padding: 14px 12px;
        border-radius: 8px;
    }
}

</style>