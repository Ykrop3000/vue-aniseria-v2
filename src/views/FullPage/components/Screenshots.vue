<template>
    <div class="screenshots-wrapp">
        <h2>Скриншоты</h2>
        <div class="screenshots">
            <enlargeable-image v-for="(i, id) in images.slice(0,3)" animation_duration="500"  :key="id" :src="SHIKIURL + i.preview" :src_large="SHIKIURL + i.original" />
        </div>
    </div>
</template>
<script>
import EnlargeableImage from '@diracleo/vue-enlargeable-image';
import {mapGetters} from 'vuex';

export default {
    props:['images'],
    components:{
        EnlargeableImage
    },
    computed: {
        ...mapGetters(['SHIKIURL']),
    }

}
</script>

<style>

.screenshots-wrapp .screenshots{
  display: grid;
  grid-template-columns: repeat(auto-fill,180px);
  grid-gap: 20px;
  justify-content: start;
}
.screenshots-wrapp .slot img{
  background-size: cover;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(var(--color-shadow-blue),.05);
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  transition: box-shadow .2s ease-in-out;
  width: 100%;
}
.enlargeable-image{
  width: 100%;
}
.enlargeable-image .full.enlarged{
    z-index: 99 !important;
}
.enlargeable-image .enlargeable-image-slot {
  display:inline-block;
}
.enlargeable-image .enlargeable-image-slot > img {
  max-width:100%;
}
.enlargeable-image > .enlargeable-image-slot {
  max-width:100%;
  max-height:100%;
  cursor:zoom-in;
}
.enlargeable-image > .enlargeable-image-slot.active {
  opacity:0.3;
  filter:grayscale(100%);
}
.enlargeable-image .enlargeable-image-full {
  cursor:zoom-out;
  background-color:transparent;
  align-items:center;
  justify-content:center;
  background-position: center center;
  background-repeat:no-repeat;
  background-size:contain;
  z-index:2000;
  display:none;
}
.enlargeable-image .enlargeable-image-full > img {
  object-fit:contain;
  width:100%;
  height:100%;
}
.enlargeable-image .enlargeable-image-full.enlarging {
  display:flex;
  position:fixed;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  background-color:transparent;
  cursor:zoom-out;
}
.enlargeable-image .enlargeable-image-full.delarging {
  display:flex;
  position:fixed;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  background-color:transparent;
  cursor:zoom-in;
}
.enlargeable-image .enlargeable-image-full.enlarged {
  display:flex;
}
@media (max-width: 760px){
  .screenshots-wrapp .screenshots{
      -ms-overflow-style: -ms-autohiding-scrollbar;
      -webkit-overflow-scrolling: touch;
      grid-template-columns: repeat(auto-fill,42vw) !important;
      overflow-x: auto;
      white-space: nowrap;
  }
}
</style>