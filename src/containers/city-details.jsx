import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { useAQIDetails } from 'hooks/use-aqi-details'
import { getTextColorFor } from 'utils/get-text-color-for'
import { getEmojiFor } from 'utils/get-emoji-for'
import { AQIDayChart } from 'components/aqi-day-chart'
import CountUp from 'react-countup'

export function CityDetails() {
  const aqiData = useAQIDetails()
  const params = useParams()

  const aqiDataLength = aqiData[params.city].length
  const latestAQIRecord = aqiData[params.city][aqiDataLength - 1]

  return (
    <div className='bg-gray-200'>
      <div className='container mx-auto py-6 h-screen'>
        <div className='flex items-center mb-6 gap-2 bg-white rounded-lg shadow-lg p-4'>
          <h1
            className={cn(
              'w-full text-5xl font-extrabold',
              getTextColorFor(+latestAQIRecord.aqi)
            )}
          >
            {params.city}
          </h1>
          <span
            className={cn('text-3xl', getTextColorFor(+latestAQIRecord.aqi))}
          >
            <CountUp preserveValue end={+latestAQIRecord.aqi} />
          </span>
          <span className='text-3xl'>{getEmojiFor(+latestAQIRecord.aqi)}</span>
        </div>
        <div
          className='grid rounded-lg shadow-lg bg-white border-gray-500 p-6'
          style={{ gridTemplateColumns: '1.5fr 2fr' }}
        >
          <div className='flex justify-center items-center'>
            <ReactSpeedometer
              minValue={0}
              maxValue={500}
              segments={6}
              customSegmentStops={[0, 50, 100, 200, 300, 400, 500]}
              segmentColors={[
                '#10B981',
                '#6EE7B7',
                '#FBBF24',
                '#F59E0B',
                '#EF4444',
                '#991B1B',
              ]}
              value={+latestAQIRecord.aqi}
              needleHeightRatio={0.7}
              width={300}
              height={200}
            />
          </div>
          <AQIDayChart aqiData={aqiData} />
        </div>
      </div>
    </div>
  )
}
