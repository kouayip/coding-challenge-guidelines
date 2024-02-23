import React from 'react'
import { render, screen } from '@testing-library/react'
import SocialPostChart from './SocialPostChart'
import { SocialPostStreamProvider } from '../../providers/SocialPostStreamProvider.tsx'

describe('SocialPostChart component', () => {
  beforeEach(() => {
    // Create a mock EventSource
    const eventSourceMock = {
      addEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    }

    // Assign the mock to the global object
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    global.EventSource = jest.fn(() => eventSourceMock)
  })

  afterEach(() => {
    // Reset the mock
    jest.clearAllMocks()
  })

  it('renders with initial post count and chart', () => {
    render(
      <SocialPostStreamProvider
        options={{
          url: 'http://localhost:562',
          autoConnect: false,
        }}
      >
        <SocialPostChart type="Twitter" />
      </SocialPostStreamProvider>,
    )

    const socialCardElement = screen.getByTestId('social-post-chart-Twitter')
    expect(socialCardElement).toBeInTheDocument()

    // Vérifie si le texte initial du nombre de publications est rendu
    const postCountElement = screen.getByText(/Number of posts processed:/i)
    expect(postCountElement).toBeInTheDocument()
  })
})
