<template>
  <div class="authen">
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
      <v-col cols="12" class="text-center">
        <v-dialog v-model="showRegister" persistent max-width="600px" ref="form">
          <template v-slot:activator="{ on }">
            <div class="my-2">
              <v-btn v-on="on" large color="success" dark>
                <h2>สมัครบัญชีใหม่</h2>
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">
                <h2>สมัคร</h2>
              </span>
              <v-spacer></v-spacer>
              <v-btn @click="close" text>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-form ref="form" v-model="validregister" :lazy-validation="lazy">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        :rules="emailRules"
                        v-model="emailuser"
                        label="Email*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        v-model="password"
                        :rules="passwordRules"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Date of Register"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-col cols="12" class="text-center">
                <v-btn large color="success" dark style="width: 40%;" @click="Register">
                  <h2>สมัคร</h2>
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <br />
    </v-card>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  name: "FromLogin",
  props: {
    msg: String
  },
  data: () => ({
    msg: "",
    emailuser: "",
    password: "",
    showRegister: false,
    date: new Date(),
    menu: false,
  }),
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'th'
    },
    close() {
      this.showRegister = false;
      this.emailuser_register = "";
      this.password_register = "";
    },
    async Register() {
       var nextWeek = new Date(this.date);
       nextWeek.setDate(this.date.getDate() + 7);
      if (this.$refs.form.validate()) {
        try {
          const credentials = {
            emailuser: this.emailuser,
            password: this.password,
            date: nextWeek
          };
          const response = await AuthService.Register(credentials);
          this.msg = response.msg;
          this.showRegister = false;
          this.emailuser = "";
          this.password = "";
        } catch (error) {
          alert((this.msg = "shit"));
        }
      }
    },
    async Login() {
      try {
        const credentials = {
          emailuser: this.emailuser,
          password: this.password
        };
        const response = await AuthService.Login(credentials);
        this.msg = response.msg;
        this.emailuser = "";
        this.password = "";
        const token = response.token;
        const user = response.user;
        this.$store.dispatch("Login", { token, user });
        this.$router.push("/Login");
      } catch (error) {
        alert((this.msg = error.response.data.msg));
        //this.snackbar = true
        //this.msg = error.response.data.msg;
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
