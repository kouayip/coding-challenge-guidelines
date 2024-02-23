import { EventEmitter } from './EventEmitter'

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter

  beforeEach(() => {
    eventEmitter = new EventEmitter()
  })

  it('should add event listener', () => {
    const event = 'testEvent'
    const callback = jest.fn()
    eventEmitter.on(event, callback)

    expect(eventEmitter.hasEventListener(event)).toBeTruthy()
  })

  it('should remove event listener', () => {
    const event = 'testEvent'
    const callback = jest.fn()
    eventEmitter.on(event, callback)
    eventEmitter.off(event, callback)

    expect(eventEmitter.hasEventListener(event)).toBeFalsy()
  })

  it('should emit event to all listeners', () => {
    const event = 'testEvent'
    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on(event, callback1)
    eventEmitter.on(event, callback2)

    const eventData = { message: 'Hello!' }

    eventEmitter.emit(event, eventData)

    expect(callback1).toHaveBeenCalledWith(eventData)
    expect(callback2).toHaveBeenCalledWith(eventData)
  })

  it('should handle errors in listeners with global error callback', () => {
    const event = 'errorEvent'
    const errorCallback = jest.fn()

    eventEmitter.setGlobalErrorCallback(errorCallback)

    eventEmitter.on(event, () => {
      throw new Error('Test error')
    })

    const eventData = { message: 'Error!' }
    eventEmitter.emit(event, eventData)

    expect(errorCallback).toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should clear all event listeners', () => {
    const event1 = 'event1'
    const event2 = 'event2'

    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on(event1, callback1)
    eventEmitter.on(event2, callback2)
    eventEmitter.clearEventListeners()

    expect(eventEmitter.hasEventListener(event1)).toBeFalsy()
    expect(eventEmitter.hasEventListener(event2)).toBeFalsy()
  })

  it('should clear listeners for a specific event', () => {
    const event1 = 'event1'
    const event2 = 'event2'

    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on(event1, callback1)
    eventEmitter.on(event2, callback2)
    eventEmitter.clearEventListeners(event1)

    expect(eventEmitter.hasEventListener(event1)).toBeFalsy()
    expect(eventEmitter.hasEventListener(event2)).toBeTruthy()
  })
})
