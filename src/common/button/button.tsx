import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

import style from './button.module.scss'

type PropsType = {
  disabled: boolean
} & DefaultButtonPropsType

type DefaultButtonPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
export const Button = (props: PropsType) => {
  const { className, onClick, disabled } = props

  return (
    <button
      disabled={disabled}
      className={className ? `${style.Btn} ${className}` : style.Btn}
      onClick={onClick}
    ></button>
  )
}
