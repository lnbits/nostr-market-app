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
          <user-profile :pubkey="pubkey" :profiles="profiles"></user-profile>
        </q-item>
      </q-card-section>

      <q-separator vertical />

      <q-card-section style="width: 100%;">
        <div style="width: 100%;" class="q-pa-md row justify-center">
          <div style="width: 100%;">
            <q-chat-message
              v-for="(dmEvent, index) in dmEvents"
              :key="index"
              :name="dmEvent.sent ? 'me' : selectedProfile?.name || 'merchant'"
              :text="dmEvent.isJson ? [] : [dmEvent.message]"
              :sent="dmEvent.sent"
              :stamp="dmEvent.dateFrom"

            >
              <div v-if="dmEvent.isJson">
                <div v-if="dmEvent.message.type === 0">
                  <strong>New order:</strong>
                </div>
                <div v-else-if="dmEvent.message.type === 1">
                  <strong>Reply sent for order: </strong>
                </div>
                <div v-else-if="dmEvent.message.type === 2">
                  <q-badge v-if="dmEvent.message.paid" color="green"
                    >Paid
                  </q-badge>
                  <q-badge v-if="dmEvent.message.shipped" color="green"
                    >Shipped
                  </q-badge>
                </div>
                <div>
                  <span v-text="dmEvent.message.message"></span>
                  <q-badge class="gt-sm" color="orange">
                    <span
                      v-text="dmEvent.message.id"
                      @click="showOrderDetails(dmEvent.message.id)"
                      class="cursor-pointer"
                    ></span>
                  </q-badge>
                </div>
                <q-badge
                  @click="showMessageRawData(index)"
                  class="cursor-pointer"
                  >...</q-badge
                >
              </div>
              <div v-else>
                <span v-text="dmEvent.message"></span>
              </div>
            </q-chat-message>
          </div>
        </div>
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
      selectedPubkey: null,
      selectedProfile: null,
      dmEvents: [],
    };
  },
  watch: {
    events(n) {
      console.log("### watch n", n);

      this.dmEvents = (n?.events || []).map((e) => {
        const dm = {
          isJson: false,
          message: e.content,
          sent: this.accountPubkey === e.pubkey,
          dateFrom: e.created_at + "",
        };
        if (isJson(e.content)) {
          dm.isJson = true;
          dm.message = JSON.parse(e.content);
        }
        return dm;
      });
    },
  },
  methods: {
    pubkeySelected(pubkey) {
      console.log("### pubkeySelected", pubkey);
      this.selectedPubkey = pubkey;
      this.selectedProfile = this.profiles.find((p) => p.pubkey === pubkey);
      console.log("### selectedProfile", this.selectedProfile);
      this.$emit("chat-selected", pubkey);
    },
  },
  created: async function () {
    console.log("### accoutnPubkey", this.accountPubkey);
    console.log("### peer-pubkes", this.peerPubkeys);
  },
});
</script>
