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
        <v-card class="mx-auto" color="#26c6da" dark max-width="500">
          <v-card-title>
            <span class="title font-weight-light">
              <h2>LOGIN7D</h2>
            </span>
            <v-spacer></v-spacer>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Evan You</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card-title>
            <v-card-text class="headline font-weight-bold text-center">Count Down</v-card-text>
            <v-card-text class="headline text-center">Test</v-card-text>
            <br>
            <div class="my-2 text-center">
              <v-btn v-on="on" large color="error" dark>
                <h2>ออกจากระบบ</h2>
              </v-btn>
            </div>
            <br>
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
  data: () => ({}),
  methods: {}
});
</script>

