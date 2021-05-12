export function getTextColorFor(aqi) {
  if (aqi <= 50) return 'text-green-300'
  if (aqi <= 100) return 'text-green-500'
  if (aqi <= 200) return 'text-yellow-500'
  if (aqi <= 300) return 'text-yellow-700'
  if (aqi <= 400) return 'text-red-500'
  if (aqi <= 500) return 'text-red-700'

  return 'bg-black'
}
