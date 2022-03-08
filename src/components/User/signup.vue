<template>
    <div class="container">
       <div class="content sign">

          <form @submit.prevent="onSubmit">
            <h1>Sign up</h1>


              <div class="input_field">
                  <label>Email</label>
                  <input type="email" v-model="formdata.email"/>
              </div>

              <div class="input_field">
                  <label>Password</label>
                  <input type="password" v-model="formdata.password" />
              </div>

              <button class="submit">
                  Sign up
              </button>

          </form>

        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                formdata:{
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit () {
                this.$store.dispatch('signUp' , this.formdata);
                this.formdata.email = '';
                this.formdata.password = '';//be careful the passworld you are gonna use must include character
            }
        }
    }
</script>

