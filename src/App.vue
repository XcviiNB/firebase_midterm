<template>
 <nav class="navbar navbar-expand-lg navColor">
    <div class="container">
      <div class="navbar-collapse collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard" v-if="loggedIn" class="nav-link text-info" :class="{ active: $route.path === '/dashboard' }">Dashboard</router-link>
          </li>
        </ul>
        <div class="navbar-nav ms-auto">
          <router-link to="/register" v-if="!loggedIn" class="nav-link text-info">Register</router-link>
          <router-link to="/login" v-if="!loggedIn" class="nav-link text-info">Login</router-link>
          <router-link to="/"  v-if="loggedIn" v-for="user in users" :key="user.users" class="nav-link text-info" @click="logout">Logout | {{ user.full_name }} </router-link>
        </div>
      </div>
    </div>
  </nav>


  <RouterView/>
</template>

<script setup>
  import { db } from './firebase/index.js'
  import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
  import { RouterLink, RouterView } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import { onAuthStateChanged, signOut } from 'firebase/auth'
  import { auth } from './firebase/index.js'
  import router from './router'

  const loggedIn = ref(false)

  onMounted(() => {
    onAuthStateChanged(auth, function(user) {
      if (user) {
        loggedIn.value = true
        router.push('/')
      } else {
        router.push('/login')
      }
    })
  })

  const logout = () => {
    signOut(auth)
    .then(() => {
      router.push('/login')
      loggedIn.value = false
    })
  }

  const users = ref([])
  const colle = query(collection(db, 'users'), orderBy('full_name'));
  const usersTmp = [];

  onMounted(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(colle, (snapshot) => {
          snapshot.forEach((doc) => {
            const userData = {
              id: doc.id,
              full_name: doc.data().full_name,
              address: doc.data().address,
              gender: doc.data().gender,
              email_address: doc.data().email_address,
              contact_number: doc.data().contact_number
            }
            if (userData.email_address === user.email) {
              usersTmp.push(userData)
            }
          })
          users.value = usersTmp
        })
      }
    })
  })
</script>

<style>
  .navColor {
    background-color: #12285B ;
  }

  .nav-link.active {
    text-decoration: underline;
  }

  .pk {
    color: pink;
  }

  .bg-indigo {
    background-color: #12285B;
  }
</style>
