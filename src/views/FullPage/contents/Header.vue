<template>
     <div class="header-wrap">
            <div class="banner" :style="{'background-image': `url(https://st.kp.yandex.net/images/film_big/${ANIME.kp_id}.jpg`}">
                <div class="shadow"></div>
            </div>
            <div class="header">

                <div class="container">
                    <div class="cover-wrap overlap-banner">
                        <div class="cover-wrap-inner">
                            <img :src="SHIKIURL+ANIME.poster" alt="" class="cover">
                            <div class="actions">
                                <div class="list">
                                    <div class="add">
                                        Добавить в список
                                    </div>
                                </div>
                                <div class="favourite">
                                    <i class="fas fa-heart"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <h1 v-text="ANIME.russian"></h1>
                        <p class="description" v-text="ANIME.description"></p>
                        <div class="description-length-toggle">
                            Читать Больше
                        </div>
                        <div class="nav">
                            <router-link :to="{ path: ''}" replace class="link">Обзор</router-link>
                            <router-link :to="{ path: 'watch'}" replace class="link">Просмотр</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
</template>