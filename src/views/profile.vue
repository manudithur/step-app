<template>
  <v-app>
    <NavBar />
    <v-main class="content align-center">
      <v-row class="justify-center">
        <v-col cols="5">
          <v-card class="rounded-xl centerCard pa-12">
            <h1 class="onGrey text-center mb-8 align-center">Your Profile</h1>
            <v-row class="justify-center text-center">
              <v-col cols="8">
                <v-avatar size="200" class="mb-5">
                  <v-img :src="imageUrl"></v-img>
                </v-avatar>
                <p class="red--text" v-if="errorFlag">{{errorMsg}}</p>
                <v-row v-if="edit" class="align-center justify-center pa-3">
                  <v-file-input 
                  v-model="file"
                  outlined
                  :disabled="edit==0"
                  @change="updateImg"
                  prepend-icon=""
                  show-size
                  append-icon="mdi-upload" 
                  label="Upload new avatar"></v-file-input>
                </v-row>
                <v-text-field
                  outlined
                  disabled
                  class="input"
                  label="Username"
                  v-model="username"
                  >{{ username }}
                </v-text-field>
                <v-text-field
                  outlined
                  disabled
                  class="input"
                  label="Email"
                  v-model="email"
                  >{{ email }}</v-text-field
                >
                <v-text-field
                  outlined
                  :disabled="edit == 0"
                  class="input"
                  label="First Name"
                  v-model="firstName"
                  >{{ firstName }}
                </v-text-field>
                <v-text-field
                  outlined
                  :disabled="edit == 0"
                  class="input"
                  label="Last Name"
                  v-model="lastName"
                  >{{ lastName }}
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn
                rounded
                large
                class="button"
                v-if="edit == 0"
                @click="editEvent()"
              >
                Edit
                <v-icon class="ml-1 white--text" size="20">mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                rounded
                large
                class="button"
                v-if="edit == 1"
                @click="saveChanges()"
              >
                Save Changes
                <v-icon class="ml-1 white--text" size="20">mdi-check</v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar />
  </v-app>
</template>
  
  <!-- Ojo con el important-->
  <style scoped>
.button {
  display: flex;
  background: #1b56ed !important;
  color: white !important;
  font-weight: bold;
  margin-top: 20px;
  max-width: 600px;
  width: 50%;
}

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

p {
  font-size: 17px;
}
</style>
  
<script>
import { mapState, mapActions } from "pinia";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { useSecurityStore } from "../stores/SecurityStore";
import { Editables } from "../api/user";
import router from "@/router";
//import router from "@/router"

export default {
  name: "App",
  data: () => ({
    edit: 0,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    errorMsg: "",
    errorFlag: false,
    avatarUrl: null,
    file: null,
    imageMeta: null
  }),

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    if (!securityStore.isLoggedIn) {
      router.push("/login");
    }
    await this.$getCurrentUser();
    this.username = this.$user.username;
    this.email = this.$user.email;
    this.firstName = this.$user.firstName;
    this.lastName = this.$user.lastName;
    const metadata = this.$user.metadata;
    this.avatarUrl = metadata.img
  },

  computed: {
    ...mapState(useSecurityStore, {
      $user: (state) => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: "isLoggedIn",
    }),
    error() {
      return this.errorMsg;
    },

    imageUrl() {
      if (!this.avatarUrl)
        return "https://cdn1.vectorstock.com/i/thumb-large/62/60/default-avatar-photo-placeholder-profile-image-vector-21666260.jpg";
      return this.avatarUrl;
    },
  },

  components: {
    NavBar,
    FooterBar,
  },

  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: "getCurrentUser",
      $saveEdit: "saveEdit",
      $modifyProfile: "modifyProfile",
    }),

    editEvent: function () {
      if (this.edit == 0) this.edit = 1;
      else this.edit = 0;
    },

    test(){
      console.log(this.imageMeta)
    },  

    updateImg() {
      const file = this.file
      const reader = new FileReader();
      this.errorMsg = ""
      this.errorFlag = false

      if(file.size > 80000){
        this.errorMsg = "Error: tamano maximo de imagen 80kb"
        this.errorFlag = true
        this.file = null
        return
      }

      if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        this.errorMsg = "Error: Tipo de archivo no soportado"
        this.errorFlag = true
        return;
      }

      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          this.avatarUrl = reader.result;
        },
        false
      );

      if (file) {
        this.avatarUrl = reader.readAsDataURL(file);
      }
    },

    async saveChanges() {
      if(this.errorFlag){
        return
      }
      let data = {img: this.avatarUrl}
      const editable = new Editables(
        this.firstName,
        this.lastName,
        this.avatarUrl,
        data
      );
      await this.$saveEdit(editable);
      await this.$modifyProfile(this.firstName, this.lastName, this.avatarUrl, data);
      this.edit = 0;
    },
  },
};
</script>