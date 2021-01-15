<template>
    <div class="characters">
        <Roles v-if="ROLES" :roles="ROLES.filter(r => r.roles[0] === 'Main')" :title="'Главные герои'"/>
        <Roles v-if="ROLES" :roles="ROLES.filter(r => r.roles[0] != 'Main')" :title="'Второстепенные герои'"/>
    </div>
</template>


<script>



import {mapGetters} from 'vuex'
import Roles from '@/views/FullPage/components/Roles'

export default {
    name:'Characters',
    props:[
        'anime'
    ],
    computed:{
        ...mapGetters([
            'ROLES'
        ])
    },
    components:{
        Roles
    },
}
</script>


<style scoped>
.characters>div {
    margin-bottom: 30px;
}

.characters .content-wrap {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    font-size: 1.4rem;
    padding: 20px;
}

.characters>div {
    margin-bottom: 30px;
}

@media (max-width: 760px){
    .description-wrap {
        display: block;
    }
    .button, .external-links, .rankings, .tags {
        display: none;
    }

    .button, .external-links .rankings, .tags {
        display: none;
    }
    
    .description-wrap {
        display: block;
    }
}
</style>