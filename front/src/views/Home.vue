<template>
  <v-container
    max-height="600"
    style="position: relative;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);"
  >
    <v-row sno-gutter class="d-flex align-center">
      <!-- REGISTER FROM -->
      <v-col cols="12" sm="7">
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <h1>LOGIN7D</h1>
            <h4>คลิกรูปภาพหรือเพิ่มบัญชี</h4>
            <button @click="Register">
              <span>
                <v-card width="256" class="mx-auto" style="position: relative; top: 20px;">
                  <v-img class="white--text align-end d-flex align-center" height="200px">
                    <v-icon style="font-size: 50px">mdi-plus-circle</v-icon>
                  </v-img>

                  <v-card-text class="text--primary">
                    <div>
                      <h2>เพิ่มบัญชี</h2>
                    </div>
                  </v-card-text>
                </v-card>
              </span>
            </button>
          </v-col>
        </v-row>
      </v-col>
      <!-- LOGIN FROM -->
      <v-col cols="12" sm="5">
        <v-row no-gutters>
          <v-card width="450" class="mx-auto" style="position: relative; top: 20px;">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Email*" required v-model="emailuser"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary" dark @click="Login">
                <h2>เข้าสู่ระบบ</h2>
              </v-btn>
            </v-card-actions>
            <br />
            <hr />
            <br />
            <v-card-actions>
              <v-col cols="12" class="text-center">
                <v-btn large color="success" dark @click="Register">
                  <h3>สมัครบัญชีใหม่</h3>
                </v-btn>
              </v-col>
            </v-card-actions>
            <br />
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AuthService from "@/services/AuthService.js";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    msg:"",
    emailuser: "",
    password: "",
  }),
  methods: {
    async Register() {
      if (this.$refs.form.validate()) {
        try {
          const credentials = {
            emailuser: this.emailuser,
            password: this.password
          };
          const response = await AuthService.signUp(credentials);
          this.msg = response.msg;
          this.$refs.form.reset();
        } catch (error) {
          alert((this.msg = error.response.data.msg));
        }
      }
    },
    async Login() {
      if (this.$refs.form.validate()) {
        try {
          const credentials = {
            emailuser: this.emailuser,
            password: this.password
          };
          const response = await AuthService.login(credentials);
          this.msg = response.msg;
          const token = response.token;
          const user = response.user;
          this.$store.dispatch("login", { token, user });
        } catch (error) {
          alert((this.msg = error.response.data.msg));
          //this.snackbar = true
          //this.msg = error.response.data.msg;
        }
      }
    }
  }
});
</script>
