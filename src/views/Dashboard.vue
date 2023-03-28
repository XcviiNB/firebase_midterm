<template>
    <div class="container mt-3 text-center">
        <div class="row">
            <div class="col text-dark">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card bg-primary">
                            <div class="card-body">
                                <h4 class="card-title">Total Users</h4>
                                <p class="card-text">{{ users.length }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card bg-info">
                            <div class="card-body">
                                <h4 class="card-title">Male</h4>
                                <p class="card-text">{{ male_users }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card bg-warning">
                            <div class="card-body">
                                <h4 class="card-title">Female</h4>
                                <p class="card-text">{{ female_users }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto mt-5">
        <table class="table table-striped table-info table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Contact Number</th>
                    <th>Email Address</th>
                </tr>
            </thead>
            <tbody v-for="user in users" :key="user.users">
                <tr>
                    <td :class="{ 'text-primary': user.gender === 'Male', 'text-danger': user.gender === 'Female'}">{{ user.full_name }}</td>
                    <td :class="{ 'text-primary': user.gender === 'Male', 'text-danger': user.gender === 'Female'}">{{ user.address }}</td>
                    <td :class="{ 'text-primary': user.gender === 'Male', 'text-danger': user.gender === 'Female'}">{{ user.contact_number }}</td>
                    <td :class="{ 'text-primary': user.gender === 'Male', 'text-danger': user.gender === 'Female'}">{{ user.email_address }}</td>
                </tr>
            </tbody>
        </table>
    </div>


</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { db } from '../firebase/index.js'
    import { collection, onSnapshot } from "firebase/firestore";

    const users = ref([])
    const colle = (collection(db, 'users'));

    const female_users  = ref(0)
    const male_users    = ref(0)
    const usersTmp      = []
    let female_user     = 0
    let male_user       = 0

    onMounted(async () => {
        onSnapshot(colle,(snapshot) => {
            snapshot.forEach((doc) => {
                const user = {
                    id: doc.id,
                    full_name: doc.data().full_name,
                    address: doc.data().address,
                    gender: doc.data().gender,
                    email_address: doc.data().email_address,
                    contact_number: doc.data().contact_number
                }
                usersTmp.push(user)

                if (user.gender == 'Male') {
                    male_user++
                } else if (user.gender == 'Female') {
                    female_user++
                }
            })

            users.value         = usersTmp
            male_users.value    = male_user
            female_users.value  = female_user
        })
    })
</script>