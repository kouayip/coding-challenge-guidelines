import { Observable } from './Observable'
import { EventEmitter } from '../events/EventEmitter.ts'

type EventHandler<T = unknown> = (data: T) => void

export class MessageObservable<T = unknown> implements Observable<T> {
  private _eventHandler: EventHandler | null

  constructor(
    private eventEmitter: EventEmitter,
    private channels: string[] = [],
  ) {
    this._eventHandler = null
  }

  /**
   * Function to subscribe to observable
   * @param callback
   * @param onError
   */
  subscribe(
    callback: (data: T) => void,
    onError?: (err: unknown) => void,
  ): void {
    // Check event handler exist and unsubscribe to last subscription
    if (this._eventHandler) {
      this.unsubscribe()
    }

    this._eventHandler = (data: any) => {
      try {
        callback(data)
      } catch (err) {
        if (onError) {
          onError(err)
        } else {
          console.error(err)
        }
      }
    }

    if (this.channels.length) {
      for (const channel of this.channels) {
        this.eventEmitter.on(`${channel}`, this._eventHandler)
      }
    } else this.eventEmitter.on('message', this._eventHandler)
  }

  unsubscribe(): void {
    if (this._eventHandler) {
      if (this.channels.length) {
        for (const channel of this.channels) {
          this.eventEmitter.off(`${channel}`, this._eventHandler)
        }
      } else {
        this.eventEmitter.off('message', this._eventHandler)
      }
    }
  }
}
