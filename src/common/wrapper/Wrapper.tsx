import React from 'react'

import style from './wrapper.module.scss'
type PropsType = {
  children: React.ReactNode
  className?: string
}

export const Wrapper = (props: PropsType) => {
  const { children, className } = props
  const finalClass = className ? `${style.wrapper} ${className}` : style.wrapper

  return <section className={finalClass}>{children}</section>
}
