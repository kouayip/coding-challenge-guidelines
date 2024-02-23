import { SSEvent } from './SSEvent.ts'

export class UpfluenceSSEvent extends SSEvent {
  /**
   * Parse the event data to obtain the event type and data
   */
  protected handleMessageReceived(event: MessageEvent): void {
    let data = event.data

    try {
      data = JSON.parse(data) as unknown
    } catch (err) {
      //
      this.emit('error', err)
    }

    //
    if (typeof data === 'object') {
      // Event type retrieval from object keys
      const eventType = Object.keys(data)[0]

      // Issue the corresponding event with the appropriate data
      this.emit(`${eventType}`, data[eventType])
    }

    // Send the event in the default channel
    this.emit('message', data)
  }
}
