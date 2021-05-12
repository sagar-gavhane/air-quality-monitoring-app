import { useEffect, useState } from 'react'
import { produce } from 'immer'

import { socket } from 'services/web-socket'

export function useAQIDetails() {
  const [aqiData, setAQIData] = useState(() => {
    const aqi = localStorage.getItem('aqi')

    if (!aqi) return {}

    try {
      return JSON.parse(aqi)
    } catch (error) {
      console.log('Error occurred while parsing AQI', error.message)
      return {}
    }
  })

  useEffect(() => {
    socket.addEventListener('message', function (event) {
      try {
        setAQIData((prevState) => {
          const parsed = JSON.parse(event.data)

          const nextData = produce(prevState, (draftState) => {
            parsed.forEach((d) => {
              if (!Array.isArray(draftState[d.city])) {
                draftState[d.city] = [
                  {
                    aqi: d.aqi.toFixed(2),
                    date: new Date().toISOString(),
                  },
                ]
              } else {
                const length = draftState[d.city].length

                draftState[d.city] = draftState[d.city]
                  .slice(Math.max(length - 999, 0))
                  .concat({
                    aqi: d.aqi.toFixed(2),
                    date: new Date().toISOString(),
                  })
              }
            })
          })

          localStorage.setItem('aqi', JSON.stringify(nextData))

          return nextData
        })
      } catch (error) {
        console.log('Error occurred while receiving messages]', error.message)
      }
    })
  }, [])

  return aqiData
}
