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
          <ul>
            <li>
              <span id="days"></span>days
            </li>
            <li>
              <span id="hours"></span>Hours
            </li>
            <li>
              <span id="minutes"></span>Minutes
            </li>
            <li>
              <span id="seconds"></span>Seconds
            </li>
          </ul>
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
    now: new Date(),
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
    jsDate: ""
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.useremail = this.$store.getters.getUser.email;
    this.userexpiration = this.$store.getters.getUser.expiration;
    var dateParts = this.userexpiration.split("-");
    this.jsDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2)
    );
    this.jsDate = this.jsDate.getTime();
    this.delay(this.jsDate);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    delay(jsDate) {
      //mysql date -> from obj javascript
      setInterval(function() {
        let now = new Date().getTime();
        this.time = jsDate - now;
        document.getElementById("days").innerText = Math.floor(
          this.time / (1000 * 60 * 60 * 24)
        );
        document.getElementById("hours").innerText = Math.floor(
          (this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        document.getElementById("minutes").innerText = Math.floor(
          (this.time % (1000 * 60 * 60)) / (1000 * 60)
        );
        document.getElementById("seconds").innerText = Math.floor(
          (this.time % (1000 * 60)) / 1000
        );
      }, 1000);
    }
  }
});
</script>
<style >
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1 {
  font-weight: normal;
}

li {
  display: inline-block;
  font-size: 1.5em;
  list-style-type: none;
  padding: 1em;
  text-transform: uppercase;
}

li span {
  display: block;
  font-size: 4.5rem;
}

/* general styling */
html,
body {
  height: 100%;
  margin: 0;
  
}

.container {
  color: #333;
  margin: 0 auto;
  padding: 0.5rem;
  text-align: center;
  
}
</style>


