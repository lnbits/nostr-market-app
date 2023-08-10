<template>
  <q-card>
    <q-card-section>
      <div class="q-pt-md">
        <div class="q-gutter-y-md">
          <q-tabs v-model="tab" active-color="primary" align="justify">
            <q-tab
              name="marketplace"
              label="Look And Feel"
              @update="(val) => (tab = val.name)"
            ></q-tab>
            <q-tab
              name="merchants"
              label="Merchants"
              @update="(val) => (tab = val.name)"
            ></q-tab>
            <q-tab
              name="relays"
              label="Relays"
              @update="(val) => (tab = val.name)"
            ></q-tab>
          </q-tabs>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <q-tab-panels v-model="tab">
            <q-tab-panel name="marketplace">
              <q-list
                v-if="!readNotes?.marketUi"
                class="q-mb-lg gt-sm"
                bordered
              >
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon color="primary" name="info" size="xl" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="q-mt-sm q-ml-lg">
                    <q-item-label><strong>Note</strong></q-item-label>
                    <q-item-label>
                      <div class="text-caption">
                        <ul>
                          <li>
                            <span class="text-subtitle1">
                              Here one can customize the look and feel of the
                              Market.
                            </span>
                          </li>
                          <li>
                            <span class="text-subtitle1">
                              When the Market Profile is shared (via
                              <code>naddr</code> ) these customisations will be
                              available to the customers.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      @click="markNoteAsRead('marketUi')"
                      size="lg"
                      outline
                      color="primary"
                      label="Got it!"
                      icon="check_small"
                    />
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="q-mb-md"><strong>Information</strong></div>
              <q-input
                @change="updateMarketData"
                outlined
                v-model="marketData.opts.name"
                type="text"
                label="Market Name"
                hint="Short name for the market"
                class="q-mb-md"
              >
              </q-input>
              <q-input
                @change="updateMarketData"
                outlined
                v-model="marketData.opts.about"
                type="textarea"
                rows="3"
                label="Marketplace Description"
                hint="It will be displayed on top of the banner image. Can be a longer text."
                class="q-mb-lg"
              ></q-input>

              <div class="q-mb-md q-mt-lg">
                <strong>UI Configurations</strong>
              </div>

              <q-input
                @change="updateMarketData"
                outlined
                v-model="marketData.opts.ui.picture"
                type="text"
                label="Logo"
                hint="It will be displayed next to the search input. Can be png, jpg, ico, gif, svg."
                class="q-mb-md"
              >
              </q-input>
              <q-input
                @change="updateMarketData"
                outlined
                v-model="marketData.opts.ui.banner"
                type="text"
                label="Banner"
                hint="It represents the visual identity of the market. Can be png, jpg, ico, gif, svg."
                class="q-mb-md"
              >
              </q-input>
              <q-select
                @input="updateMarketData"
                @update:model-value="updateMarketData"
                filled
                v-model="marketData.opts.ui.theme"
                hint="The colors of the market will vary based on the theme. It applies to all components (buttons, labels, inputs, etc)"
                :options="themeOptions"
                label="Marketplace Theme"
              ></q-select>

              <div class="lt-md q-mt-lg"></div>
              <q-checkbox
                @input="updateMarketData"
                @click="updateMarketData"
                v-model="marketData.opts.ui.darkMode"
                label="Dark Mode"
                size="sm"
                class="q-mt-sm"
              ></q-checkbox>
            </q-tab-panel>
            <q-tab-panel name="merchants">
              <q-list v-if="!readNotes?.merchants" class="q-mb-lg" bordered>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon color="primary" name="info" size="xl" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="q-mt-sm q-ml-lg">
                    <q-item-label><strong>Note</strong></q-item-label>
                    <q-item-label>
                      <div class="text-caption">
                        <ul>
                          <li>
                            <span class="text-subtitle1">
                              Here all the mercants of the marketplace are
                              listed.
                            </span>
                          </li>
                          <li>
                            <span class="text-subtitle1">
                              You can easily add a new merchant by entering its
                              public key in the input below.
                            </span>
                          </li>
                          <li>
                            <span class="text-subtitle1">
                              When a merchant is added all its products and
                              stalls will be available in the Market page.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      @click="markNoteAsRead('merchants')"
                      size="lg"
                      outline
                      color="primary"
                      label="Got it!"
                      icon="check_small"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
              <div>
                <q-input
                  outlined
                  v-model="merchantPubkey"
                  @keydown.enter="addMerchant"
                  type="text"
                  label="Pubkey/Npub"
                  hint="Add merchants"
                >
                  <q-btn @click="addMerchant" dense flat icon="add"></q-btn>
                </q-input>
                <q-list class="q-mt-md">
                  <q-item
                    v-for="pubkey of marketData.opts.merchants"
                    :key="pubkey"
                  >
                    <user-profile
                      :pubkey="pubkey"
                      :profiles="profiles"
                    ></user-profile>
                    <q-item-section side>
                      <q-btn
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="removeMerchant(pubkey)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-tab-panel>
            <q-tab-panel name="relays">
              <div>
                <div>
                  <q-input
                    outlined
                    v-model="relayUrl"
                    @keydown.enter="addRelay"
                    type="text"
                    label="wss://"
                    hint="Add realays"
                  >
                    <q-btn @click="addRelay" dense flat icon="add"></q-btn>
                  </q-input>
                  <q-list class="q-mt-md">
                    <q-item v-for="relay in marketData.relays" :key="relay">
                      <q-item-section avatar>
                        <q-avatar>
                          <q-icon
                            name="router"
                            :color="
                              relayData(relay).connected ? 'green' : 'pink'
                            "
                          ></q-icon>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section class="q-mt-sm">
                        <q-item-label
                          ><strong>{{ relay }}</strong>
                          <div
                            v-if="relayData(relay).error"
                            class="text-caption text-grey ellipsis-2-lines"
                          >
                            <p>Error: {{ relayData(relay).error }}</p>
                          </div>
                        </q-item-label>
                      </q-item-section>
                      <!-- <q-item-label caption>
                        <span
                          class="ellipsis-2-lines text-wrap"
                          v-text="relayData(relay).error"
                        ></span>
                      </q-item-label> -->
                      <q-item-section side>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="removeRelay(relay)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="float-right">
        <q-btn
          @click="deleteMarket"
          flat
          label="Delete Market"
          icon="delete"
          class="q-ml-lg"
          color="negative"
        ></q-btn>
        <q-btn
          @click="applyLookAndFeel"
          flat
          label="Apply Look and Feel"
          icon="palette"
          class="q-ml-lg"
          color="secondary"
        ></q-btn>
        <q-btn
          @click="publishNaddr"
          flat
          label="Share Market Profile"
          icon="share"
          class="q-ml-lg"
          color="primary"
        ></q-btn>
      </div>
    </q-card-section>
    <q-card-section class="lt-md"></q-card-section>
    <q-card-section class="lt-md"></q-card-section>
    <q-card-section></q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import UserProfile from "./UserProfile.vue";

