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
            <button @click="showRegister">
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
        <FromLogin></FromLogin>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import AuthService from "@/services/AuthService.js";
import FromLogin from "@/components/FromLogin.vue"
import Vue from "vue";

export default Vue.extend({
  components: {
    FromLogin
  },
  data: () => ({
      msg: "",
    emailuser: "",
    password: "",
    //emailuser_register: "",
    //password_register: "",
    showRegister: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
  }),
  methods: {
    
  }
});
</script>
