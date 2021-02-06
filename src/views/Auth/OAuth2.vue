<template>
    <div class="auth-form-unscoped">

       <div class="form container">

            <button @click="submit" class="submit">Вход / Регистрация</button>
           

       </div>

    </div>
</template>

<script>

export default {
    name: 'Auth',
    data(){
        return {
            client_id: this.$store.state.client_id,
            client_secret: this.$store.state.client_secret

   }},
 
    methods: {
       submit(){
           let url = `https://shikimori.one/oauth/authorize?client_id=${this.client_id}&redirect_uri=https%3A%2F%2Fvue-aniseria-v2.firebaseapp.com%2Flogin&response_type=code&scope=user_rates+comments+topics`
           window.location.href = url
       }
    },
    computed:{
    },
    mounted(){
             if (this.$route.query.code){
                this.$store.dispatch('LOGIN',this.$route.query.code)
            }
    },
    watch:{
        '$route.query'(){
            if (this.$route.query.code){
                this.$store.dispatch('LOGIN',this.$route.query.code)
            }
        }
    }
}
</script>

<style scoped>
.auth-form-unscoped .al-input {
    background: rgba(var(--color-background),.7);
    border-radius: 4px;
    border: 0;
    box-shadow: none;
    color: rgb(var(--color-text));
    font-size: 1.4rem;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    margin-bottom: 25px;
    padding: 0 15px;
    max-width: 90%;
    width: 100%;
}
.auth-form-unscoped .al-input:focus {
    box-shadow: none;
    outline: 0;
}
.auth-form-unscoped .link.signup {
    margin-top: 80px;
}
.auth-form-unscoped .link {
    display: block;
    font-size: 1.3rem;
    margin-top: 20px;
    color: rgb(var(--color-text-lighter));
}
.auth-form-unscoped .form {
    max-width: 400px !important;
    width: 100%;
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    padding: 40px !important;
    text-align: center;
    margin-top: 60px;
}
.auth-form-unscoped .link.signup span {
    color: rgb(var(--color-blue));
}
.auth-form-unscoped .title {
    font-size: 2.4rem;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 60px;
}
.auth-form-unscoped .submit:focus {
    outline: none;
}
.auth-form-unscoped .submit {
    border: none;
    background: rgb(var(--color-blue));
    border-radius: 3px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 10px;
    padding: 10px 30px;
}
@media (max-width: 760px){
    .auth-form-unscoped .form {
        max-width: 100% !important;
        min-height: 100vh;
        margin: 0;
        width: auto;
    }
}
</style>