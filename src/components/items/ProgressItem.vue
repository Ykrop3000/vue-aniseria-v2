<template>
    <div class="progress" :class="{'show': status == 'loading'}">

    </div>
</template>

<script>
export default {
    props:['status'],
}
</script>

<style scoped>
.show{
    opacity: 1 !important;
}
@keyframes slide {
  from {
    left: 0%;
  }

  to {
   left: 100%;
   width: 0;
  }
}
.progress{
    background-color: #29a6ff;
    border-radius: 0 10px 10px 0;
    height: 4px;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: width .3s ease,opacity .2s;
    width: 0;
    z-index: 99999;
    width: 10%;
    animation: 2s linear 0s infinite alternate slide;

}

</style>