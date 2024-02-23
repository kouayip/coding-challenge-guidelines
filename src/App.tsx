import React from 'react'
import AppProvider from './providers/AppProvider'
import SocialPage from './pages/social/SocialPage'

function App() {
  return (
    <AppProvider>
      <SocialPage />
    </AppProvider>
  )
}

export default App
