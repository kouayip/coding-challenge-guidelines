import React, { useEffect, useMemo, useRef } from 'react'
import { SSEventOptions, SSEvent, UpfluenceSSEvent } from '../services/ssevents'

export type SocialPostStreamProps = {
  children: React.ReactNode
  options: SSEventOptions
}

export type EventSourceValue = {
  stream: SSEvent
}

export const SocialPostStreamContext = React.createContext<EventSourceValue>(
  {} as never,
)

export const SocialPostStreamProvider: React.FC<SocialPostStreamProps> = ({
  options,
  children,
}) => {
  // Create a ref to hold the options
  const optionsRef = useRef(options)

  // Create a memoized SSEvent stream instance and use Upfluence Adapter
  const stream = useMemo<SSEvent>(
    () => new UpfluenceSSEvent(optionsRef.current),
    [],
  )

  /**
   * Effect hook to handle connection and disconnection
   */
  useEffect(() => {
    // Connect to the EventSource if autoConnect is not disabled
    if (!optionsRef.current.autoConnect) stream.connect()

    return () => {
      // Cleanup function to disconnect when unmounting
      stream.disconnect()
    }
  }, [stream])

  return (
    <SocialPostStreamContext.Provider value={{ stream }}>
      {children}
    </SocialPostStreamContext.Provider>
  )
}
