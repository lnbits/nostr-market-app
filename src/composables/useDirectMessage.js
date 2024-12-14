import { useQuasar } from "quasar";
import { useMarketStore } from "../stores/marketStore";

export function useDirectMessage() {
  const $q = useQuasar();
  const marketStore = useMarketStore();

  const handleDmChatSelected = (pubkey) => {
    marketStore.dmEvents =
      $q.localStorage.getItem(`nostrmarket.dm.${pubkey}`) || {};
  };

  const sendDirectMessage = async (dm) => {
    if (!marketStore.account?.pubkey) {
      $q.notify({
        type: "warning",
        message: "Cannot send message. No user logged in!",
      });
      return;
    }
    try {
      const event = {
        ...(await NostrTools.getBlankEvent()),
        kind: 4,
        created_at: Math.floor(Date.now() / 1000),
        tags: [["p", dm.to]],
        pubkey: marketStore.account.pubkey,
      };
      event.content = await NostrTools.nip04.encrypt(
        marketStore.account.privkey,
        dm.to,
        dm.message
      );

      event.id = NostrTools.getEventHash(event);
      event.sig = await NostrTools.signEvent(
        event,
        marketStore.account.privkey
      );

      await this._sendDmEvent(event);
      event.content = dm.message;
      this.persistDMEvent(event, dm.to);
    } catch (error) {
      $q.notify({
        type: "warning",
        message: "Failed to send message!",
      });
    }
  };

  const _sendDmEvent = async (event) => {
    const toPubkey = event.tags.filter((t) => t[0] === "p").map((t) => t[1]);

    let relays = this.findRelaysForMerchant(toPubkey[0]);
    if (!relays?.length) {
      relays = [...defaultRelays];
    }
    await this.publishEventToRelays(event, relays);
  };

  const _noDmEvents = () => {
    const dms = $q.localStorage
      .getAllKeys()
      .filter((key) => key.startsWith("nostrmarket.dm"));

    return dms.length === 0;
  };

  return {
    handleDmChatSelected,
    sendDirectMessage,
  };
}
