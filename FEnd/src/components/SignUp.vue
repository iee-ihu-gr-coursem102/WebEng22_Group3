<template>
    <h1> Sign Up</h1>

<div class="register">
    <input type="text" v-model="name" placeholder="Enter Name" />
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="signUp"> Sign Up </button>
</div>

</template>
<script>

import axios from 'axios'

export default{
    name: 'SignUp',

    data()
    {
        return {
            name:'',
            email:'',
            password:''
        }
    },

    methods: {
        async signUp()
        {
            let result = await axios.post("http://localhost:3000/users",{
                email:this.email,
                password:this.password,
                name:this.name
            });
            console.warn(result);
            if(result.status==201)
            {
                // alert("Η εγγραφή σας ολοκληρώθηκε")   
                localStorage.setItem("User-Info",JSON.stringify(result.data))
                this.$router.push({name:"home"})
                location.reload()         
            }
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

