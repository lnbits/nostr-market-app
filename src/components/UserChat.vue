<template>
  <div>
    <q-card bordered class="q-mb-md">
      <q-card-section :class="{'q-card-section-horizontal': !isMobile}">
        <!-- Mobile dropdown -->
        <q-card-section v-if="isMobile" class="q-pb-none">
          <q-select
            v-model="selectedPubkey"
            :options="peerPubkeys"
            @update:model-value="pubkeySelected"
            class="q-mb-md"
          >
            <template v-slot:option="{ itemProps, opt: pubkey }">
              <q-item v-bind="itemProps">
                <user-profile :pubkey="pubkey" :profiles="profiles"></user-profile>
              </q-item>
            </template>

            <template v-slot:selected>
              <user-profile :pubkey="selectedPubkey" :profiles="profiles"></user-profile>
            </template>
          </q-select>
        </q-card-section>

        <!-- Desktop list -->
        <q-card-section v-else class="col-sm-2 col-md-4">
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

        <q-separator v-if="!isMobile" vertical />

        <q-card-section style="width: 100%">
          <div style="width: 100%" class="q-pa-md row justify-center">
            <div style="width: 100%">
              <q-scroll-area style="height: 500px">
                <div v-if="dmEvents">
                  <q-chat-message
                    v-for="(dmEvent, index) in dmEvents"
                    :key="index"
                    :name="
                      dmEvent.sent
                        ? 'me'
                        : selectedProfile?.name || pubkeyAlias(selectedPubkey)
                    "
                    :sent="dmEvent.sent"
                    :avatar="dmEvent.avatar"
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
                <div id="bottom-user-chat"></div>
              </q-scroll-area>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-sm-2 col-md-4"> </q-card-section>
        <!-- <q-separator vertical /> -->
        <q-card-section style="width: 100%">
          <q-form @submit="sendDirectMesage" class="auto-width">
            <q-input
              class="rounded-pill"
              style="width: 100%"
              rounded
              outlined
              clearable
              v-model.trim="newMessage"
              label="Write a message"
            >
              <template v-slot:append>
                <q-icon
                  name="send"
                  class="cursor-pointer"
                  color="secondary"
                  @click="sendDirectMesage"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-dialog v-model="showRawMessage" position="top">
      <q-card class="q-pa-lg q-pt-xl" style="width: 500px">
        <q-input
          filled
          dense
          type="textarea"
          rows="20"
          v-model.trim="rawMessage"
          label="Raw Data"
        ></q-input>
        <div class="row q-mt-lg">
          <q-btn v-close-popup flat color="grey" class="q-ml-auto">Close</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import moment from 'moment'
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator'
import UserProfile from './UserProfile.vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  accountPubkey: String,
  peerPubkeys: Array,
  profiles: Array,
  events: Object
})

const emit = defineEmits(['chat-selected', 'send-dm'])

// State
const $q = useQuasar()
const selectedPubkey = ref(null)
const selectedProfile = ref(null)
const dmEvents = ref([])
const newMessage = ref(null)
const rawMessage = ref(null)
const showRawMessage = ref(false)
const isMobile = ref(false)

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const pubkeySelected = (pubkey) => {
  selectedPubkey.value = pubkey
  selectedProfile.value = props.profiles.find((p) => p.pubkey === pubkey)
  emit('chat-selected', pubkey)
  setTimeout(() => {
    document.getElementById('bottom-user-chat').scrollIntoView()
  }, 100)
}

const sendDirectMesage = () => {
  emit('send-dm', {
    to: selectedPubkey.value,
    message: newMessage.value,
  })
  newMessage.value = null
}

const pubkeyAlias = (pubkey) => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
    separator: ' ',
    style: 'capital',
    seed: pubkey,
  })
}

const showMessageRawData = (index) => {
  rawMessage.value = JSON.stringify(dmEvents.value[index]?.message, null, 2)
  showRawMessage.value = true
}

// Watchers
watch(() => props.events, (newEvents) => {
  dmEvents.value = (newEvents?.events || []).map((e) => {
    const sent = props.accountPubkey === e.pubkey
    const dm = {
      isJson: false,
      message: e.content,
      sent,
      avatar: sent
        ? $q.config.staticPath + '/images/blank-avatar.webp'
        : selectedProfile.value?.picture ||
          $q.config.staticPath + '/images/blank-avatar.webp',
      dateFrom: moment(e.created_at * 1000).fromNow(),
    }
    if (isNaN(e.content) && isJson(e.content)) {
      dm.isJson = true
      dm.message = JSON.parse(e.content)
    }
    return dm
  })
  setTimeout(() => {
    document.getElementById('bottom-user-chat').scrollIntoView()
  }, 0)
}, { deep: true })

// Lifecycle hooks
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  pubkeySelected(props.peerPubkeys[0] || null)
})
</script>

<style scoped>
.q-card-section-horizontal {
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  .q-card-section-horizontal {
    flex-direction: column;
  }
}
</style>
