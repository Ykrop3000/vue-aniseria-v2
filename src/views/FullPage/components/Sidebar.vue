<template>
    <div class="sidebar">
        <div class="rankings">

        </div>
        <div class="data">
            <div class="data-set airing-countdown" v-if="ANIME.ongoing">
                <div class="type">Следующий эпизод</div>
                <div class="value">
                    <span v-text="airing"></span>
                </div>
            </div>
            
            <div class="data-set data-list" v-if="ANIME.genres">
                <div class="type">Жанры</div>
                <div class="value">
                    <span v-text="ANIME.genres.map(e => e.russian).join(', ')"></span>
                </div>
            </div>

            <div class="data-set" v-if="ANIME.aired_on">
                <div class="type">Дата выхода</div>
                <div class="value">
                    <span v-text="aired_on"></span>
                </div>
            </div>

            <div class="data-set" v-if="ANIME.episodes">
                <div class="type">Эпизоды</div>
                <div class="value">
                    <span v-text="ANIME.episodes"></span>
                </div>
            </div>

            <div class="data-set" v-if="ANIME.studios">
                <div class="type">Студии</div>
                <div class="value">
                    <span v-text="ANIME.studios.map(e => e.name).join(', ')"></span>
                </div>
            </div>

            
            <div class="data-set" v-if="ANIME.kind">
                <div class="type">Формат</div>
                <div class="value">
                    <span v-text="kind"></span>
                </div>
            </div>

            <div class="data-set" v-if="ANIME.status">
                <div class="type">Статус</div>
                <div class="value">
                    <span v-text="status"></span>
                </div>
            </div>

            <div class="data-set" v-if="ANIME.english">
                <div class="type">Английский</div>
                <div class="value">
                    <span v-text="ANIME.english.join(', ')"></span>
                </div>
            </div>

            <div class="data-set" v-if="ANIME.japanese">
                <div class="type">Японский</div>
                <div class="value">
                    <span v-text="ANIME.japanese.join(', ')"></span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'sitebar',
    props: ['ANIME'],
    computed:{
        aired_on:{
            get(){
                return moment(this.ANIME.aired_on).lang("ru").format('LL')
            }
        },
        airing:{
            get(){
                if (this.ANIME.ongoing){
                    return moment(this.ANIME.next_episode_at).lang("ru").endOf('day').fromNow()
                }
                return ''
            }
        },
        kind:{
            get(){
                return this.$store.state.kind[this.ANIME.kind]
            }
        },
        status:{
            get(){
                let data = {
                    'anons': 'Анонсировано',
                    'ongoing': 'Сейчас выходит',
                    'released': 'Вышедшее'
                }
                return data[this.ANIME.status] 
            }
        }
    }
}
</script>

<style scoped>

.data {
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    padding: 18px;
}
.tags{
    margin-top: 20px;
}
.data-set {
    padding-bottom: 14px;
}
.data-list .type{
    padding-bottom: 2px;
}
.type{
    font-size: 1.3rem;
    font-weight: 500;
    padding-bottom: 5px;
}
.value {
    color: rgb(var(--color-text-lighter));
    font-size: 1.2rem;
    line-height: 1.3;
}
.data-list .value{
    line-height: 1.4;
}
.airing-countdown {
    color: rgb(var(--color-blue));
}
.airing-countdown .value{
    color: rgb(var(--color-blue));
    font-weight: 500;
}
@media (max-width: 760px){
    .data {
        display: flex;
        margin-bottom: 25px;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
    }
    .data-set{
        padding-bottom: 0;
        padding-right: 25px;
    }
    .type{
        color: rgb(var(--color-text-lighter));
        font-size: 1.3rem;
        font-weight: 400;
        padding-bottom: 6px;
    }
    .data-list .type{
        padding-bottom: 6px;
    }
    .value{
        color: rgb(var(--color-text));
        font-size: 1.4rem;
    }
}
</style>