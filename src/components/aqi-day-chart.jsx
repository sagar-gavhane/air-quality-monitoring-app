import React, { useMemo } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import format from 'date-fns/format'
import sum from 'lodash/sum'
import { useParams } from 'react-router'

import { uniqueArrayElement } from 'utils/unique-array-elements'
import { groupBy } from 'utils/group-by'

// disable chart animation
defaults.animation = false

export function AQIDayChart({ aqiData }) {
  const params = useParams()

  const groupByLabel = groupBy(
    Object.keys(aqiData[params.city]).map((key) => {
      const pairs = aqiData[params.city][key]
      const date = pairs.date
      const label = format(new Date(date), 'dd:mm aaa')

      return { label, aqi: pairs.aqi }
    })
  )

  const datasets = [
    {
      label: '# of AQI',
      data: Object.keys(groupByLabel).map((key) => {
        const avg = Object.keys(groupByLabel[key]).map(
          (k) => +groupByLabel[key][k].aqi
        )
        const value = +(sum(avg) / avg.length).toFixed(2)

        return value
      }),
    },
  ]

  const data = {
    labels: uniqueArrayElement(
      Object.keys(aqiData[params.city]).map((key) =>
        format(new Date(aqiData[params.city][key].date), 'dd:mm aaa')
      )
    ),
    datasets: datasets,
  }

  const options = useMemo(() => {
    return {
      elements: {
        bar: { borderWidth: 2 },
      },
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: 'AQI day chart',
          font: { weight: 'bold', size: '16px' },
        },
      },
    }
  }, [])

  return (
    <div>
      <Bar data={data} options={options} width={400} height={200} />
    </div>
  )
}
