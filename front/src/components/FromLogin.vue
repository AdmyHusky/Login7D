<template>
  <div class="authen">
    <v-card width="450" class="mx-auto" style="position: relative; top: 20px;">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Email*" required v-model="emailuser_login"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                required
                v-model="password_login"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field>
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
                      <v-text-field :rules="emailRules" v-model="emailuser" label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        required
                        v-model="password"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules2="[rules.required, rules.min]"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
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
    emailuser_login: "",
    password: "",
    password_login: "",
    showRegister: false,
    date: new Date(),
    menu: false,
    expiration: "",
    show1: false,
    show2: false,
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length > 7 || "Password must be more than 7 and "
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required.",
      emailMatch: () => "The email and password you entered don't match"
    },
    rules2: {
      required: value => !!value || "Required.",
      min: v => v.length >= 7 || 'Min 7 characters',
      emailMatch: () => "The email and password you entered don't match"
    },
  }),
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "th";
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
          alert((this.msg = "Error"));
        }
      }
    },
    async Login() {
      try {
        const credentials = {
          emailuser: this.emailuser_login,
          password: this.password_login
        };
        const response = await AuthService.Login(credentials);
        this.msg = response.msg;
        this.emailuser_login = "";
        this.password_login = "";
        const token = response.token;
        const user = response.user;
        this.$store.dispatch("login", { token, user });
        //check time
        this.expiration = this.$store.getters.getUser.expiration;
        var dateParts = this.expiration.split("-");
        var jsDate = new Date(
          dateParts[0],
          dateParts[1] - 1,
          dateParts[2].substr(0, 2)
        );
        var time = jsDate - this.date;
        if (time <= 0) {
          alert((this.msg = "Email expiration at " + jsDate));
        } else {
          this.$router.push("/login");
        }
      } catch (error) {
        alert((this.msg = error.response.data.msg));
        //this.snackbar = true
        //this.msg = error.response.data.msg;
      }
    }
  }
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
