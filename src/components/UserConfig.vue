<template>
  <q-card>
    <q-card-section v-if="account">
      <div class="row">
        <div class="col-10">

          <q-input v-value="account.npub" readonly disbled outlined :hint="account.pubkey" type="text" label="Public Key"
            class="q-mb-md">
            <template v-slot:append>
              <q-btn @click="copyText(account.npub)" icon="content_copy" label="Npub" flat
                color="gray float-right q-mt-sm"></q-btn>
            </template>
          </q-input>
        </div>

        <div class="col-2 auto-width">
          <q-btn @click="copyText(account.pubkey)" icon="content_copy" label="Hex" flat
            color="gray float-right q-mt-sm"></q-btn>
        </div>
      </div>

      <div class="row">
        <div class="col-10">
          <q-input v-value="account.nsec" readonly disbled outlined type="password" label="Private Key" class="q-mb-md">
            <template v-slot:append>
              <q-btn @click="copyText(account.nsec)" icon="content_copy" label="Nsec" flat
                color="gray float-right q-mt-sm"></q-btn>
            </template>
          </q-input>
        </div>

        <div class="col-2 auto-width">
          <q-btn @click="copyText(account.privkey)" icon="content_copy" label="Hex" flat
            color="gray float-right q-mt-sm"></q-btn>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div v-if="account" class="float-right">
        <q-btn @click="logout" flat label="Logout" icon="logout" class="q-ml-lg" color="primary"></q-btn>
      </div>
      <div v-else>
        <strong>No Account</strong>
      </div>
    </q-card-section>
    <q-card-section></q-card-section>

  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserConfig',
  props: ['account'],

  data: function () {
    return {
    }
  },
  methods: {
    logout: async function () {
      LNbits.utils
        .confirmDialog(
          'Please make sure you save your private key! You will not be able to recover it later!'
        )
        .onOk(async () => {
          this.$emit('logout')
        })
    },
    copyText(text) {
      this.$emit('copy-text', text)
    }
  },
  created: async function () {

  }

})
</script>
