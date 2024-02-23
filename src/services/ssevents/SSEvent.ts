import { Observable, MessageObservable } from '../observables/'
import { EventEmitter } from '../events/EventEmitter'

export type SSEventOptions = {
  url: string | URL
  autoConnect?: boolean
}

export abstract class SSEvent extends EventEmitter {
  private eventSource: EventSource | null

  // Connection status
  private _readyState: boolean

  constructor(private readonly options: SSEventOptions) {
    super()

    this.eventSource = null
    this._readyState = false

    // is value is true, auto connect to event source
    if (this.options.autoConnect) {
      this.connect()
    }
  }

  public get readyState() {
    return this._readyState
  }

  /**
   * Establishing the connection to the EventSource
   */
  connect() {
    const eventSource = new EventSource(this.options.url)

    // Event handler called when the connection is opened
    eventSource.onopen = event => {
      console.log('Connected to event source')
      this._readyState = true
      this.emit('open', event)

      // Event handler definition for received messages
      eventSource.onmessage = this.handleMessageReceived.bind(this)

      // Error handler definition for the EventSource
      eventSource.onerror = event => {
        // Check if the connection is closed
        if (event.eventPhase === EventSource.CLOSED) {
          this._readyState = false
          this.emit('close', event)
        } else {
          this.emit('error', event)
        }
      }
    }

    // Assign the created EventSource instance to the eventSource property of the
    this.eventSource = eventSource
  }

  /**
   * Creates an observable to observe messages on the specified channels.
   * @param channels The channels on which to observe messages.
   * @returns A generic observable for observing messages.
   */
  public observeMessage<T = unknown>(...channels: string[]): Observable<T> {
    return new MessageObservable(this, channels)
  }

  public disconnect(): void {
    this._readyState = false
    this.eventSource?.close()
    this.emit('disconnect', undefined)
    this.clearEventListeners()
  }

  /**
   * Abstract method to handle received messages when an event is received.
   * Child classes must implement this method to define their own logic for handling messages.
   * @param event The MessageEvent object containing the data of the received message.
   */
  protected abstract handleMessageReceived(event: MessageEvent): void
}
