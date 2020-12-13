<template>
    <div class="auth-form-unscoped">

       <div class="form container">
           <div class="title" v-if="$route.name == 'Login'">Вход</div>
            <div class="title" v-if="$route.name == 'Signup'">Регистрация</div>

            <div v-if="$route.name == 'Login'" >
                <input v-model="login.username" type="text" placeholder="Логин" class="al-input">
                <input v-model="login.password" type="password" placeholder="Пароль" class="al-input">
                <button  :disabled='login.empty()' class="submit" @click="submitLogin">Войти</button >
            </div>
            <router-link v-if="$route.name == 'Login'" :to="{name:'Signup'}" class="link signup">
                Не зарегистрированы? 
                <span>Создать аккаунт</span>
            </router-link>

             <div v-if="$route.name == 'Signup'">
                <input v-model="signup.username" type="text" placeholder="Логин " class="al-input">
                <input v-model="signup.email" type="email" placeholder="E-mail" class="al-input">
                <input v-model="signup.password" type="password" placeholder="Пароль" class="al-input">
                <input v-model="signup.password_confirmation" type="password" placeholder="Повторите пароль" class="al-input">
                <button  :disabled='signup.empty()' class="submit" @click="submitSignup"> Зарегистрироваться </button>
            </div>

       </div>

    </div>
</template>

<script>
import form from 'vuejs-form'

export default {
    name: 'Auth',
    data: () => ({
        login: form({
            username: '', 
            password: '', 
        })
        .rules({
            username: 'min:5|required',
            password: 'required|min:5'
        })
        .messages({
            'email.email': 'Поле электронной почты должно быть адресом электронной почты',
        }),
        signup: form({
            username: '', 
            email: '',
            password: '', 
            password_confirmation: '',  
        })
        .rules({
            username: 'min:5|required',
            email: 'email|min:5|required',
            password: 'required|min:5|confirmed'
        })
        .messages({
            'email.email': 'Поле электронной почты должно быть адресом электронной почты',
            'password.confirmed': 'Упс, пароли не совпадают',
        }),
   }),
 
    methods: {
        submitLogin() {
            if (this.login.validate().errors().any()){
                let e =''
                e = this.login.validate().errors().list().join('<br/>')
                this.$message.error(e);
                return
            }
            let data ={
              username: this.login.data.username,
              password: this.login.data.password
            }
            console.log(data)
            this.$store.dispatch('LOGIN', data)
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        },
        submitSignup() {
            if (this.signup.validate().errors().any()){
                let e =''
                e = this.signup.validate().errors().list().join('  ')
                this.$message.error(e);
                return
            }

            let data = {
                username: this.signup.data.username,
                email: this.signup.data.email,
                password: this.signup.data.password,
            }
            this.$store.dispatch('REGISTER', data)
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        },
    },
    computed:{
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