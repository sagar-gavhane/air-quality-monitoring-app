import cn from 'classnames'
import CountUp from 'react-countup'
import formatDistance from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'

import { getEmojiFor } from 'utils/get-emoji-for'
import { getBackgroundColorFor } from 'utils/get-background-color-for'
import { ChevronDoubleRight } from 'assets/icons/chevron-double-right'
import { useAQIDetails } from 'hooks/use-aqi-details'

export function HomePage() {
  const aqiData = useAQIDetails()

  return (
    <div className='bg-gray-200'>
      <div className='container mx-auto'>
        <h1 className='py-8 text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600'>
          City Wise <abbr title='Air Quality Index'>AQI</abbr>
        </h1>
        <div className='grid grid-cols-4 gap-8 py-6'>
          {Object.keys(aqiData).map((el) => {
            const record = aqiData[el]
            const { aqi: latestAQI, date } = record[record.length - 1]

            return (
              <Link key={el} to={`/city/${el}`}>
                <a
                  href={`/city/${el}`}
                  className={cn(
                    'grid grid-cols-1 p-6 text-white cursor-pointer shadow-md rounded-md transition-colors',
                    getBackgroundColorFor(+latestAQI)
                  )}
                >
                  <div className='flex justify-between'>
                    <h2 className='text-3xl mb-6'>{el}</h2>
                    <span className='text-4xl'>{getEmojiFor(latestAQI)}</span>
                  </div>
                  <span className='text-sm font-semibold'>AQI</span>
                  <span className='text-3xl font-bold mb-6'>
                    <CountUp end={+latestAQI} decimals={2} duration={1} />
                  </span>
                  <div className='flex mb-6 items-center gap-1'>
                    <span className='text-base'>Details</span>
                    <ChevronDoubleRight className='w-4 h-4' />
                  </div>
                  <span className='text-xs'>
                    {formatDistance(new Date(date))}
                  </span>
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
