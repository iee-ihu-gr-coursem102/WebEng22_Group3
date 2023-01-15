<template>
    <h1> Login </h1>
    <div class="login">
    <input type="text" v-model="email" placeholder="Enter Email"/>
    <input type="password" v-model="password" placeholder="Enter Password"/>
    <button v-on:click="login"> Login </button>
</div>

</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";
//import jwt from "jsonwebtoken";

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
            let result = await axios.post("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/login",{
                email:this.email,
                password:this.password
            });
            // let result = await axios.get(
            //     `http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/users?email=${this.email}&password=${this.password}` 
            // )
            console.log(result);

            console.log(result.status==200);
            console.log(result.data);

            if(result.status==200)
            {
                
                const token=result.data.token;
                const decodedToken=jwt_decode(token);
                console.log(decodedToken);
                
                localStorage.setItem("User-Info",JSON.stringify(decodedToken))
                localStorage.setItem("User-Token",JSON.stringify(token))
            }

                this.$router.push({name:"home"})         
            
            // console.warn(result)
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

