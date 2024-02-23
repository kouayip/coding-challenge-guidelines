import { useContext } from 'react'
import { SocialPostStreamContext } from '../providers/SocialPostStreamProvider'

export const useSocialPostStream = () => {
  const context = useContext(SocialPostStreamContext)

  if (context === undefined) {
    throw new Error(
      'useSocialPostStream must be used within a SocialPostStreamProvider',
    )
  }

  return context
}
