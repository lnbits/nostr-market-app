<template>
  <q-card bordered class="q-mb-md">
    <q-card-section horizontal>
      <q-card-section class="col-sm-2 col-md-4">
        <q-item
          v-for="pubkey of peerPubkeys"
          :key="pubkey"
          clickable
          @click="pubkeySelected(pubkey)"
          :active="selectedPubkey === pubkey"
          class="cursor-pointer"
        >
          <user-profile :pubkey="pubkey" :profiles="profiles" ></user-profile>
        </q-item>
      </q-card-section>

      <q-separator vertical />

      <q-card-section>
        <strong>Payment Method</strong>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import UserProfile from "./UserProfile.vue";

export default defineComponent({
  name: "UserChat",
  props: ["account-pubkey", "peer-pubkeys", "profiles", "events"],
  components: { UserProfile },
  data: function () {
    return {
      selectedPubkey: null
    };
  },
  methods: {
    pubkeySelected(pubkey) {
      console.log("### pubkeySelected", pubkey);
      this.selectedPubkey = pubkey
    },
  },
  created: async function () {
    console.log("### accoutnPubkey", this.accountPubkey);
    console.log("### peer-pubkes", this.peerPubkeys);
  },
});
</script>
