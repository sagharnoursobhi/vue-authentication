<template>
    <div class="container dashboard">
        <h1>Dashboard</h1>
        <div class="dash_content">
            <h3>Hello<span :style="{'margin-left' : '5px'}">USER</span><p>{{userEmail}}</p></h3>
            <p>Here you can use you dashboard because you are authenticated</p>
        </div>
    </div>
</template>


<script>
    export default {
        //if we refresh the page we will see that the email gets undefined so we use tokenId(firebase Get user data )
        //which is a post request to get the email of the user and keep it
        created(){
          let tokenId = this.$store.state.idTokenInState;
          this.$store.dispatch('getUserInfo' , tokenId);
        },
        computed: {
          userEmail(){
            if(this.$store.state.user){//cuz it is asynchronous and we should wait until get user from server
              return this.$store.state.user.email;
            }
          }
        }
    }
</script>
