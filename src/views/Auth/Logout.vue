<template>
    <div>

    </div>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('LOGOUT')
        this.$router.push({ name: 'Login' });
    }
}
</script>