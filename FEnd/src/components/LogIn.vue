<template>
    <h1> Login </h1>
    <div class="login">
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login"> Login </button>
</div>

</template>

<script>
import axios from 'axios';

export default{
    name:'LogIn',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        async login(){
            let result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&password=${this.password}` 
            )

            if(result.status==200 && result.data.length>0)
            { 
                localStorage.setItem("User-Info",JSON.stringify(result.data[0]))
                this.$router.push({name:"home"})         
            }
            console.warn(result)
            location.reload()
        }
    },
    mounted(){
        let user= localStorage.getItem('User-Info');
        if(user)
        {
            this.$router.push({name:"home"}) 
        }
    }
}
</script>


