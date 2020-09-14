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
      <v-col cols="12">
        <v-card class="mx-auto" color="#26c6da" dark max-width="600">
          <v-card-title>
            <span class="title font-weight-light">
              <h2>LOGIN7D</h2>
            </span>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ useremail }}</v-list-item-title>
              </v-list-item-content>
            </v-card-actions>
          </v-card-title>
          <v-card-text class="headline font-weight-bold text-center">Expiration date</v-card-text>
          <v-card-text class="headline font-weight-bold text-center">{{this.userexpiration}}</v-card-text>
          <p id="demo"></p>
          <br />
          <div class="my-2 text-center">
            <v-btn v-on="on" large color="error" dark @click="logout">
              <h2>ออกจากระบบ</h2>
            </v-btn>
          </div>
          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";

export default Vue.extend({
  components: {
    //
  },
  data: () => ({
    useremail: "",
    userexpiration: "",
    time: "",
    now: new Date()
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.useremail = this.$store.getters.getUser.email;
    this.userexpiration = this.$store.getters.getUser.expiration;
    //mysql date -> from obj javascript

    var dateParts = this.userexpiration.split("-");
    var jsDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2)
    );
    this.userexpiration = jsDate.toISOString().substr(0, 10);
    //console.log(jsDate.toISOString().substr(0, 10))
    //this.time = jsDate - this.now;

    //var days = Math.floor(this.time / (1000 * 60 * 60 * 24));
    //var hours = Math.floor(
      //(this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //);
    //var minutes = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
    //var seconds = Math.floor((this.time % (1000 * 60)) / 1000);
    //console.log(days);
    //console.log(hours);
    //console.log(minutes);
    //console.log(seconds);
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
});
</script>

