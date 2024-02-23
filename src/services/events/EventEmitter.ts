// Définition d'un type pour les fonctions qui écoutent les événements
type Listener = { [event: string]: Array<(data: unknown) => void> }

export class EventEmitter {
  private listeners: Listener = {}
  private globalErrorCallback: ((error: unknown) => void) | undefined

  /**
   * // Adding a listener
   */
  public on(event: string, callback: (data: unknown) => void) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
  }

  /**
   * Deleting a listener
   */
  public off(event: string, callback: (data: unknown) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback,
      )
    }
  }

  /*
   * Trigger an event and call all the headphones
   */
  public emit(event: string, data: unknown) {
    if (this.hasEventListener(event)) {
      try {
        this.listeners[event]?.forEach(listener => listener(data))
      } catch (error) {
        if (this.globalErrorCallback) {
          this.globalErrorCallback(error)
        } else {
          throw error
        }
      }
    }
  }

  /**
   * Defines a callback to handle global errors
   */
  public setGlobalErrorCallback(callback: (error: unknown) => void) {
    this.globalErrorCallback = callback
  }

  /**
   * Check event exist in listeners
   */
  public hasEventListener(event: string) {
    return this.listeners[event] && this.listeners[event].length > 0
  }

  /**
   * Delete spécific event or reset all listener
   */
  public clearEventListeners(event?: string) {
    if (event) {
      delete this.listeners[event]
    } else {
      this.listeners = {}
    }
  }
}
