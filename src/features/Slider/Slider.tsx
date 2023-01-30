import { useRef, useState } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'

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
  const [disabledBtn, setDisabledBtn] = useState<null | number>(null)

  console.log(disabledBtn)

  return (
    <div className={style.wrapper}>
      {disabledBtn !== 0 && (
        <Button onClick={() => swiperRef.current?.slidePrev()} className={style.prevBtn} />
      )}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          575: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1023: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        onBeforeInit={swiper => {
          swiperRef.current = swiper
          setDisabledBtn(swiper.realIndex)
        }}
        onSlideChange={swiper => {
          setDisabledBtn(swiper.activeIndex)
        }}
        pagination={{
          el: '.pagination',
          clickable: true,
        }}
        style={{ width: '90%', height: '100px' }}
        uniqueNavElements={true}
        grabCursor={true}
        className={style.swiper}
        freeMode={true}
      >
        {currentCategory.map((el, i) => (
          <SwiperSlide key={i} className={style.slider}>
            <h5 className={style.title}>{el.date}</h5>
            <p className={style.description}>{el.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      {disabledBtn !== currentCategory.length - 1 && (
        <Button onClick={() => swiperRef.current?.slideNext()} className={style.nextBtn} />
      )}
      <div className={'pagination'}></div>
    </div>
  )
}
