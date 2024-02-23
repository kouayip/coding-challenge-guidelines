function loadConfig(nodeEnv: Record<string, unknown>) {
  const socialStreamUrl = nodeEnv.VITE_SOCIAL_POST_STREAM_URL as string

  if (!socialStreamUrl) {
    throw new Error('Required social stream url')
  }

  return {
    socialStreamUrl,
  }
}

export default loadConfig(import.meta.env)
