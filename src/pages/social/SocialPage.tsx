import React from 'react'
import { SocialPostStreamProvider } from '../../providers/SocialPostStreamProvider'
import SocialPostChart from '../../components/SocialPostChart'
import config from '../../services/config/config'

import './SocialPage.less'

const socials = [
  'pin',
  'instagram_media',
  'youtube_video',
  'article',
  'tweet',
  'facebook_status',
]

const SocialPage = () => (
  <SocialPostStreamProvider options={{ url: config.socialStreamUrl }}>
    <div className="social-wrapper">
      {socials.map(social => (
        <SocialPostChart key={social} type={social} />
      ))}
    </div>
  </SocialPostStreamProvider>
)

export default SocialPage
