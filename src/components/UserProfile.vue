<template>
  <q-item-section avatar>
    <q-avatar>
      <img
        v-if="merchantProfile(pubkey)?.picture"
        :src="merchantProfile(pubkey).picture"
      />
      <div v-else :innerHTML="pubkeyAvatar(pubkey)"></div>
    </q-avatar>
  </q-item-section>
  <q-item-section class="q-mt-sm">
    <q-item-label
      ><strong>{{
        merchantProfile(pubkey)?.name ||
        merchantProfile(pubkey)?.display_name ||
        pubkeyAlias(pubkey)
      }}</strong></q-item-label
    >
    <q-item-label>
      <div class="text-caption text-grey ellipsis-2-lines">
        <p>{{ description || pubkey }}</p>
      </div>
    </q-item-label>
    <q-tooltip>{{ pubkey }}</q-tooltip>
  </q-item-section>
</template>

<script>
import { defineComponent } from "vue";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import { toSvg } from "jdenticon";

export default defineComponent({
  name: "UserProfile",
  props: ["pubkey", "profiles", "description"],

  data: function () {
    return {};
  },
  methods: {
    merchantProfile(pubkey) {
      return this.profiles?.find((p) => p.pubkey === pubkey);
    },
    pubkeyAlias(pubkey) {
      return uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2,
        separator: " ",
        style: "capital",
        seed: pubkey,
      });
    },
    pubkeyAvatar(pubkey) {
      return toSvg(pubkey, 100);
    },
  },
  created: async function () {},
});
</script>
