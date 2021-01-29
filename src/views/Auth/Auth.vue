<template>
    <div class="auth-form-unscoped">

       <div class="form container">
           <div class="title" v-if="$route.name == 'Login'">Вход</div>
            <div class="title" v-if="$route.name == 'Signup'">Регистрация</div>

            <form @submit.prevent="submitLogin" v-if="$route.name == 'Login'" data-vv-scope="login">

                <input v-validate="'required|min:5'" name="username" data-vv-as="Логин" v-model="login.username" type="text" placeholder="Логин" class="al-input">
                
                <input v-validate="'required|min:5'" name="password" data-vv-as="Пароль" v-model="login.password" type="password" placeholder="Пароль" class="al-input">
    
                <input type="submit" value="Войти"  class="submit">
                
            </form>
            <router-link v-if="$route.name == 'Login'" :to="{name:'Signup'}" class="link signup">
                Не зарегистрированы? 
                <span>Создать аккаунт</span>
            </router-link>

             <form @submit.prevent="submitSignup" v-if="$route.name == 'Signup'" data-vv-scope="signup" >
                <input  v-validate="'required|min:5'" v-model="signup.username" name="username"  data-vv-as="Логин" type="text" placeholder="Логин " class="al-input">
                <input  v-validate="'required|min:5'" v-model="signup.email" name="email"  data-vv-as="E-mail" type="email" placeholder="E-mail" class="al-input">
                <input  v-validate="'required|min:5'" v-model="signup.password" name="password" data-vv-as="Пароль" type="password" placeholder="Пароль" class="al-input">
                <input  v-validate="'required|min:5|confirmed:password'" v-model="signup.password_confirmation" name="password_confirmation" data-vv-as="Пароль" type="password" placeholder="Повторите пароль" class="al-input">
                <input type="submit" value="Зарегистрироваться" class="submit">
            </form>

       </div>

    </div>
</template>

<script>

export default {
    name: 'Auth',
    data(){
        return {
            login:{
                username: '', 
                password: '', 
            },
            signup: {
                username: '', 
                email: '',
                password: '', 
                password_confirmation: '',  
            }
   }},
 
    methods: {
        submitLogin() {
            this.$validator.validateAll('login').then((result) => {
                if (result) {
                
                let data ={
                    username: this.login.username,
                    password: this.login.password
                }

                this.$store.dispatch('LOGIN', data)
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))

                return;
                }
        
                this.$message.error(this.errors.all().join('<br/>'));
                
            });
        },
        submitSignup() {
            this.$validator.validateAll('signup').then((result) => {
                if (result) {
                
                    let data = {
                        username: this.signup.username,
                        email: this.signup.email,
                        password: this.signup.password,
                    }
                    
                    this.$store.dispatch('REGISTER', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))

                    return;
                }
        
                this.$message.error(this.errors.all().join('<br/>'));
                
            });
        }
    },
    computed:{
    },
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