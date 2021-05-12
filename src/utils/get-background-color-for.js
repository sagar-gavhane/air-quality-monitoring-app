export function getBackgroundColorFor(aqi) {
  if (aqi <= 50) return 'bg-gradient-to-br from-green-200 to-green-300'
  if (aqi <= 100) return 'bg-gradient-to-br from-green-600 to-green-200'
  if (aqi <= 200) return 'bg-gradient-to-br from-yellow-500 to-yellow-200'
  if (aqi <= 300) return 'bg-gradient-to-br from-yellow-700 to-yellow-500'
  if (aqi <= 400) return 'bg-gradient-to-br from-red-500 to-red-400'
  if (aqi <= 500) return 'bg-gradient-to-br from-red-700 to-red-900'

  return 'bg-black'
}
