<template>
   <div class="container bg-indigo mt-4 col-md-4 shadow rounded">
        <h2 class="text-info text-center">Login</h2>
        <div class="my-3 form-floating">
            <input v-model="email_address" type="email" class="form-control" id="email_address">
            <label for="email_address" class="form-label">Email</label>
        </div>
        <div class="my-3 form-floating">
            <input v-model="password" type="password" class="form-control" id="password">
            <label for="password" class="form-label">Password</label>
        </div>
        <div class="d-flex justify-content-center">
            <button @click="login()" class="btn btn-primary mb-3 col-md-6">Login</button>
        </div>
    </div>
</template>

<script setup>
    import { signInWithEmailAndPassword } from 'firebase/auth'
    import { ref } from 'vue'
    import { auth } from '../firebase/index.js'
    import router from '../router'

    const email_address = ref('')
    const password      = ref('')

    const error         = ref('')
    const errorMessage  = ref('')

    const login = () => {
        signInWithEmailAndPassword(auth, email_address.value, password.value)
        .then(() => {
            router.push('/dashboard')
        })
        .catch((err) => {
            error.value         = true
            errorMessage.value  = err.message
        })
    }
</script>