export default defineComponent({
  name: "EssentialLink",
  props: ["market", "profiles", "relays-data", "read-notes"],
  components: { UserProfile },

  data: function () {
    return {
      tab: "marketplace",

      merchantPubkey: null,
      relayUrl: null,
      marketData: {
        pubkey: null,
        relays: [],
        opts: {
          identifier: null,
          name: null,
          about: null,
          merchants: [],
          ui: {
            picture: null,
            banner: null,
            theme: null,
            darkMode: false,
          },
        },
      },
      themeOptions: [
        "classic",
        "bitcoin",
        "flamingo",
        "cyber",
        "freedom",
        "mint",
        "autumn",
        "monochrome",
        "salvador",
      ],
    };
  },
  methods: {
    addMerchant: async function () {
      if (!isValidKey(this.merchantPubkey, "npub")) {
        $q.notify({
          message: "Invalid Public Key!",
          type: "warning",
        });
        return;
      }
      const publicKey = isValidKeyHex(this.merchantPubkey)
        ? this.merchantPubkey
        : NostrTools.nip19.decode(this.merchantPubkey).data;
      this.marketData.opts.merchants.push(publicKey);
      this.updateMarketData();
      this.merchantPubkey = null;
    },
    removeMerchant: async function (publicKey) {
      console.log("### removeMerchant", publicKey);
      this.marketData.opts.merchants = this.marketData.opts.merchants.filter(
        (m) => m !== publicKey
      );
      this.updateMarketData();
    },
    addRelay: async function () {
      const relayUrl = (this.relayUrl || "").trim();
      if (!relayUrl.startsWith("wss://") && !relayUrl.startsWith("ws://")) {
        this.relayUrl = null;
        $q.notify({
          timeout: 5000,
          type: "warning",
          message: `Invalid relay URL.`,
          caption: "Should start with 'wss://'' or 'ws://'",
        });
        return;
      }
      try {
        new URL(relayUrl);
        this.marketData.relays.push(relayUrl);
        this.updateMarketData();
      } catch (error) {
        $q.notify({
          timeout: 5000,
          type: "warning",
          message: `Invalid relay URL.`,
          caption: `Error: ${error}`,
        });
      }

      this.relayUrl = null;
    },
    removeRelay: async function (relay) {
      this.marketData.relays = this.marketData.relays.filter(
        (r) => r !== relay
      );
      this.updateMarketData();
    },
    updateMarketData: function () {
      this.$emit("market-update", this.cloneMarketData());
    },
    publishNaddr() {
      this.$emit("publish-naddr");
    },
    deleteMarket() {
      this.$emit("delete-market", this.cloneMarketData());
    },
    applyLookAndFeel() {
      this.$emit("apply-ui", this.cloneMarketData());
    },
    markNoteAsRead(noteId) {
      this.$emit("note-read", noteId);
    },
    cloneMarketData() {
      return JSON.parse(JSON.stringify(this.marketData));
    },

    relayData(relayUrl) {
      return (
        (this.relaysData || []).find((r) => r.relayUrl === relayUrl) || {
          connected: false,
          error: null,
        }
      );
    },
  },
  created: async function () {
    this.marketData = {
      ...this.marketData,
      ...JSON.parse(JSON.stringify(this.market || {})),
    };
    if (!this.readNotes?.merchants) {
      this.tab = "merchants";
    }
  },
});
</script>
