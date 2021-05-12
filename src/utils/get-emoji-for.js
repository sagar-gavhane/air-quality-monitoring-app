export function getEmojiFor(aqi) {
  if (aqi <= 50) return '😍'

  if (aqi > 50 && aqi <= 100) return '😀'
  if (aqi > 100 && aqi <= 200) return '🙂'
  if (aqi > 200 && aqi <= 300) return '🥺'
  if (aqi > 300 && aqi <= 400) return '😨'
  if (aqi > 400 && aqi <= 500) return '😱'

  return '🤔'
}
