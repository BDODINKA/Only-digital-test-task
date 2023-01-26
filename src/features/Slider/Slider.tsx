import { useRef } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'

// Import Swiper styles
import 'swiper/scss'

import 'swiper/scss/navigation'

import 'swiper/scss/pagination'

import { data } from '../../app/mockData/data'

import style from './slider.module.scss'

export const Slider = () => {
  const swiperRef = useRef<SwiperCore>()

  return (
    <div className={style.wrapper}>
      <Swiper
        // install Swiper module
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        onBeforeInit={swiper => {
          swiperRef.current = swiper
        }}
        pagination={{ clickable: true, enabled: false }} //show pagination
        onSlideChange={() => console.log('slide change')}
        style={{ width: '90%' }}
      >
        {/*{data.category.world.map((el, i) => (*/}
        {/*  <SwiperSlide*/}
        {/*    key={i}*/}
        {/*    className={style.slider}*/}
        {/*    style={{ width: '1000px !important', height: '90px' }}*/}
        {/*  >*/}
        {/*    <h5 className={style.title}>{el.date}</h5>*/}
        {/*    <p className={style.description}>{el.description}</p>*/}
        {/*  </SwiperSlide>*/}
        {/*))}*/}
      </Swiper>
      <div onClick={() => swiperRef.current?.slidePrev()} className={style.prevBtn}>
        Prev
      </div>
      <div onClick={() => swiperRef.current?.slideNext()} className={style.nextBtn}>
        Next
      </div>
    </div>
  )
}
