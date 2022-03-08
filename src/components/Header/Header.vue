<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand >
          <router-link class="logo" to="/">Authentication</router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item v-if="!userLogedIn"><router-link  to="/signin">Sign In</router-link></b-nav-item>
            <b-nav-item v-if="userLogedIn"
              @click.prevent="signOut"
              :style="{'display':'inline' , 'cursor' : 'pointer'}"
            >
              <div>Sign Out</div>
            </b-nav-item>
            <b-nav-item v-if="!userLogedIn">
              <router-link to="/signup">Sign up</router-link>
            </b-nav-item>
            <b-nav-item v-if="userLogedIn">
              <router-link to="/dashboard">Dashboard</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
    export default {
      data() {
        return{
          sticky:true
        }
      },
        computed:{
            userLogedIn(){
                return this.$store.getters.userLogedInExamination//signout only shows when a user already signed in
            }
        },
        methods: {
            signOut(){
                this.$store.commit('logout')
            }
        }
    }
</script>
