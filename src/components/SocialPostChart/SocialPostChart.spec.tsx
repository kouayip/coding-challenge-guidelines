import React from 'react'
import { render, screen } from '@testing-library/react'
import SocialPostChart from './SocialPostChart'

describe('SocialPostChart component', () => {
  it('renders with initial post count and chart', () => {
    render(<SocialPostChart socialType="Twitter" />)

    const socialCardElement = screen.getByTestId('social-post-chart-Twitter')
    expect(socialCardElement).toBeInTheDocument()

    // Vérifie si le texte initial du nombre de publications est rendu
    const postCountElement = screen.getByText(/Number of posts processed:/i)
    expect(postCountElement).toBeInTheDocument()
  })
})
