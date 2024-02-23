import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorFallback from '../pages/misc/ErrorFallback'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
)

export default AppProvider
