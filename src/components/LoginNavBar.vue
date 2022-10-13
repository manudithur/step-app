<template>
    <v-app-bar id="navbar" height="100%" elevation="4" app>
            <v-app-bar-title>
                <router-link to="/">
                    <v-img src="../assets/stepApp.png" 
                    contain
                    max-width="20%"
                    ></v-img>
                </router-link>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="align-center">
                <router-link class="RLink" to="/login">
                    <v-btn text class="bar-btn">Sign In / Sign Up</v-btn>
                </router-link>
            </v-toolbar-items>
    </v-app-bar>
</template>

<style scoped>
    #navbar {
        background-color: white;
    }

    .bar-btn {
        font-size: 20px;
    }
</style>

<script>
    export default{
        name: 'LoginNavBar',
    }
</script>
