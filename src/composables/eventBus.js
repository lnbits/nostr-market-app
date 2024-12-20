import { ref } from 'vue'

const processedEventIds = ref(new Set())
const eventHandlers = ref(new Map())

export function useEventBus() {
  const registerHandler = (eventType, handler) => {
    eventHandlers.value.set(eventType, handler)
  }

  const processEvent = async (event, relayData) => {
    if (processedEventIds.value.has(event.id)) return
    processedEventIds.value.add(event.id)

    const handler = eventHandlers.value.get(event.kind)
    if (handler) {
      await handler(event, relayData)
    }
  }

  const processEvents = async (events, relayData) => {
    if (!events?.length) return

    for (const event of events) {
      await processEvent(event, relayData)
    }
  }

  return {
    registerHandler,
    processEvent,
    processEvents,
    processedEventIds
  }
}
