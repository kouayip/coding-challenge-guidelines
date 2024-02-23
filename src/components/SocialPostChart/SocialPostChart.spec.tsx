import React from 'react'
import { render, screen } from '@testing-library/react'
import SocialPostChart from './SocialPostChart'
import { SocialPostStreamProvider } from '../../providers/SocialPostStreamProvider.tsx'

describe('SocialPostChart component', () => {
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
