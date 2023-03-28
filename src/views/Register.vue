<template>
   <div class="container bg-indigo mt-4 col-md-4 shadow rounded">
        <h2 class="text-info text-center">Register Form</h2>
        <hr>
        <div class="my-3 form-floating">
            <input v-model="full_name" type="text" class="form-control" id="full_name">
            <label for="full_name" class="form-label">Full Name</label>
        </div>
        <div class="my-3 form-floating">
            <input v-model="address" type="text" class="form-control" id="address">
            <label for="address" class="form-label">Address</label>
        </div>
        <div class="my-3 form-floating">
            <select v-model="gender" class="form-select" aria-label="Default select example">
                <option selected hidden="true">Select a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label for="gender" class="form-label">Gender</label>
        </div>
        <div class="my-3 form-floating">
            <input v-model="email_address" type="email" class="form-control" id="email_address" aria-describedby="emailHelp">
            <label for="email_address" class="form-label">Email address</label>
        </div>
        <div class="my-3 form-floating">
            <input v-model="contact_number" type="number" class="form-control" id="contact_number">
            <label for="contact_number" class="form-label">Contact Number</label>
        </div>
        <div class="my-3 form-floating">
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            <label for="exampleInputPassword1" class="form-label">Password</label>
        </div>
        <button @click="register()" class="btn btn-primary mb-3 col-md-12">Submit</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { db } from '../firebase/index.js'
    import {addDoc, collection } from "firebase/firestore";
    import { auth } from '../firebase/index.js'
    import { createUserWithEmailAndPassword } from 'firebase/auth'
    import router from '../router'

    const full_name       = ref('')
    const address         = ref('')
    const gender          = ref('')
    const email_address   = ref('')
    const contact_number  = ref('')
    const password        = ref('')

    const error             = ref('')
    const errorMessage      = ref('')
    const success           = ref('')
    const successMessage    = ref('')

    const register = async () => {
        if(full_name.value != '' && address.value != '' && gender.value != '' && email_address.value != '' && contact_number.value != '' && password != '') {
            await addDoc (collection(db, 'users'), {
                full_name: full_name.value,
                address: address.value,
                gender: gender.value,
                email_address: email_address.value,
                contact_number: contact_number.value
            })

            createUserWithEmailAndPassword(auth, email_address.value, password.value)
            .then(()=> {
                router.push('/dashboard')

                email_address.value     = ''
                password.value          = ''
                error.value             = false
                success.value           = true
                successMessage.value    = "Register success"
            })

            .catch(() => {
                error.value = true
                errorMessage.value = "Invalid email"
            })

            full_name.value = ''
            address.value   = ''
            gender.value    = ''
            email_address   = ''
            contact_number  = ''
            password        = ''
        } else {
            error.value         = true
            errorMessage.value  = "Please fill all the fields"
        }
    }
</script>