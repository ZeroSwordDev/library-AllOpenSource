import React, { CSSProperties } from 'react'

type Props = {
    children?: any,
    styles: CSSProperties,
    background?: string,
}

export const Button = (props: Props) => {
    const { children  , background, styles} = props;

     let _style: CSSProperties = styles || {} ;
    if(background) _style.backgroundColor = background;


  return (
    <button style={_style}  { ...props}>{children}</button>
  )
}

export default Button