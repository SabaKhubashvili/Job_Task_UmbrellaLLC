import React from 'react'

interface Props{
    children:React.ReactNode
}

export const Container = ({children}:Props) => {
  return (
    <section className={`max-w-[2610px]  w-full relative h-fit
    lg:px-[75px] md:px-[60px] sm:px-[40px] px-[20px] mx-auto`}>
        {children}
    </section>
  )
}
