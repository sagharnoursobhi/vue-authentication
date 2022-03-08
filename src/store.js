import Vue from 'vue'
import Vuex from 'vuex'
import router from './routes'
/* eslint-disable */

Vue.use(Vuex);
//endpoint = https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]//api key is in database setting
const FbAuth = "https://identitytoolkit.googleapis.com/v1/accounts";
const ApiKey = "AIzaSyATuxn0yjn-1-vfiSNUwYm03okDzjMzP4M"

export default new Vuex.Store({
    state: {
      emailInState:"",
      idTokenInState: "",
      refreshTokenInState: "",//or null
      user:null,
    },
    getters: {
      userLogedInExamination(state){
        if(state.idTokenInState){
          return true;
        }else
        return false;
      }
    },
    mutations: {//synchronous
      authMutation(state , authData ){
        state.emailInState = authData.email;
        state.idTokenInState = authData.idToken;
        state.refreshTokenInState = authData.refreshToken;//storing in store
      },
      logout(state){
        state.emailInState = null;
        state.idTokenInState = null;
        state.refreshTokenInState = null;//logout from store
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        router.push('/')
      },
      addUserInfo(state , userInfo){
        state.user = userInfo;
      }
    },
    actions: { // asynchronous//settimeout
      signUp( context , payload){
        Vue.http.post(`${FbAuth}/:signUp?key=${ApiKey}` , {
          ...payload,
          returnSecureToken: true
        })
        .then(res => res.json())
        .then(authData => {
          context.commit('authMutation' , authData);
          console.log(authData);
          localStorage.setItem("token", authData.idToken);//storing on localStorage
          localStorage.setItem("refresh" , authData.refreshToken);
        })
        .catch((error) => {
          console.log(error)
        })//the idTocken we need to store on store and on the browser
        //(on the local storage) cuz expireIn(3600) says the tocken will be expired after one hour
        //after one hour if the user wants to use the same tocken it will not work and the user needs to login again
        //we can use refreshtocken will never get expired and it refreshes the tockenId
      },
      signIn(context , payload){//go to sign in with email and pass
        Vue.http.post(`${FbAuth}:signInWithPassword?key=${ApiKey}` , {
          ...payload ,
          returnSecureToken: true
        })
        .then(res => res.json())
        .then( authData => {
          console.log(authData)
          context.commit("authMutation" , authData);
          localStorage.setItem("token" , authData.idToken);
          localStorage.setItem("refresh" , authData.refreshToken);
        })
      },
      refreshToken(context){//go to firebase Exchange a refresh token for an ID token document
        //we are gonna find a way to avoid signing in again and again each time after refreshing the page
        const refreshToken = localStorage.getItem("refresh");
        if(refreshToken){//If the user already signed in

          Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${ApiKey}` , {
            grant_type : "refresh_token",
            refresh_token : refreshToken
          }).
          then(res => res.json()).
          then(authData => {
            console.log(authData);
            context.commit("authMutation" , {
              idToken : authData.id_token,//properties are different look at the console
              refreshToken : authData.refresh_token
            });
            localStorage.setItem("tocken" , authData.id_token);
            localStorage.setItem("refresh" , authData.refresh_token);//store in local storage
          })
        }
      },
      getUserInfo(context , payload){
        //https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
        Vue.http.post(`${FbAuth}:lookup?key=${ApiKey}` , {
          idToken:payload
        })//body of this post request// when uplaoding the page
        .then(res => res.json())
        .then( res => context.commit('addUserInfo' , res.users[0]) )
      }
    }
  })