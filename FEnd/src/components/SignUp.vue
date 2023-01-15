
<template>
    <h1> Sign Up</h1>

<div class="register">
    <input type="text" v-model="name" placeholder="Enter Name" />
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <input type="password" v-model="password2" placeholder="Confirm Password" />
    <button v-on:click="signUp"> Sign Up </button>
</div>

</template>
<script>
//import jwt from "jsonwebtoken"

import axios from 'axios'
import jwt_decode from "jwt-decode";

export default{
    name: 'SignUp',

    data()
    {
        return {
            name:'',
            email:'',
            password:'',
            password2:''
        }
    },

    methods: {
        async signUp()
        {
            try{
            let result = await axios.post("http://ec2-18-184-43-109.eu-central-1.compute.amazonaws.com:5000/users",{
                email:this.email,
                password:this.password,
                name:this.name,
                confPassword:this.password2
            });
            console.log(result);
            if (result.status==200)
            {
                const token=result.data.token;
                const decodedToken=jwt_decode(token);
                console.log(decodedToken);
                
                localStorage.setItem("User-Info",JSON.stringify(decodedToken))
                localStorage.setItem("User-Token",JSON.stringify(token))

                // alert("Η εγγραφή σας ολοκληρώθηκε")   
                this.$router.push({name:"home"})
                location.reload()        
            } 
            
        } catch(error){console.log(error)}
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

