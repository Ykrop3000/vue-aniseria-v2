<template>
    <div>
        <h2>Связанные</h2>
        <div class="grid-wrap" >
            <div class="role-card view-character-staff" v-for="(i,id) in roles" :key="id">

                <div class="character">
                    <div class="cover" :style="{'background-image': `url(${SHIKIURL+i.character.image.preview})`}"></div>
                    <div class="content">
                        <div class="name" v-text="i.character.russian"></div>
                        <div class="role" v-text="i.roles.join(',')"></div>
                    </div>
                </div>
                <div class="staff">

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Roles',
    props:['roles'],
    computed:{
        ...mapGetters(['SHIKIURL'])
    }
}
</script>

<style scoped>
.grid-wrap {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 15px;
   
    grid-template-columns: repeat(3,1fr);
}
.view-character-staff {
    grid-template-areas: "character staff";
}
.role-card {
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    display: inline-grid;
    grid-template-columns: 50% 50%;
    height: 80px;
    overflow: hidden;
}
.role-card>div{
    display: inline-grid;
    grid-template-columns: 60px auto;
    grid-template-areas: "image content";
}
.character {
    grid-area: character;
}
.cover{
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    grid-area: image;
}
.content{
    font-size: 1.2rem;
    grid-area: content;
    overflow: hidden;
    padding: 10px;
}
.content .name {
    display: block;
    height: 48px;
    line-height: 1.3;
}
.content .role{
    color: rgb(var(--color-text-lighter));
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
@media (max-width: 1540px){
    .grid-wrap {
        grid-template-columns: repeat(2,1fr);
    }
}
@media (max-width: 1040px){
    .grid-wrap {
        grid-template-columns: repeat(1,1fr);
    }
}
</style>
