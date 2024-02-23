import { EventEmitter } from '../events/EventEmitter.ts'
import { MessageObservable } from './MessageObservable.ts'

describe('MessageObservable', () => {
  let eventEmitter: EventEmitter
  let messageObservable: MessageObservable<string>

  beforeEach(() => {
    eventEmitter = new EventEmitter()
    messageObservable = new MessageObservable(eventEmitter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should subscribe to message events correctly', () => {
    const callback = jest.fn()
    messageObservable.subscribe(callback)

    eventEmitter.emit('message', 'Hello World')

    expect(callback).toHaveBeenCalledWith('Hello World')
  })

  it('should subscribe to custom channels correctly', () => {
    const callback = jest.fn()
    const channels = ['channel1', 'channel2']
    const customMessageObservable = new MessageObservable(
      eventEmitter,
      channels,
    )

    customMessageObservable.subscribe(callback)

    eventEmitter.emit('channel1', 'Data for channel 1')
    eventEmitter.emit('channel2', 'Data for channel 2')

    expect(callback).toHaveBeenCalledWith('Data for channel 1')
    expect(callback).toHaveBeenCalledWith('Data for channel 2')
  })

  it('should handle errors in callbacks', () => {
    const errorCallback = jest.fn()
    const errorThrowingCallback = () => {
      throw new Error('Test Error')
    }

    messageObservable.subscribe(() => {})
    messageObservable.subscribe(errorThrowingCallback, errorCallback)

    expect(() => eventEmitter.emit('message', 'Error Test')).not.toThrow()
    expect(errorCallback).toHaveBeenCalled()
  })

  it('should unsubscribe from events correctly', () => {
    const callback = jest.fn()
    messageObservable.subscribe(callback)

    eventEmitter.emit('message', 'Unsubscribe Test')
    expect(callback).toHaveBeenCalledWith('Unsubscribe Test')

    messageObservable.unsubscribe()

    eventEmitter.emit('message', 'Should Not Trigger')
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
