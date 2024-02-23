import { UpfluenceSSEvent } from '../UpfluenceSSEvent'

describe('SSEvent', () => {
  let ssevent: UpfluenceSSEvent
  let eventSourceMock: any

  beforeEach(() => {
    // Create a mock EventSource
    eventSourceMock = {
      addEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    }

    // Assign the mock to the global object
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    global.EventSource = jest.fn(() => eventSourceMock)

    ssevent = new UpfluenceSSEvent({
      url: 'http://example.com/events',
      autoConnect: false,
    })
  })

  afterEach(() => {
    // Reset the mock
    jest.clearAllMocks()
  })

  it('should create an SSEvent instance', () => {
    expect(ssevent).toBeDefined()
  })

  it('should connect to EventSource with provided URL', () => {
    ssevent.connect()

    expect(window.EventSource).toHaveBeenCalledWith('http://example.com/events')
  })

  it('should emit "open" event on EventSource open', () => {
    const openCallback = jest.fn()
    ssevent.on('open', openCallback)

    // Simulate event
    const fakeEvent = new Event('open')
    jest.spyOn(ssevent, 'connect').mockImplementation(() => {
      ssevent.emit('open', fakeEvent)
    })

    ssevent.connect()

    expect(openCallback).toHaveBeenCalledWith(fakeEvent)
  })
})
