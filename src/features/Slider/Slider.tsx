import { useRef } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'

// Import Swiper styles
import 'swiper/scss'

import 'swiper/scss/navigation'

import 'swiper/scss/pagination'
import { ViewItemType } from '../../app/mockData/types/dataTypes'
import { Button } from '../../common/button/button'

import style from './slider.module.scss'

type PropsType = {
  currentCategory: ViewItemType[]
}

export const Slider = (props: PropsType) => {
  const { currentCategory } = props
  const swiperRef = useRef<SwiperCore>()

  if (!currentCategory) return null

  return (
    <div className={style.wrapper}>
      <Button
        disabled={false}
        onClick={() => swiperRef.current?.slidePrev()}
        className={style.prevBtn}
      />
      <Swiper
        // install Swiper module
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        onBeforeInit={swiper => {
          swiperRef.current = swiper
        }}
        pagination={{ clickable: true, enabled: false }} //show pagination
        style={{ width: '90%', height: '100px' }}
        centeredSlides={true}
        grabCursor={true}
        className={style.swiper}
        containerModifierClass={style.swrapper}
        freeMode={true}
      >
        {currentCategory.map((el, i) => (
          <SwiperSlide
            key={i}
            className={style.slider}
            style={{ width: '1000px !important', height: '90px' }}
          >
            <h5 className={style.title}>{el.date}</h5>
            <p className={style.description}>{el.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        disabled={false}
        onClick={() => swiperRef.current?.slideNext()}
        className={style.nextBtn}
      />
    </div>
  )
}
