import { useRef } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'

// Import Swiper styles
import 'swiper/scss'

import 'swiper/scss/navigation'

import 'swiper/scss/pagination'

import { data } from '../../app/mockData/data'
import { Button } from '../../common/button/button'

import style from './slider.module.scss'

export const Slider = () => {
  const swiperRef = useRef<SwiperCore>()

  const datas = data.category.find((el, i) => el['world'])

  console.log(datas && datas['world'].map(el => el))

  return (
    <div className={style.wrapper}>
      <Button
        disabled={false}
        onClick={() => swiperRef.current?.slidePrev()}
        className={style.prevBtn}
      >
        Prev
      </Button>
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
        {datas &&
          datas['world'].map((el, i) => (
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
      >
        Next
      </Button>
    </div>
  )
}
