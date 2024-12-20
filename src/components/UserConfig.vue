<template>
  <q-card>
    <q-card-section v-if="accountData">
      <div class="row">
        <div class="col-10">
          <q-input
            v-model="accountData.npub"
            readonly
            disbled
            outlined
            :hint="accountData.pubkey"
            type="text"
            label="Public Key"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-btn
                @click="copyText(accountData.npub)"
                icon="content_copy"
                label="Npub"
                flat
                color="gray float-right q-mt-sm"
              ></q-btn>
            </template>
          </q-input>
        </div>

        <div class="col-2 auto-width">
          <q-btn
            @click="copyText(accountData.pubkey)"
            icon="content_copy"
            label="Hex"
            flat
            color="gray float-right q-mt-sm"
          ></q-btn>
        </div>
      </div>

      <div class="row">
        <div class="col-10">
          <q-input
            v-model="accountData.nsec"
            readonly
            disabled
            outlined
            type="password"
            label="Private Key"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-btn
                @click="copyText(accountData.nsec)"
                icon="content_copy"
                label="Nsec"
                flat
                color="gray float-right q-mt-sm"
              ></q-btn>
            </template>
          </q-input>
        </div>

        <div class="col-2 auto-width">
          <q-btn
            @click="copyText(accountData.privkey)"
            icon="content_copy"
            label="Hex"
            flat
            color="gray float-right q-mt-sm"
          ></q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section v-else>
      <div>
        <strong>No Account</strong>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="float-right">
        <q-btn
          @click="clearAllData"
          flat
          label="Clear All Data"
          icon="delete"
          class="q-ml-lg"
          color="negative"
        ></q-btn>
        <q-btn
          v-if="accountData"
          @click="logout"
          flat
          label="Logout"
          icon="logout"
          class="q-ml-lg"
          color="primary"
        ></q-btn>
        <q-btn
          v-else
          @click="$emit('login')"
          flat
          label="Login"
          icon="login"
          class="q-ml-lg"
          color="primary"
        ></q-btn>
      </div>
    </q-card-section>
    <q-card-section></q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserConfig",
  props: ["account"],

  data: function () {
    return {
      accountData: null,
    };
  },
  watch: {
    account() {
      this.accountData =
        this.account && JSON.parse(JSON.stringify(this.account));
    },
  },
  methods: {
    logout: async function () {
      this.$q
        .dialog(
          confirm(
            "Please make sure you save your private key! You will not be able to recover it later!"
          )
        )
        .onOk(async () => {
          this.$emit("logout");
        });
    },
    copyText(text) {
      this.$emit("copy-text", text);
    },
    clearAllData() {
      this.$emit("clear-all-data");
    },
  },
  created: async function () {
    this.accountData = this.account && JSON.parse(JSON.stringify(this.account));
  },
});
</script>
